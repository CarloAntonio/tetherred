import React, { Component } from 'react';
import { firestoreConnect } from 'react-redux-firebase';
import PropTypes from 'prop-types';
import {compose } from 'redux'
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom'
import { Droppable } from 'react-beautiful-dnd'

// Material UI
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

import MyEventItem from './myEventItem';

// Utils
import { getUserItems } from '../../../utils/filters';

const styles = theme => ({
    myItemsContainer: {
        backgroundColor: 'white'
    },
    itemsHolder: {
        minHeight: '80vh',
        paddingBottom: 100
    }
});

const MyItems = props => {

    const { classes } = props;

    return (
        <div className={classes.myItemsContainer}>
            <p>Stuff I'm Bringing</p>
            <Droppable droppableId={props.droppableId}>
                {(provided) => (
                    <div 
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                        className={classes.itemsHolder}
                    >
                        {provided.placeholder}
                        {props.userItems.map((item, index) => {
                            return <MyEventItem itemDetails={item} key={item.id} index={index} draggableId={item.id}/>
                        })}
                        
                    </div>
                )}
            </Droppable>
        </div>
    )
}

MyItems.propTypes = {
    classes: PropTypes.object.isRequired,
};

const mapStateToProps = (state, ownProps) => {
    const id = ownProps.match.params.id;

    let userItems = null;
    if(state.firestore.data.eventAuxDetails && state.firestore.data.eventAuxDetails[id] && state.firestore.data.eventAuxDetails[id].items) 
        userItems = getUserItems(state.firestore.data.eventAuxDetails[id].items, state.firebase.auth.uid);

    return {
        auth: state.firebase.auth,
        userItems
    }
}

export default compose(
    withRouter,
    withStyles(styles),
    connect(mapStateToProps)
)(MyItems);