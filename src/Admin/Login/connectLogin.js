import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Joi from 'joi-browser';
import language from '../../language';
import axios from 'axios';

const connectLogin = (LoginComponent, LoadComponent) => {
  class Container extends Component {

    constructor(props) {
      super(props);
      this.state = {
        user: false,
        error: false,
        send: false,
        errors: [],
        data: {
          username: '',
          password: ''
        }
      };
      this.listner = null;
    }

    componentDidMount() {
      const { user } = this.props;
      this.setState({ user: user.get() });
      this.listner = user.observe(change => {
        if (!change.newValue) {
          this.setState({user: null});
        }
      });
    }

    componentWillUnmount() {
      if (this.listner) {
        this.listner();
        this.listner = null;
      }
    }

    validate(cb) {
      const { data } = this.state;
      const schema = {
        username: Joi.string().required().label('Логин'),
        password: Joi.string().alphanum().required().label('Пароль')
      };
      const options = { abortEarly: false, language };
      const { error } = Joi.validate(data, schema, options);
      this.setState({ errors: error !== null ? error.details : [] }, cb);
    }

    handleSubmit() {
      const { url, user } = this.props;
      this.validate(() => {
        const { data, errors } = this.state;
        this.setState({ send: true, error: false });
        if (errors.length === 0) {
          axios({ method: 'post', url, data })
            .then(response => {
              localStorage.setItem('user', JSON.stringify(response.data));
              user.set(response.data);
              this.setState({ send: false, user: response.data });
            }).catch(e => {
              console.error(e);
              this.setState({ send: false, error: true });
            });
        } else {
          this.setState({ send: false });
        }
      });
    }

    handleInput(field, value) {
      const { data } = this.state;
      this.setState({ data: { ...data, [field]: value } });
    }

    render() {
      const { children } = this.props;
      const { user } = this.state;
      if (user === false) {
        return <LoadComponent />;
      } else if (user === null) {
        return <LoginComponent {...this.props} {...this.state} actions={{
          handleInput: this.handleInput.bind(this),
          handleSubmit: this.handleSubmit.bind(this)
        }} />;
      } else {
        return children;
      }
    }

  }

  Container.propTypes = {
    url: PropTypes.string.isRequired,
    user: PropTypes.object.isRequired
  };

  return Container
};

export default connectLogin;