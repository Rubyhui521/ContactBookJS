import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyDI-ro49mAdzKaev340JEucnEcLcXWyjbs",
    authDomain: "contact-book-5ef9d.firebaseapp.com",
    projectId: "contact-book-5ef9d",
    storageBucket: "contact-book-5ef9d.appspot.com",
    messagingSenderId: "426065413051",
    appId: "1:426065413051:web:61db1b79eb3ef6dceb7a9e"
  };
  
  // Initialize Firebase
  const app = initializeApp(firebaseConfig);

  // get the firestore database
  const db = getFirestore(app)

  export default db