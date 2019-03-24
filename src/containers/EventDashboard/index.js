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
import AttendingList from './components/attendingList';
import EventNotifications from './components/eventNotifications';
import UndecidedList from './components/undecidedList';

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
                        <DragDropContext onDragEnd={onDragEnd}>
                            <div className="col-2 px-0">
                                <MyProfile/>
                                <MyItems droppableId={`myItems/${this.props.auth.uid}`}/>
                            </div>
                            <div className="col-8">
                                <EventSummary event={event} />
                                <OpenItemsPool droppableId={`openItems/${this.props.match.params.id}`}/>
                                <AttendingList />
                            </div>
                        </DragDropContext>
                        <div className="col-2 px-0">
                            <EventNotifications/>
                            <UndecidedList/>
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
