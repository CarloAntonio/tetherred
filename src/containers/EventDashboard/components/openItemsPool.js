import React from 'react';
import { Droppable } from 'react-beautiful-dnd';
import { connect } from 'react-redux';
import { compose } from 'redux'
import { withRouter } from 'react-router-dom'

import EventItem from './eventItem';

//utils
import { getOwnerlessItems } from '../../../utils/filters';

const OpenItemsPool = props => {
    return (
        <div className="allItemsContainer">
            <p>Stuff To Bring</p>
            <Droppable droppableId={props.droppableId}>
                {(provided) => (
                    <div 
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                        // className={classes.itemsHolder}
                    >
                        {provided.placeholder}
                        {props.ownerlessItems.map((item, index) => {
                            return <EventItem itemDetails={item} key={item.id} index={index} draggableId={item.id}/>
                        })}
                    </div>
                )}
            </Droppable>
        </div>   
    )
}

const mapStateToProps = (state, ownProps) => {
    const id = ownProps.match.params.id;

    let ownerlessItems = null;
    if(state.firestore.data.eventAuxDetails && state.firestore.data.eventAuxDetails[id] && state.firestore.data.eventAuxDetails[id].items) 
        ownerlessItems = getOwnerlessItems(state.firestore.data.eventAuxDetails[id].items);

    return {
        ownerlessItems,
    }
}

export default compose(
    withRouter,
    connect(mapStateToProps)
)(OpenItemsPool);