import React from 'react';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

const styles = theme => ({
    root: {
      ...theme.mixins.gutters(),
      paddingTop: theme.spacing.unit * 2,
      paddingBottom: theme.spacing.unit * 2,
      minHeight: 125,
      marginBottom: 16,
    },
  });

const EventSummary = props => {

    const { classes, event } = props;

    return (
        <Paper className={classes.root} elevation={1}>
            <Typography variant="h5" component="h3">
            {event.title}
            </Typography>
            <Typography component="p">
            {event.description}
            </Typography>
            <Typography component="p">
            Location: {event.location}
            </Typography>
        </Paper>
    )
}

EventSummary.propTypes = {
    classes: PropTypes.object.isRequired,
};


export default withStyles(styles)(EventSummary);