// Libraries
import React, { Component } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

// Material UI
import Avatar from '@material-ui/core/Avatar';
import { withStyles } from '@material-ui/core/styles';

// Actions
import { getUserProfileUrl } from '../store/actions/userActions';

// Resources
import stockPic from '../assets/images/profilePic.jpg'

const styles = theme => ({
    avatar: {
        width: 40,
        height: 40,
    },
});

class UserAvatar extends Component {
    componentWillMount(){
        // get user profile image if it doesn't exist
        if(this.props.user && !this.props.user.userProfileImgUrl)
        this.props.getUserProfileUrl(this.props.auth.uid);
    }

    render() {
        const { classes, user, size } = this.props;

        // Setup profile avatar
        let avatar = <Avatar alt="Profile" src={stockPic} style={{ height: size, height: size }} />;
        if(user.userProfileImgUrl) avatar = <Avatar alt="Profile" src={user.userProfileImgUrl} style={{ height: size, width: size }} />;

        return avatar;
    }
}

UserAvatar.propTypes = {
    classes: PropTypes.object.isRequired,
    size: PropTypes.number.isRequired
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
)(UserAvatar);