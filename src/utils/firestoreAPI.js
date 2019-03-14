import { db } from '../config/fbConfig';

export const setItemOwner = (newOwnerId, result) => {
    db.collection(`eventAuxDetails`)
        .doc(result.source.droppableId)
        .collection('items')
        .doc(result.draggableId)
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

export async function getItemParent(eventId, parentDocId) {
    return db.collection(`eventAuxDetails`)
        .doc(eventId)
        .collection('items')
        .doc(parentDocId)
        .get()
        .then(doc => {
            if(doc.exists) return { id: doc.id, data: doc.data() };
        })
        .catch(err => {
            console.log(err)
        });
}

export async function getMyItems(eventId, myUserId) {
    return db.collection('eventAuxDetails')
        .doc(eventId)
        .collection('items')
        .where('owner', '==', myUserId)
        .get()
        .then(snapshot => {
            const myItems = []
            snapshot.forEach(doc => {
                    myItems.push({
                    id: doc.id,
                    data: doc.data()
                });
            });
            return myItems;
        })
        .catch(err => {
            console.log(err);
        })
}