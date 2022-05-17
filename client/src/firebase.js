// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getStorage} from "firebase/storage"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDIvgVIfDiSnqalzNcVXSOQwtUZ-4rLWZ4",
    authDomain: "mern-349902.firebaseapp.com",
    projectId: "mern-349902",
    storageBucket: "mern-349902.appspot.com",
    messagingSenderId: "999713810681",
    appId: "1:999713810681:web:df73ebe73173ab5c301a28",
    measurementId: "G-XHDJ69MYZL"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);

