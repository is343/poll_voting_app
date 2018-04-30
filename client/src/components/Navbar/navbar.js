import React from "react";
import PropTypes from "prop-types";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

import { login, logout, alertClose } from "../../store/actions/auth";
import { navigateTo } from "../../store/actions/general";

/////////////////
// MATERIAL-UI //
/////////////////
import { withStyles } from "material-ui/styles";
import AppBar from "material-ui/AppBar";
import Toolbar from "material-ui/Toolbar";
import Typography from "material-ui/Typography";
import Button from "material-ui/Button";
import IconButton from "material-ui/IconButton";
import HomeIcon from "@material-ui/icons/Home";
import AccountCircle from "@material-ui/icons/AccountCircle";
import Switch from "material-ui/Switch";
import { FormControlLabel, FormGroup } from "material-ui/Form";
import Menu, { MenuItem } from "material-ui/Menu";
import TextField from "material-ui/TextField";
// DIALOG
import Dialog, {
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle
} from "material-ui/Dialog";

const styles = {
  root: {
    flexGrow: 1
  },
  flex: {
    flex: 1
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20
  }
};

class Navbar extends React.Component {
  state = {
    loginOpen: false,
    anchorEl: null,
    username: "",
    password: ""
  };

  handleMenu = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  handleLoginClickOpen = () => {
    this.setState({ loginOpen: true });
  };

  handleLoginClose = () => {
    this.setState({ loginOpen: false });
  };

  handleLoginFieldsChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  clearLoginFields = () => {
    this.setState({ username: "", password: "" });
  };

  render() {
    const { classes, auth } = this.props;
    const { anchorEl } = this.state;
    const open = Boolean(anchorEl);

    return (
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar>
            <IconButton
              className={classes.menuButton}
              color="inherit"
              aria-label="Menu"
              onClick={() => this.props.navigateTo("/")}
            >
              <HomeIcon />
            </IconButton>
            <Typography
              variant="title"
              color="inherit"
              className={classes.flex}
            >
              Title
            </Typography>
            {auth ? (
              <div>
                <IconButton
                  aria-owns={open ? "menu-appbar" : null}
                  aria-haspopup="true"
                  onClick={this.handleMenu}
                  color="inherit"
                >
                  <AccountCircle />
                </IconButton>
                <Menu
                  id="menu-appbar"
                  anchorEl={anchorEl}
                  anchorOrigin={{ vertical: "top", horizontal: "right" }}
                  transformOrigin={{ vertical: "top", horizontal: "right" }}
                  open={open}
                  onClose={this.handleClose}
                >
                  <MenuItem
                    onClick={() => {
                      this.handleClose();
                      this.props.navigateTo("/poll");
                    }}
                  >
                    Create Poll
                  </MenuItem>
                  <MenuItem
                    onClick={() => {
                      this.handleClose();
                      this.props.logout();
                      this.props.navigateTo("/");
                    }}
                  >
                    Logout
                  </MenuItem>
                </Menu>
              </div>
            ) : (
              <div>
                <Button color="inherit" onClick={this.handleLoginClickOpen}>
                  Login
                </Button>
                <Dialog
                  open={this.state.loginOpen}
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
                    />
                  </DialogContent>
                  <DialogActions>
                    <Button
                      onClick={() => {
                        this.handleLoginClose();
                        this.clearLoginFields();
                      }}
                      color="secondary"
                    >
                      Cancel
                    </Button>
                    <Button
                      onClick={() => {
                        this.handleLoginClose();
                        this.props.login(
                          this.state.username,
                          this.state.password
                        );
                        this.clearLoginFields();
                      }}
                      color="primary"
                    >
                      Login
                    </Button>
                  </DialogActions>
                </Dialog>
              </div>
            )}
          </Toolbar>
        </AppBar>
        <Dialog
          open={this.props.alert}
          onClose={this.props.alertClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">Error</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              {this.props.errorMessage}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.props.alertClose} color="primary" autoFocus>
              Okay
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

Navbar.propTypes = {
  classes: PropTypes.object.isRequired,
  auth: PropTypes.bool.isRequired,
  alert: PropTypes.bool.isRequired,
  errorMessage: PropTypes.string,
  login: PropTypes.func.isRequired,
  logout: PropTypes.func.isRequired,
  navigateTo: PropTypes.func.isRequired,
  alertClose: PropTypes.func.isRequired
};

function mapStateToProps(state) {
  return {
    auth: state.auth.auth,
    alert: state.auth.alert,
    errorMessage: state.auth.errorMessage
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    { login, logout, navigateTo, alertClose },
    dispatch
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(
  withStyles(styles)(Navbar)
);
