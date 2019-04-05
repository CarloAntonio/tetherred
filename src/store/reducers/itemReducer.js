import * as actionTypes from '../actionTypes';

const initialState = {
    showEditItemModal: false,
    editItemModalTargetId: ''
};

const showEditItemModal = (state, action) => {
    return {
        ...state,
        showEditItemModal: true,
        editItemModalTargetId: action.itemId
    }
}

const hideEditItemModal = (state, action) => {
    return {
        ...state,
        showEditItemModal: false,
        editItemModalTargetId: ''
    }
}

const eventReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.SHOW_EDIT_ITEM_MODAL: return showEditItemModal(state, action);
        case actionTypes.HIDE_EDIT_ITEM_MODAL: return hideEditItemModal(state, action);
        default: return state;
    }
}

export default eventReducer;