import React, { Component } from "react";
import PropTypes from "prop-types";

import PieChart from "./chart";

import "./chart.css";

import { CircularProgress } from "material-ui/Progress";

class ChartWrapper extends Component {
  render() {
    const { isMini, withTitle } = this.props;
    const pollId = this.props.pollId;

    let pieData;
    let noVotesTest = true;
    let title;

    if (this.props.pollData) {
      // if we navigate to a poll that exists
      const { choices, votes, totalVotes } = this.props.pollData;
      title = this.props.pollData.title;

      if (choices) {
        pieData = Array(choices.length).fill({
          name: undefined,
          y: undefined
        });
        pieData = pieData.map((datum, index) => {
          return {
            name: `${choices[index]} - ${votes[index]}`,
            y: votes[index]
          };
        });
        // to check for votes and create a bool value to prevent a vote-less pie chart from being created below
        noVotesTest = totalVotes !== 0;
      }
    }

    return (
      <div>
        {this.props.pollData ? (
          <div>
            {pieData && noVotesTest ? (
              <PieChart
                pieData={pieData}
                title={title}
                pollId={pollId}
                isMini={isMini}
                withTitle={withTitle}
              />
            ) : (
              <div className="center">
                {!noVotesTest ? (
                  <h2>Nobody's voted on this poll yet</h2>
                ) : (
                  <CircularProgress />
                )}
              </div>
            )}
          </div>
        ) : (
          <h1>
            Poll <b>{pollId}</b> doesn't exist
          </h1>
        )}
      </div>
    );
  }
}

ChartWrapper.propTypes = {
  pollData: PropTypes.object.isRequired
};

export default ChartWrapper;
