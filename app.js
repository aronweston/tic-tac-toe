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
            p1.turn = true;
        }
    
       game.checkWinner(p1.choices, p2.choices)
    },
    checkWinner: function (p1, p2) {

        //Horizontal win conditions are left word of the id: top, middle, bottom
        //Vertical: right word of the id - left, center, right
        //Diagonal
        //Tie = the combined length of both arrays are equal to 9
        
        // //loop through or check if the array contains the winning   
        // if()

        let winner;
        
        if (p1.length >= 3 || p2.length >= 3) {
            console.log("Player 1", p1, "Player 2", p2);

        } 
    
        //TIE CONDITION
        // const tie = p1.length + p2.length;
        // if (tie >= 9) {
        //     alert("it's a tie");
        //     window.location.reload();
        // }

    }
}

document.querySelector('#board').addEventListener('click', game.playerTurn);

// document.querySelector('#play-again').addEventListener('click', function () {
//     window.location.reload();
// });



