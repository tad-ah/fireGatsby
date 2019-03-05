import config from './config';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/storage';
import 'firebase/functions';
import 'firebase/firestore';
import Storage from './Storage';
import Database from './Database';

const provider = new firebase.auth.GoogleAuthProvider();

class Firebase {
    static instance;

    constructor() {
        if (typeof window !== 'undefined') {
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
}

export { Firebase, Database, Storage };
