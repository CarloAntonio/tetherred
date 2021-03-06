import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/storage';

// Initialize Firebase
var config = {
    apiKey: "AIzaSyAT4c_Yf2DnZfbFq_BPDsSxIeDd_k8oO7k",
    authDomain: "plani-a3950.firebaseapp.com",
    databaseURL: "https://plani-a3950.firebaseio.com",
    projectId: "plani-a3950",
    storageBucket: "plani-a3950.appspot.com",
    messagingSenderId: "829664652893"
};

firebase.initializeApp(config);

// secondary exports
export const db = firebase.firestore();
export const storage = firebase.storage();
export const storageRef = storage.ref();

export default firebase;