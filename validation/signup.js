const Validator = require('validator');
const _isEmpty = require('lodash.isempty');

module.exports = validateSignupInput = (data) => {
  const errors = {};
  let { name, password, password2, email } = data;

  // Set empty string if empty value in order to validate
  name = _isEmpty(name) ? '' : name;
  password = _isEmpty(password) ? '' : password;
  email = _isEmpty(email) ? '' : email;
  password2 = _isEmpty(password2) ? '' : password2;

  // Username validation
  if (Validator.isEmpty(name)) {
    errors.name = 'Name field is required';
  } else if (!Validator.isLength(name, { min: 2, max: 30 })) {
    errors.name = 'Name must be between 2 and 30 characters';
  }

  // Email validation
  if (Validator.isEmpty(email)) {
    errors.email = 'Email field is required';
  } else if (!Validator.isEmail(email)) {
    errors.email = 'Invalid email';
  }

  // Password validation
  if (Validator.isEmpty(password)) {
    errors.password = 'Password field is required';
  } else if (!Validator.isLength(password, { min: 6, max: 50 })) {
    errors.password = 'Password must be at least 6 characters';
  }

  // Confirmed password validation
  if (Validator.isEmpty(password2)) {
    errors.password2 = 'Confirm password field is required';
  } else if (!Validator.equals(password, password2)) {
    errors.password2 = 'Passwords must match!';
  }

  return { errors, isValid: _isEmpty(errors) };
};
