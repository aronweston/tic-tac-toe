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
    alertWinner: function (winner, loser, winArr) {

        //Let them know who won and where
        alert(`${winner.name} wins! Bad luck, ${loser.name}`);

        //Add to scores
        winner.results.won++;
        loser.results.lost++;

        console.log(winArr);

        //Update the score
        $('#tp-p1 span').text(`WON: ${game.playerOne.results.won}`);
        $('#tp-p2 span').text(`WON: ${game.playerTwo.results.won}`);
        //Clear the board after 1 second
        setTimeout(() => {
            game.clearBoard();
        }, 1000);
    },
    checkWinner: function (p1, p2) {

        const playerOne = p1.choices.sort();
        const playerTwo = p2.choices.sort();
        const tie = playerOne.length + playerTwo.length;

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
        

        const check = (win, arr) => {
            if (win.length === arr.length) {
                if (win.every((value, index) => value === arr[index])) {
                    return true;
                }
            }
        }

        // (msg, winner, loser, winArr)

        for (i = 0; i < win.length; i++) {
            let res;
            if (check(win[i], playerOne)) {
                res = "player 1";
                game.alertWinner(p1, p2, win[i]);
            } else if (check(win[i], playerTwo)) {
                res = "player 2";
                game.alertWinner(p2, p1, win[i]);
            } else {
                if (tie > 9) {
                    if (res !== "player 1" || res !== "player 2") {
                        alert('tie');
                        setTimeout(() => {
                            game.clearBoard();
                        }, 1000);
                        break;
                    }
                }
            }
        }
    }
}

const p1 = game.playerOne;
const p2 = game.playerTwo;


//ES6+
//1. Loop through the winner arrays and save the winning arrays to a winner variable
//2. Check if both are arrays and also if they have the same length
//3. Loop through each of the winner arrays and check to see if each of the values of the winner array match the value of the playerOne array, at the index of the winner array value. So if win[0,1,2] = playerOne[0,1,2], else, check the next array until there's no more 