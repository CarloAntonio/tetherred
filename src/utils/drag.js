
import { setItemOwner, setItemOwnerToNone } from './firestoreAPI';

const onDragEnd = result => {
    // sentinal
    if (!result.destination) return;

    const destination = result.destination.droppableId.split('/')[0];

    switch(destination) {
        case 'myItems': {
            setItemOwner(result) 
            break;
        }
        case 'openItems': {
            setItemOwnerToNone(result);
            break;
        }
    }
}

export default onDragEnd;