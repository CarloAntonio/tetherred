// Libraries
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { withRouter } from 'react-router-dom';
import dateFormat from 'dateformat';
import PropTypes from 'prop-types';

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
import DiveIcon from '@material-ui/icons/KeyboardArrowDown'

// Actions
import { hideEditItemModal } from '../store/actions/itemActions';

const styles = theme => ({
    button: {
      margin: 0,
    },
});

class EditItemModal extends Component {
    state = {
        name: '',
        details: '',
        owner: '',
        children: []
    }

    componentWillReceiveProps = nextProps => {
        if(nextProps.targetItemDetails) {
            this.setState({
                name: nextProps.targetItemDetails.name,
                details: nextProps.targetItemDetails.details,
                owner: nextProps.targetItemDetails.owner,
                children: nextProps.targetItemChildren
            })
        }
    }

    handleChange = e => {
        this.setState({
            [e.target.id]: e.target.value
        });
    }

    handleSubmit = () => {
        console.log("Submitting.... lol jk");
    }

    handleDeleteItem = () => {
        console.log("Deleting Item.... lol jk")
    }

    handleSubItemDelete = () => {
        console.log("Deleting.... lol jk again")
    }

    render() {
        const { classes } = this.props;

        console.log(this.state);
        let subItems = [];
        this.state.children.forEach(item => {
            subItems.push(
                <div className='d-flex' key={item.id}>
                    <TextField
                        disabled
                        value={item.data.name}
                        margin="dense"
                        id={item.id}
                        label="Sub Item Name"
                        variant="outlined"
                        fullWidth/>
                    <Tooltip title='Dive' aria-label='Dive' placement='top'>
                        <IconButton 
                            className={classes.button} 
                            onClick={null}
                            aria-label="Dive">
                            <DiveIcon />
                        </IconButton>
                    </Tooltip>
                    
                    <Tooltip title='Delete' aria-label='Delete' placement='top'>
                        <IconButton 
                            className={classes.button} 
                            onClick={this.handleSubItemDelete}
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
                        rows="3"
                        margin="normal"
                        variant="outlined"
                        fullWidth/>

                    {subItems}

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
    if(state.firestore.data.eventAuxDetails 
        && state.firestore.data.eventAuxDetails[id] 
        && state.firestore.data.eventAuxDetails[id].items
        && state.item.editItemModalTargetId !== '') {
        targetItemDetails = state.firestore.data.eventAuxDetails[id].items[state.item.editItemModalTargetId];

    }

    let targetItemDetailsLastUpdatedBy = null;
    if(targetItemDetails 
        && state.user 
        && state.user.userMinDetails
        && state.user.userMinDetails[targetItemDetails.updatedBy]) {
        targetItemDetailsLastUpdatedBy = state.user.userMinDetails[targetItemDetails.updatedBy]
    }

    let targetItemChildren = [];
    if(targetItemDetails
        && state.firestore.data.eventAuxDetails[id] 
        && state.firestore.data.eventAuxDetails[id].items) {
            targetItemDetails.children.forEach(childItemId => targetItemChildren.push({
                data: state.firestore.data.eventAuxDetails[id].items[childItemId],
                id: childItemId
            }));
        }

    return {
        showModal: state.item.showEditItemModal,
        targetItemDetails,
        targetItemChildren,
        lastUpdatedBy: targetItemDetailsLastUpdatedBy,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        handleClose: () => dispatch(hideEditItemModal()),
    }
}

export default compose(
    withRouter,
    withStyles(styles),
    connect(mapStateToProps, mapDispatchToProps)
)(EditItemModal);