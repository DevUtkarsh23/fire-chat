import firebase from "firebase";

const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyDt5XzOPjezj8bAEA0a2lAtTB1cRZDsKAQ",
  authDomain: "firechat-add7d.firebaseapp.com",
  projectId: "firechat-add7d",
  storageBucket: "firechat-add7d.appspot.com",
  messagingSenderId: "508590551950",
  appId: "1:508590551950:web:2c1320ed3795b73e3faadf",
  measurementId: "G-VTTBQ2JNKD",
});

const db = firebaseApp.firestore();

const auth = firebase.auth();
export { db, auth };
