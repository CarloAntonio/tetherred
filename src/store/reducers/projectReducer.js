import * as actionTypes from '../actionTypes';

const initState = {};

const createEvent = (state, action) => {
    console.log('created project', action.project);
    return state;
}

const createEventError = (state, action) => {
    console.log('create project error', action.err);
    return state;
}

const projectReducer = (state = initState, action) => {
    switch (action.type) {
        case actionTypes.CREATE_EVENT: return createEvent(state, action);
        case actionTypes.CREATE_EVENT_ERROR: return createEventError(state, action);
        default: return state;
    }
}

export default projectReducer;