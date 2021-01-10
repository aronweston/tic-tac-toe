class Firebase {

  pushDB(player) {
    //Set the players up with their choices
    player.ref.set({
      name: playerObj.name,
      choices: playerObj.choices,
      icon: playerObj.icon,
      win: playerObj.win,
      lost: playerObj.lost
    });
    this.getDB(player)
  }

  getDB(player) {
    //Take the the player reference and  
    player.ref.on("value", function (snapshot) {
      console.log(snapshot.val());
    }, function (error) {
      console.log("Error: " + error.code);
    })
  }

  updateRes(winner, loser) {
    winner.ref.update({
      win: winner.win++
    })
    loser.ref.update({
      lost: loser.lost++
    })
  }

  pushChoices(player, del = false) {
    if (del === true) {
      player.ref.update({
        choices: null,
      });
    } else {
      player.ref.update({
        choices: player.choices,
      });
    }
  }
}

const firebase = new Firebase();