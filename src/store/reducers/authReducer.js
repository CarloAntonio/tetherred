import * as actionTypes from '../actionTypes';

const initState = {
    authError: null
}

const loginError = (state, action) => {
    return {
        ...state,
        authError: 'Login Failed'
    };
}

const loginSuccess = (state, action) => {
    return {
        ...state,
        authError: null
    }
}

const signoutSuccess = (state, action) => {
    return state;
}

const signupSuccess = (state, action) => {
    console.log('signup success');
    return {
        ...state,
        authError: null
    }
}

const signupError = (state, action) => {
    console.log('signup error');
    return {
        ...state,
        authError: action.err.message
    }
}

const authReducer = (state = initState, action) => {
    switch(action.type) {
        case actionTypes.LOGIN_ERROR: return loginError(state, action);
        case actionTypes.LOGIN_SUCCESS: return loginSuccess(state, action);
        case actionTypes.SIGNOUT_SUCCESS: return signoutSuccess(state, action);
        case actionTypes.SIGNUP_SUCCESS: return signupSuccess(state, action);
        case actionTypes.SIGNUP_ERROR: return signupError(state, action);
        default: return state;
    }
}

export default authReducer;