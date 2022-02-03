import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import 'firebase/storage'

// const config = {
//     apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
//     authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
//     projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
//     storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
//     messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_SENDER_ID,
//     appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
// };

const config = {
  apiKey: 'AIzaSyBSn3B4IkwTm-2cZNuen48ed2G1P4QaGd4',
  authDomain: 'koii-fi.firebaseapp.com',
  databaseURL: 'https://koii-fi-default-rtdb.asia-southeast1.firebasedatabase.app',
  projectId: 'koii-fi',
  storageBucket: 'koii-fi.appspot.com',
  messagingSenderId: '661606426280',
  appId: '1:661606426280:web:74172cea535f137f03449d',
  measurementId: 'G-KCQPB5M7M0',
}

!firebase.apps.length ? firebase.initializeApp(config) : firebase.app()

const auth = firebase.auth()
const firestore = firebase.firestore()
const storage = firebase.storage()

export { auth, firestore, storage }
