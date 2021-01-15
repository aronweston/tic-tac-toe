class Game {
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

        this.win = [
            [1, 2, 3],
            [4, 5, 6],
            [7, 8, 9],
            [1, 4, 7],
            [2, 5, 8],
            [3, 6, 9],
            [1, 5, 9],
            [3, 5, 7]
        ]
    }

    playerTurn(e) {
        if (playerOne.turn === true) {
            $(e.target).html(`<span>${this.playerOne.icon}</span>`);
            this.playerOne.choices.push(Number(e.target.id));
            this.playerOne.turn = false;
            $('#tp-p1').removeClass('active');
            $('#tp-p2').addClass('active');
        } else {
            $(e.target).html(`<span>${this.playerTwo.icon}</span>`);
            this.playerTwo.choices.push(Number(e.target.id));
            // firebase.pushChoices(playerTwoDB, p2);
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

        const check = ([a, b, c], arr) => {
            if (arr.includes(a) && arr.includes(b) && arr.includes(c)) {
                return true;
            } else {
                return false;
            }
        }

        for (i = 0; i < this.win.length; i++) {
            const oneWin = check(this.win[i], playerOne)
            const twoWin = check(this.win[i], playerTwo)
            let res;
            //Player One Win
            if (oneWin) {
                ui.alertWinner(this.playerOne, this.playerTwo, win[i]);
            } else {
                res = false;
            }

            //Player Two Win
            if (twoWin) {
                ui.alertWinner(this.playerTwo, this.playerOne, win[i]);
            } else {
                res = false;
            }

            //Tie condition
            if (tie === 9 && !twoWin && !oneWin) {
                if (!res) {
                    ui.showTie(true);
                    setTimeout(() => {
                        ui.clearBoard();
                    }, 2000);
                    break;
                }
            }
        }
    }
}

const game = new Game();