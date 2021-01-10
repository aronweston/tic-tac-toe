const firebaseConfig = {
  apiKey: "AIzaSyDtcruXV9wIx1Lxk1bC3EAMtUE0JB_ku00",
  authDomain: "tic-tac-toe-3c214.firebaseapp.com",
  databaseURL: "https://tic-tac-toe-3c214-default-rtdb.firebaseio.com",
  projectId: "tic-tac-toe-3c214",
  storageBucket: "tic-tac-toe-3c214.appspot.com",
  messagingSenderId: "230443141608",
  appId: "1:230443141608:web:755a1ec6ffb65d713a7c5d"
}

const init = firebase.initializeApp(firebaseConfig);

//Define database references
const playerOneDB = firebase.database().ref('player1');
const playerTwoDB = firebase.database().ref('player2');