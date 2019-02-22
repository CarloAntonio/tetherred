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

const createEventAuxDetails = (eventAuxId, eventAuxDetails) => {
    return admin.firestore().collection('eventAuxDetails')
        .doc(eventAuxId)
        .set(eventAuxDetails)
        .then(doc => {
            console.log('event added', doc)
            return null;
        })
        .catch(error => {
            console.error(error);
            res.error(500);
        });
}

exports.eventCreated = functions.firestore
    .document('event/{eventId}')
    .onCreate((doc, context) => {
        const data = doc.data();
        const eventAuxId = context.params.eventId;
        const eventAuxDetails = {
            host: [data.creator],
            members: [data.creator]
        }
        return createEventAuxDetails(eventAuxId, eventAuxDetails);
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
