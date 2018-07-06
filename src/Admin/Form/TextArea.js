import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const TextArea = ({ className, title, id, errors, value, handleInput }) => {
  const fieldErrors = errors.filter(item => item.path === id);
  return (
    <div className={classNames('row', { danger: fieldErrors.length > 0 } )}>
      <div className={classNames('columns', className)}>
        <label htmlFor={id}>{title}</label>
        <textarea className="u-full-width" value={value} onChange={e => handleInput(id, e)} />
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

TextArea.defaultProps = {
  errors: []
};

TextArea.propTypes = {
  title: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  errors: PropTypes.array.isRequired,
  value: PropTypes.string.isRequired,
  handleInput: PropTypes.func.isRequired
};

export default TextArea;

