import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import ReactSelect from 'react-select';

import 'react-select/dist/react-select.css';

const Select = ({ className, options, title, placeholder, id, errors, value, handleInput }) => {
  const fieldErrors = errors.filter(item => item.path === id);

  return (
    <div className={classNames('row', { danger: fieldErrors.length > 0 } )}>
      <div className={classNames('columns', className)} style={{marginBottom: 30}}>
        <label htmlFor={id}>{title}</label>
        <ReactSelect
          id={id}
          placeholder={placeholder}
          className="u-full-width"
          value={value ? value : ''}
          options={options}
          onChange={(val) => handleInput(id, val ? val.value : null)}
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

Select.propTypes = {
  className: PropTypes.string,
  options: PropTypes.arrayOf(PropTypes.shape({
    value: PropTypes.string.isRequired,
    label:PropTypes.string.isRequired
  })).isRequired,
  placeholder: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  errors: PropTypes.array.isRequired,
  value: PropTypes.string,
  handleInput: PropTypes.func.isRequired
};

export default Select;
