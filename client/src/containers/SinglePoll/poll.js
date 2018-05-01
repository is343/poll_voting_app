import React, { Component } from "react";
import PropTypes from "prop-types";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

import { getOnePoll } from "../../store/actions/polls";
import PieChart from "../../components/PieChart/chart";

import "./poll.css";

import { withStyles } from "material-ui/styles";
import { CircularProgress } from "material-ui/Progress";

const styles = theme => ({
  progress: {
    // margin: theme.spacing.unit * 2
  }
});

class Poll extends Component {
  componentDidMount() {
    this.props.getOnePoll(this.props.match.params.poll);
  }

  render() {
    const { classes } = this.props;
    const pollId = this.props.match.params.poll;

    let pieData;
    let noVotesTest = true;
    let title;

    if (this.props.activePoll) {
      // if we navigate to a poll that exists
      const { choices, votes } = this.props.activePoll;
      title = this.props.activePoll.title;
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
        // check for votes and create a truthy value to prevent a vote-less pie chart from being created below
        noVotesTest = votes.filter(val => {
          return val !== 0;
        }).length;
      }
    }

    return (
      <div className="pie">
        {this.props.activePoll ? (
          <div>
            {pieData && noVotesTest ? (
              <PieChart pieData={pieData} title={title} />
            ) : (
              <div className="center">
                {!noVotesTest ? (
                  <h2>Nobody's voted on this poll yet</h2>
                ) : (
                  <CircularProgress className={classes.progress} />
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

// CreatePoll.propTypes = {
//   classes: PropTypes.object.isRequired,
//   createPoll: PropTypes.func.isRequired
// };

function mapStateToProps(state) {
  return {
    polls: state.polls.polls,
    activePoll: state.polls.activePoll
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ getOnePoll }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(
  withStyles(styles)(Poll)
);
