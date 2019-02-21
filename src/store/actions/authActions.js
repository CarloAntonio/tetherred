import * as actionTypes from '../actionTypes';

export const signIn = credientials => {
    return (dispatch, getState, {getFirebase}) => {
        const firebase = getFirebase();

        firebase.auth().signInWithEmailAndPassword(
            credientials.email,
            credientials.password
        ).then(res => {
            dispatch(loginSuccess());
        }).catch(err => {
            dispatch(loginError(err));
        })
    }
}

const loginSuccess = () => {
    return {
        type: actionTypes.LOGIN_SUCCESS,
    }
}

const loginError = (err) => {
    return {
        type: actionTypes.LOGIN_ERROR,
        err
    }
}

export const signOut = () => {
    return (dispatch, getState, { getFirebase }) => {
        const firebase = getFirebase();

        firebase.auth().signOut()
        .then(() => {
            dispatch(signoutSuccess());
        }).catch(err => {
            //handle error
        })
    }
}

const signoutSuccess = () => {
    return {
        type: actionTypes.SIGNOUT_SUCCESS
    }
}

export const signUp = newUser => {
    return (dispatch, getState, {getFirebase, getFirestore}) => {
        const firebase = getFirebase();
        const firestore = getFirestore();

        firebase.auth().createUserWithEmailAndPassword(
            newUser.email,
            newUser.password
        ).then(res => {
            return firestore.collection('userMinDetails').doc(res.user.uid).set({
                firstName: newUser.firstName,
                lastName: newUser.lastName,
                initials: newUser.firstName[0] + newUser.lastName[0]
            })
        }).then(() => {
            dispatch(signupSuccess());
        }).catch(err => {
            console.log(err);
            dispatch(signupError(err));
        })
    }
}

const signupSuccess = () => {
    return {
        type: actionTypes.SIGNUP_SUCCESS,
    }
}

const signupError = (err) => {
    return {
        type: actionTypes.SIGNUP_ERROR,
        err
    }
}