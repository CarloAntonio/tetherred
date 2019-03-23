// Libraries
import React, { Component } from 'react';
import {compose } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';

// Material UI
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';

// Custom Components
import FriendCard from './friendCard';


const styles = theme => ({
    main: {
        minHeight: 125,
        marginBottom: 16,
    },
});

class FriendsList extends Component {
    render() {

        const { classes, members } = this.props;

        // create member components
        let memberComponents = [];
        if(members) members.forEach(memberId => memberComponents.push(<FriendCard key={memberId} user={memberId} />));

        return ( 
            <Paper className={classes.main}>
                <p>Going</p>
                <div className="row mx-3">
                    {memberComponents}
                </div>
            </Paper>
        )
    }
}

FriendsList.propTypes = {
    classes: PropTypes.object.isRequired,
};

const mapStateToProps = (state, props) => {
    const eventId = props.match.params.id;

    // check if data is available
    let members = null;
    if(state.firestore.data.eventAuxDetails) members = state.firestore.data.eventAuxDetails[eventId].members;

    return {
        members: members
    }
}

export default compose(
    withRouter,
    withStyles(styles),
    connect(mapStateToProps)
)(FriendsList);