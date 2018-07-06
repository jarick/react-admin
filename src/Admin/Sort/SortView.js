import React from 'react';
import PropTypes from 'prop-types';
import generate from 'shortid';
import { SortLink } from './SortStyled';

const SortView = (
  {
    sort,
    fields,
    handleSetSort,
  }
) => (
  <div>
    Сортировать:
    {Object.keys(fields).map(key => (
      <SortLink
        key={generate()}
        onClick={() => {
          let trigger;
          if (!sort[key]) {
            trigger = 'asc';
          }
          if (sort[key] === 'asc') {
            trigger = 'desc';
          }
          if (sort[key] === 'desc') {
            trigger = null;
          }
          handleSetSort({ ...sort, [key]: trigger })
        }}
      >
        {fields[key]}
        {sort[key] === 'asc' && ' ▲'}
        {sort[key] === 'desc' && ' ▼'}
      </SortLink>
    ))}
  </div>
);

SortView.propTypes= {
  sort: PropTypes.object.isRequired,
  fields: PropTypes.object.isRequired,
  handleSetSort: PropTypes.func.isRequired,
};

export default SortView;
