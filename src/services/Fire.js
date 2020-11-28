import firebase from "firebase";
import {InteractionManager, Platform} from 'react-native';

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBsoFVWyQ9SZEauYHZcwR3C7QasjtVw8ZE",
    authDomain: "altruist-2dec1.firebaseapp.com",
    databaseURL: "https://altruist-2dec1.firebaseio.com",
    projectId: "altruist-2dec1",
    storageBucket: "altruist-2dec1.appspot.com",
    messagingSenderId: "276263149983",
    appId: "1:276263149983:web:e1b6db6b72a4ba06849daa",
    measurementId: "G-KYGQ3GL5LG"
};

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

const _setTimeout = global.setTimeout;
const _clearTimeout = global.clearTimeout;
const MAX_TIMER_DURATION_MS = 60 * 1000;
if (Platform.OS === 'android') {
    // Work around issue `Setting a timer for long time`
    // see: https://github.com/firebase/firebase-js-sdk/issues/97

    const timerFix = {};
    const runTask = (id, fn, ttl, args) => {
        const waitingTime = ttl - Date.now();
        if (waitingTime <= 1) {
            InteractionManager.runAfterInteractions(() => {
                if (!timerFix[id]) {
                    return;
                }
                delete timerFix[id];
                fn(...args);
            });
            return;
        }

        const afterTime = Math.min(waitingTime, MAX_TIMER_DURATION_MS);
        timerFix[id] = _setTimeout(() => runTask(id, fn, ttl, args), afterTime);
    };

    global.setTimeout = (fn, time, ...args) => {
        if (MAX_TIMER_DURATION_MS < time) {
            const ttl = Date.now() + time;
            const id = '_lt_' + Object.keys(timerFix).length;
            runTask(id, fn, ttl, args);
            return id;
        }
        return _setTimeout(fn, time, ...args);
    };

    global.clearTimeout = id => {
        if (typeof id === 'string' && id.startsWith('_lt_')) {
            _clearTimeout(timerFix[id]);
            delete timerFix[id];
            return;
        }
        _clearTimeout(id);
    };
}


class Fire {

    constructor() {
        this.checkAuth();
    }

    set requestId(id) {
        this.requestIdData = id;
    }

    get requestsDb() {
        return firebase.database().ref('messages');
    }

    get db() {
        return firebase.database().ref('messages/request-' + this.requestIdData);
    }

    get uid() {
        return (firebase.auth().currentUser || {}).uid
    }


    // on = callback => {
    //     this.db.on( "child_added" , snapshot => callback( this.parse( snapshot ) ) );
    // }

    get timestamp() {
        return firebase.database.ServerValue.TIMESTAMP;
    }

    checkAuth() {
        firebase.auth().onAuthStateChanged(user => {
            if (!user) {
                firebase.auth().signInAnonymously()
            }
        });
    }

    send = messages => {
        messages.forEach(item => {

                const messageToSend = {
                    text: item.text,
                    timestamp: firebase.database.ServerValue.TIMESTAMP,
                    // timestamp: firebase.database.ServerValue.timestamp,
                    user: item.user
                };

                this.db.push(messageToSend);

                // var messageListRef = firebase.database().ref('messages');
                // var newMessageRef = messageListRef.push();
                // newMessageRef.set(message);
                //  // We've appended a new message to the message_list location.
                //  var path = newMessageRef.toString();
                //  alert( path );
                //  // path will be something like
                // // 'https://sample-app.firebaseio.com/message_list/-IKo28nwJLH0Nc5XeFmj'

            }
        );
    }

    parse = message => {
        const {user, text, timestamp} = message.val();
        const {key: _id} = message
        const createdAt = new Date(timestamp)

        return {
            _id,
            createdAt,
            text,
            user
        }
    }

    doesChatExists = (request_id, callback) =>
        this.requestCheckdb(request_id).once('value')
            .then(snapshot => callback(snapshot));

    isRequestCHatAvailable = callback =>
        this.requestsDb
            .on('child_added', snapshot => callback(snapshot));

    isRequestCHatUpdated = (requestIdForThisFun, callback) =>
        this.requestCheckdb(requestIdForThisFun)
            .on('child_added', snapshot => {

                callback(snapshot);
            });

    on = callback =>
        this.db
            .on('child_added', snapshot => callback(this.parse(snapshot)));

    off() {
        this.db.off()
    }

    requestCheckdb(idT) {
        return firebase.database().ref('messages/request-' + idT);
    }

}

Fire.shared = new Fire();
export default Fire;



