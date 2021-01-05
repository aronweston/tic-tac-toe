const game = {
    playerOne: {
        name: '',
        turn: true,
        choices: [],
        results: {
            won: 0,
            lost: 0
        }
    },
    playerTwo: {
        name: '',
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
            document.querySelector(e.target).innerHTML("<img src='img/cross.svg'></>");
            p1.choices.push(e.target.id);
            p1.turn = false;
        } else {
            document.querySelector(e.target).innerHTML("<img src='img/nought.svg'></>");
            p2.choices.push(e.target.id);
            p1.turn = true;
        }
        game.checkWinner(p1.choices, p2.choices)
    },
    reload: function () {
        window.location.reload();
    },
    checkWinner: function (p1, p2) {
        const pOne = game.playerOne;
        const pTwo = game.playerTwo;
        const tie = p1.length + p2.length;

        console.log(p1.length, p2.length);

        //If the length is less then 3 then we don't care
        if (p1.length >= 3 || p2.length >= 3) {
            if (tie >= 9) {
                alert("it's a tie");
                window.location.reload();
            } else {
                const hoz = ['top', 'middle', 'bottom'];
                const vert = ['left', 'center', 'right'];
                const leftDiag = ['top-left', 'middle-center', 'bottom-right'];
                const rightDiag = ['top-right', 'middle-center', 'bottom-left'];

                let p1Hoz = [];
                let p1Vert = [];
                let p2Hoz = [];
                let p2Vert = [];

                //Create a two new arrays, the hoz and vertical values of player one
                p1.forEach(item => {
                    let dashIndex = item.indexOf('-')
                    let hoz = item.slice(0, dashIndex);
                    let vert = item.slice(dashIndex + 1, item.length);
                    p1Hoz.push(hoz);
                    p1Vert.push(vert);
                })

                p2.forEach(item => {
                    let dashIndex = item.indexOf('-')
                    let hoz = item.slice(0, dashIndex);
                    let vert = item.slice(dashIndex + 1, item.length);
                    p2Hoz.push(hoz);
                    p2Vert.push(vert);
                })

                let p1hozTop = p1Hoz.every(function (value) {
                    return value === hoz[0];
                })



            }
        }

    }
}

document.querySelector('#two-players').addEventListener('click', function (e) {
    //Remove the name fields hidden class
    document.querySelector('#two-input').removeAttribute('class', 'hide');
    e.preventDefault();
})

//Set names and start 
document.querySelector("#two-input").addEventListener('submit', function (e) {
    game.playerOne.name = document.querySelector('#player-one-name').value;
    game.playerTwo.name = document.querySelector('#player-two-name').value;
    //Generate a names input section
    // const createTally = () => {


    // }
    console.log(game);
    e.preventDefault();
    console.log(game.playerOne.name.length);
})

//If we have names, proceed to the thing 
document.querySelector('#board').addEventListener('click', function (e) {
    if (game.playerOne.name.length > 0 && game.playerTwo.name.length > 0) {
        console.log("greater than 0");
        // game.playerTurn(e);
    }
});





















// if (p1hozTop) {
//     alert('Player 1 wins Top Row');
//     pOne.results.won++;
//     pTwo.results.lost++;
//     console.log(game);
// } else if (p1hozMiddle) {
//     alert('Player 1 wins Middle Row');
//     pOne.results.won++;
//     pTwo.results.lost++;
//     console.log(game);
// } else if (p1hozBottom) {
//     alert('Player 1 wins Bottom Row');
//     pOne.results.won++;
//     pTwo.results.lost++;
//     console.log(game);
// }