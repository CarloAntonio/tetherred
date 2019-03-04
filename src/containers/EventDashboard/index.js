import React, { Component } from 'react';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import {compose } from 'redux'
import { Redirect } from 'react-router-dom';
import moment from 'moment';
import PropTypes from 'prop-types';

// Material UI
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

const styles = theme => ({
    root: {
      ...theme.mixins.gutters(),
      paddingTop: theme.spacing.unit * 2,
      paddingBottom: theme.spacing.unit * 2,
    },
  });

class EventDashboard extends Component {
    render() {
        const { event, eventDetails, auth, classes } = this.props;

        // Guards
        if (!auth.uid) return <Redirect to='/signin' />
        if (!event) return <Redirect to='/' />
    
        if (eventDetails) {
            return (
                <div className="container mt-3">
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
                </div>
            )
        } else {
            return (
                <div className="container center mt-3">
                    <p>Loading Project...</p>
                </div>
            )
        }
    }
}

EventDashboard.propTypes = {
    classes: PropTypes.object.isRequired,
};

const mapStateToProps = (state, ownProps) => {
    // check if data is available
    const id = ownProps.match.params.id;
    let event = null;
    let eventDetails = null;
    if(state.firestore.data.event) event = state.firestore.data.event[id]
    if(state.firestore.data.eventAuxDetails) eventDetails = state.firestore.data.eventAuxDetails[id]

    return {
        event: event,
        eventDetails: eventDetails,
        auth: state.firebase.auth
    }
}

export default compose(
    connect(mapStateToProps),
    // firestoreConnect([
    //     { collection: 'projects'}
    // ])
)(withStyles(styles)(EventDashboard));
