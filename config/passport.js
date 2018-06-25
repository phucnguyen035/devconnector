const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const { secretOrKey } = require('./keys');
const User = require('../models/User');

const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey,
};

module.exports = passport => {
  passport.use(
    new JwtStrategy(opts, ({ id }, done) => {
      User.findById(id)
        .then(user => {
          // Block if no user found with token ID
          if (!user) return done(null, false);

          return done(null, user);
        })
        .catch(err => console.log(err));
    })
  );
};
