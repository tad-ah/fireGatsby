import config from './config';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/storage';
import 'firebase/functions';
import 'firebase/firestore';
import moment from 'moment';

const provider = new firebase.auth.GoogleAuthProvider();

class Firebase {
    static instance;

    constructor() {
        if (Firebase.instance) {
            return Firebase.instance;
        }
        this.fire = firebase.initializeApp(config);
        this.database = firebase.firestore();
        this.storage = firebase.storage();
        this.functions = firebase.functions();
        this.auth = firebase.auth();
        this.provider = provider;
        Firebase.instance = this;
    }
}

class Database {
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

class Storage {
    constructor(storage) {
        this.storage = storage;
    }

    getFileSize = url => this.storage.refFromURL(url).getMetadata();

    fetchVideo = url => this.storage.refFromURL(url).getDownloadURL();
}

export { Firebase, Database, Storage };
