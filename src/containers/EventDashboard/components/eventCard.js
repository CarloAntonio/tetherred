// Libraries
import React, { Component} from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import _ from 'lodash';

// Material UI
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import red from '@material-ui/core/colors/red';
import DeleteIcon from '@material-ui/icons/Clear';
import InspectIcon from '@material-ui/icons/Search';
import Button from '@material-ui/core/Button';

// Custom Components
import DeleteItemModal from '../../../modals/deleteItemModal';

// Actions
import { diveIntoItem, changeFilterValue } from '../../../store/actions/eventActions';
import { showEditItemModal } from '../../../store/actions/itemActions';

const styles = theme => ({
    card: {
      width: '100%',
      height: 110,
    },
    header: {
        display: 'flex',
        justifyContent: 'around'
    },
    avatar: {
      backgroundColor: red[500],
      margin: 8
    },
    actions: {
        display: 'flex',
        padding: 0
    },
    cardType: {
        padding: '12px 15px',
        margin: 0,
        color: 'tomato'
    },
    button: {
        margin: 0,
        height: 60
    },
});

class EventCard extends Component{
    state = {
        showDeleteItemModal: false
    }

    handleShowDeleteItemModal = () => {
        this.setState({ showDeleteItemModal: true })
    }

    handleHideDeleteItemModal = () => {
        this.setState({ showDeleteItemModal: false })
    }

    handleDive = (data, id) => {
        this.props.diveIntoItem(data, id);
        this.props.changeFilterValue('');
    }

    render() {
        const { classes, itemName, itemDetails } = this.props;

        let nameArea = (
            <Button className={classes.button} disabled>
                {itemName}
            </Button>
        )
        if(!_.isEmpty(itemDetails.data.children)) {
            nameArea = (
                <Tooltip title='Dive' aria-label='Dive' placement='top'>
                    <Button color="primary" className={classes.button} onClick={() => this.handleDive(this.props.itemDetails.data, this.props.itemDetails.id)}>
                        {itemName}
                    </Button>
                </Tooltip>
            )
        }
        
        return (
            <Card className={classes.card}>
                <div className={classes.header}>
                    <Tooltip title='Drag Me!' aria-label='Drag Me!' placement='top'>
                        <Avatar aria-label="Recipe" className={classes.avatar}>
                            {itemName ? itemName.charAt(0) : ':)'}
                        </Avatar>
                    </Tooltip>
                    {nameArea}
                </div>
                <CardActions className={classes.actions} disableActionSpacing>

                    <Tooltip title='Details' aria-label='Details'>
                        <IconButton 
                            aria-label="Details Icon"
                            onClick={() => this.props.showEditItemModal(itemDetails.id)}>
                            <InspectIcon />
                        </IconButton>
                    </Tooltip>

                    <Tooltip title='Delete' aria-label='Delete'>
                        <IconButton 
                            aria-label="Delete Icon"
                            onClick={this.handleShowDeleteItemModal}
                            >
                            <DeleteIcon />
                        </IconButton>
                    </Tooltip>
                    
                    <Tooltip 
                        title={itemDetails.data.parent === 'root' ? 'Root Component' : 'Child Component' } 
                        aria-label={itemDetails.data.parent === 'root' ? 'Root' : 'Child' }>
                        <h5 className={classes.cardType}>
                            {itemDetails.data.parent === 'root' ? 'R' : 'C' }
                        </h5>
                    </Tooltip>
                </CardActions>

                <DeleteItemModal
                    eventId={this.props.match.params.id}
                    parentId={itemDetails.parentItemId}
                    itemDetails={itemDetails}
                    showDeleteItemModal={this.state.showDeleteItemModal}
                    handleHideDeleteItemModal={this.handleHideDeleteItemModal}/>
            </Card>
        )
    }
}

EventCard.propTypes = {
    classes: PropTypes.object.isRequired,
};

const mapDispatchToProps = dispatch => {
    return {
        diveIntoItem: (item, itemId) => dispatch(diveIntoItem(item, itemId)),
        changeFilterValue: (filterValue) => dispatch(changeFilterValue(filterValue)),
        showEditItemModal: (itemId) => dispatch(showEditItemModal(itemId)),
    }
}

export default compose(
    withRouter,
    withStyles(styles),
    connect(null, mapDispatchToProps)
)(EventCard);