import React from "react";
import PropTypes from "prop-types";

import _ from "lodash";

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

// {
//     "choices": [
//         "this",
//         "that"
//     ],
//     "votes": [
//         1,
//         1
//     ],
//     "_id": "ry8bb4PTf",
//     "title": "best?",
//     "totalVotes": 2,
//     "userId": "5ae9b0141c856284af068ffe",
//     "username": "test",
//     "createdAt": "2018-05-02T12:37:17.748Z",
//     "updatedAt": "2018-05-02T12:39:28.159Z",
//     "__v": 0
// }

class VotingCard extends React.Component {
  state = { value: "0" };

  handleChange = event => {
    this.setState({ value: event.target.value });
  };
  render() {
    const { classes, poll } = this.props;

    let choices = null;
    if (!_.isEmpty(this.props.poll)) {
      choices = poll.choices.map((choice, index) => {
        return (
          <FormControlLabel
            key={index}
            value={index.toString()}
            control={<Radio />}
            label={choice}
          />
        );
      });
    }

    return (
      <div>
        <Card className={classes.card}>
          <CardContent>
            <div className={classes.root}>
              <FormControl
                component="fieldset"
                required
                className={classes.formControl}
              >
                <FormLabel component="legend">Choices</FormLabel>
                <RadioGroup
                  aria-label="choices"
                  name="choices"
                  className={classes.group}
                  value={this.state.value}
                  onChange={this.handleChange}
                >
                  {choices}
                </RadioGroup>
              </FormControl>
            </div>
          </CardContent>
          <CardActions>
            <Button size="small">Learn More</Button>
          </CardActions>
        </Card>
      </div>
    );
  }
}

VotingCard.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(VotingCard);
