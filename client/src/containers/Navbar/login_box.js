import React from "react";
import PropTypes from "prop-types";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

import { login, loginBoxClose, signupBoxOpen } from "../../store/actions/auth";

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

class LoginBox extends React.Component {
  state = {
    username: "",
    password: "",
    submitAttempt: false
  };

  handleLoginClose = () => {
    this.setState({
      username: "",
      password: "",
      submitAttempt: false
    });
    this.props.loginBoxClose();
  };

  handleSignupOpen = () => {
    this.props.signupBoxOpen();
    this.handleLoginClose();
  };

  handleLoginFieldsChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  handleSubmit = event => {
    const { username, password } = this.state;
    const blankUsername = username === "";
    const blankPassword = password === "";
    if (blankUsername || blankPassword) {
      return this.setState({ submitAttempt: true });
    }
    this.props.login(username, password);
    this.handleLoginClose();
  };

  render() {
    const { loginIsOpen } = this.props;
    const { username, password, submitAttempt } = this.state;

    return (
      <Dialog
        open={loginIsOpen}
        onClose={this.handleLoginClose}
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
            onChange={this.handleLoginFieldsChange}
            error={username === "" && submitAttempt}
            helperText={
              submitAttempt ? (username === "" ? "Username required!" : "") : ""
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
            onChange={this.handleLoginFieldsChange}
            error={password === "" && submitAttempt}
            helperText={
              submitAttempt ? (password === "" ? "Password required!" : "") : ""
            }
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={this.handleLoginClose} color="secondary">
            Cancel
          </Button>
          <Button
            variant="raised"
            onClick={this.handleSignupOpen}
            color="secondary"
          >
            Signup
          </Button>
          <Button variant="raised" onClick={this.handleSubmit} color="primary">
            Login
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

LoginBox.propTypes = {
  loginIsOpen: PropTypes.bool.isRequired,
  login: PropTypes.func.isRequired,
  loginBoxClose: PropTypes.func.isRequired,
  signupBoxOpen: PropTypes.func.isRequired
};

function mapStateToProps(state) {
  return { loginIsOpen: state.auth.loginIsOpen };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ login, loginBoxClose, signupBoxOpen }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginBox);
