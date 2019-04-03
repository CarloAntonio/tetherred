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
import red from '@material-ui/core/colors/red';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';

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
});

class EventCard extends Component{

    state = { expanded: false };

    handleExpandClick = () => {
      this.setState(state => ({ expanded: !state.expanded }));
    };

    render() {
        const { classes, itemName } = this.props;

        return (
            <Card className={classes.card}>
                <div className={classes.header}>
                    <Avatar aria-label="Recipe" className={classes.avatar}>
                        {itemName ? itemName.charAt(0) : ':)'}
                    </Avatar>
                    <p className={classes.title}>{itemName}</p>
                </div>
                <CardActions className={classes.actions} disableActionSpacing>
                    <IconButton aria-label="Add to favorites">
                        <FavoriteIcon />
                    </IconButton>
                    <IconButton aria-label="Share">
                        <ShareIcon />
                    </IconButton>
                </CardActions>
            </Card>
        )
    }
}

EventCard.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(EventCard);