import React from 'react';
import PropTypes from 'prop-types';
import { Droppable } from 'react-beautiful-dnd'

// Material UI
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

const styles = theme => ({
    myItemsContainer: {
        backgroundColor: 'white'
    },
    itemsHolder: {
        minHeight: 100
    }
});

const MyItems = props => {
    const { classes } = props;

    return (
        <div className={classes.myItemsContainer}>
            <p>Stuff I'm Bringing</p>
            <Droppable droppableId={props.droppableId}>
                {(provided) => (
                    <div 
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                        className={classes.itemsHolder}
                    >
                        {provided.placeholder}
                    </div>
                )}
            </Droppable>
        </div>
    )
}

MyItems.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(MyItems);