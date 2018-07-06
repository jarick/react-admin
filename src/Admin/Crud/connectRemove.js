import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import axios from 'axios';


const connectRemove = (LoadComponent) => {
  class Container extends Component {

    constructor(props) {
      super(props);
      this.state = {
        found: null,
        success: false
      }
    }

    componentDidMount() {
      const { id, url, user } = this.props;
      axios({
        method: 'delete',
        headers: { 'Authorization': `Bearer ${user.get().token}` },
        url: `${url}/${id}`
      })
        .then(() => {
          this.setState({ success: true });
        }, e => {
          console.error(e);
          this.setState({ found: false });
        })
    }

    render() {
      const { location, page, returnUrl, fromList } = this.props;
      const { found, success } = this.state;
      if (found === false) {
        return <Redirect to={{
          pathname: '/admin/404',
          state: { from: location }
        }}/>;
      } else if (success) {
        return <Redirect to={{
          pathname: returnUrl,
          search: fromList ? `?page=${ page ? page : '1' }` : '',
          state: { from: location }
        }}/>;
      } else {
        return <LoadComponent />;
      }
    }

  }

  Container.defaultProps = {
    page: '1',
    fromList: true
  };

  Container.propTypes = {
    id: PropTypes.string.isRequired,
    page: PropTypes.string.isRequired,
    location: PropTypes.object.isRequired,
    url: PropTypes.string.isRequired,
    fromList: PropTypes.bool.isRequired,
    returnUrl: PropTypes.string.isRequired
  };

  return Container
};

export default connectRemove;
