import React from 'react';
import PropTypes from 'prop-types';
import { Draggable, Droppable } from 'react-beautiful-dnd';

// Material UI
import { withStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Chip from '@material-ui/core/Chip';
import FaceIcon from '@material-ui/icons/Face';
import DoneIcon from '@material-ui/icons/Done';

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

const EventItem = props => {
    const { classes } = props;
    
    return (
        <Draggable draggableId={props.draggableId} index={props.index}>
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
                    {props.itemDetails.name}
                </div>
            )}
        </Draggable>
    )
}

EventItem.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(EventItem);