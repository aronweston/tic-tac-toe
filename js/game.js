const game = {
    playerOne: {
        name: 'John',
        turn: true,
        choices: [],
        results: {
            won: 0,
            lost: 0
        }
    },
    playerTwo: {
        name: 'Mike',
        turn: false,
        choices: [],
        results: {
            won: 0,
            lost: 0
        }
    },
    playerTurn: function (e) {
        const p1 = game.playerOne;
        const p2 = game.playerTwo;
        //TODO: disable click so they don't chuck in trash into the array, no more entries after the single click

        if (p1.turn === true) {
            $(e.target).html("<img src='img/cross.svg'></>");
            p1.choices.push(Number(e.target.id));
            p1.turn = false;
        } else {
            $(e.target).html("<img src='img/nought.svg'></>");
            p2.choices.push(Number(e.target.id));
            p1.turn = true;
        }
        game.checkWinner(p1, p2)
    },
    clearBoard: function () {
        //Clear P1 & P2 choices to reset the game
        game.playerOne.choices = [];
        game.playerTwo.choices = [];
        //Get board and remove everything in each square
        const board = document.getElementById('board').children;
        let boardArray = Array.from(board);
        console.log(boardArray);
        boardArray.forEach(square => {
            square.childNodes[0].remove();
        })
    },
    alertWinner: function (msg, winner, loser) {
        //Let them know who won and where
        alert(msg);

        //Add to scores
        winner.results.won++;
        loser.results.lost++;

        //Update the score
        $('#first-player span').html(`Won: ${game.playerOne.results.won} / Lost: ${game.playerOne.results.lost}`);
        $('#second-player span').html(`Won: ${game.playerTwo.results.won} / Lost: ${game.playerTwo.results.lost}`);

        console.log(game);
    },
    whoWon: function (win, player) {
        //Player Two
        if (Array.isArray(win) && Array.isArray(player)) {
            if (win.length === player.length) {
                if (win.every((value, index) => value === player[index])) {
                    return true;
                } else {
                    return false;
                }
            }
        }
    },
    checkWinner: function (p1, p2) {
        if (p1.choices.length >= 3 || p2.choices.length >= 3) {
            const playerOne = p1.choices.sort();
            const playerTwo = p2.choices.sort();

            const win = [
                [1, 2, 3],
                [4, 5, 6],
                [7, 8, 9],
                [1, 4, 7],
                [2, 5, 8],
                [3, 6, 9],
                [1, 5, 9],
                [3, 5, 7]
            ]
          
            const tie = playerOne.length + playerTwo.length;
            console.log(tie);
            win.forEach(winner => {
                const one = game.whoWon(winner, playerOne);
                const two = game.whoWon(winner, playerTwo);
                console.log("player one", one, "player two", two);
                
                if (one) {
                    game.alertWinner("Player one wins", game.playerOne, game.playerTwo);
                    game.clearBoard();
                } else if (two) {
                    game.alertWinner("Player two wins", game.playerTwo, game.playerOne);
                    game.clearBoard();
                } else if (tie === 9 && one === false || undefined && two === false || undefined) {
                    console.log('Tie');
                    game.clearBoard();
                }
            })
        }
    }
}






// //Player Two
// if (Array.isArray(winner) && Array.isArray(playerTwo)) {
//     if (winner.length === playerTwo.length) {
//         if (winner.every((value, index) => value === playerTwo[index])) {
//             console.log('Player Two Wins');
//             return true;
//         } else {
//             return false;
//         }
//     }
// }




// ,{"hozMiddle": [4, 5, 6]
//     "hozBottom": [7, 8, 9],
//     "leftVert": [1, 4, 7],
//     "centerVert": [2, 5, 8],
//     "rightVert": [3, 6, 9],
//     "leftDiag": [1, 5, 9],
//     "rightDiag": [3, 5, 7]
// }




// //Alerts to the dom
// game.alertWinner('Player 1 wins top row', p1, p2);
// game.clearBoard();