import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "material-ui/styles";
import GridList, { GridListTile, GridListTileBar } from "material-ui/GridList";
import Subheader from "material-ui/List/ListSubheader";
import IconButton from "material-ui/IconButton";
import InfoIcon from "@material-ui/icons/Info";

import PieChart from "../../components/PieChart/chart";

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
    y: 0
  },
  {
    name: "John",
    y: 0
  },
  {
    name: "Joe",
    y: 0
  }
];

function AllPolls(props) {
  const { classes } = props;

  return (
    <div className={classes.root}>
      <GridList cellHeight={180} className={classes.gridList}>
        <GridListTile key="Subheader" cols={2} style={{ height: "auto" }}>
          <Subheader component="div">December</Subheader>
        </GridListTile>
        <GridListTile key="1">
          <PieChart pieData={pieData} title={null} isMini={true} />
          <GridListTileBar
            title="test"
            subtitle={<span>by: test</span>}
            actionIcon={
              <IconButton className={classes.icon}>
                <InfoIcon />
              </IconButton>
            }
          />
        </GridListTile>
      </GridList>
    </div>
  );
}

AllPolls.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(AllPolls);
