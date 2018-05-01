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

// .pie {
//   width: 200px;
//   height: 200px;
//   margin: none;
//   padding: none;
// }

class Poll extends Component {
  render() {
    let divStyle = { height: 400, width: 400 };
    let pieCenter = [170, 100];
    let pieSize = [150];
    // to allow for resizing for the main page
    if (this.props.isMini) {
      divStyle = { height: 200, width: 200 };
      pieCenter = [85, 55];
      pieSize = [50];
    }

    const { title, pieData, pollId, withTitle } = this.props;

    return (
      <div className="pie" style={divStyle}>
        <HighchartsChart>
          {withTitle ? <Title>{title}</Title> : null}
          <PieSeries
            id={pollId}
            name={pollId}
            data={pieData}
            center={pieCenter}
            size={pieSize}
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
