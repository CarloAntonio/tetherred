import React, { Component } from 'react';
import { Droppable } from 'react-beautiful-dnd';
import { connect } from 'react-redux';
import { compose } from 'redux'
import { withRouter } from 'react-router-dom'
import _ from 'lodash';

import EventItem from './eventItem';

//utils
import { getOwnerlessItems, getChildItems } from '../../../utils/filters';

class OpenItemsPool extends Component {

    render() {

        let itemsPool = (
            this.props.openItems.map((item, index) => {
                return <EventItem itemDetails={item} key={item.id} index={index} draggableId={item.id} parentContainer={'pool'}/>
            })
        )

        if(this.props.diveItem) {
            this.props.openItems.map((item, index) => {
                return <EventItem itemDetails={item} key={item.id} index={index} draggableId={item.id} parentContainer={'pool'}/>
            })
        }

        return (
            <div>
                <p>{this.props.diveItem ? `${this.props.diveItem.name}'s Child Items`: 'All Ownerless Items'}</p>
                <Droppable droppableId={this.props.droppableId}>
                    {(provided) => (
                        <div 
                            ref={provided.innerRef}
                            {...provided.droppableProps}
                            className='row'
                        >
                            {provided.placeholder}
                            {itemsPool}
                        </div>
                    )}
                </Droppable>
            </div>   
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    const id = ownProps.match.params.id;

    let openItems = null;
    if(state.firestore.data.eventAuxDetails && state.firestore.data.eventAuxDetails[id] && state.firestore.data.eventAuxDetails[id].items) {
        if(_.isEmpty(state.event.diveItem)) openItems = getOwnerlessItems(state.firestore.data.eventAuxDetails[id].items);
        else openItems = getChildItems(state.firestore.data.eventAuxDetails[id].items, state.event.diveItem);
    } 

    return {
        openItems,
        diveItem: state.event.diveItem
    }
}

export default compose(
    withRouter,
    connect(mapStateToProps)
)(OpenItemsPool);