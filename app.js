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
    reload: function () {
        window.location.reload();
    },
    loop: function (arr, arrHoz, arrVert) {
        arr.forEach(item => {
            let dashIndex = item.indexOf('-')
            let hoz = item.slice(0, dashIndex);
            let vert = item.slice(dashIndex + 1, item.length);
            arrHoz.push(hoz);
            arrVert.push(vert);
        })
    },
    checkWinner: function (p1, p2) {
        //If the length of the current choices is less then 3 then we don't care because no one can even win yet. 
        if (p1.length >= 3 || p2.length >= 3) {
            const tie = p1.length + p2.length;
            if (tie >= 9) {
                alert("it's a tie");
                window.location.reload();
            } else {
                //Empty choices arrays
                const p1Hoz = [];
                const p1Vert = [];
                const p2Hoz = [];
                const p2Vert = [];

                //Winning conditions
                const hoz = ['top', 'middle', 'bottom'];
                const vert = ['left', 'center', 'right'];
                const leftD = ['top-left', 'middle-center', 'bottom-right'];
                const rightD = ['top-right', 'middle-center', 'bottom-left'];

                //Create two new arrays. These arrays hold the horizontal and vertical values of the player choices. 
                game.loop(p1, p1Hoz, p1Vert);
                game.loop(p2, p2Hoz, p2Vert);

                // //Win Conditions
                // //Player 1 - Horizontal values

                // //diag
                // const p1leftDiag = p1.every(v => v === leftD);

                // console.log(p1);
                // console.log(p1leftDiag);


                const p1Top = p1Hoz.every(v => v === hoz[0]);
                if (p1Top) {
                    alert('Player 1 wins Top Row');
                    game.playerOne.results.won++;
                    game.playerTwo.results.lost++;

                    //Game finished conditions
                    game.playerOne.choices = [];
                    game.playerTwo.choices = [];
                    let x = document.getElementById('board').children;
                    let y = Array.from(x);
                    y.forEach(square => {
                        square.childNodes[0].remove();
                    })
                    console.log(y);


                    //Update the score
                    $('#first-player span').html(`Won: ${game.playerOne.results.won} / Lost: ${game.playerOne.results.lost}`)
                    $('#second-player span').html(`Won: ${game.playerTwo.results.won} / Lost: ${game.playerTwo.results.lost}`)
                    console.log(game);
                }


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

    $('#two-input').addClass('hide');
    $('#player-cards').html(`
        <a id="first-player" class="collection-item"><span class="badge">Won: ${game.playerOne.results.won} / Lost: ${game.playerOne.results.lost}</span>${game.playerOne.name}</a>
        <a id="second-player" class="collection-item"><span class="badge">Won: ${game.playerOne.results.won} / Lost: ${game.playerOne.results.lost}</span>${game.playerTwo.name}</a>`)

    console.log(game);
    e.preventDefault();
    console.log(game.playerOne.name.length);
})

//If we have names, proceed to the thing 
document.querySelector('#board').addEventListener('click', function (e) {
    if (game.playerOne.name.length > 0 && game.playerTwo.name.length > 0) {
        game.playerTurn(e);
    }
});


//Player 1
// const p1Top = p1Hoz.every(v => v === hoz[0]);
// const p1Middle = p1Hoz.every(v => v === hoz[1]);
// const p1Bottom = p1Hoz.every(v => v === hoz[2]);
// const p1Left = p1Vert.every(v => v === vert[0]);
// const p1Center = p1Vert.every(v => v === vert[1]);
// const p1Right = p1Vert.every(v => v === vert[2]);





console.log();

//Player 2 
// const p2Top = p2Hoz.every(v => v === hoz[0]);
// const p2Middle = p2Hoz.every(v => v === hoz[1]);
// const p2Bottom = p2Hoz.every(v => v === hoz[2]);
// const p2Left = p2Vert.every(v => v === vert[0]);
// const p2Center = p2Vert.every(v => v === vert[1]);
// const p2Right = p2Vert.every(v => v === vert[2]);
// console.log(p1Top, p1Middle, p1Bottom, p1Left, p1Center, p1Right);
// console.log(p2Top, p2Middle, p2Bottom, p2Left, p2Center, p2Right);


//Conditionals for DOM output
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