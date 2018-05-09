import React from "react";
import PropTypes from "prop-types";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

import { signup, signupBoxClose } from "../../store/actions/auth";

/////////////////
// MATERIAL-UI //
/////////////////
import Button from "material-ui/Button";
import TextField from "material-ui/TextField";
import Dialog, {
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle
} from "material-ui/Dialog";

class SignupBox extends React.Component {
  state = {
    username: "",
    password: "",
    passwordConfirm: "",
    submitAttempt: false
  };

  handleSignupClose = () => {
    this.setState({
      username: "",
      password: "",
      passwordConfirm: "",
      submitAttempt: false
    });
    this.props.signupBoxClose();
  };

  handleSignupFieldsChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  handleSubmit = event => {
    const { username, password, passwordConfirm } = this.state;
    const blankUsername = username === "";
    const blankPassword = password === "";
    const blankpasswordConfirm = passwordConfirm === "";
    const isNotMatching = password !== passwordConfirm;
    if (
      blankUsername ||
      blankPassword ||
      blankpasswordConfirm ||
      isNotMatching
    ) {
      return this.setState({ submitAttempt: true });
    }
    this.props.signup(username, password);
    this.handleSignupClose();
  };

  checkForEnterPress = event => {
    if (event.keyCode === 13) {
      this.handleSubmit();
    }
  };

  componentDidMount() {
    window.addEventListener("keydown", this.checkForEnterPress);
  }
  componentWillMount() {
    window.removeEventListener("keydown", this.checkForEnterPress);
  }

  render() {
    const { signupIsOpen } = this.props;
    const { username, password, passwordConfirm, submitAttempt } = this.state;

    return (
      <Dialog
        open={signupIsOpen}
        onClose={this.handleSignupClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Login</DialogTitle>
        <DialogContent>
          <DialogContentText>* required</DialogContentText>
          <TextField
            autoFocus
            required
            margin="dense"
            id="name"
            label="username"
            name="username"
            fullWidth
            onChange={this.handleSignupFieldsChange}
            error={username === "" && submitAttempt === true}
            helperText={
              submitAttempt === true
                ? username === ""
                  ? "Username required!"
                  : ""
                : ""
            }
          />
          <TextField
            required
            margin="dense"
            id="password-input"
            label="password"
            name="password"
            type="password"
            fullWidth
            onChange={this.handleSignupFieldsChange}
            error={password === "" && submitAttempt === true}
            helperText={
              submitAttempt === true
                ? password === ""
                  ? "Password required!"
                  : ""
                : ""
            }
          />
          <TextField
            required
            margin="dense"
            id="password-confirmation-input"
            label="password confirmation"
            name="passwordConfirm"
            type="password"
            fullWidth
            onChange={this.handleSignupFieldsChange}
            error={
              (passwordConfirm === "" && submitAttempt === true) ||
              (passwordConfirm !== password && submitAttempt === true)
            }
            helperText={
              submitAttempt === true
                ? passwordConfirm !== password
                  ? "Passwords must match!"
                  : passwordConfirm === ""
                    ? "Password confimation required!"
                    : ""
                : ""
            }
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={this.handleSignupClose} color="secondary">
            Cancel
          </Button>
          <Button variant="raised" onClick={this.handleSubmit} color="primary">
            Signup
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

SignupBox.propTypes = {
  signupIsOpen: PropTypes.bool.isRequired,
  signup: PropTypes.func.isRequired,
  signupBoxClose: PropTypes.func.isRequired
};

function mapStateToProps(state) {
  return { signupIsOpen: state.auth.signupIsOpen };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ signup, signupBoxClose }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(SignupBox);
