// Libraries
import React, { Component} from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

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

// import FavoriteIcon from '@material-ui/icons/Favorite';
// import ShareIcon from '@material-ui/icons/Share';

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
    title: {
        marginTop: 8,
        wordBreak: 'break-word',
        marginBottom: 0
    },
    actions: {
        display: 'flex',
        padding: 0
    },
    cardType: {
        padding: '12px 15px',
        margin: 0,
        color: 'tomato'
    }
});

class EventCard extends Component{

    render() {
        const { classes, itemName, itemDetails } = this.props;
        
        return (
            <Card className={classes.card}>
                <div className={classes.header}>
                    <Avatar aria-label="Recipe" className={classes.avatar}>
                        {itemName ? itemName.charAt(0) : ':)'}
                    </Avatar>
                    <p className={classes.title}>{itemName}</p>
                </div>
                <CardActions className={classes.actions} disableActionSpacing>
                    <Tooltip title='Edit' aria-label='Edit'>
                        <IconButton aria-label="Edit Card">
                            <EditIcon />
                        </IconButton>
                    </Tooltip>

                    <Tooltip title='Inspect' aria-label='Inspect'>
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

export default withStyles(styles)(EventCard);