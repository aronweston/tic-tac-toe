//If two players
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
        <a id="second-player" class="collection-item"><span class="badge">Won: ${game.playerOne.results.won} / Lost: ${game.playerOne.results.lost}</span>${game.playerTwo.name}</a>`);

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