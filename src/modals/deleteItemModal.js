// Libraries
import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';

// Material UI
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

// Actions
import { handleDeleteFromEventCard } from '../store/actions/itemActions';

class DeleteItemModal extends React.Component {
  render() {
    return (
        <Dialog
            open={this.props.showDeleteItemModal}
            onClose={this.props.handleHideDeleteItemModal}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description">
                <DialogTitle id="alert-dialog-title">
                    For sure, for sure, you want to delete?
                </DialogTitle>

                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Deleting this item also deletes all it's child items (if it had any), continue?
                    </DialogContentText>
                </DialogContent>

                <DialogActions>
                    <Button onClick={this.props.handleHideDeleteItemModal} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={() => this.props.handleDelete(this.props.eventId, this.props.parentId, this.props.itemDetails)} color="primary">
                        Delete
                    </Button>
                </DialogActions>
        </Dialog>
    );
  }
}

const mapDispatchToProps = dispatch => {
    return {
        handleDelete: (eventId, parentId, itemDetails) => dispatch(handleDeleteFromEventCard(eventId, parentId, itemDetails)),
    }
}

export default compose(
    connect(null, mapDispatchToProps)
)(DeleteItemModal);