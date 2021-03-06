
import { combineReducers } from 'redux';
import { firestoreReducer } from 'redux-firestore';
import { firebaseReducer } from 'react-redux-firebase';

import authReducer from './authReducer';
import eventReducer from './eventReducer';
import userReducer from './userReducer';
import itemReducer from './itemReducer';

const rootReducer = combineReducers({
    auth: authReducer,
    event: eventReducer,
    user: userReducer,
    item: itemReducer,
    firestore: firestoreReducer,
    firebase: firebaseReducer
});

export default rootReducer;