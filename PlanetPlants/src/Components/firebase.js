// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { AppRegistry } from 'react-native';
import { getAnalytics } from "firebase/analytics";
import { name as appName } from './app.json';
import App from "../Components/App"

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCRpLv-0ERW98TOuEgDpXmKapQNEEDnzQQ",
  authDomain: "planetplants-fb433.firebaseapp.com",
  projectId: "planetplants-fb433",
  storageBucket: "planetplants-fb433.appspot.com",
  messagingSenderId: "510105741315",
  appId: "1:510105741315:web:65fa67bdc6d3cca7b2c636",
  measurementId: "G-1N5S68BTP9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// export const appsss = initializeApp(firebaseConfig);

AppRegistry.registerComponent(appName, () => App);

// const analytics = getAnalytics(app);