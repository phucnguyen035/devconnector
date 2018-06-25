const express = require('express');
const { isLoggedIn, isPostOwner } = require('../../validation/jwtAuth');
const _isEmpty = require('lodash.isempty');
const validatePostInput = require('../../validation/post');

// LOAD MODEL
const Post = require('../../models/Post');

const router = express.Router();

// ==========================

// GET ALL POST
// accesss Public
router.get('/', (req, res) => {
  Post.find()
    .sort({ date: -1 })
    .populate('user', ['name', 'avatar'])
    .then(posts => {
      if (_isEmpty(posts)) {
        return res.status(404).json({ message: 'There are no posts' });
      }

      res.json(posts);
    });
});

// CREATE A POST
// @access Private
router.post('/', isLoggedIn(), (req, res) => {
  const { errors, isValid } = validatePostInput(req.body);

  if (!isValid) return res.status(400).json(errors);

  const { text, name, avatar } = req.body;
  const newPost = new Post({
    text,
    name,
    avatar,
    user: req.user.id,
  });

  newPost
    .save()
    .then(post => {
      res.json(post);
    })
    .catch(err => res.status(400).json({ message: 'Cannot create post' }));
});

// ==========================

// GET - EDIT - DELETE POST BY ID
// @access Public
router.get('/:id', (req, res) => {
  Post.findById(req.params.id)
    .then(post => res.json(post))
    .catch(() => res.status(404).json({ message: 'Post not found' }));
});

// @access Private
// note: Must own post
router.put('/:id', isLoggedIn(), isPostOwner, (req, res) => {
  const { text } = req.body;
  const { errors, isValid } = validatePostInput(req.body);

  if (!isValid) return res.status(400).json(errors);

  Post.findByIdAndUpdate(req.params.id, { text }).then(res.json({ success: true }));
});

// @access Private
// note: Must own post
router.delete('/:id', isLoggedIn(), isPostOwner, (req, res) => {
  Post.findByIdAndRemove(req.params.id).then(res.json({ success: true }));
});

// ==========================

// LIKE - UNLIKE POST
// @access Private for all
router.post('/like/:id', isLoggedIn(), (req, res) => {
  Post.findById(req.params.id)
    .then(post => {
      // Filter array to get requested user in Likes array
      const userHasLiked = post.likes.filter(like => like.user.equals(req.user.id));
      // Block if filtered array contains requested user
      if (!_isEmpty(userHasLiked)) {
        return res.status(400).json({ message: 'You have already liked this post' });
      }

      // Add user id to likes array
      post.likes = [{ user: req.user.id }, ...post.likes];
      post
        .save()
        .then(post => res.json(post))
        .catch(err => {
          console.error(err);
          return res.status(400).json({ message: 'Cannot save like' });
        });
    })
    .catch(err => {
      console.error(err);
      return res.status(404).json({ message: 'Post not found' });
    });
});

router.post('/unlike/:id', isLoggedIn(), (req, res) => {
  Post.findById(req.params.id)
    .then(post => {
      const userHasLiked = post.likes.filter(like => like.user.equals(req.user.id));
      if (_isEmpty(userHasLiked)) {
        return res.status(400).json({ message: 'You have not yet liked this post' });
      }

      // Get remove index
      const removeIndex = post.likes.findIndex(user => user.id === req.params.id);

      post.likes.splice(removeIndex, 1);
      post.save().then(updatedPost => res.json(updatedPost));
    })
    .catch(err => {
      console.error(err);
      return res.status(404).json({ message: 'Post not found' });
    });
});

// ==========================

// GET - CREATE - EDIT - DELETE COMMENT

// Create comment
// @access Private
router.post('/comment/:id', isLoggedIn(), (req, res) => {
  const { text, name, avatar } = req.body;
  const { errors, isValid } = validatePostInput(req.body);

  if (!isValid) return res.status(400).json(errors);

  Post.findById(req.params.id)
    .then(post => {
      const newComment = {
        text,
        name,
        avatar,
        user: req.user.id,
      };

      // Add to comments array
      post.comments = [newComment, ...post.comments];
      post
        .save()
        .then(updatedPost => res.json(updatedPost))
        .catch(err => {
          throw err;
        });
    })
    .catch(err => res.status(404).json({ message: 'Post not found' }));
});

// Get comment by id
// @access Public
router.get('/comment/:id/:comment_id', (req, res) => {
  Post.findById(req.params.id)
    .then(post => {
      const thisComment = post.comments.filter(comment => comment.id === req.params.comment_id);

      // Check if comment exists
      if (_isEmpty(thisComment)) {
        return res.status(404).json({ message: 'Comment not found' });
      }

      return res.json(thisComment);
    })
    .catch(err => res.status(404).json({ message: 'Post not found' }));
});

// Edit comment
// @access Private && Comment owner
router.put('/comment/:id/:comment_id', isLoggedIn(), (req, res) => {
  const { errors, isValid } = validatePostInput(req.body);

  if (!isValid) return res.status(400).json(errors);

  Post.findById(req.params.id)
    .then(post => {
      const thisComment = post.comments.find(comment => comment.id === req.params.comment_id);

      // Check if comment exists
      if (!thisComment) {
        return res.status(404).json({ message: 'Comment not found' });
      }

      // Block if not comment owner
      if (!thisComment.user.equals(req.user.id)) {
        return res.status(403).json({ message: 'Forbidden' });
      }

      // Edit and save
      thisComment.text = req.body.text;
      post
        .save()
        .then(updatedPost => res.json(updatedPost))
        .catch(err => res.status(400).json({ message: 'Cannot edit comment' }));
    })
    .catch(err => res.status(404).json({ message: 'Post not found' }));
});

// Remove comment
// @access Private && Comment owner
router.delete('/comment/:id/:comment_id', isLoggedIn(), (req, res) => {
  Post.findById(req.params.id)
    .then(post => {
      // Get comment index
      const commentIndex = post.comments.findIndex(comment => comment.id === req.params.comment_id);

      // Check if comment exists
      if (commentIndex < 0) {
        return res.status(404).json({ message: 'Comment not found' });
      }

      // Block if not comment owner
      if (!post.comments[commentIndex].user.equals(req.user.id)) {
        return res.status(403).json({ message: 'Forbidden' });
      }

      // Delete and save
      post.comments.splice(commentIndex, 1);

      post
        .save()
        .then(updatedPost => res.json(updatedPost))
        .catch(err => res.status(400).json({ message: 'Cannot delete comment' }));
    })
    .catch(err => res.status(404).json({ message: 'Post not found' }));
});

// ==========================

module.exports = router;
