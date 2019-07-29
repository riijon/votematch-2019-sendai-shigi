import firebase from 'firebase'
import 'firebase/firestore'

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCOJtzcgmbehcAFkZfeQTTG6rcno7AH83U",
  authDomain: "votematch-2019-sendai-shigi.firebaseapp.com",
  databaseURL: "https://votematch-2019-sendai-shigi.firebaseio.com",
  projectId: "votematch-2019-sendai-shigi",
  storageBucket: "votematch-2019-sendai-shigi.appspot.com",
  messagingSenderId: "221375159269",
  appId: "1:221375159269:web:439d3e9ed1dfe94a"
};
// Initialize Firebase
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

const db = firebase.firestore()
export {db}
