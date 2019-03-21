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
        minHeight: 125,
        marginBottom: 16,
    },
});

const MyProfile = props => {
    const { classes } = props;

    return (
        <Paper className={classes.main}>My Profile</Paper>
    )
}

MyProfile.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default compose(
    withStyles(styles)
)(MyProfile);