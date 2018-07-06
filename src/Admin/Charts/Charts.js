import React from 'react'
import PropTypes from 'prop-types';
import ChartView from './Chart';
import connectChart from './connectChart';
import Loader from '../Loader';

const Chart = connectChart(ChartView, Loader);

const Charts = ({ charts, ...props }) => (
  <div className="container center">
    {charts.map((chart, index) => (
      <div key={index} className="row">
        <Chart {...chart} {...props} />
      </div>
    ))}
  </div>
);

Charts.propTypes = {
  charts: PropTypes.arrayOf(PropTypes.shape({
    url: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    axiosTitle: PropTypes.string.isRequired
  })).isRequired
};

export default Charts;
