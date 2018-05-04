import React, { Component } from "react";
import PropTypes from "prop-types";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

import { getOnePoll } from "../../store/actions/polls";
import ChartWrapper from "../../components/PieChart/chart_wrapper";
import VotingCard from "../../components/Card/voting_card";

import "./poll.css";

class Poll extends Component {
  componentDidMount() {
    this.props.getOnePoll(this.props.match.params.poll);
  }

  render() {
    const { classes } = this.props;
    const pollId = this.props.match.params.poll;

    return (
      <div>
        <ChartWrapper
          pollData={this.props.activePoll}
          pollId={pollId}
          isMini={false}
          withTitle={true}
        />
        <VotingCard poll={this.props.activePoll} />
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
    activePoll: state.polls.activePoll
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ getOnePoll }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Poll);
