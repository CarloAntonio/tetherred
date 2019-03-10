import React, { Component } from 'react';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import {compose } from 'redux'
import { Redirect } from 'react-router-dom';
import moment from 'moment';
import PropTypes from 'prop-types';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';

// Material UI
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

// Custom Components
import MyItems from './components/myItems';
import EventItem from './components/eventItem';

const styles = theme => ({
    root: {
      ...theme.mixins.gutters(),
      paddingTop: theme.spacing.unit * 2,
      paddingBottom: theme.spacing.unit * 2,
    },
  });

class EventDashboard extends Component {
    componentDidMount() {
        // get the event id
        console.log(this.props.location.pathname.split('/')[2]);
    }

    onDragEnd = result => {
        //TODO
        console.log(result);
    }
    render() {
        console.log(this.props);
        
        const { event, eventDetails, auth, classes } = this.props;

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
                                    <p>User Profile</p>
                                </div>
                                <div className="col-9">
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
                            </div>
                            <DragDropContext onDragEnd={this.onDragEnd}>
                                <div className="row">
                                    <div className="col-3">
                                        <MyItems droppableId={this.props.auth.uid}/>
                                    </div>
                                    <div className="col-9">
                                        <div className="allItemsContainer">
                                            <p>Stuff To Bring</p>
                                            <Droppable droppableId={this.props.match.params.id}>
                                                {(provided) => (
                                                    <div 
                                                        ref={provided.innerRef}
                                                        {...provided.droppableProps}
                                                        className={classes.itemsHolder}
                                                    >
                                                        {provided.placeholder}
                                                        {Object.keys(eventDetails.items).map((itemId, index) => {
                                                            return <EventItem itemDetails={eventDetails.items[itemId]} key={itemId} index={index} draggableId={itemId}/>
                                                        })}
                                                    </div>
                                                )}
                                            </Droppable>
                                        </div>   
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
                    { collection: 'items', where: ['parent', '==', 'root'] },
                ]
            },
        ]
        
        // return query array
        return queryArr;
    })
)(withStyles(styles)(EventDashboard));
