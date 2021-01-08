const firebaseConfig = {
  apiKey: "AIzaSyDtcruXV9wIx1Lxk1bC3EAMtUE0JB_ku00",
  authDomain: "tic-tac-toe-3c214.firebaseapp.com",
  databaseURL: "https://tic-tac-toe-3c214-default-rtdb.firebaseio.com",
  projectId: "tic-tac-toe-3c214",
  storageBucket: "tic-tac-toe-3c214.appspot.com",
  messagingSenderId: "230443141608",
  appId: "1:230443141608:web:755a1ec6ffb65d713a7c5d"
};

firebase.initializeApp(firebaseConfig);

class Firebase {
  constructor() {
    this.playerOneDB = firebase.database().ref('player1');
    this.playerTwo = firebase.database().ref('player2');;
  }

  pushDB(playerRef, playerObj) {
    //Set the players up with their choices
    playerRef.set({
      playerName: playerObj.name,
      playerChoices: playerObj.choices,
      playerResults: playerObj.results,
      playerIcon: playerObj.icon,
      playerChoices: playerObj.choices
    });
    game.getDB(playerRef)
  }

  pushChoices(playerRef, playerObj, del = false) {
    if (del === true) {
      playerRef.update({
        playerChoices: null,
      });
    } else {
      playerRef.update({
        playerChoices: playerObj.choices,
      });
    }
  }

  getDB(playerRef) {
    //Take the the player reference and  
    playerRef.on("value", function (snapshot) {
      console.log(snapshot.val());
    }, function (error) {
      console.log("Error: " + error.code);
    })

  }
}

const firebase = new Firebase();