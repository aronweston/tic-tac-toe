const game = {
    playerOne: {
        name: 'Player 1',
        icon: 'X',
        turn: true,
        choices: [],
        results: {
            won: 0,
            lost: 0
        }
    },
    
    playerTwo: {
        name: 'Player 2',
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
        game.playerOne.turn = true;
        //Get board and remove everything in each square
        game.loopBoard((square) => {
            if (square.children.length > 0) {
                square.childNodes[0].remove();
            }
        });
    },
    loopBoard: function (callBack) {
        const board = Array.from(document.getElementById('board').children);
        board.forEach(square => {
            callBack(square);
        })
    },
    colorDOM: function (a, b, c) {
        $(`div#${a}`).addClass('green');
        $(`div#${b}`).addClass('green');
        $(`div#${c}`).addClass('green');
        //Timeout 
        setTimeout(() => {
            $(`div#${a}`).removeClass('green');
            $(`div#${b}`).removeClass('green');
            $(`div#${c}`).removeClass('green');
        }, 2000);
    },
    colorTie: function (t) {
        if (t) {
            $('div.square').addClass('red');
            setTimeout(() => {
                $('div.square').removeClass('red');
            }, 2000);
        }
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

        //Checker
        const check = ([a, b, c], arr) => {
            if (arr.includes(a) && arr.includes(b) && arr.includes(c)) {
                return true;
            } else {
                return false;
            }
        }

        //Checker with working win and tie check conditions
        for (i = 0; i < win.length; i++) {
            const oneWin = check(win[i], playerOne)
            const twoWin = check(win[i], playerTwo)
            
            if (oneWin) {
                game.alertWinner(p1, p2, win[i]);
            }
            
            if (twoWin) {
                game.alertWinner(p2, p1, win[i]);
            }
            
            if (tie === 9 && !twoWin && !oneWin ) {
                console.log('Tie');
                game.colorTie(true);
                setTimeout(() => {
                    game.clearBoard();
                }, 2000);
                break;
            }
        };


    },
    alertWinner: function (winner, loser, winArr) {

        //Let them know who won and where
        console.log(`${winner.name} wins! Bad luck, ${loser.name}`);

        //Add to scores
        winner.results.won++;
        loser.results.lost++;

        //Destructure the winning array and get the values 
        const [first, second, third] = winArr;
        //Loop the board and output 
        game.loopBoard(function (square) {
            //If the id of the square matches the winning array number. Could probably make this more explicit by not turning the squares red on a tie. 
            if (Number(square.id) === first && Number(square.id) === first && Number(square.id) === first) {
                game.colorDOM(first, second, third, false);
            } else {
                game.colorTie(true);
            }
        })

        //Update the score
        $('#tp-p1 span').text(`WON: ${game.playerOne.results.won}`);
        $('#tp-p2 span').text(`WON: ${game.playerTwo.results.won}`);

        //Clear the board after 1 second
        setTimeout(() => {
            game.clearBoard();
        }, 1000);
    }
}


const p1 = game.playerOne;
const p2 = game.playerTwo;