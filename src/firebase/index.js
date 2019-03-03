import config from './config';
import firebase from 'firebase';
import moment from 'moment';

class FirebaseClient {
    constructor() {
        this.fire = firebase.initializeApp(config);
    }

    database() {
        return this.fire.firestore();
    }

    storage() {
        return this.fire.storage();
    }

    auth() {
        return this.fire.auth();
    }

    functions() {
        return this.fire.functions();
    }
}

class DatabaseInterface {
    constructor(database) {
        this.database = database;
    }

    addComment(comment) {
        this.database
            .collection('comments')
            .doc()
            .set({
                text: comment,
                time: new Date().getTime(),
            })
            .then(() => console.log('Doc written'))
            .catch(() => console.warn('Failed to write doc'));
    }

    getComments() {
        return this.database
            .collection('comments')
            .get()
            .then(querySnapshot => {
                return this.readQuerySnapshot(querySnapshot);
            })
            .catch(function(error) {
                console.log('Error getting documents: ', error);
            });
    }

    subscribeToComments(callback) {
        return this.database
            .collection('comments')
            .onSnapshot(querySnapshot => {
                callback(this.readQuerySnapshot(querySnapshot));
            });
    }

    readQuerySnapshot(querySnapshot) {
        const comments = [];
        querySnapshot.forEach(function(doc) {
            const { text, time } = doc.data();
            comments.push({
                id: doc.id,
                text,
                time: moment(time).format('LLLL'),
            });
        });
        return comments;
    }
}

const Firebase = new FirebaseClient();
const Db = new DatabaseInterface(Firebase.database());
export { Firebase, Db };
