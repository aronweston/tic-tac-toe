const game = {
    playerOne: {
        name: 'John',
        icon: 'X',
        turn: true,
        choices: [],
        results: {
            won: 0,
            lost: 0
        }
    },
    playerTwo: {
        name: 'Steve',
        icon: 'O',
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
            $(e.target).html(`<span>${p1.icon}</span>`);
            p1.choices.push(Number(e.target.id));
            p1.turn = false;
            $('#tp-p1').removeClass('active');
            $('#tp-p2').addClass('active');
        } else {
            $(e.target).html(`<span>${p2.icon}</span>`);
            p2.choices.push(Number(e.target.id));
            p1.turn = true;
            $('#tp-p2').removeClass('active');
            $('#tp-p1').addClass('active');
        }
        game.checkWinner(p1, p2)
    },
    clearBoard: function () {
        //Clear P1 & P2 choices to reset the game
        game.playerOne.choices = [];
        game.playerTwo.choices = [];
        //Get board and remove everything in each square
        const board = Array.from(document.getElementById('board').children);
        board.forEach(square => {
            if (square.children.length > 0) {
                square.childNodes[0].remove();
            }
        })
    },
    alertWinner: function (msg, winner, loser) {
        //Let them know who won and where
        alert(msg);

        //Add to scores
        winner.results.won++;
        loser.results.lost++;

        //Update the score
        $('#tp-p1 span').text(`WON: ${game.playerOne.results.won}`);
        $('#tp-p2 span').text(`WON: ${game.playerTwo.results.won}`);
    },
    checkWinner: function (p1, p2) {

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

        //ES5+
        //1. Loop the winning arrays to test each array each time
        //2. Now I have the winning arrays, I want to loop them and get their values for checking
        //3. Check if the values of each of the 
        for (i = 0; i < win.length; i++) {
            const winners = win[i];
            for (j = 0; j < winners.length; j++) {
                const winValues = winners[j];
                if (winners.length === playerOne.length) {
                    let x = playerOne.every(function (value) {
                        if (value === winValues) {
                            return 'winner'
                        }
                    })
                }
            }
        }


        //ES6+
        win.forEach(winner => {
            if (Array.isArray(winner) && Array.isArray(playerOne)) {
                if (winner.length === playerOne.length) {
                    let check = winner.every(function (value, index) {
                        console.log("Winner value", value);
                        console.log("Player one", playerOne);
                        console.log("Player one index", playerOne[index]);
                        console.log("Player one index", playerOne[index]);
                        console.log("Player one index", playerOne[index]);
                        // console.log(value);
                        // console.log(winner);
                        // console.log(value === playerOne[index]);

                        if (value === playerOne[index]) {
                            console.log(playerOne[index]);
                            return true;

                        }
                    });
                    console.log(check);
                }
            }
        });


    }
}

const p1 = game.playerOne;
const p2 = game.playerTwo;




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