const game = {
    playerOne: {
        name: '',
        icon: 'X',
        turn: true,
        choices: [],
        won: 0,
        lost: 0
    },
    playerTwo: {
        name: '',
        icon: 'O',
        turn: false,
        choices: [],
        won: 0,
        lost: 0
    },
    playerTurn: function (e) {

        const p1 = game.playerOne;
        const p2 = game.playerTwo;

        if (p1.turn === true) {
            p1.choices.push(Number(e.target.id));

            firebase.pushChoices(playerOneDB, p1);

            $(e.target).html(`<span>${p1.icon}</span>`);

            p1.turn = false;
            //Show in the tally box who's turn it is 
            $('#tp-p1').removeClass('active');
            $('#tp-p2').addClass('active');
        } else {
            $(e.target).html(`<span>${p2.icon}</span>`);
            p2.choices.push(Number(e.target.id));


            firebase.pushChoices(playerTwoDB, p2);
            p1.turn = true;
            $('#tp-p2').removeClass('active');
            $('#tp-p1').addClass('active');
        }
        game.checkWinner(p1, p2)
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

        const check = ([a, b, c], arr) => {
            if (arr.includes(a) && arr.includes(b) && arr.includes(c)) {
                return true;
            } else {
                return false;
            }
        }

        for (i = 0; i < win.length; i++) {
            const oneWin = check(win[i], playerOne)
            const twoWin = check(win[i], playerTwo)
            let res;

            //Player One Win
            if (oneWin) {
                game.alertWinner(p1, p2, win[i]);
            } else {
                res = false;
            }

            //Player Two Win
            if (twoWin) {
                game.alertWinner(p2, p1, win[i]);
            } else {
                res = false;
            }

            if (tie === 9 && !twoWin && !oneWin) {
                if (!res) {
                    game.showTie(true);
                    setTimeout(() => {
                        game.clearBoard();
                    }, 2000);
                    break;
                }
            }
        };
    },
    alertWinner: function (winner, loser, winArr) {

        $('#alert').removeClass('hide');
        $('#alert p').text(`${winner.name} wins! Bad luck, ${loser.name}`);
        setTimeout(() => {
            $('#alert').addClass('hide');
        }, 2000);

        winner.won++;
        loser.lost++;
        firebase.updateRes(winner, loser);

        //Output above to DOM
        $('#tp-p1 span').text(`WON: ${game.playerOne.won}`);
        $('#tp-p2 span').text(`WON: ${game.playerTwo.won}`);

        const [first, second, third] = winArr;

        game.showWin(first, second, third);
        game.clearBoard();
    },
    showWin: function (a, b, c) {

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

        //Clear locally
        game.playerOne.choices = [];
        game.playerTwo.choices = [];
        game.playerOne.turn = true;

        //Clear DB choices
        firebase.pushChoices(playerOneDB, p1, true);
        firebase.pushChoices(playerTwoDB, p2, true);

        setTimeout(() => {
            game.loopBoard((square) => {
                if (square.children.length > 0) {
                    square.childNodes[0].remove();
                }
            });
        }, 1000);
    },
    loopBoard: function (callBack) {
        const board = Array.from(document.getElementById('board').children);
        board.forEach(square => {
            callBack(square);
        })
    },
    buildScoreBoard: function () {
        $("#player-cards").removeClass('hide');
        $('#tp-p1').html(`<div>${p1.icon} ${p1.name}<span class="secondary-content">WIN: ${p1.won}</span></div>`);
        $('#tp-p2').html(`<div>${p2.icon} ${p2.name}<span class="secondary-content">WIN: ${p2.won}</span></div>`);
    }
}

//Declare the object variables to feed to app.js
const p1 = game.playerOne;
const p2 = game.playerTwo;