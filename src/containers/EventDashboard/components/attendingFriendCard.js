// Libraries
import React, { Component } from 'react';
import {compose} from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

// Material UI
import { withStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';

// Actions
import { getUserMinDetails } from '../../../store/actions/userActions';

const styles = {
    avatar: {
        margin: 10,
        width: 35,
        height: 35,
    },
}

class FriendCard extends Component {

    componentDidMount() {
        this.props.getUserMinDetails(this.props.uid);
    }

    render() {
        const { classes } = this.props;

        let initials = '';
        let fullName = '';
        if(this.props.minUserData && this.props.minUserData[this.props.uid]) {
            initials = this.props.minUserData[this.props.uid].initials;
            fullName = `${this.props.minUserData[this.props.uid].firstName} ${this.props.minUserData[this.props.uid].lastName}`
        }
            
        return (
            <div className='d-flex align-items-center'>
                <Avatar className={classes.avatar}>{initials}</Avatar>
                {fullName}
            </div>
            
        )
    }
}

FriendCard.propTypes = {
    classes: PropTypes.object.isRequired,
};

const mapStateToProps = (state, props) => {
    return {
        minUserData: state.usersData.userMinDetails
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getUserMinDetails: (uid) => dispatch(getUserMinDetails(uid)),
    }
}

export default compose(
    withStyles(styles),
    connect(mapStateToProps, mapDispatchToProps)
)(FriendCard);