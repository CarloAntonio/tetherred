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
        marginBottom: 16,
    },
});

const UndecidedFriends = props => {
    const { classes } = props;

    return (
        <Paper className={classes.main}>Undecided</Paper>
    )
}

UndecidedFriends.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default compose(
    withStyles(styles)
)(UndecidedFriends);