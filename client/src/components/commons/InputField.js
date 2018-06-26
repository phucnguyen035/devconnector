import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

const InputField = (props) => {
  const { name, placeholder, value, error, info, type, onChange, disabled } = props;
  return (
    <div className="form-group">
      <input
        type={type}
        className={classnames('form-control form-control-lg', {
          'is-invalid': error
        })}
        placeholder={placeholder}
        name={name}
        value={value}
        onChange={onChange}
        disabled={disabled}
      />
      {info && <small className="form-text text-muted">{info}</small>}
      {error && <div className="invalid-feedback">{error}</div>}
    </div>
  );
};

InputField.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  info: PropTypes.string,
  error: PropTypes.string,
  disabled: PropTypes.string,
  onChange: PropTypes.func.isRequired
};

InputField.defaultProps = undefined;

export default InputField;
