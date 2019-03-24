// Libraries
import React, { Component } from 'react';
import {compose} from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';

// Material UI
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';

// Custom Components
import UndecidedFriendCard from './undecidedFriendCard';

const styles = theme => ({
    main: {
        minHeight: '40%',
        marginBottom: 16,
    },
});

class UndecidedList extends Component {
    render() {
        const { classes, undecidedMembers } = this.props;

        // create member components
        let memberComponents = [];
        if(undecidedMembers) undecidedMembers.forEach(memberId => memberComponents.push(<UndecidedFriendCard key={memberId} uid={memberId} />));
    
        return (
            <Paper className={classes.main}>
            <p>Undecided</p>
            {memberComponents}
            </Paper>
        )
    }
}

UndecidedList.propTypes = {
    classes: PropTypes.object.isRequired,
};

const mapStateToProps = (state, props) => {
    const eventId = props.match.params.id;

    // check if data is available
    let members = null;
    if(state.firestore.data.eventAuxDetails) members = state.firestore.data.eventAuxDetails[eventId].members;

    // filter for undecided members
    let undecidedMembers = [];
    members.forEach(memberId => {
        if(state.firestore.data.eventAuxDetails[eventId].status[memberId] === 'undecided') undecidedMembers.push(memberId)
    });

    return {
        undecidedMembers
    }
}

export default compose(
    withRouter,
    withStyles(styles),
    connect(mapStateToProps)
)(UndecidedList);