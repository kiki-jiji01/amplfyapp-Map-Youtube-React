// For Firebase JS SDK v7.20.0 and later, measurementId is optional
import firebase from "firebase" ;


const firebaseApp = firebase.initializeApp ({
  apiKey: "AIzaSyBE3auby_0xxeZeI9fFDyKpvLG4XXO3Vtc",
  authDomain: "map-with-partner.firebaseapp.com",
  projectId: "map-with-partner",
  storageBucket: "map-with-partner.appspot.com",
  messagingSenderId: "303783472128",
  appId: "1:303783472128:web:ccf5b69923dd5c0c8d3ce5",
  measurementId: "G-SJY2QD87CK"
});

const db = firebaseApp.firestore();
  const auth = firebase.auth();
  const storage = firebase.storage();

  export {db, auth, storage};
