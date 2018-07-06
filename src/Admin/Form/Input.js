import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const Input = ({ className, title, placeholder, id, errors, type, value, handleInput }) => {
  const fieldErrors = errors.filter(item => item.path === id);
  return (
    <div className={classNames('row', { danger: fieldErrors.length > 0 } )}>
      <div className={classNames('columns', className)}>
        <label htmlFor={id}>{title}</label>
        <input
          id={id}
          placeholder={placeholder}
          className="u-full-width"
          onChange={(e) => handleInput(id, e)}
          type={type}
          value={value ? value : ''}
        />
        {fieldErrors.length > 0 && (
          <ul>
            {fieldErrors.map(item => (
              <li key={item.type}>{item.message}</li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

Input.defaultProps = {
  type: 'text',
  errors: []
};

Input.propTypes = {
  className: PropTypes.string,
  title: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  errors: PropTypes.array.isRequired,
  type: PropTypes.string.isRequired,
  value: PropTypes.string,
  handleInput: PropTypes.func.isRequired
};

export default Input;
