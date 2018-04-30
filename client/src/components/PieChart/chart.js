import React, { Component } from "react";
import PropTypes from "prop-types";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

import "./chart.css";

import Highcharts from "highcharts";
import {
  HighchartsChart,
  withHighcharts,
  Title,
  PieSeries
} from "react-jsx-highcharts";

class Poll extends Component {
  render() {
    const { title, pieData } = this.props;

    return (
      <div className="pie">
        <HighchartsChart>
          <Title>{title}</Title>
          <PieSeries
            id="total-consumption"
            name="Total consumption"
            data={pieData}
            center={[170, 150]}
            size={150}
            showInLegend={false}
          />
        </HighchartsChart>
      </div>
    );
  }
}

// CreatePoll.propTypes = {
//   classes: PropTypes.object.isRequired,
//   createPoll: PropTypes.func.isRequired
// };

export default withHighcharts(Poll, Highcharts);
