import React from "react";
import PropTypes from "prop-types";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

import _ from "lodash";

import { getPolls, getOnePoll, voteOnPoll } from "../../store/actions/polls";
import { voteBoxClose } from "../../store/actions/auth";

import { withStyles } from "material-ui/styles";
import Card, { CardActions, CardContent } from "material-ui/Card";
import Button from "material-ui/Button";
import Typography from "material-ui/Typography";

import Radio, { RadioGroup } from "material-ui/Radio";
import {
  FormLabel,
  FormControl,
  FormControlLabel,
  FormHelperText
} from "material-ui/Form";

const styles = {
  card: {
    minWidth: 275
  },
  title: {
    marginBottom: 16,
    fontSize: 14
  },
  pos: {
    marginBottom: 12,
    marginTop: 12
  },
  root: {
    display: "flex"
  }
  // formControl: {
  //   margin: theme.spacing.unit * 3
  // },
  // group: {
  //   margin: `${theme.spacing.unit}px 0`
  // }
};

class VotingCard extends React.Component {
  state = { choiceIndex: "" };

  handleChange = event => {
    this.setState({ choiceIndex: event.target.value });
  };

  handleVoteClick = event => {
    if (this.state.choiceIndex === "") {
      return;
    }
    this.props.voteOnPoll(this.state, this.props.activePoll._id);
    this.setState({ choiceIndex: "" });
    // if open from all polls page
    this.props.voteBoxClose();
  };

  render() {
    const { classes, activePoll } = this.props;

    let choices = null;
    if (!_.isEmpty(this.props.activePoll)) {
      choices = activePoll.choices.map((choice, index) => {
        return (
          <FormControlLabel
            key={index}
            value={index.toString()}
            control={<Radio />}
            label={choice}
          />
        );
      });
    }

    return (
      <div>
        <Card className={classes.card}>
          <CardContent>
            <div className={classes.root}>
              <FormControl component="fieldset" className={classes.formControl}>
                <FormLabel component="legend">{activePoll.title}</FormLabel>
                <RadioGroup
                  aria-label="choices"
                  name="choices"
                  className={classes.group}
                  value={this.state.choiceIndex}
                  onChange={this.handleChange}
                >
                  {choices}
                </RadioGroup>
              </FormControl>
            </div>
          </CardContent>
          <CardActions>
            <Button
              variant="raised"
              color="primary"
              size="small"
              onClick={this.handleVoteClick}
            >
              Vote
            </Button>
          </CardActions>
        </Card>
      </div>
    );
  }
}

// VotingCard.propTypes = {
//   classes: PropTypes.object.isRequired,
//   createPoll: PropTypes.func.isRequired
// };

function mapStateToProps(state) {
  return {
    activePoll: state.polls.activePoll
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    { getPolls, getOnePoll, voteOnPoll, voteBoxClose },
    dispatch
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(
  withStyles(styles)(VotingCard)
);
