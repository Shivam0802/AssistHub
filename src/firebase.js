import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: 'AIzaSyCCi6lt4qsmjNRZogxb3Xs10h7jlkAZ3yg',
  authDomain: "assisthub-667b1.firebaseapp.com",
  projectId: "assisthub-667b1",
  storageBucket: "assisthub-667b1.appspot.com",
  messagingSenderId: "690777640713",
  appId: "1:690777640713:web:c8c1d500e36cd482f08dd8"
};


const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { auth, db, storage };