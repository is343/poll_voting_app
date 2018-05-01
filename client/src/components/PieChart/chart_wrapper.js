import React, { Component } from "react";
import PropTypes from "prop-types";

import PieChart from "./chart";

import "./chart.css";

import { CircularProgress } from "material-ui/Progress";

// {
//     "choices": [
//         "one",
//         "two",
//         "three"
//     ],
//     "votes": [
//         1,
//         3,
//         1
//     ],
//     "_id": "SyXrvJB3G",
//     "title": "test",
//     "totalVotes": 3,
//     "userId": "5ad766170c3801179bdb1990",
//     "username": "test",
//     "createdAt": "2018-04-18T15:41:46.814Z",
//     "updatedAt": "2018-04-30T15:27:33.019Z",
//     "__v": 1
// }

class ChartWrapper extends Component {
  render() {
    const { classes, isMini, withTitle } = this.props;
    const pollId = this.props.pollId;

    let pieData;
    let noVotesTest = true;
    let title;

    if (this.props.pollInfo) {
      // if we navigate to a poll that exists
      const { choices, votes, totalVotes } = this.props.pollInfo;
      title = this.props.pollInfo.title;

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
      <div className="pie-container">
        {this.props.pollInfo ? (
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

// ChartWrapper.propTypes = {
//   classes: PropTypes.object.isRequired,
//   createPoll: PropTypes.func.isRequired
// };

export default ChartWrapper;
