// Libraries
import React from 'react';
import {compose} from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

// Material UI
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';

const styles = theme => ({
    main: {
        minHeight: '40%',
        maxHeight: '50%',
        marginBottom: 16,
    },
});

const EventNotifications = props => {
    const { classes } = props;

    return (
        <Paper className={classes.main}>Notifications</Paper>
    )
}

EventNotifications.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default compose(
    withStyles(styles)
)(EventNotifications);