import React from 'react';
import PropTypes from 'prop-types';
import Input from './Input';

const SearchView = (
  {
    filter,
    handleSetFilter,
  }
) => (
  <Input
    value={filter}
    onChange={event => {
      const value = event.target.value;
      handleSetFilter(value);
    }}
  />
);

SearchView.propTypes = {
  field: PropTypes.string.isRequired,
  handleSetFilter: PropTypes.func.isRequired,
};

export default SearchView;
