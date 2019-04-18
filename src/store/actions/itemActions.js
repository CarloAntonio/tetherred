
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

export const handleChildItemsFromEditItemModal = (eventId, parentId, data) => {
    return (dispatch, getState, { getFirebase, getFirestore }) => {
        data.children.forEach(childItem => {
            if(childItem.inFirestore === false){
                dispatch(addChildItem(eventId, parentId, childItem.data))
            }
            if(childItem.shouldDelete === true){
                dispatch(deleteChildItem(eventId, parentId, childItem.id))
            }
        })
    }
}

export const handleDeleteFromEventCard = (eventId, parentId, eventDetails) => {
    return (dispatch, getState, { getFirebase, getFirestore }) => {
        const state = getState();

        // no child items
        if(eventDetails.data.children.length === 0) {
            // is root item
            if(parentId === 'root') {
                // deleting root with no children
                dispatch(deleteRootItem(eventId, parentId, eventDetails.id))
            } else {
                // deleting non-root with no children
                dispatch(deleteChildItem(eventId, parentId, eventDetails.id))
            }
        } else {
            eventDetails.data.children.forEach(childId => {
                dispatch(recursivelyFindChildItem(eventId, childId, state.firestore.data.eventAuxDetails[eventId].items[childId]))
            })
        }
    }
}

export const recursivelyFindChildItem = (eventId, itemId, itemData) => {
    return (dispatch, getState, { getFirebase, getFirestore }) => {
        const state = getState();

        if(itemData.children.length === 0){
            console.log('dug to the bottom, should always be called')
            // deleting non-root with no children
            dispatch(recursivelyDeleteChildItem(eventId, itemData.parent, itemId))
        } else {
            itemData.children.forEach(childId => {
                dispatch(recursivelyFindChildItem(eventId, childId, state.firestore.data.eventAuxDetails[eventId].items[childId]));
            })
        }
    }
}

export const recursivelyDeleteChildItem = (eventId, parentId, itemId) => {
    return (dispatch, getState, { getFirebase, getFirestore }) => {
        const state = getState();
        console.log(state.firestore.data.eventAuxDetails[eventId].items[parentId]);
        //make asycnc all to database
        const firestore = getFirestore();

        firestore
            .collection('eventAuxDetails')
            .doc(eventId)
            .collection('items')
            .doc(itemId)
            .delete()
            .then(() => {
                
                // if the last item from the parent is deleted
                if(state.firestore.data.eventAuxDetails[eventId].items[parentId].children.length <= 1) {
                    // delete parent
                    if(state.firestore.data.eventAuxDetails[eventId].items[parentId].parent === 'root'){
                        dispatch(deleteRootItem(eventId, state.firestore.data.eventAuxDetails[eventId].items[parentId].parent, parentId))
                    } else {
                        dispatch(recursivelyDeleteChildItem(eventId, state.firestore.data.eventAuxDetails[eventId].items[parentId].parent,parentId))
                    }
                } else {
                    // delete child reference from parent
                    dispatch(deleteChildItemFromParent(eventId, parentId, itemId))
                }
            }).catch(err => {
                console.log(err);
            });
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

export const deleteRootItem = (eventId, parentId, rootId) => {
    return (dispatch, getState, { getFirebase, getFirestore }) => {
        //make asycnc all to database
        const firestore = getFirestore();

        firestore
            .collection('eventAuxDetails')
            .doc(eventId)
            .collection('items')
            .doc(rootId)
            .delete()
            .then(() => {
                console.log('root item deleted');
            }).catch(err => {
                console.log(err);
            });
    }
}

export const deleteChildItem = (eventId, parentId, childId) => {
    return (dispatch, getState, { getFirebase, getFirestore }) => {
        //make asycnc all to database
        const firestore = getFirestore();

        firestore
            .collection('eventAuxDetails')
            .doc(eventId)
            .collection('items')
            .doc(childId)
            .delete()
            .then(() => {
                dispatch(deleteChildItemFromParent(eventId, parentId, childId))
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
                children: firestore.FieldValue.arrayUnion(childId),
            }).catch(err => {
                console.log(err);
            });
    }
}

export const deleteChildItemFromParent = (eventId, parentId, childId) => {
    return (dispatch, getState, { getFirebase, getFirestore }) => {
        //make asycnc all to database
        const firestore = getFirestore();

        firestore
            .collection('eventAuxDetails')
            .doc(eventId)
            .collection('items')
            .doc(parentId)
            .update({
                children: firestore.FieldValue.arrayRemove(childId),
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