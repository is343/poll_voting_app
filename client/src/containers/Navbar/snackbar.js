import React from "react";
import PropTypes from "prop-types";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

import { snackbarClose } from "../../store/actions/auth";

import { withStyles } from "material-ui/styles";
import Button from "material-ui/Button";
import Snackbar from "material-ui/Snackbar";
import IconButton from "material-ui/IconButton";
import CloseIcon from "@material-ui/icons/Close";

const styles = theme => ({
  close: {
    width: theme.spacing.unit * 4,
    height: theme.spacing.unit * 4
  }
});

class MessageSnackbar extends React.Component {
  handleClose = event => {
    this.props.snackbarClose();
  };

  render() {
    const { classes, snackbarIsOpen, snackbarMessage } = this.props;
    return (
      <div>
        <Snackbar
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
          open={snackbarIsOpen}
          autoHideDuration={3000}
          onClose={this.handleClose}
          SnackbarContentProps={{ "aria-describedby": "message-id" }}
          message={<span id="message-id">{snackbarMessage}</span>}
        />
      </div>
    );
  }
}

MessageSnackbar.propTypes = {
  classes: PropTypes.object.isRequired,
  snackbarIsOpen: PropTypes.bool.isRequired,
  snackbarMessage: PropTypes.string.isRequired
  // login: PropTypes.func.isRequired,
  // snackbarClose: PropTypes.func.isRequired,
  // signupBoxOpen: PropTypes.func.isRequired
};

function mapStateToProps(state) {
  return {
    snackbarIsOpen: state.auth.snackbarIsOpen,
    snackbarMessage: state.auth.snackbarMessage
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ snackbarClose }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(
  withStyles(styles)(MessageSnackbar)
);
