import firebase from "firebase"

const firebaseConfig = {
    apiKey: "AIzaSyDCfuyVKrcUQbmCykfrLocSC9Sfh01Ad0M",
    authDomain: "web-app-whatsapp.firebaseapp.com",
    projectId: "web-app-whatsapp",
    storageBucket: "web-app-whatsapp.appspot.com",
    messagingSenderId: "810795363020",
    appId: "1:810795363020:web:6e0ca7db21684bae32b069"
  };


const app = !firebase.apps.length ? firebase.initializeApp(firebaseConfig) : firebase.app();

const database = app.firestore();

const auth = app.auth();

const provider = new firebase.auth.GoogleAuthProvider();

export {database,auth,provider};
