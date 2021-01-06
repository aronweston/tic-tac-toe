$(document).ready(function () {

    $('#pagepiling').pagepiling({
        menu: null,
        sectionsColor: ['white', '#E8E8E8', '#f2f2f2', '#EC008C'],
        anchors: ['intro', 'player-choice', 'one', 'two', 'game-board'],
    });

    // //If two players
    // $('#two-players').on('click', function (e) {
    //     //Remove the name fields hidden class
    //     $('#two-input').removeClass('hide');
    //     e.preventDefault();
    // })

    //Set names and start 
    $("form#two-input").on("submit", function (e) {
        // $.fn.pagepiling.moveSectionDown("game-board");


        console.log($('#player-one-name').val());
        console.log($('#player-two-name').val());
        
        // game.playerOne.name = $('#player-one-name').val();
        // game.playerTwo.name = $('#player-two-name').val();
        //Generate a names input section

        console.log(game);
        console.log("working");

        //Add collection items
        $('#player-cards').addClass('collection-items');

        
        // $('<a id="first-player" class="collection-item">').html(`<span class="badge"></span>Won: ${game.playerOne.results.won}</span`).appendTo($('#player-cards'));

        // $('#player-cards').html(`
        // <a id="first-player" class="collection-item"><span class="badge"> / Lost: ${game.playerOne.results.lost}</span>${game.playerOne.name}</a>
        // <a id="second-player" class="collection-item"><span class="badge">Won: ${game.playerOne.results.won} / Lost: ${game.playerOne.results.lost}</span>${game.playerTwo.name}</a>`);

        e.preventDefault();
    })

    //If we have names, proceed to the thing 
    $('#board').on('click', function (e) {
        if (game.playerOne.name.length > 0 && game.playerTwo.name.length > 0) {
            game.playerTurn(e);
        }
    });







})