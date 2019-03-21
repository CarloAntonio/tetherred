import React, { Component } from 'react';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import {compose } from 'redux'
import { Redirect } from 'react-router-dom';
import moment from 'moment';
import { DragDropContext } from 'react-beautiful-dnd';

// Custom Components
import MyProfile from './components/myProfile';
import EventSummary from './components/eventSummary';
import MyItems from './components/myItems';
import OpenItemsPool from './components/openItemsPool';

// utils
import onDragEnd from '../../utils/drag';

class EventDashboard extends Component {
    render() {
        const { event, eventDetails, auth, } = this.props;

        // Guards
        if (!auth.uid) return <Redirect to='/signin' />
        if (!event) return <Redirect to='/' />
    
        if (eventDetails && eventDetails.items) {
            return (
                <div className="container mt-3">
                    <div className='row'>
                        <div className="col-10">
                            <div className="row">
                                <div className="col-3">
                                    <MyProfile/>
                                </div>
                                <div className="col-9">
                                    <EventSummary event={event} />
                                </div>
                            </div>
                            <DragDropContext onDragEnd={onDragEnd}>
                                <div className="row">
                                    <div className="col-3">
                                        <MyItems droppableId={`myItems/${this.props.auth.uid}`}/>
                                    </div>
                                    <div className="col-9">
                                        <OpenItemsPool droppableId={`openItems/${this.props.match.params.id}`}/>
                                    </div>
                                </div>
                            </DragDropContext>
                        </div>
                        <div className="col-2">
                                <p>Notifications</p>
                        </div>
                    </div>
                    
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

const mapStateToProps = (state, ownProps) => {
    const id = ownProps.match.params.id;

    // check if data is available
    let event = null;
    if(state.firestore.data.event) event = state.firestore.data.event[id]

    let eventDetails = null;
    if(state.firestore.data.eventAuxDetails) eventDetails = state.firestore.data.eventAuxDetails[id];

    return {
        event: event,
        eventDetails: eventDetails,
        auth: state.firebase.auth,
    }
}

export default compose(
    connect(mapStateToProps),
    firestoreConnect(props => {

        // get subcollections
        const queryArr = [
            { 
                collection: 'eventAuxDetails', 
                doc: props.location.pathname.split('/')[2], 
                subcollections: [
                    { collection: 'notifications' }
                ]
            },
            { 
                collection: 'eventAuxDetails', 
                doc: props.location.pathname.split('/')[2], 
                subcollections: [
                    { collection: 'items' },
                ]
            },
        ]
        
        // return query array
        return queryArr;
    })
)(EventDashboard);
