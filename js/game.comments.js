const game = {
    playerOne: {
        name: '',
        icon: 'X',
        turn: true,
        choices: [],
        results: {
            won: 0,
            lost: 0
        }
    },
    playerTwo: {
        name: '',
        icon: 'O',
        turn: false,
        choices: [],
        results: {
            won: 0,
            lost: 0
        }
    },
    playerTurn: function (e) {
        //Bring in the 
        const p1 = game.playerOne;
        const p2 = game.playerTwo;
        //Once the game has started and the names are entered. Player 1 defaults to X and its their turn first. As the event object is passed in we can both access the target ID and push to each players choices array. And, we can output their chosen icon to the same target in the DOM. We then add the active classes to show who's turn it is. 
        if (p1.turn === true) {
            p1.choices.push(Number(e.target.id));
            $(e.target).html(`<span>${p1.icon}</span>`);
            p1.turn = false;
            //Show in the tally box who's turn it is 
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
    checkWinner: function (p1, p2) {
        //Get both players choices and the tie condition of when the total length is equal to 9;
        const playerOne = p1.choices.sort();
        const playerTwo = p2.choices.sort();
        const tie = playerOne.length + playerTwo.length;

        //Win conditions based on the positions of the board. Easier saving this as an array of arrays due to more options for loops. 
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

        //check() - takes two arguments, the array it is called on and the winning array destructured. Part of the ES6 syntax, we can now access the index values of the array passed into this function. The second argument is the array the function will check, player one or two. If check = true, someone has won.    
        const check = ([a, b, c], arr) => {
            if (arr.includes(a) && arr.includes(b) && arr.includes(c)) {
                return true;
            } else {
                return false;
            }
        }

        // Condition Loop - this loops through the win array and returns each winning array, then the check function is called to determine which player is the winner. If none and the squares are occupied, it's a tie.
        for (i = 0; i < win.length; i++) {
            const oneWin = check(win[i], playerOne)
            const twoWin = check(win[i], playerTwo)

            if (oneWin) {
                game.alertWinner(p1, p2, win[i]);
            }

            if (twoWin) {
                game.alertWinner(p2, p1, win[i]);
            }

            if (tie === 9 && !twoWin && !oneWin) {
                game.showTie(true);
                setTimeout(() => {
                    game.clearBoard();
                }, 2000);
                break;
            }
        };
    },
    alertWinner: function (winner, loser, winArr) {
        //Let them know who won and where by removing the hide class from the alert bar, adding in the words of encouragement, then hiding it again in 2 seconds.
        $('#alert').removeClass('hide');
        $('#alert p').text(`${winner.name} wins! Bad luck, ${loser.name}`);
        setTimeout(() => {
            $('#alert').addClass('hide');
        }, 2000);

        //Add one to players scores every time they win or lose. This method takes in the winner and loser objects. 
        winner.results.won++;
        loser.results.lost++;

        //Output above to DOM
        $('#tp-p1 span').text(`WON: ${game.playerOne.results.won}`);
        $('#tp-p2 span').text(`WON: ${game.playerTwo.results.won}`);

        //Let the user know where they won.

        //1. Destructure the winning array and get the values. This will give us the 1-3 integers that we can then match against the ID's of the board 
        const [first, second, third] = winArr;
        //2. run colorDOM() that takes in each of the elements within above winArr array, loops the board and adds a green class to the square that had the winning combo.
        game.showWin(first, second, third);
        game.clearBoard();
    },
    showWin: function (a, b, c) {
        //Add the winning array ID's to target the DOM elements and add a green class to them when they have won.
        $(`div#${a}`).addClass('green');
        $(`div#${b}`).addClass('green');
        $(`div#${c}`).addClass('green');
        setTimeout(() => {
            $(`div#${a}`).removeClass('green');
            $(`div#${b}`).removeClass('green');
            $(`div#${c}`).removeClass('green');
        }, 2000);
    },
    showTie: function (t) {
        if (t) {
            $('#alert').removeClass('hide');
            $('div.square').addClass('red');
            $('#alert p').text('A tie. Lame, you both suck');
            setTimeout(() => {
                $('#alert').addClass('hide');
                $('div.square').removeClass('red');
            }, 2000);
        }
    },
    clearBoard: function () {
        //Clear the player one and player two selection arrays to restart the game
        game.playerOne.choices = [];
        game.playerTwo.choices = [];

        //Give player one their starting turn back
        game.playerOne.turn = true;

        setTimeout(() => {
            //Get board and remove everything in each square
            game.loopBoard((square) => {
            if (square.children.length > 0) {
                square.childNodes[0].remove();
            }
        });
        }, 1000);
    },
    loopBoard: function (callBack) {
        // A utility method used throughout the project to prevent repeating loops everywhere and to provide a way of getting all of the squares on the board for different conditionals. This is achieved through the callBack function that will execute within a loop on the board array.
        const board = Array.from(document.getElementById('board').children);
        board.forEach(square => {
            callBack(square);
        })
    },
    buildScoreBoard: function () {
        //Remove the hidden class
        $("#player-cards").removeClass('hide');
        //Set player 1 output
        $('#tp-p1').html(`<div>${p1.icon} ${p1.name}<span class="secondary-content">WIN: ${p1.results.won}</span></div>`);
        //Set player 2 output
        $('#tp-p2').html(`<div>${p2.icon} ${p2.name}<span class="secondary-content">WIN: ${p2.results.won}</span></div>`);
    }
}

//Declare the object variables to feed to app.js
const p1 = game.playerOne;
const p2 = game.playerTwo;

