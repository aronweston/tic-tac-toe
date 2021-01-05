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


        //TODO: disable click after 
        if (p1.turn === true) {
            $(e.target).html("<img src='img/cross.svg'></>");
            p1.choices.push(e.target.id);
            p1.turn = false;
        } else {
            $(e.target).html("<img src='img/nought.svg'></>");
            p2.choices.push(e.target.id);
            p1.turn = true;
        }

        game.checkWinner(p1.choices, p2.choices)
    },
    checkWinner: function (p1, p2) {
        let winner;
        //Horizontal win conditions are left word of the id: top, middle, bottom
        //Vertical: right word of the id - left, center, right
        //Diagonal
        //Tie = the combined length of both arrays are equal to 9
        // //loop through or check if the array contains the winning   

        const hoz = ['top', 'middle', 'bottom'];
        const vert = ['left', 'center', 'right'];
        

        //If the length is less then 3 then we don't care
        if (p1.length >= 3 || p2.length >= 3) {

            // console.log(p1);

            let p1Hoz = [];
            let p1Vert = [];

            //Create a two new arrays, the hoz and vertical values of player one
            p1.forEach(item => {
                let dashIndex = item.indexOf('-')
                let hoz = item.slice(0, dashIndex);
                let vert = item.slice(dashIndex + 1, item.length);
                p1Hoz.push(hoz);
                p1Vert.push(vert);
            })

            console.log(p1Hoz);
            // console.log(hoz[0]);

           
            let hozWinCheck = p1Hoz.every(function (value) {
            if (value === hoz[0]) {
                console.log('Player 1 wins Top Row');
                    return true;
                } else if (value === hoz[1]) {
                    console.log('Player 1 wins Middle Row');
                    return true;
                } else if (value === hoz[2]) {
                    console.log('Player 1 wins Bottom Row');
                    return true;
                }
            })

            let vertWinCheck = p1Vert.every(function (value) {
            if (value === hoz[0]) {
                console.log('Player 1 wins Col Row');
                    return true;
                } else if (value === hoz[1]) {
                    console.log('Player 1 wins Center Col');
                    return true;
                } else if (value === hoz[2]) {
                    console.log('Player 1 wins <Col></Col> Row');
                    return true;
                }
            })


            console.log(hozWinCheck);
            console.log(vertWinCheck);
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