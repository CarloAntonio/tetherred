import React, { Component } from 'react';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import {compose } from 'redux'
import { Redirect } from 'react-router-dom';
import moment from 'moment';

const EventDetails = (props) => {
    const { event, eventDetails, auth } = props;

    console.log(event);
    console.log(eventDetails);

    if (!auth.uid) return <Redirect to='/signin' />

    if (eventDetails) {
        return (
            <div className="container section project-details">
                <div className="card x-depth-0">
                <h1>Hellow WOrkd</h1>
                    {/* <div className="card-content">
                        <span className="card-title">{project.title}</span>
                        <p>{project.content}</p>
                    </div>
                    <div className="card-action grey lighten-4 grey-text">
                        <div>Posted by {project.authorFirstName} {project.authorLastName}</div>
                        <div>{moment(project.createdAt.toDate()).calendar()}</div>
                    </div> */}
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
    const id = ownProps.match.params.id;

    return {
        event: state.firestore.data.event[id],
        eventDetails: state.firestore.data.eventAuxDetails[id],
        auth: state.firebase.auth
    }
}

export default compose(
    connect(mapStateToProps),
    // firestoreConnect([
    //     { collection: 'projects'}
    // ])
)(EventDetails);
