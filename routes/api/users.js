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
  const findAll = async () => {
    const users = await User.find().exec();

    if (_isEmpty(users)) {
      return res.json({ noUser: 'No users found' });
    }

    return res.json(users);
  };

  findAll();
});

// @route GET api/users/signup
// @desc Sign up user
// @access Public
router.post('/signup', (req, res) => {
  const { errors, isValid } = validateSignupInput(req.body);

  if (!isValid) return res.status(400).json(errors);

  // Destructure from req.body
  const { name, email, password } = req.body;

  const signUp = async () => {
    // Get avatar from gravatar
    const avatar = gravatar.url(email, {
      s: '200', // size
      r: 'pg', // rating
      d: 'mm', // default
    });
    const user = await User.findOne({ email }).exec();

    // Block if email exists
    if (user) {
      errors.email = 'Email already exists';
      return res.status(400).json(errors);
    }

    // CREATE USER
    const createUser = new User({ name, email, avatar, password });

    // Hash password then set the new hased password as user password
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(createUser.password, salt);

    createUser.password = hashedPassword;

    const newUser = await createUser.save();

    res.json(newUser);
  };

  signUp();
});

// @route GET api/users/signin
// @desc Sign in user (Return a JSON Web Token)
// @access Public
router.post('/signin', (req, res) => {
  const { errors, isValid } = validateSigninInput(req.body);

  if (!isValid) return res.status(400).json(errors);

  const signIn = async () => {
    try {
      const user = await User.findOne({ email: req.body.email }).exec();
      const passwordMatch = await bcrypt.compare(req.body.password, user.password);

      // Block if incorrect password
      if (!passwordMatch) {
        errors.password = 'Incorrect password';
        return res.status(400).json(errors);
      }

      // Destructure user then create payload
      const { id, name, email, avatar } = user;
      const payload = { id, name, email, avatar };

      // Sign token
      const token = jwt.sign(payload, secretOrKey, { expiresIn: '1w' });

      res.json({
        success: true,
        token: `Bearer ${token}`,
      });
    } catch (error) {
      errors.email = 'User not found';
      return res.status(404).json(errors);
    }
  };

  signIn();
});

// @route GET api/users/current
// @desc Return current user
// @access Private
router.get('/current', isLoggedIn(), (req, res) => {
  const { id, name, email, avatar } = req.user;

  res.json({ id, name, email, avatar });
});

module.exports = router;
