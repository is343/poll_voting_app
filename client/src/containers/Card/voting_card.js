import React from "react";
import PropTypes from "prop-types";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

import _ from "lodash";

import { getOnePoll, voteOnPoll } from "../../store/actions/polls";

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

// {
//     "choices": [
//         "this",
//         "that"
//     ],
//     "votes": [
//         1,
//         1
//     ],
//     "_id": "ry8bb4PTf",
//     "title": "best?",
//     "totalVotes": 2,
//     "userId": "5ae9b0141c856284af068ffe",
//     "username": "test",
//     "createdAt": "2018-05-02T12:37:17.748Z",
//     "updatedAt": "2018-05-02T12:39:28.159Z",
//     "__v": 0
// }

class VotingCard extends React.Component {
  state = { choiceIndex: "" };

  handleChange = event => {
    this.setState({ choiceIndex: event.target.value });
  };

  handleVoteClick = event => {
    this.props.voteOnPoll(this.state, this.props.activePoll._id);
    // this.props.getOnePoll(this.props.activePoll._id);
    this.setState({ choiceIndex: "" });
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
              <FormControl
                component="fieldset"
                required
                className={classes.formControl}
              >
                <FormLabel component="legend">Choices</FormLabel>
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
  return bindActionCreators({ getOnePoll, voteOnPoll }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(
  withStyles(styles)(VotingCard)
);