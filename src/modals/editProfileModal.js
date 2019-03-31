import React, { Component } from 'react';

// Material UI
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

// Custom Components
import UserAvatar from '../components/UserAvatar';

class EditProfileModal extends Component {

    state = {
        displayName: '',
        bio: '',
        userPicData: ''
    }

    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        });
    }

    handleSubmit = () => {
        console.log('SUbmitting')
        // this.props.createEvent(this.state);
        // this.props.handleHideCreateEventModal();
    }

    render() {
        return(
            <Dialog
                open={this.props.showModal}
                onClose={this.props.handleClose}
                aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Edit Profile</DialogTitle>
    
                <DialogContent>
                    {/* <DialogContentText>
                        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dicta quod a nulla veritatis ullam repudiandae qui odio maiores id mollitia natus ex omnis, est commodi consequuntur, error, consectetur atque deserunt.
                    </DialogContentText> */}
                    <div className='d-flex flex-column align-items-center'>
                        <UserAvatar size={120}/>
                        <p>Change</p>
                    </div>
                    
    
                    <TextField
                        onChange={this.handleChange}
                        autoFocus
                        margin="dense"
                        id="userName"
                        label="Username"
                        variant="outlined"
                        fullWidth/>
    
                    <TextField
                        onChange={this.handleChange}
                        id="bio"
                        label="Bio"
                        multiline
                        rows="4"
                        margin="normal"
                        variant="outlined"
                        fullWidth/>
    
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

export default EditProfileModal;