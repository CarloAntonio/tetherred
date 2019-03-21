import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom'
import { Draggable, Droppable } from 'react-beautiful-dnd';

// Material UI
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import Avatar from '@material-ui/core/Avatar';


const styles = {
    card: {
      width: '90%',
    },
};

class MyEventItem extends Component {
    state = {
        showParent: false
    }

    handleDelete = () => {
        this.setState({ showParent: true})
    }

    render () {
        const { classes } = this.props;

        let item = null;
        if(this.props.itemDetails) {
            item = (
                <Card className={classes.card}>
                    <CardContent>
                        <Typography component="p">
                            {this.props.itemDetails.data.name}
                        </Typography>
                        <Typography color="textSecondary">
                            {this.props.itemDetails.rootParentItem ? `Root: ${this.props.itemDetails.rootParentItem.name}` : 'Root Item'}
                        </Typography>
                    </CardContent>
                </Card>
            )
        }

        return (
            <div className='col-12' style={{ margin: 8, padding: 0}}>
                <Draggable draggableId={this.props.draggableId} index={this.props.index}>
                    {provided => (
                        <div
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            ref={provided.innerRef}
                        >   
                            {item}
                        </div>
                    )}
                </Draggable>
            </div>
            
        )
    }
}

MyEventItem.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withRouter(withStyles(styles)(MyEventItem));