import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import className from 'classnames';
import Pencil from 'react-icons/lib/go/pencil';
import Trashcan from 'react-icons/lib/go/trashcan';
import Search from '../Search'
import Sort from '../Sort'

const List = (
  {
    title,
    createLabel,
    head,
    getTitle,
    list,
    pages,
    page,
    actions,
    path,
    isCreate,
    isDelete,
    isEdit,
    filter,
    sort,
    sortBy,
    load
  }
) => {
  let pagesList = [];
  if (pages) {
    pagesList = Array.from(new Array(pages), (val, index) => index + 1 );
  }
  return (
    <div className="container center">
      <div className="row">
        <h4>{title}</h4>
      </div>
      {isCreate && (
        <div className="row" style={{textAlign: 'left'}}>
          <Link className="button" to={{ pathname: `${path}/new`, search: `?page=${page}` }}>
            {createLabel}
          </Link>
        </div>
      )}
      <div className="row">
        <div className="columns eight" style={{ textAlign: 'left', lineHeight: '36px' }}>
          <Sort fields={sortBy} sort={sort} handleSetSort={actions.setSort} />
        </div>
        <div className="columns four right">
          <Search field="title" filter={filter} handleSetFilter={actions.setFilter} />
        </div>
      </div>
      {list ? (
        <div className="row">
          {list.length > 0 && (
            <table className="u-full-width">
              <thead>
              <tr>
                <th>{head}</th>
                {isEdit && ( <th width={16} /> )}
                {isDelete && ( <th width={16} /> )}
              </tr>
              </thead>
              <tbody>
              {list.map(item => (
                <tr key={item.id}>
                  <td key={item.id}>
                    {getTitle(item)}
                  </td>
                  {isEdit && (
                    <td>
                      <Link to={{ pathname: `${path}/${item.id}`, search: `?page=${page}` }}>
                        <Pencil />
                      </Link>
                    </td>
                  )}
                  {isDelete && (
                    <td>
                      <Link to={{ pathname: `${path}/remove/${item.id}`, search: `?page=${page}` }}>
                        <Trashcan />
                      </Link>
                    </td>
                  )}
                </tr>
              ))}
              </tbody>
            </table>
          )}
        </div>
      ) : load }
      {list && (
        <div className="row">
          {pagesList.length > 1 && (
            <div className="pagination">
              {pagesList.map((item, index) => (
                <Link
                  key={index}
                  className={className({active: item === page})}
                  to={{ pathname: path, search: `?page=${item}` }}
                  onClick={() => actions.setPage(item)}
                >
                  {item}
                </Link>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

List.defaultProps = {
  isCreate: true,
  isEdit: true,
  isDelete: true,
  createLabel: 'Создать',
  getTitle: () => '',
  filter: {},
  sort: {},
};

List.propTypes = {
  title: PropTypes.string.isRequired,
  createLabel: PropTypes.string.isRequired,
  head: PropTypes.string.isRequired,
  list: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired
  })),
  path: PropTypes.string.isRequired,
  pages: PropTypes.number,
  page: PropTypes.number,
  isCreate: PropTypes.bool.isRequired,
  isDelete: PropTypes.bool.isRequired,
  isEdit: PropTypes.bool.isRequired,
  actions: PropTypes.shape({
    setPage: PropTypes.func.isRequired
  }).isRequired,
  getTitle: PropTypes.func.isRequired,
};

export default List;
