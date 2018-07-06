import React, { Component } from 'react';
import PropTypes from 'prop-types';

const connectApp = (ComposedComponent) => {
  class Container extends Component {

    constructor(props) {
      super(props);
      this.state = {
        load: false,
        user: null
      };
      this.listner = null;
    }

    componentDidMount() {
      const { user } = this.props;
      this.setState({
        load: true,
        user: user.get()
      });
      this.listner = user.observe(change => {
        if (!change.newValue) {
          this.setState({ user: null });
        } else {
          this.setState({ user: { token: change.newValue.token } });
        }
      })
    }

    componentWillUnmount() {
      if (this.listner) {
        this.listner();
        this.listner = null;
      }
    }

    render() {
      const { load } = this.state;
      return load ? (
        <ComposedComponent {...this.props} {...this.state} />
      ) : null;
    }

  }

  Container.PropTypes = {
    user: PropTypes.object.isRequired
  };

  return Container
};

export default connectApp;
