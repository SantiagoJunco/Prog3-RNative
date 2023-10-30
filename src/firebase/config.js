import app from 'firebase/app';
import firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyD64LlXwR43j9rVEMzQPZiN44ACiNWieW4",
    authDomain: "proyectointegrador3-d6fb4.firebaseapp.com",
    projectId: "proyectointegrador3-d6fb4",
    storageBucket: "proyectointegrador3-d6fb4.appspot.com",
    messagingSenderId: "803387966723",
    appId: "1:803387966723:web:5e381dd77e347999a75536"
};

app.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const storage = app.storage();
export const db = app.firestore();
