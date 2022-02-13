// Import the functions you need from the SDKs you need
const { initializeApp } = require("firebase/app");
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDS7d1Vdi2PKMNkF6CtAwyjboc46yz_dYQ",
  authDomain: "kadam-for-stree.firebaseapp.com",
  projectId: "kadam-for-stree",
  storageBucket: "kadam-for-stree.appspot.com",
  messagingSenderId: "16885587787",
  appId: "1:16885587787:web:11ecc3b15f20eff5e912ce",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

module.exports = app;
