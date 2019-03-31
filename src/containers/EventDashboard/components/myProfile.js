// Libraries
import React, { Component } from 'react';
import {compose} from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

// Material UI
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Avatar from '@material-ui/core/Avatar';

// Actions
import { getUserProfileUrl } from '../../../store/actions/userActions';

// Resources
import stockPic from '../../../assets/images/profilePic.jpg';

const styles = theme => ({
    main: {
        minHeight: 125,
        marginBottom: 16,
        padding: '10px 0 0 10px'
    },
    avatar: {
        width: 60,
        height: 60,
    },
    name: {
        textAlign: 'left'
    }
});

class MyProfile extends Component {
    componentWillMount(){
        // get user profile image
        this.props.getUserProfileUrl(this.props.auth.uid);
    }

    render() {
        const { classes, user, auth } = this.props;

        // Setup profile avatar
        let avatar = <Avatar alt="Profile" src={stockPic} className={classes.avatar} />;
        if(user.userProfileImgUrl) avatar = <Avatar alt="Profile" src={user.userProfileImgUrl} className={classes.avatar} />;

        // Setup user Name
        let userName = null;
        if(user && user.userMinDetails && user.userMinDetails[auth.uid]) {
            userName = <p className={classes.name}>{user.userMinDetails[auth.uid].firstName} {user.userMinDetails[auth.uid].lastName}</p>
        }

        return (
            <Paper className={classes.main}>
                {avatar}
                {userName}
            </Paper>
        )
    }
    
}

MyProfile.propTypes = {
    classes: PropTypes.object.isRequired,
};

const mapStateToProps = state => {
    return {
        auth: state.firebase.auth,
        user: state.user
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getUserProfileUrl: (uid) => dispatch(getUserProfileUrl(uid))
    }
}

export default compose(
    withStyles(styles),
    connect(mapStateToProps, mapDispatchToProps),
)(MyProfile);