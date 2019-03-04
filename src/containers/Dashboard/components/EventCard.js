import React from 'react';
import { withRouter } from 'react-router-dom';
// import moment from 'moment';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

// Material UI
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const styles = {
    card: {
      maxWidth: 345,
      height: 345,
      marginBottom: 16
    },
    media: {
      // ⚠️ object-fit is not supported by IE 11.
      objectFit: 'cover',
    },
  };
  

const EventCard = props => {
    const { classes, event, eventKey } = props;
    if(!event) return null;

    return (
        <Card className={classes.card + ' col-6'}>
            <CardActionArea>
                <CardMedia
                component="img"
                alt="Contemplative Reptile"
                className={classes.media}
                height="140"
                image="https://loremflickr.com/320/240/dog"
                title="Contemplative Reptile"/>
                <CardContent>
                <Typography gutterBottom variant="h5" component="h2">
                    {event.title}
                </Typography>
                <Typography component="p">
                    {event.description}
                </Typography>
                </CardContent>
            </CardActionArea>
            <CardActions>
                <Button size="small" color="primary">
                    Show More
                </Button>
                <Button 
                    onClick={() => props.history.push(`/event/${eventKey}`)}
                    size="small" 
                    color="primary">
                    Jump In
                </Button>
            </CardActions>
        </Card>
    );
}

EventCard.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withRouter(withStyles(styles)(EventCard));