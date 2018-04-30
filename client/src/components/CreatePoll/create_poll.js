import React, { Component } from "react";
import PropTypes from "prop-types";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

import { createPoll } from "../../store/actions/general";

import axios from "axios";
/////////////////
// MATERIAL-UI //
/////////////////
import { withStyles } from "material-ui/styles";
import TextField from "material-ui/TextField";
import Button from "material-ui/Button";
import IconButton from "material-ui/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import AddIcon from "@material-ui/icons/Add";

import { TextValidator, ValidatorForm } from "react-material-ui-form-validator";

const styles = theme => ({
  container: {
    display: "flex",
    flexWrap: "wrap",
    width: "300px"
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200
  },
  button: {
    margin: theme.spacing.unit
  }
});

class CreatePoll extends Component {
  state = {
    title: "",
    choices: ["", ""],
    submitAttempt: false
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

  handleNewChoice = event => {
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
      submitAttempt: false
    });
  };

  render() {
    const { classes } = this.props;
    const { title, choices, submitAttempt } = this.state;

    let choiceInputs = this.state.choices.map((choice, index) => (
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

    return (
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
        <Button
          type="submit"
          variant="raised"
          size="medium"
          color="primary"
          className={classes.button}
          onClick={this.handleSubmit}
        >
          Submit
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
    );
  }
}

// CreatePoll.propTypes = {
//   classes: PropTypes.object.isRequired,
//   auth: PropTypes.bool.isRequired,
//   alert: PropTypes.bool.isRequired,
//   errorMessage: PropTypes.string,
//   login: PropTypes.func.isRequired,
//   logout: PropTypes.func.isRequired,
//   navigateTo: PropTypes.func.isRequired,
//   alertClose: PropTypes.func.isRequired
// };

function mapStateToProps(state) {
  return {
    auth: state.auth.auth,
    alert: state.auth.alert,
    errorMessage: state.auth.errorMessage
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ createPoll }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(
  withStyles(styles)(CreatePoll)
);
