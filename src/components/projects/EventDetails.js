import React, { Component } from 'react';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import {compose } from 'redux'
import { Redirect } from 'react-router-dom';
import moment from 'moment';

const EventDetails = (props) => {
    const { event, eventDetails, auth } = props;

    // Guards
    if (!auth.uid) return <Redirect to='/signin' />
    if (!event) return <Redirect to='/' />

    if (eventDetails) {
        return (
            <div className="container section project-details">
                <div className="card x-depth-0">
                    <div className="card-content">
                        <span className="card-title">{event.title}</span>
                        <p>{event.description}</p>
                    </div>
                    <div className="card-action grey lighten-4 grey-text">
                        <div>Location: {event.location}</div>
                    </div>
                </div>
            </div>
        )
    } else {
        return (
            <div className="container center">
                <p>Loading Project...</p>
            </div>
        )
    }
}

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
)(EventDetails);
