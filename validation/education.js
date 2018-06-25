const Validator = require('validator');
const _isEmpty = require('lodash.isempty');

module.exports = validateEducationInput = data => {
  const errors = {};
  let { school, degree, field, from, to } = data;

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
  } else if (!Validator.isInt(from)) {
    errors.from = 'From must be a number';
  }

  // To validation
  if (!Validator.isEmpty(to) && !Validator.isInt(to)) {
    errors.to = 'To field must be a number';
  }

  return { errors, isValid: _isEmpty(errors) };
};
