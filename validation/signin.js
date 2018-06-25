const Validator = require('validator');
const _isEmpty = require('lodash.isempty');

module.exports = validateSigninInput = (data) => {
  const errors = {};
  let { email, password } = data;

  // Set empty string if empty value in order to validate
  email = _isEmpty(email) ? '' : email;
  password = _isEmpty(password) ? '' : password;

  // Password validation
  if (Validator.isEmpty(password)) {
    errors.password = 'Password field is required';
  }

  // Email validation
  if (Validator.isEmpty(email)) {
    errors.email = 'Email field is required';
  } else if (!Validator.isEmail(email)) {
    errors.email = 'Invalid email';
  }

  return { errors, isValid: _isEmpty(errors) };
};
