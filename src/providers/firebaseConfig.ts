// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { initializeFirebase } from "refine-firebase";
import {FirestoreDatabase} from "refine-firebase";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
export const firebaseConfig = {
  apiKey: "AIzaSyAhr_xzEWI8yjUtTfSpiEhLVvrP0Gj8jLM",
  authDomain: "refinetester.firebaseapp.com",
  projectId: "refinetester",
  storageBucket: "refinetester.appspot.com",
  messagingSenderId: "265186241670",
  appId: "1:265186241670:web:9e1347e1e5d154600bb507",
  measurementId: "G-WCTE7LG9PZ",
  databaseURL: "https://refinetester-default-rtdb.firebaseio.com",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const firebaseApp = initializeFirebase(firebaseConfig);
export const firestoreDatabase = new FirestoreDatabase({firebaseApp});
