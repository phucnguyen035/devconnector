import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

const InputFieldSocial = (props) => {
  const { name, placeholder, value, error, onChange, icon, type } = props;

  return (
    <div className="input-group mb-3">
      <div className="input-group-prepend">
        <span className="input-group-text">
          <i className={icon} />
        </span>
      </div>
      <input
        className={classnames('form-control form-control-lg', {
          'is-invalid': error
        })}
        type={type}
        placeholder={placeholder}
        name={name}
        value={value}
        onChange={onChange}
      />
      {error && <div className="invalid-feedback">{error}</div>}
    </div>
  );
};

InputFieldSocial.propTypes = {
  name: PropTypes.string,
  type: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
  placeholder: PropTypes.string,
  icon: PropTypes.string,
  error: PropTypes.string
};

InputFieldSocial.defaultProps = undefined;

export default InputFieldSocial;
