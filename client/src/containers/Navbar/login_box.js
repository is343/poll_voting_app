import React from "react";
import PropTypes from "prop-types";

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

  localHandleLoginClose = () => {
    this.setState({
      username: "",
      password: "",
      submitAttempt: false
    });
    this.props.handleLoginClose();
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
    this.localHandleLoginClose();
  };

  render() {
    const { loginOpen } = this.props;
    const { username, password, submitAttempt } = this.state;

    return (
      <Dialog
        open={loginOpen}
        onClose={this.localHandleLoginClose}
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
            onChange={this.handleLoginFieldsChange}
            error={password === "" && submitAttempt === true}
            helperText={
              submitAttempt === true
                ? password === ""
                  ? "Password required!"
                  : ""
                : ""
            }
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={this.localHandleLoginClose} color="secondary">
            Cancel
          </Button>
          <Button onClick={this.handleSubmit} color="primary">
            Login
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

LoginBox.propTypes = {
  loginOpen: PropTypes.bool.isRequired,
  loginOpen: PropTypes.func.isRequired,
  handleLoginClose: PropTypes.func.isRequired
};

export default LoginBox;
