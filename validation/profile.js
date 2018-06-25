const Validator = require('validator');
const _isEmpty = require('lodash.isempty');

module.exports = validateProfileInput = data => {
  const errors = {};
  let { handle, status, skills, website, twitter, facebook, linkedin, youtube, instagram } = data;

  // Set empty string if empty value in order to validate
  handle = _isEmpty(handle) ? '' : handle;
  status = _isEmpty(status) ? '' : status;
  skills = _isEmpty(skills) ? '' : skills;

  // Handle validation
  if (Validator.isEmpty(handle)) {
    errors.handle = 'Profile handle is required';
  } else if (!Validator.isLength(handle, { min: 2, max: 40 })) {
    errors.handle = 'Handle must be bewteen 2 and 40 characters';
  }

  // Status validation
  if (Validator.isEmpty(status)) {
    errors.status = 'Status field is required';
  }

  // Skills validation
  if (Validator.isEmpty(skills)) {
    errors.skills = 'Skills field is required';
  }

  if (!_isEmpty(website)) {
    if (!Validator.isURL(website)) {
      errors.website = 'Not a valid URL';
    }
  }

  if (!_isEmpty(twitter)) {
    if (!Validator.isURL(twitter)) {
      errors.twitter = 'Not a valid URL';
    }
  }

  if (!_isEmpty(youtube)) {
    if (!Validator.isURL(youtube)) {
      errors.youtube = 'Not a valid URL';
    }
  }

  if (!_isEmpty(facebook)) {
    if (!Validator.isURL(facebook)) {
      errors.facebook = 'Not a valid URL';
    }
  }

  if (!_isEmpty(linkedin)) {
    if (!Validator.isURL(linkedin)) {
      errors.linkedin = 'Not a valid URL';
    }
  }

  if (!_isEmpty(instagram)) {
    if (!Validator.isURL(instagram)) {
      errors.instagram = 'Not a valid URL';
    }
  }

  return { errors, isValid: _isEmpty(errors) };
};
