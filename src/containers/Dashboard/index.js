import React, { Component } from 'react';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import { Redirect } from 'react-router-dom';

// import Notifications from './Notifications';
import EventList from './components/EventList';

class Dashboard extends Component {
    render () {
        const { events, eventDetails, auth } = this.props;

        console.log(this.props);

        if(!auth.uid) return <Redirect to="/signin" />

        return (
            <div className="container">
                <div className="row">
                    <div className="col-6 mt-5">
                        <EventList events={events}/>
                    </div>
                    {/* <div className="col s12 m5 offset-m1">
                        <Notifications notifications={notifications}/>
                    </div> */}
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        events: state.firestore.data.event,
        auth: state.firebase.auth,
        eventDetails: state.firestore.data.eventAuxDetails,
    }
}

export default compose(
    connect(mapStateToProps),
    firestoreConnect(props => {
        if(props.auth.isLoaded && !props.auth.isEmpty) {
            // create a query array
            const queryArr = [{ collection: 'eventAuxDetails', where: ['members', 'array-contains', props.auth.uid]}];

            // push to query array as needed for multiple events
            if(props.eventDetails) {
                Object.keys(props.eventDetails).map(event => {
                    queryArr.push({
                        collection: 'event', doc: event
                    })
                })
            }

            // return query array
            return queryArr;
        } else {
            return [];
        }
    })
)(Dashboard);