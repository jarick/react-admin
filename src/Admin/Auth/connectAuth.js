import React, { Component } from 'react';
import PropTypes from 'prop-types';

const connectAuth = (ComposedComponent, LoginComponent) => {
  class Container extends Component {

    constructor(props) {
      super(props);
      this.state = {
        user: null
      }
    }

    componentDidMount() {
      const { auth } = this.context;
      const user = auth.currentUser;
      if (user) {
        this.setState({ user });
      } else {
        this.setState({ user: null });
      }
      auth.onAuthStateChanged((user) => {
        if (user) {
          this.setState({ user });
        } else {
          this.setState({ user: null });
        }
      });
    }

    render() {
      console.log(this.state);
      return null;
    }

  }

  Container.contextTypes = {
    auth: PropTypes.object.isRequired
  };

  Container.propTypes = {
    location: PropTypes.object.isRequired
  };

  return Container
};

export default connectAuth;
