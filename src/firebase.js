// Import the functions you need from the SDKs you need
import * as firebase from "firebase/compat";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAXpehquwvY48W232N-6pWnB9rHCrioAYc",
  authDomain: "safetrakr.firebaseapp.com",
  projectId: "safetrakr",
  storageBucket: "safetrakr.appspot.com",
  messagingSenderId: "121636285468",
  appId: "1:121636285468:web:f0c099fc48a77e989703d9",
};

// Initialize Firebase
let app;
if (firebase.apps.length === 0) {
  app = firebase.initializeApp(firebaseConfig);
} else {
  app = firebase.app();
}

const auth = firebase.auth();

export { auth };
