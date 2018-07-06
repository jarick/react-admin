import React from 'react';
import { SearchInput } from './InputStyled';

const Input = ({ ...props }) => (
  <SearchInput>
    <input
      type="search"
      {...props}
    />
  </SearchInput>
);

export default Input;
