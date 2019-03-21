import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux';
import { compose } from 'redux'
import { Draggable, Droppable } from 'react-beautiful-dnd';
import _ from 'lodash';

// Material UI
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import Avatar from '@material-ui/core/Avatar';

// Utils
import { diveIntoItem } from '../../../store/actions/eventActions';

const styles = {
    card: {
      width: '100%',
    },
};

class EventItem extends Component {
    render () {
        const { classes } = this.props;

        console.log(this.props.itemDetails);
        console.log(this.props.itemDetails.rootParentItem)

        let cardContent = null;
        if(this.props.itemDetails) {
            if(!_.isEmpty(this.props.itemDetails.data.children) && this.props.itemDetails.rootParentItem) {
                if(this.props.itemDetails.rootParentItem.parent === 'root') {
                    console.log('1')
                    cardContent = (
                        <CardContent onClick={() => this.props.diveIntoItem(this.props.itemDetails.data)}>
                            <Typography component="p">
                                {this.props.itemDetails.data.name}
                            </Typography>
                            <Typography 
                                color="textSecondary" 
                                onClick={() => this.props.diveIntoItem(null)}>
                                {this.props.itemDetails.rootParentItem ? `Root: ${this.props.itemDetails.rootParentItem.name}` : 'Root'}
                            </Typography>
                        </CardContent>
                    )
                } else {
                    console.log('2')
                    cardContent = (
                        <CardContent onClick={() => this.props.diveIntoItem(this.props.itemDetails.data)}>
                            <Typography component="p">
                                {this.props.itemDetails.data.name}
                            </Typography>
                            <Typography 
                                color="textSecondary" 
                                onClick={() => this.props.diveIntoItem(this.props.itemDetails.rootParentItem)}>
                                {this.props.itemDetails.rootParentItem ? `Root: ${this.props.itemDetails.rootParentItem.name}` : 'Root'}
                            </Typography>
                        </CardContent>
                    )
                }
            } else if(!_.isEmpty(this.props.itemDetails.data.children) && !this.props.itemDetails.rootParentItem){
                console.log('3')
                cardContent = (
                    <Card className={classes.card} >
                        <CardContent onClick={() => this.props.diveIntoItem(this.props.itemDetails.data)}>
                            <Typography component="p">
                                {this.props.itemDetails.data.name}
                            </Typography>
                            <Typography color="textSecondary">
                                {this.props.itemDetails.rootParentItem ? `Root: ${this.props.itemDetails.rootParentItem.name}` : 'Root'}
                            </Typography>
                        </CardContent>
                    </Card>
                )
            } else if(_.isEmpty(this.props.itemDetails.data.children) && this.props.itemDetails.rootParentItem) {
                console.log('4')
                cardContent = (
                    <CardContent>
                        <Typography component="p">
                            {this.props.itemDetails.data.name}
                        </Typography>
                        <Typography 
                            color="textSecondary" 
                            onClick={() => this.props.diveIntoItem(null)}>
                            {this.props.itemDetails.rootParentItem ? `Root: ${this.props.itemDetails.rootParentItem.name}` : 'Root'}
                        </Typography>
                    </CardContent>
                )
            } else {
                console.log('5')
                cardContent = (
                    <Card className={classes.card} >
                        <CardContent>
                            <Typography component="p">
                                {this.props.itemDetails.data.name}
                            </Typography>
                            <Typography color="textSecondary">
                                {this.props.itemDetails.rootParentItem ? `Parent: ${this.props.itemDetails.rootParentItem.name}` : 'Root'}
                            </Typography>
                        </CardContent>
                    </Card>
                )
            }
        }
        

        return (
            <div 
                className={this.props.parentContainer === 'pool' ? "col-2" : 'col-12'} 
                style={{ margin: 8, padding: 0}}>
                <Draggable draggableId={this.props.draggableId} index={this.props.index}>
                    {provided => (
                        <div
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            ref={provided.innerRef}
                        >   
                            <Card className={classes.card} >
                                {cardContent}
                            </Card>
                        </div>
                    )}
                </Draggable>
            </div>
            
        )
    }
}

EventItem.propTypes = {
    classes: PropTypes.object.isRequired,
};

const mapDispatchToProps = dispatch => {
    return {
        diveIntoItem: item => dispatch(diveIntoItem(item)),
    }
}

export default compose(
    withRouter,
    withStyles(styles),
    connect(null, mapDispatchToProps)
)(EventItem);