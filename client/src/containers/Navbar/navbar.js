import React from "react";
import PropTypes from "prop-types";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

import { login, logout } from "../../store/actions/auth";
import { navigateTo } from "../../store/actions/general";

import AlertBox from "./alert_box";
import LoginBox from "./login_box";

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
  },
  menuItem: {
    width: "100%"
  }
};

class Navbar extends React.Component {
  state = {
    loginOpen: false,
    anchorEl: null
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
                    className={classes.menuItem}
                    onClick={() => {
                      this.handleClose();
                      this.props.navigateTo("/poll");
                    }}
                  >
                    Create Poll
                  </MenuItem>
                  <MenuItem
                    className={classes.menuItem}
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
              <Button color="inherit" onClick={this.handleLoginClickOpen}>
                Login
              </Button>
            )}
          </Toolbar>
        </AppBar>
        <LoginBox
          loginOpen={this.state.loginOpen}
          handleLoginClose={this.state.handleLoginClose}
        />
        <AlertBox />
      </div>
    );
  }
}

Navbar.propTypes = {
  classes: PropTypes.object.isRequired,
  auth: PropTypes.bool.isRequired,
  login: PropTypes.func.isRequired,
  logout: PropTypes.func.isRequired,
  navigateTo: PropTypes.func.isRequired
};

function mapStateToProps(state) {
  return {
    auth: state.auth.auth
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ login, logout, navigateTo }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(
  withStyles(styles)(Navbar)
);
