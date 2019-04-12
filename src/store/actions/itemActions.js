
import { isEmpty } from 'lodash';
import * as actionTypes from '../actionTypes';

export const addNewItem = (formData, eventId) => {
    return (dispatch, getState, { getFirebase, getFirestore }) => {
        //make asycnc all to database
        const firestore = getFirestore();

        firestore
            .collection('eventAuxDetails')
            .doc(eventId)
            .collection('items')
            .add({
                name: formData.itemName,
                owner: 'none',
                parent: 'root',
                children: []
            }).then(doc => {
                if(!isEmpty(formData.parts)) dispatch(addSubItems(doc.id, formData.parts, eventId));
            }).catch(err => {
                console.log(err);
            });
    }
}

export const addSubItems = (parentId, partsObject, eventId) => {
    return (dispatch, getState, { getFirebase, getFirestore }) => {
        //make asycnc all to database
        const firestore = getFirestore();

        Object.keys(partsObject).map(partKey => {
            firestore
            .collection('eventAuxDetails')
            .doc(eventId)
            .collection('items')
            .add({
                name: partsObject[partKey],
                owner: 'none',
                parent: parentId,
                children: []
            }).then(doc => {
                dispatch(updateParentItemChildren(eventId, parentId, doc.id))
            }).catch(err => {
                console.log(err);
            });
        })
    }
}

export const addChildItemsFromEditItemModal = (eventId, parentId, data) => {
    return (dispatch, getState, { getFirebase, getFirestore }) => {
        data.children.forEach(childItem => {
            if(childItem.inFirestore === false){
                dispatch(addChildItem(eventId, parentId, childItem.data))
            }
        })
    }
}

export const addChildItem = (eventId, parentId, childData) => {
    return (dispatch, getState, { getFirebase, getFirestore }) => {
        //make asycnc all to database
        const firestore = getFirestore();

        firestore
            .collection('eventAuxDetails')
            .doc(eventId)
            .collection('items')
            .add(childData).then(doc => {
                dispatch(updateParentItemChildren(eventId, parentId, doc.id))
            }).catch(err => {
                console.log(err);
            });
    }
}

export const updateParentItemChildren = (eventId, parentId, childId) => {
    return (dispatch, getState, { getFirebase, getFirestore }) => {
        //make asycnc all to database
        const firestore = getFirestore();

        firestore
            .collection('eventAuxDetails')
            .doc(eventId)
            .collection('items')
            .doc(parentId)
            .update({
                children: firestore.FieldValue.arrayUnion(childId)
            }).catch(err => {
                console.log(err);
            });
    }
}

export const showEditItemModal = (itemId) => {
    return {
        type: actionTypes.SHOW_EDIT_ITEM_MODAL,
        itemId
    }
}

export const hideEditItemModal = () => {
    return {
        type: actionTypes.HIDE_EDIT_ITEM_MODAL
    }
}