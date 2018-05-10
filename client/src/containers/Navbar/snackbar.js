import React from "react";
import PropTypes from "prop-types";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

import { snackbarClose } from "../../store/actions/auth";

import Snackbar from "material-ui/Snackbar";

class MessageSnackbar extends React.Component {
  handleClose = event => {
    this.props.snackbarClose();
  };

  render() {
    const { snackbarIsOpen, snackbarMessage } = this.props;
    return (
      <div>
        <Snackbar
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
          open={snackbarIsOpen}
          autoHideDuration={3000}
          onClose={this.handleClose}
          message={<span id="message-id">{snackbarMessage}</span>}
        />
      </div>
    );
  }
}

MessageSnackbar.propTypes = {
  snackbarIsOpen: PropTypes.bool.isRequired,
  snackbarMessage: PropTypes.string.isRequired,
  snackbarClose: PropTypes.func.isRequired
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

export default connect(mapStateToProps, mapDispatchToProps)(MessageSnackbar);
