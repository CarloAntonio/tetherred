import React, { Component } from 'react';
import { Droppable } from 'react-beautiful-dnd';
import { connect } from 'react-redux';
import { compose } from 'redux'
import { withRouter } from 'react-router-dom'
import _ from 'lodash';
import PropTypes from 'prop-types';

// Material UI
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';

import EventItem from './eventItem';

//utils
import { getOwnerlessItems, getChildItems } from '../../../utils/filters';

const styles = theme => ({
    main: {
        minHeight: 125,
        marginBottom: 16,
    },
});

class OpenItemsPool extends Component {

    render() {
        const { classes } = this.props;

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
            <Paper className={classes.main}>
                <p>{this.props.diveItem ? `${this.props.diveItem.name}'s Child Items`: 'All Ownerless Items'}</p>
                <Droppable droppableId={this.props.droppableId}>
                    {(provided) => (
                        <div 
                            ref={provided.innerRef}
                            {...provided.droppableProps}
                            className='row mx-2 justify-content-center'
                        >
                            {provided.placeholder}
                            {itemsPool}
                        </div>
                    )}
                </Droppable>
            </Paper>   
        )
    }
}

OpenItemsPool.propTypes = {
    classes: PropTypes.object.isRequired,
};

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
    withStyles(styles),
    connect(mapStateToProps)
)(OpenItemsPool);