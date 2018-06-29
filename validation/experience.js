const Validator = require('validator');
const _isEmpty = require('lodash.isempty');

module.exports = validateExperienceInput = data => {
  const errors = {};
  let { title, company, from, to, current } = data;

  // Set empty string if empty value in order to validate
  title = _isEmpty(title) ? '' : title;
  company = _isEmpty(company) ? '' : company;
  from = _isEmpty(from) ? '' : from;
  to = _isEmpty(to) ? '' : to;

  // Title validation
  if (Validator.isEmpty(title)) {
    errors.title = 'Title field is required';
  }

  // Company validation
  if (Validator.isEmpty(company)) {
    errors.company = 'Company field is required';
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
