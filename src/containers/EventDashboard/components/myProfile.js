// Libraries
import React, { Component } from 'react';
import {compose} from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

// Material UI
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Avatar from '@material-ui/core/Avatar';

// Custom Components
import UserAvatar from '../../../components/UserAvatar';

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
    name: {
        textAlign: 'left'
    }
});

class MyProfile extends Component {
    render() {
        const { classes, user, auth } = this.props;

        // Setup user Name
        let userName = null;
        if(user && user.userMinDetails && user.userMinDetails[auth.uid]) {
            userName = <p className={classes.name}>{user.userMinDetails[auth.uid].firstName} {user.userMinDetails[auth.uid].lastName}</p>
        }

        return (
            <Paper className={classes.main}>
                <UserAvatar size={50}/>
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

export default compose(
    withStyles(styles),
    connect(mapStateToProps),
)(MyProfile);