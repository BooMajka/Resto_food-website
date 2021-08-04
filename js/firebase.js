const firebaseConfig = {
  apiKey: "AIzaSyC3SwEYrBv0Yuir1nnmAAr1U9TRHbvZ0hY",
  authDomain: "resto-337e8.firebaseapp.com",
  projectId: "resto-337e8",
  storageBucket: "resto-337e8.appspot.com",
  messagingSenderId: "245481204205",
  appId: "1:245481204205:web:9f17e18d6b887f890c9fe4",
  measurementId: "G-M1Z4W76D8R"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();
const db = firebase.firestore();