import React from "react";
import PropTypes from "prop-types";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

import _ from "lodash";

import { getPolls, getOnePoll, deletePoll } from "../../store/actions/polls";
import { voteBoxClose, editBoxClose } from "../../store/actions/auth";

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
    deletePressed: false
  };

  handleDeleteButton = () => {
    this.setState({ deletePressed: true });
  };

  handleDeleteNo = () => {
    this.props.editBoxClose();
    this.setState({ deletePressed: false });
  };

  handleDeleteSubmit = pollId => {
    this.props.deletePoll(pollId);
    this.setState({
      deletePressed: false
    });
  };

  render() {
    const { classes, activePoll } = this.props;

    const { deletePressed } = this.state;

    return (
      <div>
        <Card className={classes.card}>
          <CardContent>{!deletePressed ? <div /> : null}</CardContent>
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
    { getPolls, getOnePoll, editBoxClose, deletePoll },
    dispatch
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(
  withStyles(styles)(PollUpdateCard)
);
