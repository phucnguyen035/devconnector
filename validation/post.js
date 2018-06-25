const Validator = require('validator');
const _isEmpty = require('lodash.isempty');

module.exports = validatePostInput = data => {
  const errors = {};
  let { text } = data;

  // Set empty string if empty value in order to validate
  text = _isEmpty(text) ? '' : text;

  // Text validation
  if (Validator.isEmpty(text)) {
    errors.text = 'Text field is required';
  } else if (!Validator.isLength(text, { min: 10, max: 300 })) {
    errors.text = 'Text field must be between 10 and 300 characters';
  }

  return { errors, isValid: _isEmpty(errors) };
};
