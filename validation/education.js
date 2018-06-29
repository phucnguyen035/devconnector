const Validator = require('validator');
const _isEmpty = require('lodash.isempty');

module.exports = validateEducationInput = data => {
  const errors = {};
  let { school, degree, field, from, to, current } = data;

  // Set empty string if empty value in order to validate
  school = _isEmpty(school) ? '' : school;
  degree = _isEmpty(degree) ? '' : degree;
  field = _isEmpty(field) ? '' : field;
  from = _isEmpty(from) ? '' : from;
  to = _isEmpty(to) ? '' : to;

  // School validation
  if (Validator.isEmpty(school)) {
    errors.school = 'School field is required';
  }

  // Degree validation
  if (Validator.isEmpty(degree)) {
    errors.degree = 'Degree field is required';
  }

  // Field validation
  if (Validator.isEmpty(field)) {
    errors.field = 'Field of study is required';
  }

  // From validation
  if (Validator.isEmpty(from)) {
    errors.from = 'From field is required';
  }

  // Current validation
  if (Validator.isEmpty(to) && !current) {
    errors.to = 'Please select an end date for a past experience';
  } else if (!Validator.isEmpty(to) && current) {
    errors.to = 'Current job cannot have an end date'
  }

  return { errors, isValid: _isEmpty(errors) };
};
