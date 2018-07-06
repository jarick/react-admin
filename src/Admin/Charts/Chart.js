import React from 'react'
import PropTypes from 'prop-types';
import { Chart as ChartView } from 'react-google-charts';

const Chart = ({ data, title, axiosTitle }) => {
  return (
    <div className="container">
      <div className="row">
        <h4>{title}</h4>
      </div>
      <div className="row">
        <ChartView
          chartType="LineChart"
          data={[ [ 'Дата', axiosTitle ], ...data ]}
          options={{
            legend: { position: 'bottom' },
            chartArea: {'width': '90%'},
          }}
          width="100%"
          height="400px"
          legend_toggle
        />
      </div>
    </div>
  );
};

Chart.propTypes = {
  data: PropTypes.array.isRequired,
  title: PropTypes.string.isRequired,
  axiosTitle: PropTypes.string.isRequired
};

export default Chart;
