import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom'
import { Draggable, Droppable } from 'react-beautiful-dnd';

// Material UI
import { withStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Chip from '@material-ui/core/Chip';
import FaceIcon from '@material-ui/icons/Face';
import DoneIcon from '@material-ui/icons/Done';

// Utils
import { getItemParent} from '../../../utils/firestoreAPI';

const styles = theme => ({
    chip: {
      margin: theme.spacing.unit,
    },
});

function handleDelete() {
    alert('You clicked the delete icon.'); // eslint-disable-line no-alert
}

function handleClick() {
    alert('You clicked the Chip.'); // eslint-disable-line no-alert
}

class EventItem extends Component {
    state = {
        parentData: null
    }
    
    componentDidMount() {
        if(this.props.itemDetails.parent !== 'none') {
            getItemParent(this.props.match.params.id, this.props.itemDetails.parent)
                .then(parentData => {
                    this.setState({ parentData })
                });
        }
    }

    render () {
        const { classes } = this.props;

        return (
            <Draggable draggableId={this.props.draggableId} index={this.props.index}>
                {provided => (
                    // <Chip
                    //     {...provided.draggableProps}
                    //     {...provided.dragHandleProps}
                    //     ref={provided.innerRef}
                    //     avatar={<Avatar>B</Avatar>}
                    //     label={props.itemDetails.name}
                    //     // clickable
                    //     className={classes.chip}
                    //     color="primary"
                    //     onDelete={handleDelete}
                    //     // onClick={handleClick}
                    //     deleteIcon={<DoneIcon />}/>
                    <div
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        ref={provided.innerRef}
                    >   
                        <h3>{this.state.parentData ? this.state.parentData.data.name : null}</h3>
                        {this.props.itemDetails ? this.props.itemDetails.name : null }
                    </div>
                )}
            </Draggable>
        )
    }
}

EventItem.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withRouter(withStyles(styles)(EventItem));