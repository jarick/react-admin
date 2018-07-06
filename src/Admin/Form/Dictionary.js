import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Loader from 'react-loader';
import axios from 'axios';
import Select from './Select';

import 'react-select/dist/react-select.css';


class Dictionary extends Component {

  constructor(props) {
    super(props);
    this.state = {
      options: null
    }
  }

  componentWillMount() {
    const { url, getItem, user } = this.props;
    axios({
      method: 'get',
      headers: { 'Authorization': `Bearer ${user.get().token}` },
      params: { count: 500, sort: '-created_at' },
      url
    })
      .then(response => {
        const options = response.data.map(item => ({
          value: `${item.id}`,
          label: getItem(item),
        }));
        this.setState({ options });
      }, e => {
        console.error(e);
        this.setState({ options: [] });
      })
  }

  render() {
    const { title, placeholder, id, errors, value, handleInput } = this.props;
    const { options } = this.state;
    return (
      <Loader loaded={options !== null} parentClassName="loader" loadedClassName="row">
        <Select
          className="nine"
          title={title}
          placeholder={placeholder}
          id={id}
          errors={errors}
          options={options ? options : []}
          value={`${value}`}
          handleInput={(id, val) => handleInput(id, parseInt(val, 10))}
        />
      </Loader>
    );
  }
}

Dictionary.defaultProps = {
  errors: []
};

Dictionary.propTypes = {
  url: PropTypes.string.isRequired,
  getItem: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  errors: PropTypes.array.isRequired,
  value: PropTypes.number,
  handleInput: PropTypes.func.isRequired
};

export default Dictionary;
