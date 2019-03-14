
import { setItemOwner } from './firestoreAPI';

const onDragEnd = result => {
    // sentinal
    if (!result.destination) return;

    const destination = result.destination.droppableId.split('/')[0];
    const newOwnerId = result.destination.droppableId.split('/')[1];

    switch(destination) {
        case 'myItems': setItemOwner(newOwnerId, result)
    }
}

export default onDragEnd;