const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);

// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });

// const createNotification = notification => {
//     return admin.firestore().collection('notifications')
//         .add(notification)
//         .then(doc => {
//             console.log('notification added', doc);
//         })
// }

const createEventAuxDetails = event => {
    return admin.firestore().collection('eventAuxDetails')
        .add(event)
        .then(doc => {
            console.log('event added', doc)
            return null;
        })
        .catch(error => {
            console.error(error);
            res.error(500);
        });
}

exports.projectCreated = functions.firestore
    .document('event/{eventId}')
    .onCreate(doc => {
        const data = doc.data();
        const event = {
            host: [data.creator]
        }
        return createEventAuxDetails(event);
    });

// exports.userJoined = functions.auth.user()
//     .onCreate(user => {
//         return admin.firestore().collection('users')
//             .doc(user.uid).get().then(doc => {
//                 const newUser = doc.data();
//                 const notification = {
//                     content: 'Joined the party',
//                     user: `${newUser.firstName} ${newUser.lastName}`,
//                     time: admin.firestore.FieldValue.serverTimestamp()
//                 }
//                 return createNotification(notification);
//             })
//     })
