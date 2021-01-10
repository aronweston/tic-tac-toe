class UI {
 
    alertWinner(winner, loser, winArr) {

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

        this.showWin(first, second, third);
        this.clearBoard();
    }

    showWin(a, b, c) {
        $(`div#${a}`).addClass('green');
        $(`div#${b}`).addClass('green');
        $(`div#${c}`).addClass('green');
        setTimeout(() => {
            $(`div#${a}`).removeClass('green');
            $(`div#${b}`).removeClass('green');
            $(`div#${c}`).removeClass('green');
        }, 2000);
    }

    showTie(t) {
        if (t) {
            $('#alert').removeClass('hide');
            $('div.square').addClass('red');
            $('#alert p').text('A tie. Lame, you both suck');
            setTimeout(() => {
                $('#alert').addClass('hide');
                $('div.square').removeClass('red');
            }, 2000);
        }
    }

    clearBoard() {

        //Clear locally
        game.playerOne.choices = [];
        game.playerTwo.choices = [];
        game.playerOne.turn = true;

        //Clear DB choices
        // firebase.pushChoices(playerOneDB, p1, true);
        // firebase.pushChoices(playerTwoDB, p2, true);

        setTimeout(() => {
            game.loopBoard((square) => {
                if (square.children.length > 0) {
                    square.childNodes[0].remove();
                }
            });
        }, 1000);
    }

    loopBoard(callBack) {
        const board = Array.from(document.getElementById('board').children);
        board.forEach(square => {
            callBack(square);
        })
    }

    buildScoreBoard() {
        $("#player-cards").removeClass('hide');
        $('#tp-p1').html(`<div>${playerOne.icon} ${playerOne.name}<span class="secondary-content">WIN: ${playerOne.won}</span></div>`);
        $('#tp-p2').html(`<div>${playerTwo.icon} ${playerTwo.name}<span class="secondary-content">WIN: ${playerTwo.won}</span></div>`);
    }

}

const ui = new UI();