// Libraries
import React, { Component} from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

// Material UI
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import red from '@material-ui/core/colors/red';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';

const styles = theme => ({
    card: {
      width: '100%',
      height: 100,
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
        wordBreak: 'break-word'
        //marginBottom: 0
    },
    media: {
      height: 0,
      paddingTop: '56.25%', // 16:9
    },
    actions: {
      display: 'flex',

    },
    expand: {
      transform: 'rotate(0deg)',
      marginLeft: 'auto',
      transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
      }),
    },
    expandOpen: {
      transform: 'rotate(180deg)',
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
                {/* <CardHeader
                avatar={
                    <Avatar aria-label="Recipe" className={classes.avatar}>
                    {itemName ? itemName.charAt(0) : ':)'}
                    </Avatar>
                }
                // action={
                //     <IconButton
                //         className={classnames(classes.expand, {
                //         [classes.expandOpen]: this.state.expanded,
                //         })}
                //         onClick={this.handleExpandClick}
                //         aria-expanded={this.state.expanded}
                //         aria-label="Show more"
                //     >
                //         <ExpandMoreIcon />
                //     </IconButton>
                // }
                title={itemName}
                //subheader="September 14, 2016"
                /> */}
                {/* <CardMedia
                className={classes.media}
                image="/static/images/cards/paella.jpg"
                title="Paella dish"
                /> */}
                {/* <CardContent>
                <Typography component="p">
                    This impressive paella is a perfect party dish and a fun meal to cook together with your
                    guests. Add 1 cup of frozen peas along with the mussels, if you like.
                </Typography>
                </CardContent>
                */}

                <CardActions className={classes.actions} disableActionSpacing>
                <IconButton aria-label="Add to favorites">
                    <FavoriteIcon />
                </IconButton>
                <IconButton aria-label="Share">
                    <ShareIcon />
                </IconButton>
                
                </CardActions>
                {/* <Collapse in={this.state.expanded} timeout="auto" unmountOnExit>
                    <CardContent>
                        <Typography paragraph>Details:</Typography>
                        <Typography>
                            {this.props.itemDetails.rootParentItem ? `Root: ${this.props.itemDetails.rootParentItem.name}` : 'Root'}
                        </Typography>
                        <Typography paragraph>
                        Heat oil in a (14- to 16-inch) paella pan or a large, deep skillet over medium-high
                        heat. Add chicken, shrimp and chorizo, and cook, stirring occasionally until lightly
                        browned, 6 to 8 minutes. Transfer shrimp to a large plate and set aside, leaving
                        chicken and chorizo in the pan. Add pimentón, bay leaves, garlic, tomatoes, onion,
                        salt and pepper, and cook, stirring often until thickened and fragrant, about 10
                        minutes. Add saffron broth and remaining 4 1/2 cups chicken broth; bring to a boil.
                        </Typography>
                    </CardContent>
                </Collapse>  */}
            </Card>
        )
    }
}

EventCard.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(EventCard);