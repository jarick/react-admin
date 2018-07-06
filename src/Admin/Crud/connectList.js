import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { parse } from 'content-range';

const connectList = (ComposedComponent, LoadComponent) => {
  class Container extends Component {

    constructor(props) {
      super(props);
      this.state = {
        page: null,
        pageSize: null,
        pages: null,
        list: null,
        filter: '',
        sort: Object.keys(props.sortBy).reduce((result, field) => ({ ...result, [field]: null }), {}),
      };
    }

    componentDidMount() {
      const { pageSize, page, url, user } = this.props;
      const pageSizeInt = Math.max(1, parseInt(pageSize, 10));
      const pageNumber = Math.max(1, parseInt(page, 10));
      axios({
        method: 'get',
        headers: { 'Authorization': `Bearer ${user.get().token}` },
        params: {
          count: pageSizeInt,
          offset: (pageNumber - 1) * pageSizeInt,
          sort: '-created_at',
        },
        url
      }).then(response => {
        const { length } = parse(response.headers['content-range']);
        const pageCount = Math.ceil(length / pageSizeInt);
        this.setState({ list: response.data, page: pageNumber, pages: pageCount });
      }, e => {
        console.error(e);
        this.setState({ list: [], page: 1, pages: 1 });
      });
    }

    handleSetPage(page) {
      const save = { page: Math.max(1, parseInt(page, 10)) };
      this.setState(save, () => this.handleSend());
    }

    handleSetFilter(filter) {
      this.setState({ filter }, () => this.handleSend());
    }

    handleSetSort(sort) {
      this.setState({ sort }, () => this.handleSend());
    }

    handleSend() {
      const { pageSize, url, user } = this.props;
      const pageSizeInt = Math.max(1, parseInt(pageSize, 10));
      const { page, filter, sort } = this.state;
      this.setState({ list: null }, () => {
        const sorting = Object.keys(sort)
          .filter(key => sort[key])
          .map(key => `${sort[key] === 'desc' ? '-' : ''}${key}`)
          .join(',');
        axios({
          url,
          method: 'get',
          headers: { 'Authorization': `Bearer ${user.get().token}` },
          params: {
            count: pageSizeInt,
            offset: (page - 1) * pageSizeInt,
            sort: sorting.length > 0 ? sorting : '-created_at',
            search: filter.length > 0 ? filter : null,
          },
        }).then(response => {
          const { length } = parse(response.headers['content-range']);
          const pageCount = Math.ceil(length / pageSizeInt);
          this.setState({ list: response.data, page, pages: pageCount });
        });
      });
    }

    render() {
      return (
        <ComposedComponent
          {...this.props}
          {...this.state}
          actions={{
            setPage: this.handleSetPage.bind(this),
            setFilter: this.handleSetFilter.bind(this),
            setSort: this.handleSetSort.bind(this),
          }}
          load={<LoadComponent />}
        />
      );
    }

  }

  Container.defaultProps = {
    page: '1',
    pageSize: '10',
    sortBy: [ 'title' ],
  };

  Container.propTypes = {
    user: PropTypes.object,
    title: PropTypes.string.isRequired,
    head: PropTypes.string.isRequired,
    page: PropTypes.string.isRequired,
    pageSize: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired
  };

  return Container
};

export default connectList
