// Libraries
import React, { Component } from 'react';
import AvatarEditor from 'react-avatar-edit'
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

// Custom Components
import UserAvatar from '../components/UserAvatar';

// Assets
import StockPic from '../assets/images/profilePic.jpg'

const styles = theme => ({
    button: {
      margin: theme.spacing.unit,
    },
    input: {
      display: 'none',
    },
});

class EditProfileModal extends Component {

    
    state = {
        displayName: '',
        bio: '',
        userPicData: '',
        showPicEditor: false,
        preview: null,
    }

    onClose = () => {
        this.setState({preview: null})
    }
      
    onCrop = preview => {
        this.setState({ preview })
    }

    onBeforeFileLoad = elem => {
        if(elem.target.files[0].size > 71680){
            alert("File is too big!");
            elem.target.value = "";
        };
    }

    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        });
    }

    handleShowEditPic = () => {
        this.setState({ showPicEditor: true })
    }

    handleHideEditPic = () => {
        this.setState({ showPicEditor: false })
    }

    handleUpdatePhoto = () => {
        
    }

    handleSubmit = () => {
        this.props.createEvent(this.state);
        this.props.handleHideCreateEventModal();
    }

    render() {
        const { classes } = this.props;

        let avatarSection = (
            <div className='d-flex flex-column align-items-center'>
                <UserAvatar size={120}/>
                <p onClick={this.handleShowEditPic}>Change Photo</p>
            </div>
        )
        if(this.state.showPicEditor) {
            avatarSection = (
                <div className='d-flex flex-column align-items-center'>
                <AvatarEditor
                    width={320}
                    height={225}
                    onCrop={this.onCrop}
                    onClose={this.onClose}
                    onBeforeFileLoad={this.onBeforeFileLoad}/>
                    <div className='d-flex justify-content-end'>
                        <Button variant="contained" color="secondary" className={classes.button} onClick={this.handleHideEditPic}>
                            Cancel
                        </Button>
                    </div>
                </div>
            )
        }

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

                    {avatarSection}
    
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

EditProfileModal.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(EditProfileModal);