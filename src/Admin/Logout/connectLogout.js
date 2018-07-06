import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

const connectLogout = (LoadComponent) => {
  class Container extends Component {

    constructor(props) {
      super(props);
      this.state = {
        success: false
      }
    }

    componentDidMount() {
      const { user } = this.props;
      localStorage.removeItem('user');
      this.setState({ success: true }, () => {
        user.set(null);
      });
    }

    render() {
      const { success } = this.state;
      if (success) {
        return <Redirect from="/admin/logout" to="/admin" />
      } else {
        return <LoadComponent />;
      }
    }

  }

  return Container;
};

export default connectLogout;
