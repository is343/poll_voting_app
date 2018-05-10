import React, { Component } from "react";
import PropTypes from "prop-types";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

import { getOnePoll, voteOnPoll } from "../../store/actions/polls";
import ChartWrapper from "../../components/PieChart/chart_wrapper";
import VotingCard from "../../containers/Card/voting_card";

import "./poll.css";

class Poll extends Component {
  componentDidMount() {
    this.props.getOnePoll(this.props.match.params.poll);
  }

  render() {
    const pollId = this.props.match.params.poll;

    return (
      <div>
        <ChartWrapper
          pollData={this.props.activePoll}
          pollId={pollId}
          isMini={false}
          withTitle={true}
        />
        <VotingCard />
      </div>
    );
  }
}

Poll.propTypes = {
  activePoll: PropTypes.object.isRequired,
  getOnePoll: PropTypes.func.isRequired,
  voteOnPoll: PropTypes.func.isRequired
};

function mapStateToProps(state) {
  return {
    activePoll: state.polls.activePoll
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ getOnePoll, voteOnPoll }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Poll);
