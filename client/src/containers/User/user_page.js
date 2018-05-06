import React, { Component } from "react";
import PropTypes from "prop-types";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

import { getPolls, getOnePoll } from "../../store/actions/polls";
import { getUserInfo } from "../../store/actions/users";
import { navigateTo } from "../../store/actions/general";
import {
  voteBoxOpen,
  voteBoxClose,
  editBoxOpen,
  editBoxClose
} from "../../store/actions/auth";

/////////////////
// MATERIAL-UI //
/////////////////
import { withStyles } from "material-ui/styles";
import GridList, { GridListTile, GridListTileBar } from "material-ui/GridList";
import Subheader from "material-ui/List/ListSubheader";
import IconButton from "material-ui/IconButton";
import InfoIcon from "@material-ui/icons/Info";
import EditIcon from "@material-ui/icons/Edit";
import CloseIcon from "@material-ui/icons/Close";
import { CircularProgress } from "material-ui/Progress";
import Dialog, {
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle
} from "material-ui/Dialog";

import ChartWrapper from "../../components/PieChart/chart_wrapper";
import VotingCard from "../../containers/Card/voting_card";
import PollUpdateCard from "../../containers/Card/poll_update_card";

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

class UserPage extends Component {
  state = {
    editIsOpen: false
  };
  handleEditOpen = event => {
    this.props.editBoxOpen();
  };

  handleEditClose = event => {
    this.props.editBoxClose();
  };

  handleVoteOpen = event => {
    this.props.voteBoxOpen();
  };

  handleVoteClose = event => {
    this.props.voteBoxClose();
  };
  componentDidMount() {
    this.props.getUserInfo(this.props.match.params.userId);
    this.props.getPolls();
  }

  render() {
    const {
      classes,
      allPolls,
      userPolls,
      userId,
      voteIsOpen,
      editIsOpen
    } = this.props;

    const username = this.props.match.params.userId;
    const personalPageCheck = userId === localStorage.getItem("loggedInUserId");

    let filteredPolls = allPolls.filter(poll => {
      return userPolls.includes(poll._id);
    });

    const pollsToTiles = filteredPolls.map(poll => {
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
          {personalPageCheck ? (
            <div>
              <GridListTileBar
                title={poll.title}
                subtitle={<span>click the icon to edit or delete =></span>}
                actionIcon={
                  <IconButton
                    className={classes.icon}
                    onClick={() => {
                      this.props.getOnePoll(poll._id);
                      this.handleEditOpen();
                    }}
                  >
                    <EditIcon />
                  </IconButton>
                }
              />
              <Dialog
                open={editIsOpen}
                onClose={this.handleEditClose}
                aria-labelledby="form-dialog-title"
              >
                <DialogActions>
                  <IconButton onClick={this.handleEditClose} color="secondary">
                    <CloseIcon />
                  </IconButton>
                </DialogActions>
                <PollUpdateCard />
              </Dialog>
            </div>
          ) : (
            <div>
              <GridListTileBar
                title={poll.title}
                subtitle={
                  <span
                    className="link"
                    onClick={() =>
                      this.props.navigateTo(`/user/${poll.username}`)
                    }
                  >
                    by: {poll.username}
                  </span>
                }
                actionIcon={
                  <IconButton
                    className={classes.icon}
                    onClick={() => {
                      this.props.getOnePoll(poll._id);
                      this.handleVoteOpen();
                    }}
                  >
                    <InfoIcon />
                  </IconButton>
                }
              />
              <Dialog
                open={voteIsOpen}
                onClose={this.handleVoteClose}
                aria-labelledby="form-dialog-title"
              >
                <DialogActions>
                  <IconButton onClick={this.handleVoteClose} color="secondary">
                    <CloseIcon />
                  </IconButton>
                </DialogActions>
                <VotingCard />
              </Dialog>
            </div>
          )}
        </GridListTile>
      );
    });

    return (
      <div className={classes.root}>
        {userPolls.length > 0 ? (
          <GridList cellHeight={180} className={classes.gridList}>
            <GridListTile key="Subheader" cols={2} style={{ height: "auto" }}>
              <Subheader component="div">
                {personalPageCheck ? "Your" : `${username}'s`} polls
              </Subheader>
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

UserPage.propTypes = {
  classes: PropTypes.object.isRequired,
  allPolls: PropTypes.array.isRequired,
  userPolls: PropTypes.array.isRequired,
  voteIsOpen: PropTypes.bool.isRequired,
  editIsOpen: PropTypes.bool.isRequired,
  userId: PropTypes.string.isRequired,
  getUserInfo: PropTypes.func.isRequired,
  getPolls: PropTypes.func.isRequired,
  getOnePoll: PropTypes.func.isRequired,
  voteBoxOpen: PropTypes.func.isRequired,
  voteBoxClose: PropTypes.func.isRequired,
  editBoxOpen: PropTypes.func.isRequired,
  editBoxClose: PropTypes.func.isRequired,
  navigateTo: PropTypes.func.isRequired
};

function mapStateToProps(state) {
  return {
    allPolls: state.polls.polls,
    userPolls: state.users.polls,
    userId: state.users.userId,
    voteIsOpen: state.auth.voteIsOpen,
    editIsOpen: state.auth.editIsOpen
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      getUserInfo,
      getPolls,
      getOnePoll,
      navigateTo,
      voteBoxOpen,
      voteBoxClose,
      editBoxOpen,
      editBoxClose
    },
    dispatch
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(
  withStyles(styles)(UserPage)
);
