const game = {
    playerOne: {
        name: '',
        turn: true,
        choices: [],
        gameWon: null,
        results: {
            played: 0,
            won: 0,
            lost: 0
        }
    },
    playerTwo: {
        name: '',
        turn: false,
        choices: [],
        gameWon: null,
        results: {
            played: 0,
            won: 0,
            lost: 0
        }
    },
    playerTurn: function (e) {
        const p1 = game.playerOne;
        const p2 = game.playerTwo;

        if (p1.turn === true) {
            $(e.target).html("<img id='entry' src='img/cross.svg'></>");
            p1.choices.push(e.target.id);
            p1.turn = false;
        } else {
            $(e.target).html("<img id='entry' src='img/nought.svg'></>");
            p2.choices.push(e.target.id);
            p2.turn = false;
        }
       game.checkWinner(p1.choices, p2.choices)
    },
    checkWinner: function (p1, p2) {

        console.log(p1);
        console.log(p2);





    }
}

document.querySelector('#board').addEventListener('click', game.playerTurn);


// document.querySelector('#play-again').addEventListener('click', function () {
//     window.location.reload();
// });


  playerTurn: function (e) {
        const p1 = game.playerOne;
        const p2 = game.playerTwo;

        if (p1.turn === true) {
            $(e.target).html("<img id='entry' src='img/cross.svg'></>");
            p1.choices.push(e.target.id);
            p1.turn = false;
        } else {
            $(e.target).html("<img id='entry' src='img/nought.svg'></>");
            p2.choices.push(e.target.id);
            p2.turn = false;
        }
       game.checkWinner(p1.choices, p2.choices)
    },
    checkWinner: function (p1, p2) {

        console.log(p1);
        console.log(p2);





    }







//  loop: function () {
//         const squares = document.querySelectorAll('.square');
//         const newSquares = Array.from(squares);
//         // console.log(newSquares);

//         newSquares.forEach(square => { 

//             // if (square.children[0].id )

//             console.log(square.children.id);
//         })

//     },