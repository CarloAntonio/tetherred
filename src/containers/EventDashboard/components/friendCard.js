// Libraries
import React, { Component } from 'react';
import { connect } from 'react-redux';

// Actions
import { getUserMinDetails } from '../../../store/actions/userActions';

class FriendCard extends Component {

    componentDidMount() {
        this.props.getUserMinDetails(this.props.user);
    }

    render() {
        console.log(this.props);

        return (
            <div>Friend
                
            </div>
        )
    }
}

const mapStateToProps = (state, props) => {
    console.log(props.user);
    console.log(state);

    return {
        minUserData: state.usersData.userMinDetails
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getUserMinDetails: (uid) => dispatch(getUserMinDetails(uid)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(FriendCard);