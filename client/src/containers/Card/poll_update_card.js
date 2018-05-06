import React from "react";
import PropTypes from "prop-types";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

import _ from "lodash";

import {
  getPolls,
  getOnePoll,
  voteOnPoll,
  deletePoll,
  updatePoll
} from "../../store/actions/polls";
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
import TextField from "material-ui/TextField";
import IconButton from "material-ui/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import AddIcon from "@material-ui/icons/Add";

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

class PollUpdateCard extends React.Component {
  state = {
    title: "",
    choices: ["", ""],
    submitAttempt: false,
    updatePressed: false,
    deletePressed: false
  };

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  handleChangeChoice = event => {
    // allows modification of correct choice
    // gets the index from the name of input and applies
    // change to correct choice index in state
    const targetIndex = Number(event.target.name.split("-")[1]);
    const choices = this.state.choices.map(
      (choice, index) =>
        // only alter the correct box
        // return target value if index === target, else return ing
        index === targetIndex ? event.target.value : choice
    );
    this.setState({ choices });
  };

  handleNewChoice = () => {
    // allows adding of more choices
    const { choices } = this.state;
    // reset state and add extra choice space
    this.setState({ choices: [...choices, ""] });
  };

  handleDeleteChoice = event => {
    // removes choice when delete button is clicked
    const targetIndex = Number(event.currentTarget.name.split("-")[1]);
    let { choices } = this.state;
    choices.splice(targetIndex, 1);
    this.setState({ choices });
  };

  handleSubmit = event => {
    event.preventDefault();
    const blankTitle = this.state.title === "";
    const blankChoices = this.state.choices.some(val => {
      return val === "";
    });
    if (blankTitle || blankChoices) {
      return this.setState({ submitAttempt: true });
    }
    this.props.createPoll({ ...this.state });
    this.setState({
      title: "",
      choices: ["", ""],
      submitAttempt: false,
      deletePressed: false
    });
  };

  handleDeleteButton = () => {
    this.setState({ deletePressed: true });
  };

  handleDeleteNo = () => {
    this.setState({ deletePressed: false });
  };

  handleDeleteSubmit = pollId => {
    this.props.deletePoll(pollId);
    this.setState({
      title: "",
      choices: ["", ""],
      submitAttempt: false,
      deletePressed: false
    });
  };

  render() {
    const { classes, activePoll } = this.props;

    const {
      title,
      choices,
      submitAttempt,
      deletePressed,
      updatePressed
    } = this.state;

    const emptyTest = !_.isEmpty(activePoll);

    let choiceInputs = null;

    if (!_.isEmpty(activePoll)) {
      choiceInputs = this.state.choices.map((choice, index) => (
        <div key={`choice-${index}`}>
          <TextField
            required={index < 2 ? true : false}
            margin="dense"
            id="choices"
            name={`choice-${index}`}
            label={`Poll Choice ${index + 1}`}
            multiline
            rowsMax="4"
            value={choice}
            onChange={this.handleChangeChoice}
            className={classes.textField}
            margin="normal"
            error={choices[index] === "" && submitAttempt === true}
            helperText={
              submitAttempt === true
                ? index < 2
                  ? choices[index] === ""
                    ? "At least two choices required. Choices must not be blank!"
                    : ""
                  : choices[index] === ""
                    ? "Choices may not be blank!"
                    : ""
                : ""
            }
          />
          {choices.length > 2 ? (
            <IconButton
              name={`choice-${index}`}
              onClick={this.handleDeleteChoice}
              className={classes.button}
              aria-label="Delete"
            >
              <DeleteIcon color="error" style={{ fontSize: 18 }} />
            </IconButton>
          ) : null}
        </div>
      ));
    }

    return (
      <div>
        <Card className={classes.card}>
          <CardContent>
            {!deletePressed ? (
              <div>
                <div className={classes.container}>
                  <TextField
                    autoFocus
                    required
                    margin="dense"
                    id="title"
                    name="title"
                    label="Poll Title"
                    multiline
                    rowsMax="4"
                    value={this.state.title}
                    onChange={this.handleChange}
                    className={classes.textField}
                    margin="normal"
                    error={title === "" && submitAttempt === true}
                    helperText={
                      submitAttempt === true
                        ? title === ""
                          ? "Title required!"
                          : ""
                        : ""
                    }
                  />
                  {choiceInputs}
                </div>
                <Button
                  type="submit"
                  variant="raised"
                  size="medium"
                  color="primary"
                  className={classes.button}
                  onClick={this.handleSubmit}
                >
                  Update Poll
                </Button>
                <Button
                  variant="fab"
                  mini
                  color="secondary"
                  aria-label="add"
                  onClick={this.handleNewChoice}
                  className={classes.button}
                >
                  <AddIcon />
                </Button>
              </div>
            ) : null}
          </CardContent>
          <CardActions>
            {!deletePressed ? (
              <Button
                type="submit"
                variant="raised"
                size="medium"
                color="default"
                className={classes.button}
                onClick={this.handleDeleteButton}
              >
                Delete Poll
              </Button>
            ) : (
              <div>
                <h5>Are you sure you want to delete this poll?</h5>
                <Button
                  type="submit"
                  size="medium"
                  color="secondary"
                  className={classes.button}
                  onClick={this.handleDeleteNo}
                >
                  No
                </Button>
                <Button
                  type="submit"
                  variant="raised"
                  size="medium"
                  color="secondary"
                  className={classes.button}
                  onClick={() => {
                    this.handleDeleteSubmit(activePoll._id);
                  }}
                >
                  Yes
                </Button>
              </div>
            )}
          </CardActions>
        </Card>
      </div>
    );
  }
}

// PollUpdateCard.propTypes = {
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
    { getPolls, getOnePoll, voteOnPoll, voteBoxClose, deletePoll, updatePoll },
    dispatch
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(
  withStyles(styles)(PollUpdateCard)
);
