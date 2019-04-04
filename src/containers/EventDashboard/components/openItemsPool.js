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
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Tooltip from '@material-ui/core/Tooltip';
import RiseIcon from '@material-ui/icons/KeyboardArrowUp'

// Custom Components
import EventItem from './eventItem';
import NewItemDialog from './newItemDialog';

// Utils
import { getOwnerlessItems, getChildItems } from '../../../utils/filters';

// Actions
import { riseOutOfItem } from '../../../store/actions/eventActions'

const styles = theme => ({
    main: {
        minHeight: 125,
        marginBottom: 16,
    },
    fab: {
        margin: 16,
        marginRight: 32,
    },
    formControl: {
        margin: theme.spacing.unit,
        marginLeft: 32,
        minWidth: 120,
    },
});

class OpenItemsPool extends Component {

    state = {
        showNewItemDialog: false,
        filterValue: ''
    }

    handleCloseNewItemDialog = () => {
        this.setState({ showNewItemDialog: false });
    }

    handleOpenNewItemDialog = () => {
        this.setState({ showNewItemDialog: true });
    }

    handleFilterChange = event => {
        this.setState({ [event.target.name]: event.target.value });
    }

    render() {
        const { classes, diveDetails, riseDetails } = this.props;


        console.log(diveDetails);
        console.log(riseDetails);
        console.log(this.props.diveItems)

        /*****
        * setup title
        *****/
        let title = "All Open Card Components";
        if(this.state.filterValue !== '') title = this.state.filterValue;

        /*****
        * setup cards to display
        *****/
        let itemsPool = null;
        if(!this.props.diveDetails.diveItem) {
            // Default: Show All Open Card Components
            itemsPool = (
                this.props.openItems.map((item, index) => {
                    return <EventItem itemDetails={item} key={item.id} index={index} draggableId={item.id}/>
                })
            )

            // Open Root Only: Show Open Root Card Components Only
            if(this.state.filterValue === 'Open Root Card Components Only') {
                itemsPool = (
                    this.props.openItems.map((item, index) => {
                        if(!item.rootParentItem) {
                            return <EventItem 
                                        itemDetails={item} 
                                        key={item.id} 
                                        index={index} 
                                        draggableId={item.id} />
                        }
                    })
                ) 
            }
            
            // Open Child Only: Show Open Child Card Components Only
            if(this.state.filterValue === 'Open Child Card Components Only') {
                itemsPool = (
                    this.props.openItems.map((item, index) => {
                        if(item.rootParentItem) {
                            return <EventItem 
                                        itemDetails={item} 
                                        key={item.id} 
                                        index={index} 
                                        draggableId={item.id}/>
                        }
                    })
                ) 
            }
        } else {
            itemsPool = (
                this.props.diveItems.map((item, index) => {
                    return <EventItem itemDetails={item} key={item.id} index={index} draggableId={item.id}/>
                })
            )

            // Open Root Only: Show Open Root Card Components Only
            if(this.state.filterValue === 'Open Root Card Components Only') {
                itemsPool = (
                    this.props.diveItems.map((item, index) => {
                        if(!item.rootParentItem) {
                            return <EventItem 
                                        itemDetails={item} 
                                        key={item.id} 
                                        index={index} 
                                        draggableId={item.id} />
                        }
                    })
                ) 
            }

            // Open Child Only: Show Open Child Card Components Only
            if(this.state.filterValue === 'Open Child Card Components Only') {
                itemsPool = (
                    this.props.diveItems.map((item, index) => {
                        if(item.rootParentItem) {
                            return <EventItem 
                                        itemDetails={item} 
                                        key={item.id} 
                                        index={index} 
                                        draggableId={item.id}/>
                        }
                    })
                ) 
            }
        }

        /*****
        * setup button to display
        *****/
       let mainButton = (
            <Fab size="medium" color="secondary" aria-label="Add" className={classes.fab} onClick={this.handleOpenNewItemDialog}>
                <AddIcon />
            </Fab>
       )
       if(this.props.diveDetails.diveItem) {
           mainButton = (
            <Tooltip title='Rise' aria-label='Rise'>
                <Fab 
                    size="medium" 
                    color="secondary" 
                    aria-label="Add" 
                    className={classes.fab} onClick={() => this.props.riseOutOfItem(this.props.riseDetails)}>
                    <RiseIcon />
                </Fab>
            </Tooltip>
           )
       }

        return (
            <Paper className={classes.main}>
                <div className='d-flex justify-content-between'>
                    <FormControl className={classes.formControl}>
                        <InputLabel htmlFor="age-simple">Filter Cards</InputLabel>
                        <Select
                            value={this.state.filterValue}
                            onChange={this.handleFilterChange}
                            inputProps={{
                            name: 'filterValue',
                            id: 'filterValue',
                            }}
                        >
                            <MenuItem value="All Open Card Components">
                            <em>None</em>
                            </MenuItem>
                            <MenuItem value='Open Root Card Components Only'>Open Root Cards Only</MenuItem>
                            <MenuItem value='Open Child Card Components Only'>Open Child Cards Only</MenuItem>
                            <MenuItem value='All Open Card Components'>All Open Cards</MenuItem>
                            {/* <MenuItem value='Taken Root Card Components Only'>Taken Root Cards Only (Coming Soon)</MenuItem>
                            <MenuItem value='Take Child Card Components Only'>Taken Child Cards Only</MenuItem>
                            <MenuItem value='All Taken Card Components'>All Taken Cards</MenuItem>
                            <MenuItem value='All Root Card Components Only'>All Root Cards Only</MenuItem>
                            <MenuItem value='All Child Card Components Only'>All Child Cards Only</MenuItem>
                            <MenuItem value='All Card Components'>All Cards</MenuItem> */}
                        </Select>
                    </FormControl>

                    <p className='mb-0 py-4'>
                        {title}
                    </p>
                    
                    {mainButton}
                </div>
                
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

                <NewItemDialog 
                    showDialog={this.state.showNewItemDialog}
                    handleOpenNewItemDialog={this.handleOpenNewItemDialog}
                    handleCloseNewItemDialog={this.handleCloseNewItemDialog}/>
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
    let diveItems = null;
    if(state.firestore.data.eventAuxDetails && state.firestore.data.eventAuxDetails[id] && state.firestore.data.eventAuxDetails[id].items) {
        if(_.isEmpty(state.event.diveDetails.diveItem)) openItems = getOwnerlessItems(state.firestore.data.eventAuxDetails[id].items);
        else diveItems = getChildItems(state.firestore.data.eventAuxDetails[id].items, state.event.diveDetails.diveItem);
    }

    // setup parent rise data is rise is possible
    let riseDetails = 'root';
    if(state.event.diveDetails 
        && state.firestore.data.eventAuxDetails[id].items[state.event.diveDetails.diveItemId]
        && state.firestore.data.eventAuxDetails[id].items[state.event.diveDetails.diveItemId].parent !== 'root') {
        riseDetails = {
            diveItem: state.firestore.data.eventAuxDetails[id].items[state.event.diveDetails.diveItemId],
            diveItemId: state.firestore.data.eventAuxDetails[id].items[state.event.diveDetails.diveItemId].parent
        }
    }

    // TODO: Taken Items

    return {
        openItems,
        diveItems,
        riseDetails,
        diveDetails: state.event.diveDetails
    }
}

const mapDispatchToProps = dispatch => {
    return {
        riseOutOfItem: (riseDetails) => dispatch(riseOutOfItem(riseDetails))
    }
}

export default compose(
    withRouter,
    withStyles(styles),
    connect(mapStateToProps, mapDispatchToProps)
)(OpenItemsPool);