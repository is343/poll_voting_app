import React, { Component } from "react";
import PropTypes from "prop-types";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

import { getPolls } from "../../store/actions/polls";
import { getUserInfo } from "../../store/actions/users";
import { navigateTo } from "../../store/actions/general";

/////////////////
// MATERIAL-UI //
/////////////////
import { withStyles } from "material-ui/styles";
import GridList, { GridListTile, GridListTileBar } from "material-ui/GridList";
import Subheader from "material-ui/List/ListSubheader";
import IconButton from "material-ui/IconButton";
import EditIcon from "@material-ui/icons/Edit";
import { CircularProgress } from "material-ui/Progress";

import ChartWrapper from "../../components/PieChart/chart_wrapper";

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
  componentDidMount() {
    this.props.getUserInfo(this.props.match.params.userId);
    this.props.getPolls();
  }

  render() {
    const { classes, allPolls, userPolls, userId } = this.props;
    const username = this.props.match.params.userId;

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
          <GridListTileBar
            title={poll.title}
            subtitle={<span>click the icon to edit or delete =></span>}
            actionIcon={
              <IconButton
                className={classes.icon}
                onClick={() => alert("clicked!")}
              >
                <EditIcon />
              </IconButton>
            }
          />
        </GridListTile>
      );
    });

    return (
      <div className={classes.root}>
        {userPolls.length > 0 ? (
          <GridList cellHeight={180} className={classes.gridList}>
            <GridListTile key="Subheader" cols={2} style={{ height: "auto" }}>
              <Subheader component="div">{username}'s Polls</Subheader>
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
  userId: PropTypes.string.isRequired,
  getUserInfo: PropTypes.func.isRequired,
  getPolls: PropTypes.func.isRequired,
  navigateTo: PropTypes.func.isRequired
};

function mapStateToProps(state) {
  return {
    allPolls: state.polls.polls,
    userPolls: state.users.polls,
    userId: state.users.userId
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ getUserInfo, getPolls, navigateTo }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(
  withStyles(styles)(UserPage)
);
