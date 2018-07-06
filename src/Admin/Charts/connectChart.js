import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import axios from 'axios';

const connectCharts = (ComposedComponent, LoadComponent) => {
  class Container extends Component {

    constructor(props) {
      super(props);
      this.state = {
        data: [],
        send: true
      };
      moment.locale('ru');
      this.unmounted = false;
    }

    componentWillUnmount(){
      this.unmounted = true;
    }

    componentDidMount() {
      const { url, count, user } = this.props;
      axios({
        method: 'get',
        headers: { 'Authorization': `Bearer ${user.get().token}` },
        params: { count },
        url
      })
        .then(response => {
          if (!this.unmounted) {
            const { data } = response;
            const save = data.map(item => {
              const time = moment(item.created_at).format('DD.MM');
              const timestamp = moment(item.created_at).unix();
              return { id: item.id, timestamp, time }
            });
            this.setState({ send: false, data: save });
          }
        });
    }

    render() {
      const { data, send } = this.state;
      if (send === false) {
        const groupBy = data
          .sort((a,b) => a.timestamp - b.timestamp)
          .reverse()
          .reduce((result, item) => {
            let save = { ...result };
            if (!result[item.time]) {
              save[item.time] = 0;
            }
            return Object.keys(save).reduce((sum, key) => {
              sum[key] = save[key] + 1;
              return sum;
            }, {});
          }, {});
        const chart = Object.keys(groupBy).map(time => [time, groupBy[time]]).reverse();
        return <ComposedComponent {...this.props} data={chart} />;
      } else {
        return <LoadComponent />;
      }
    }

  }

  Container.defaultProps = {
    count: 300
  };

  Container.propTypes = {
    url: PropTypes.string.isRequired,
    count: PropTypes.number.isRequired,
    user: PropTypes.object.isRequired
  };

  return Container
};

export default connectCharts;
