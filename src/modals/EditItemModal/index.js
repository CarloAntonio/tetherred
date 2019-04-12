// Libraries
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { withRouter } from 'react-router-dom';
import dateFormat from 'dateformat';
import PropTypes from 'prop-types';
import _ from 'lodash';
import firebase from 'firebase';
import shortid from 'shortid';

// Material UI
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Typography from '@material-ui/core/Typography';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import DiveIcon from '@material-ui/icons/KeyboardArrowDown';
import DoneIcon from '@material-ui/icons/Done';

// Custom Components
import OwnerSelector from './components/ownerSelector';

// Actions
import { hideEditItemModal, addChildItemsFromEditItemModal } from '../../store/actions/itemActions';

const styles = theme => ({
    button: {
      margin: 0,
    },
});

class EditItemModal extends Component {
    state = {
        id: '',
        name: '',
        details: '',
        category: '',
        lastAction: '',
        owner: '',
        children: [],
        newChildItem: ''
    }

    componentWillReceiveProps = nextProps => {
        if(nextProps.targetItemDetails) {
            this.setState({
                id: nextProps.targetItemId,
                name: nextProps.targetItemDetails.name,
                details: nextProps.targetItemDetails.details,
                category: nextProps.targetItemDetails.category,
                lastAction: nextProps.targetItemDetails.lastAction,
                owner: nextProps.targetItemOwner,
                children: nextProps.targetItemChildren,
            })
        }
    }

    handleChange = e => {
        this.setState({
            [e.target.id]: e.target.value
        });
    }

    handleInternalStateChildItemDelete = () => {
        console.log("Deleting.... lol jk again")
    }

    handleInternalStateChildItemAdd = () => {
        const updatedChildItems = _.cloneDeep(this.state.children);
        const newChildItemData = {
            data: {
                category: this.state.category,
                children: [],
                lastAction: 'created',
                name: this.state.newChildItem,
                owner: 'none',
                parent: this.state.id,
                updatedAt: firebase.firestore.Timestamp.fromDate(new Date()),
                updatedBy: this.props.currentUserId
            },
            id: shortid.generate(),
            inFirestore: false
        }

        updatedChildItems.push(newChildItemData);

        this.setState({ children: updatedChildItems, newChildItem: '' });
    }

    handleInternalStateChangeOwner = event => {
        this.setState({ owner: event.target.value });
    }

    handleSubmit = () => {
        this.props.handleClose();
        this.props.addChildItems(this.props.match.params.id, this.state.id, this.state);
    }

    handleDeleteItem = () => {
        console.log("Deleting Item.... lol jk")
    }

    render() {
        const { classes } = this.props;

        console.log(this.state);

        let subItems = [];
        this.state.children.forEach((item, index) => {
            subItems.push(
                <div className='d-flex' key={item.id}>
                    <TextField
                        disabled
                        value={item.data.name}
                        margin="dense"
                        id={item.id}
                        label="Child Item Name"
                        variant="outlined"
                        fullWidth/>
                    
                    <Tooltip title='Delete' aria-label='Delete' placement='top'>
                        <IconButton 
                            className={classes.button} 
                            onClick={() => this.handleInternalStateChildItemDelete()}
                            aria-label="Delete">
                            <DeleteIcon />
                        </IconButton>
                    </Tooltip>
                </div>
            )
        })

        let updatedAt = null;
        if(this.props.targetItemDetails) {
            updatedAt = dateFormat(this.props.targetItemDetails.updatedAt.toDate(), "dddd, mmmm dS, yyyy, h:MM:ss TT");
        }

        return (
            <Dialog
                open={this.props.showModal}
                onClose={this.props.handleClose}
                aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Item Details</DialogTitle>
    
                <DialogContent>
                    <DialogContentText>
                        General
                    </DialogContentText>

                    <TextField
                        onChange={this.handleChange}
                        value={this.state.name}
                        autoFocus
                        margin="dense"
                        id="name"
                        disabled
                        label="Name"
                        variant="outlined"
                        fullWidth/>
    
                    <TextField
                        onChange={this.handleChange}
                        value={this.state.details}
                        id="details"
                        label="Details"
                        multiline
                        rows="2"
                        margin="normal"
                        variant="outlined"
                        fullWidth/>

                    <OwnerSelector
                        owner={this.state.owner}
                        handleChangeOwner={this.handleChangeOwner}/>
                
                </DialogContent>

                <DialogContent>
                    <DialogContentText>
                        Child Items
                    </DialogContentText>

                    <div className='d-flex'>
                        <TextField
                            onChange={this.handleChange}
                            value={this.state.newChildItem}
                            id='newChildItem'
                            margin="dense"
                            label="Add New Child"
                            variant="outlined"
                            fullWidth/>

                        <Tooltip title='Add Child Item' aria-label='Add Child Item' placement='top'>
                            <IconButton 
                                className={classes.button} 
                                onClick={this.handleInternalStateChildItemAdd}
                                aria-label="Add Child Item">
                                <DoneIcon />
                            </IconButton>
                        </Tooltip>
                    </div>

                    {subItems}
    
                </DialogContent>

                <DialogContent>
                    <Typography>
                        Last Update By: {this.props.lastUpdatedBy ? <b>{this.props.lastUpdatedBy.displayName}</b> : <b>Unknown</b>}
                    </Typography>

                    <Typography>
                        Last Update On: {updatedAt ? <b>{updatedAt}</b> : <b>Unknown</b>}
                    </Typography>
                </DialogContent>
    
                <DialogActions>
                    <Button onClick={this.props.handleClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={this.handleSubmit} color="primary">
                        Update
                    </Button>
                    <Button onClick={this.handleDeleteItem} color="primary">
                        Delete
                    </Button>
                </DialogActions>
            </Dialog>
        )
    }
}

EditItemModal.propTypes = {
    classes: PropTypes.object.isRequired,
};

const mapStateToProps = (state, ownProps) => {
    const id = ownProps.match.params.id;

    let targetItemDetails = null;
    let targetItemId = null;
    if(state.firestore.data.eventAuxDetails 
        && state.firestore.data.eventAuxDetails[id] 
        && state.firestore.data.eventAuxDetails[id].items
        && state.item.editItemModalTargetId !== '') {
            targetItemId = state.item.editItemModalTargetId
            targetItemDetails = state.firestore.data.eventAuxDetails[id].items[state.item.editItemModalTargetId];
    }

    let targetItemDetailsLastUpdatedBy = null;
    let targetItemOwner = 'none';
    if(targetItemDetails 
        && state.user 
        && state.user.userMinDetails
        && state.user.userMinDetails[targetItemDetails.updatedBy]) {
            if(targetItemDetails.owner !== 'none') targetItemOwner = state.user.userMinDetails[targetItemDetails.owner];
            targetItemDetailsLastUpdatedBy = state.user.userMinDetails[targetItemDetails.updatedBy];
    }

    let targetItemChildren = [];
    if(targetItemDetails
        && state.firestore.data.eventAuxDetails[id] 
        && state.firestore.data.eventAuxDetails[id].items) {
            targetItemDetails.children.forEach(childItemId => targetItemChildren.push({
                data: state.firestore.data.eventAuxDetails[id].items[childItemId],
                id: childItemId,
                inFirestore: true
            }));
        }

    return {
        showModal: state.item.showEditItemModal,
        targetItemDetails,
        targetItemChildren,
        targetItemOwner,
        targetItemId,
        lastUpdatedBy: targetItemDetailsLastUpdatedBy,
        currentUserId: state.firebase.auth.uid
    }
}

const mapDispatchToProps = dispatch => {
    return {
        handleClose: () => dispatch(hideEditItemModal()),
        addChildItems: (eventId, parentId, data) => dispatch(addChildItemsFromEditItemModal(eventId, parentId, data))
    }
}

export default compose(
    withRouter,
    withStyles(styles),
    connect(mapStateToProps, mapDispatchToProps)
)(EditItemModal);