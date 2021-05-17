import firebase from "firebase/app"
import "firebase/firestore"
const app = firebase.initializeApp({
    apiKey: "AIzaSyDrg0wkczIZmBLcSyCF14fP4RuVdTEF8p8",
    authDomain: "track-cowin.firebaseapp.com",
    projectId: "track-cowin",
    storageBucket: "track-cowin.appspot.com",
    messagingSenderId: "962211669786",
    appId: "1:962211669786:web:cf92813edfd4750d6daea3",
    measurementId: "G-9GS3QXGZQF"
})

export const db = firebase.firestore();
export const time = firebase.firestore.FieldValue.serverTimestamp();
export const arrayval =firebase.firestore.FieldValue
export default app