import React from "react";
import PropTypes from "prop-types";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

import { alertClose } from "../../store/actions/auth";

/////////////////
// MATERIAL-UI //
/////////////////
import Button from "material-ui/Button";
import Dialog, {
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle
} from "material-ui/Dialog";

class AlertBox extends React.Component {
  render() {
    return (
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
    );
  }
}

AlertBox.propTypes = {
  alert: PropTypes.bool.isRequired,
  errorMessage: PropTypes.string,
  alertClose: PropTypes.func.isRequired
};

function mapStateToProps(state) {
  return {
    alert: state.auth.alert,
    errorMessage: state.auth.errorMessage
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ alertClose }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(AlertBox);
