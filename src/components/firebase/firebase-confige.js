import firebase from 'firebase';
import 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyD754F0sSQI3vJwdoBew8xqh2U684nUpHg",
  authDomain: "personal-blog-fa009.firebaseapp.com",
  projectId: "personal-blog-fa009",
  storageBucket: "personal-blog-fa009.appspot.com",
  messagingSenderId: "25143691351",
  appId: "1:25143691351:web:b5bd3839314e44c3f9bb12"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();
const storage = firebase.storage()

export { provider, auth, storage };

export default db;