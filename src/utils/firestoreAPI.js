import { db } from '../config/fbConfig';

export const setItemOwner = result => {
    const newOwnerId = result.destination.droppableId.split('/')[1];
    const eventId = result.source.droppableId.split('/')[1];
    const itemId = result.draggableId;

    db.collection(`eventAuxDetails`)
        .doc(eventId)
        .collection('items')
        .doc(itemId)
        .update({
            owner: newOwnerId
        })
        .then(() => {
            console.log('Document Successfully Updated');
        })
        .catch(err => {
            console.log('Error updating doc: ', err);
        })
}

export const setItemOwnerToNone = result => {
    const eventId = result.destination.droppableId.split('/')[1];
    const itemId = result.draggableId;

    db.collection(`eventAuxDetails`)
        .doc(eventId)
        .collection('items')
        .doc(itemId)
        .update({
            owner: 'none'
        })
        .then(() => {
            console.log('Document Successfully Updated');
        })
        .catch(err => {
            console.log('Error updating doc: ', err);
        })
}