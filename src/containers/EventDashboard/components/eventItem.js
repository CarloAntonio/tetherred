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

    render () {
        const { classes } = this.props;

        let parentheader = null;
        if(this.props.itemDetails && this.props.itemDetails.rootParentItem){
            parentheader=(
                <h3>{this.props.itemDetails.rootParentItem.name}</h3>
            )
        }

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
                        {parentheader}
                        {this.props.itemDetails ? this.props.itemDetails.data.name : null }
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