const express = require('express');
const bcrypt = require('bcryptjs');
const gravatar = require('gravatar');
const jwt = require('jsonwebtoken');
const { isLoggedIn } = require('../../validation/jwtAuth');
const { secretOrKey } = require('../../config/keys');
const _isEmpty = require('lodash.isempty');

// Validations
const validateSignupInput = require('../../validation/signup');
const validateSigninInput = require('../../validation/signin');

// Model
const User = require('../../models/User');

// Initialize Router
const router = express.Router();

// @route GET api/users/all
// @desc Return all user
// @access Public
router.get('/all', (req, res) => {
  User.find().then(users => {
    // Block if no users found
    if (_isEmpty(users)) {
      return res.json({ noUser: 'No users found' });
    }

    res.json(users);
  });
});

// @route GET api/users/signup
// @desc Sign up user
// @access Public
router.post('/signup', (req, res) => {
  const { errors, isValid } = validateSignupInput(req.body);

  if (!isValid) return res.status(400).json(errors);

  // Destructure from req.body
  const { name, email, password } = req.body;

  User.findOne({ email }).then(user => {
    // Block if email exists
    if (user) {
      errors.email = 'Email already exists';
      return res.status(400).json(errors.email);
    }

    // CREATE USER
    // Get avatar from gravatar
    const avatar = gravatar.url(email, {
      s: '200', // size
      r: 'pg', // rating
      d: 'mm', // default
    });
    // Create
    const newUser = new User({ name, email, avatar, password });

    // Hash password
    bcrypt.genSalt().then(salt => {
      bcrypt.hash(newUser.password, salt).then(hash => {
        // Set new hased password as user password
        newUser.password = hash;
        newUser.save().then(user => res.json(user));
      });
    });
  });
});

// @route GET api/users/signin
// @desc Sign in user (Return a JSON Web Token)
// @access Public
router.post('/signin', (req, res) => {
  const { errors, isValid } = validateSigninInput(req.body);
  const { email, password } = req.body;

  if (!isValid) return res.status(400).json(errors);

  // Find user by email
  User.findOne({ email })
    .then(user => {
      // Check password
      bcrypt.compare(password, user.password).then(isMatch => {
        // Block if passwords do not match
        if (!isMatch) {
          errors.password = 'Incorrect password';
          return res.status(400).json(errors);
        }

        const { id, name, email, avatar } = user;
        const payload = { id, name, email, avatar };

        // Sign token
        jwt.sign(payload, secretOrKey, { expiresIn: '1w' }, (error, token) => {
          if (error) return console.error(error);

          res.json({
            success: true,
            token: `Bearer  ${token}`,
          });
        });
      });
    })
    .catch(err => {
      errors.email = "User not found"
      return res.status(404).json(errors)
    });
});

// @route GET api/users/current
// @desc Return current user
// @access Private
router.get('/current', isLoggedIn(), (req, res) => {
  const { id, name, email, avatar } = req.user;

  res.json({ id, name, email, avatar });
});

module.exports = router;
