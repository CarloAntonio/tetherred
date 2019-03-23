import * as actionTypes from '../actionTypes';

export const getUserMinDetails = uid => {
    return (dispatch, getState, { getFirebase, getFirestore }) => {
        //make asycnc call to database
        const firestore = getFirestore();

        firestore.collection('userMinDetails')
        .doc(uid)
        .get()
        .then(doc => {
            dispatch(addMinUserDetails(doc.id, doc.data()))
        }).catch(err => {
            console.log(err)
        });
    }
}

const addMinUserDetails = (uid, data) => {
    return {
        type: actionTypes.GET_USER_MIN_DETAILS,
        payload: {
            uid, 
            data
        }
    }
}