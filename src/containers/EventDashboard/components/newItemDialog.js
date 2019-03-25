// Libraries
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { cloneDeep, isEmpty } from 'lodash';
import shortId from 'shortid';

// Material UI
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';

const styles = theme => ({
    button: {
      margin: 0,
    },
});

class NewItemDialog extends Component {
    state = {
        itemName: '',
        parts: {}
    }

    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        });
    }

    handlePartChange = e => {
        this.setState({
            parts: {
                ...this.state.parts,
                [e.target.id]: e.target.value
            }
        })
    }

    handleSubmit = () => {
        this.props.handleCloseNewItemDialog();
        console.log(this.state)
    }

    handleClose = () => {
        this.setState({ itemName: '' });
        this.handleUnsplit();
        this.props.handleCloseNewItemDialog();
    }

    handleSplit = () => {
        this.handleAddPart();
    }

    handleUnsplit = () => {
        this.setState({ parts: {} });
    }

    handleAddPart = () => {
        const randId = shortId.generate();
        
        const partsCopy = {
            ...this.state.parts,
            [randId]: ''
        }
        
        this.setState({ parts: partsCopy })
    }

    handleDeletePart = partIndex => {
        const partsCopy = cloneDeep(this.state.parts);
        delete partsCopy[partIndex];
        this.setState({ parts: partsCopy });
    }

    render() {

        const { classes } = this.props;

        // Conditionally Show Split Buttons
        let splitButtons = (
            <Button onClick={this.handleSplit} disabled={this.state.itemName === ''} color="primary">
                Split
            </Button>
        )
        if(Object.keys(this.state.parts).length > 0) {
            splitButtons = (
                <Button onClick={this.handleUnsplit} disabled={this.state.itemName === ''} color="primary">
                    Unsplit
                </Button>
            )
        }

        // Conditionally Show Parts Input
        let parts = [];
        Object.keys(this.state.parts).map(partKey => {
            parts.push(
                <div className='d-flex' key={partKey}>
                    <TextField
                        onChange={this.handlePartChange}
                        value={this.state.parts[partKey] ? this.state.parts[partKey] : ''}
                        margin="dense"
                        id={partKey}
                        label="Part Name"
                        variant="outlined"
                        fullWidth/>
                    <IconButton 
                        className={classes.button} 
                        onClick={() => this.handleDeletePart(partKey)}
                        aria-label="Delete">
                        <DeleteIcon />
                    </IconButton>
                </div>
            )
        });

        let subItems = null;
        if(!isEmpty(parts)) {
            subItems = (
                <DialogContent>
                    <DialogContentText>
                        Item Parts
                    </DialogContentText>
        
                    {parts}

                    <Button 
                        onClick={this.handleAddPart} 
                        color="primary" 
                        variant='contained'
                        className='mt-2'>
                        Add
                    </Button>
                </DialogContent>
            )
        }

        return (
            <Dialog
                open={this.props.showDialog}
                onClose={this.handleClose}
                aria-labelledby="form-dialog-title"
                maxWidth='xs'
                fullWidth={true}>

                <DialogTitle id="form-dialog-title">Add New Item</DialogTitle>

                <DialogContent>
                    <TextField
                        onChange={this.handleChange}
                        autoFocus
                        margin="dense"
                        id="itemName"
                        label="Item Name"
                        variant="outlined"
                        fullWidth/>
                </DialogContent>

                {subItems}

                <DialogActions>
                    {splitButtons}
                    <Button onClick={this.handleSubmit} disabled={this.state.itemName === ''} color="primary">
                        Submit
                    </Button>
                </DialogActions>

            </Dialog>
        );
    }
}

NewItemDialog.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(NewItemDialog);