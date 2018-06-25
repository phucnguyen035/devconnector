const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');

// Load routes
const users = require('./routes/api/users');
const profile = require('./routes/api/profile');
const posts = require('./routes/api/posts');

const app = express();
const port = process.env.PORT || 5000;
const db = process.env.DATABASEURL || 'mongodb://localhost/devconnector';

// Body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Connect to MongoDB
mongoose
  .connect(db)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

// Passport middleware
app.use(passport.initialize());

// Passport config
require('./config/passport')(passport);

// Use Routes
app.use('/api/users', users);
app.use('/api/profile', profile);
app.use('/api/posts', posts);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

/* { ES6 Imports - Experimental, won't use for now
  import express from 'express';
  import mongoose from 'mongoose';
  import bodyParser from 'body-parser';

  import users from './routes/api/users';
  import profile from './routes/api/profile';
  import posts from './routes/api/posts';
} */
