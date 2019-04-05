// Libraries
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { withRouter } from 'react-router-dom';
import dateFormat from 'dateformat';

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

// Actions
import { hideEditItemModal } from '../store/actions/itemActions';

class EditItemModal extends Component {
    state = {
        name: '',
        details: ''
    }

    componentWillReceiveProps = nextProps => {
        console.log(nextProps.targetItemDetails);

        if(nextProps.targetItemDetails) {
            this.setState({
                name: nextProps.targetItemDetails.name,
                details: nextProps.targetItemDetails.details
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

    render() {

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
                </DialogActions>
            </Dialog>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    const id = ownProps.match.params.id;

    let targetItemDetails = null;
    if(state.firestore.data.eventAuxDetails 
        && state.firestore.data.eventAuxDetails[id] 
        && state.firestore.data.eventAuxDetails[id].items
        && state.item.editItemModalTargetId !== '') {
        targetItemDetails = state.firestore.data.eventAuxDetails[id].items[state.item.editItemModalTargetId]
    }

    let targetItemDetailsLastUpdatedBy = null;
    if(targetItemDetails 
        && state.user 
        && state.user.userMinDetails
        && state.user.userMinDetails[targetItemDetails.updatedBy]) {
        targetItemDetailsLastUpdatedBy = state.user.userMinDetails[targetItemDetails.updatedBy]
    }


    return {
        showModal: state.item.showEditItemModal,
        targetItemDetails,
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
    connect(mapStateToProps, mapDispatchToProps)
)(EditItemModal);