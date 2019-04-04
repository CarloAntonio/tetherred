import * as actionTypes from '../actionTypes';

export const createEvent = (event) => {
    return (dispatch, getState, { getFirebase, getFirestore }) => {
        //make asycnc all to database
        const firestore = getFirestore();
        // const profile = getState().firebase.profile;
        const creatorId = getState().firebase.auth.uid;

        firestore.collection('event').add({
            ...event,
            creator: creatorId
            // authorFirstName: profile.firstName,
            // authorLastName: profile.lastName,
            // authorId: authorId,
            // createdAt: new Date()
        }).then(() => {
            dispatch(createNewEvent(event))
        }).catch(err => {
            dispatch(createNewEventError(err))
        });
    }
}

const createNewEvent = event => {
    return {
        type: actionTypes.CREATE_EVENT,
        event
    }
}

const createNewEventError = err => {
    return {
        type: actionTypes.CREATE_EVENT_ERROR,
        err
    }
}

export const diveIntoItem = (item, itemId) => {
    return {
        type: actionTypes.DIVE_INTO_ITEM,
        payload: { item, itemId }
    }
}

export const riseOutOfItem = (riseDetails) => {
    if(riseDetails === 'root') {
        return {
            type: actionTypes.RISE_TO_ROOT
        }
    } else {
        return {
            type: actionTypes.RISE_OUT_OF_ITEM,
            payload: { 
                item: riseDetails.diveItem,
                itemId: riseDetails.diveItemId
            }
        }
    }
}

export const changeFilterValue = (filterValue) => {
    return {
        type: actionTypes.CHANGE_FILTER_VALUE,
        filterValue
    }
}