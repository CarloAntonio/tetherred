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
import AttendingFriendCard from './attendingFriendCard';

const styles = theme => ({
    main: {
        minHeight: 125,
        marginBottom: 16,
    },
});

class AttendingList extends Component {
    render() {

        const { classes, attendingMembers } = this.props;

        // create member components
        let memberComponents = [];
        if(attendingMembers) attendingMembers.forEach(memberId => memberComponents.push(<AttendingFriendCard key={memberId} uid={memberId} />));

        return ( 
            <Paper className={classes.main}>
                <p>Attending</p>
                <div className="row mx-3">
                    {memberComponents}
                </div>
            </Paper>
        )
    }
}

AttendingList.propTypes = {
    classes: PropTypes.object.isRequired,
};

const mapStateToProps = (state, props) => {
    const eventId = props.match.params.id;

    // check if data is available
    let members = null;
    if(state.firestore.data.eventAuxDetails) members = state.firestore.data.eventAuxDetails[eventId].members;

    // filter for attending meb
    let attendingMembers = [];
    members.forEach(memberId => {
        if(state.firestore.data.eventAuxDetails[eventId].status[memberId] === 'going') attendingMembers.push(memberId)
    });

    return {
        attendingMembers
    }
}

export default compose(
    withRouter,
    withStyles(styles),
    connect(mapStateToProps)
)(AttendingList);