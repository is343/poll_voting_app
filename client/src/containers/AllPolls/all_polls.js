import React, { Component } from "react";
import PropTypes from "prop-types";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

import { getPolls } from "../../store/actions/polls";
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

import ChartWrapper from "../../components/PieChart/chart_wrapper";

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

/**
 * The example data is structured as follows:
 *
 * import image from 'path/to/image.jpg';
 * [etc...]
 *
 * const tileData = [
 *   {
 *     img: image,
 *     title: 'Image',
 *     author: 'author',
 *   },
 *   {
 *     [etc...]
 *   },
 * ];
 */
const pieData = [
  {
    name: "Jane",
    y: 21
  },
  {
    name: "John",
    y: 43
  },
  {
    name: "Joe",
    y: 12
  }
];

class AllPolls extends Component {
  componentDidMount() {
    this.props.getPolls();
  }

  render() {
    const { classes, polls } = this.props;

    const pollsToTiles = polls.map(poll => {
      return (
        <GridListTile
          key={poll._id}
          onClick={() => this.props.navigateTo(`/poll/${poll._id}`)}
        >
          <ChartWrapper
            pollInfo={poll}
            pollId={poll._id}
            isMini={true}
            withTitle={false}
          />
          <GridListTileBar
            title={poll.title}
            subtitle={<span>by: {poll.username}</span>}
            actionIcon={
              <IconButton className={classes.icon}>
                <InfoIcon />
              </IconButton>
            }
          />
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
  getPolls: PropTypes.func.isRequired
};

function mapStateToProps(state) {
  return {
    polls: state.polls.polls
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ getPolls, navigateTo }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(
  withStyles(styles)(AllPolls)
);
