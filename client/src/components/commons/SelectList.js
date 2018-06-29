import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

const SelectList = (props) => {
  const { name, value, error, info, onChange, options } = props;
  const selectOptions = options.map(option => (
    <option key={option.label} value={option.value} disabled={option.disabled}>
      {option.label}
    </option>
  ));

  return (
    <div className="form-group">
      <select
        className={classnames('form-control form-control-lg', {
          'is-invalid': error
        })}
        name={name}
        value={value}
        onChange={onChange}
      >
        {selectOptions}
      </select>
      {info && <small className="form-text text-muted">{info}</small>}
      {error && <div className="invalid-feedback">{error}</div>}
    </div>
  );
};

SelectList.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  options: PropTypes.arrayOf(PropTypes.object).isRequired,
  info: PropTypes.string,
  error: PropTypes.string
};

SelectList.defaultProps = undefined;

export default SelectList;
