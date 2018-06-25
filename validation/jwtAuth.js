const passport = require('passport');
const Post = require('../models/Post');

module.exports = {
  isLoggedIn: () => passport.authenticate('jwt', { session: false }),

  isPostOwner: (req, res, next) => {
    Post.findById(req.params.id)
      .then(post => {
        if (post.user.equals(req.user.id)) {
          return next();
        } else return res.status(403).json({ message: 'Forbidden' });
      })
      .catch(err => {
        return res.status(404).json({ message: 'Post not found' });
      });
  },
};
