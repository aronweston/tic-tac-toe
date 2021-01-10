class Firebase {

  pushDB(playerRef, playerObj) {
    //Set the players up with their choices
    playerRef.set({
      name: playerObj.name,
      choices: playerObj.choices,
      icon: playerObj.icon,
      win: playerObj.win,
      lost: playerObj.lost
    });
    this.getDB(playerRef)
  }

  getDB(playerRef) {
    //Take the the player reference and  
    playerRef.on("value", function (snapshot) {
      console.log(snapshot.val());
    }, function (error) {
      console.log("Error: " + error.code);
    })
  }

  updateRes(winnerRef, loserRef) {
    winnerRef.update({
      win: winnerRef.win++
    })
    loserRef.update({
      lost: loserRef.lost++
    })
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
}

const firebase = new Firebase();