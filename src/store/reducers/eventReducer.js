import * as actionTypes from '../actionTypes';

const initialState = {
    diveItem: null
};

const diveIntoItem = (state, action) => {
    console.log(action.item);
    return {
        ...state,
        diveItem: action.item
    }
}

const createEvent = (state, action) => {
    console.log('created project', action.project);
    return state;
}

const createEventError = (state, action) => {
    console.log('create project error', action.err);
    return state;
}

const eventReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.CREATE_EVENT: return createEvent(state, action);
        case actionTypes.CREATE_EVENT_ERROR: return createEventError(state, action);
        case actionTypes.DIVE_INTO_ITEM: return diveIntoItem(state, action);
        default: return state;
    }
}

export default eventReducer;