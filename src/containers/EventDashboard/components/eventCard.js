// Libraries
import React, { Component} from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux'
import PropTypes from 'prop-types';
import _ from 'lodash';

// Material UI
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import red from '@material-ui/core/colors/red';
import EditIcon from '@material-ui/icons/Edit';
import InspectIcon from '@material-ui/icons/Search';
import Button from '@material-ui/core/Button';

// Actions
import { diveIntoItem } from '../../../store/actions/eventActions';


const styles = theme => ({
    card: {
      width: '100%',
      height: 110,
    },
    header: {
        display: 'flex',
        justifyContent: 'around'
    },
    avatar: {
      backgroundColor: red[500],
      margin: 8
    },
    actions: {
        display: 'flex',
        padding: 0
    },
    cardType: {
        padding: '12px 15px',
        margin: 0,
        color: 'tomato'
    },
    button: {
        margin: 0,
        height: 60
    },
});

class EventCard extends Component{

    render() {
        const { classes, itemName, itemDetails } = this.props;

        let nameArea = (
            <Button className={classes.button} disabled>
                {itemName}
            </Button>
        )
        if(!_.isEmpty(itemDetails.data.children)) {
            nameArea = (
                <Tooltip title='Dive' aria-label='Dive' placement='top'>
                    <Button color="primary" className={classes.button} onClick={() => this.props.diveIntoItem(this.props.itemDetails.data)}>
                        {itemName}
                    </Button>
                </Tooltip>
            )
        }
        
        return (
            <Card className={classes.card}>
                <div className={classes.header}>
                    <Tooltip title='Drag Me!' aria-label='Drag Me!' placement='top'>
                        <Avatar aria-label="Recipe" className={classes.avatar}>
                            {itemName ? itemName.charAt(0) : ':)'}
                        </Avatar>
                    </Tooltip>
                    {nameArea}
                </div>
                <CardActions className={classes.actions} disableActionSpacing>
                    <Tooltip title='Edit' aria-label='Edit'>
                        <IconButton aria-label="Edit Card">
                            <EditIcon />
                        </IconButton>
                    </Tooltip>

                    <Tooltip title='Details' aria-label='Details'>
                        <IconButton aria-label="Inspect Card">
                            <InspectIcon />
                        </IconButton>
                    </Tooltip>
                    
                    <Tooltip 
                        title={itemDetails.data.parent === 'root' ? 'Root Component' : 'Child Component' } 
                        aria-label={itemDetails.data.parent === 'root' ? 'Root' : 'Child' }>
                        <h5 className={classes.cardType}>
                            {itemDetails.data.parent === 'root' ? 'R' : 'C' }
                        </h5>
                    </Tooltip>
                </CardActions>
            </Card>
        )
    }
}

EventCard.propTypes = {
    classes: PropTypes.object.isRequired,
};

const mapDispatchToProps = dispatch => {
    return {
        diveIntoItem: item => dispatch(diveIntoItem(item)),
    }
}

export default compose(
    withStyles(styles),
    connect(null, mapDispatchToProps)
)(EventCard);