import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Joi from 'joi-browser';
import { Redirect } from 'react-router-dom';
import language from '../../language';
import moment from 'moment';
import axios from 'axios';

const connectSave = (ComposedComponent, LoadComponent) => {
  class Container extends Component {

    constructor(props) {
      super(props);
      this.state = {
        load: false,
        send: false,
        data: null,
        success: false,
        errors: []
      };
    }

    componentDidMount() {
      const { id, url, initial, user } = this.props;
      if (id === null) {
        this.setState({ load: true, data: initial });
      } else {
        axios({
          method: 'get',
          headers: { 'Authorization': `Bearer ${user.get().token}` },
          url: `${url}/${id}`
        })
          .then(response => {
            this.setState({ load: true, data: response.data });
          }).catch(e => {
            console.error(e);
            this.setState({ load: true, data: false });
          })
      }
    }

    validate(cb) {
      const { data } = this.state;
      const { schema } = this.props;
      const options = { abortEarly: false, language };
      const { error } = Joi.validate(data, schema, options);
      if (error) {
        console.log(error.details)
      }
      this.setState({ errors: error !== null ? error.details : [] }, cb);
    }

    handleSetTime(cb) {
      const { id } = this.props;
      const { data } = this.state;
      const time = moment().toISOString();
      let save;
      if (id === null) {
        save = {
          ...data,
          created_at: time,
          updated_at: time
        };
      } else {
        save = {
          ...data,
          updated_at: time
        };
      }
      this.setState({ data: save }, cb);
    }

    handleSubmit() {
      const { id, url, user } = this.props;
      this.validate(() => {
        const { data, errors } = this.state;
        if (errors.length === 0) {
          this.setState({send: true});
          axios({
            method: id ? 'put' : 'post',
            headers: { 'Authorization': `Bearer ${user.get().token}` },
            url: id ? `${url}\\${id}` : url,
            data
          })
            .then(() => {
              this.setState({send: false, success: true})
            }, e => {
              console.error(e);
              this.setState({send: false, success: false})
            });
        }
      });
    }

    handleInput(field, value, cb) {
      const { data } = this.state;
      this.setState({
        data: {
          ...data,
          [field]: value
        }
      }, cb)
    }

    onSuccess() {
      const { page, location, backUrl } = this.props;
      return <Redirect to={{
        pathname: backUrl,
        search: `?page=${page}`,
        state: { from: location }
      }}/>;
    }

    onNotFound() {
      const { location, notFoundUrl } = this.props;
      return <Redirect to={{
        pathname: notFoundUrl,
        state: { from: location }
      }}/>;
    }

    render() {
      const { data, success } = this.state;
      if (success) {
        return this.onSuccess();
      }
      if (data === null) {
        return <LoadComponent />;
      } else if (data === false) {
        return this.onNotFound();
      } else {
        return <ComposedComponent
          {...this.props}
          {...this.state}
          actions={{
            submit: () => this.handleSetTime(this.handleSubmit.bind(this)),
            input: this.handleInput.bind(this)
          }}
        />;
      }
    }

  }

  Container.defaultProps = {
    page: '1'
  };

  Container.propTypes = {
    id: PropTypes.string,
    page: PropTypes.string,
    location: PropTypes.object,
    schema: PropTypes.object.isRequired,
    url: PropTypes.string.isRequired,
    backUrl: PropTypes.string.isRequired,
    notFoundUrl: PropTypes.string.isRequired,
    initial: PropTypes.object
  };

  return Container
};

export default connectSave;
