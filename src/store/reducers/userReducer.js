import * as actionTypes from '../actionTypes';

const initialState = {
    userMinDetails: null,
    userAuxDetails: null,
    userProfileImgUrl: null
};

const getUserMinDetails = (state, action) => {
    return {
        ...state,
        userMinDetails: {
            ...state.userMinDetails,
            [action.payload.uid]: action.payload.data
        }
    }
}

const getUserProfileImgUrl = (state, action) => {
    return {
        ...state,
        userProfileImgUrl: action.url
    }
}

const userReducer = (state = initialState, action) => {
    switch(action.type) {
        case actionTypes.GET_USER_MIN_DETAILS: return getUserMinDetails(state, action);
        case actionTypes.GET_USER_PROFILE_URL: return getUserProfileImgUrl(state, action);
        default: return state;
    }
}

export default userReducer