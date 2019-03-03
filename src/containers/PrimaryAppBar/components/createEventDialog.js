import React, { Component } from 'react';
import { connect } from 'react-redux';

// Material UI
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

// Actions
import { createEvent } from '../../../store/actions/eventActions';

class CreateEventDialog extends Component {
  state = {
    title: '',
    description: '',
    location: '',
    type: 'private'
  }

  handleChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value
    });
  }

  handleSubmit = () => {
    this.props.createEvent(this.state);
    this.props.handleHideCreateEventModal();
  }

  render() {
    return(
      <Dialog
        open={this.props.showCreateEventModal}
        onClose={this.props.handleHideCreateEventModal}
        aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Create A New Event</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dicta quod a nulla veritatis ullam repudiandae qui odio maiores id mollitia natus ex omnis, est commodi consequuntur, error, consectetur atque deserunt.
          </DialogContentText>

          <TextField
            onChange={this.handleChange}
            autoFocus
            margin="dense"
            id="title"
            label="Event Title"
            variant="outlined"
            fullWidth/>

          <TextField
            onChange={this.handleChange}
            id="description"
            label="Event Desciption"
            multiline
            rows="4"
            margin="normal"
            variant="outlined"
            fullWidth/>

          <TextField
            onChange={this.handleChange}
            autoFocus
            margin="dense"
            id="location"
            label="Event Location"
            variant="outlined"
            fullWidth/>

        </DialogContent>
        <DialogActions>
          <Button onClick={this.props.handleHideCreateEventModal} color="primary">
            Cancel
          </Button>
          <Button onClick={this.handleSubmit} color="primary">
            Create
          </Button>
        </DialogActions>
      </Dialog>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return {
    createEvent: project => dispatch(createEvent(project))
  }
}


export default connect(null, mapDispatchToProps)(CreateEventDialog);