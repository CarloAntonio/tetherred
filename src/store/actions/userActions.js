import * as actionTypes from '../actionTypes';
import { storageRef } from '../../config/fbConfig';

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

export const getUserProfileUrl = uid => {
    return dispatch => {
        storageRef
            .child(`${uid}/profilePic.jpg`)
            .getDownloadURL()
            .then(url => {
                dispatch(addUserProfileUrl(url))
          }).catch(function(error) {
                // Handle any errors
                console.log('Unable to fetch profile pic')
          });
    }
}

const addUserProfileUrl = url => {
    return {
        type: actionTypes.GET_USER_PROFILE_URL,
        url: url
    }
}