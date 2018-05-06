import React, { Component } from "react";
import PropTypes from "prop-types";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

import { getPolls, getOnePoll } from "../../store/actions/polls";
import { navigateTo } from "../../store/actions/general";

/////////////////
// MATERIAL-UI //
/////////////////
import { withStyles } from "material-ui/styles";
import GridList, { GridListTile, GridListTileBar } from "material-ui/GridList";
import Subheader from "material-ui/List/ListSubheader";
import IconButton from "material-ui/IconButton";
import InfoIcon from "@material-ui/icons/Info";
import { CircularProgress } from "material-ui/Progress";
import Button from "material-ui/Button";
import Dialog, {
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle
} from "material-ui/Dialog";

import ChartWrapper from "../../components/PieChart/chart_wrapper";
import VotingCard from "../../containers/Card/voting_card";

import "./all_polls.css";

const styles = theme => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
    overflow: "hidden",
    backgroundColor: theme.palette.background.paper
  },
  gridList: {
    width: 500,
    height: 450
  },
  icon: {
    color: "rgba(255, 255, 255, 0.54)"
  }
});
class AllPolls extends Component {
  state = {
    infoOpen: false
  };

  handleInfoOpen = event => {
    this.setState({ infoOpen: true });
  };

  handleInfoClose = event => {
    this.props.getPolls();
    this.setState({ infoOpen: false });
  };

  componentDidMount() {
    this.props.getPolls();
  }

  render() {
    const { classes, polls } = this.props;

    const pollsToTiles = polls.map(poll => {
      return (
        <GridListTile key={poll._id}>
          <span onClick={() => this.props.navigateTo(`/poll/${poll._id}`)}>
            <ChartWrapper
              pollData={poll}
              pollId={poll._id}
              isMini={true}
              withTitle={false}
            />
          </span>
          <GridListTileBar
            title={poll.title}
            subtitle={
              <span
                className="link"
                onClick={() => this.props.navigateTo(`/user/${poll.username}`)}
              >
                by: {poll.username}
              </span>
            }
            actionIcon={
              <IconButton
                className={classes.icon}
                onClick={() => {
                  this.props.getOnePoll(poll._id);
                  this.handleInfoOpen();
                }}
              >
                <InfoIcon />
              </IconButton>
            }
          />
          {this.state.infoClicked ? <VotingCard poll={poll} /> : null}
          <Dialog
            open={this.state.infoOpen}
            onClose={this.handleInfoClose}
            aria-labelledby="form-dialog-title"
          >
            <DialogActions>
              <Button onClick={this.handleInfoClose} color="secondary">
                Close
              </Button>
            </DialogActions>
            <VotingCard />
          </Dialog>
        </GridListTile>
      );
    });

    return (
      <div className={classes.root}>
        {polls.length > 0 ? (
          <GridList cellHeight={180} className={classes.gridList}>
            <GridListTile key="Subheader" cols={2} style={{ height: "auto" }}>
              <Subheader component="div">All Polls</Subheader>
            </GridListTile>
            {pollsToTiles}
          </GridList>
        ) : (
          <div className="center">
            <CircularProgress />
          </div>
        )}
      </div>
    );
  }
}

AllPolls.propTypes = {
  classes: PropTypes.object.isRequired,
  polls: PropTypes.array.isRequired,
  getPolls: PropTypes.func.isRequired,
  getOnePoll: PropTypes.func.isRequired,
  navigateTo: PropTypes.func.isRequired
};

function mapStateToProps(state) {
  return {
    polls: state.polls.polls
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ getPolls, getOnePoll, navigateTo }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(
  withStyles(styles)(AllPolls)
);
