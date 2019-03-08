import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

// Start writing Firebase Functions
// https://firebase.google.com/docs/functions/typescript

// const serviceAccount = require('../firegatsby-firebase-adminsdk-4zy5a-bda4951c85.json');

admin.initializeApp({
    credential: admin.credential.applicationDefault(),
    databaseURL: 'https://firegatsby.firebaseio.com',
});

export const helloWorld = functions.https.onRequest((request, response) => {
    response.send('Hello from Firebase!');
});

export const grantAdminRole = functions.https.onRequest((request, response) => {
    console.log('grantAdminRole!');
    const authorizationHeader = request.get('Authorization');
    if (authorizationHeader) {
        const tokenId = authorizationHeader.split('Bearer ')[1];
        admin
            .auth()
            .verifyIdToken(tokenId)
            .then(token => {
                console.log(token);
                grantAdmin();
            })
            .catch(error => response.status(401).send(error));
    }
    response.status(201).send('Accepted');
});

async function grantAdmin() {
    admin
        .firestore()
        .collection('admins')
        .get()
        .then(querySnapshot => {
            querySnapshot.forEach(function(doc) {
                const user = doc.data();
                console.log(user);

                admin.auth().setCustomUserClaims(user.uid, { admin: true });
            });
        })
        .catch(function(error) {
            console.log('Error getting documents: ', error);
        });
}
