class Multiplayer {

    constructor() {
        this.playerOne = {
            name: '',
            icon: 'X',
            turn: true,
            choices: [],
            won: 0,
            lost: 0
        }

        this.playerTwo = {
            name: '',
            icon: 'O',
            turn: false,
            choices: [],
            won: 0,
            lost: 0
        }
    }

    turn(e) {
        if (p1.turn === true) {
            $(e.target).html(`<span>${this.playerOne.icon}</span>`);
            this.playerOne.choices.push(Number(e.target.id));


            //Reset UI
            this.playerOne.turn = false;
            $('#tp-p1').removeClass('active');
            $('#tp-p2').addClass('active');
        } else {
            $(e.target).html(`<span>${this.playerTwo.icon}</span>`);
            this.playerTwo.choices.push(Number(e.target.id));

            //Reset UI
            this.playerOne.turn = true;
            $('#tp-p2').removeClass('active');
            $('#tp-p1').addClass('active');
        }
        this.checkWinner()
    }


    checkWinner() {

        const playerOne = this.playerOne.choices.sort();
        const playerTwo = this.playerTwo.choices.sort();
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
                game.alertWinner(this.playerOne, this.playerTwo, win[i]);
            } else {
                res = false;
            }

            //Player Two Win
            if (twoWin) {
                game.alertWinner(this.playerTwo, this.playerOne, win[i]);
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
        }
    }
}

const multiplayer = new Multiplayer();