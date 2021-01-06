$(document).ready(function () {

    $('#pagepiling').pagepiling({
        menu: null,
        navigation: false,
        sectionsColor: ['white', '#E8E8E8', '#fff', '#EC008C'],
        anchors: ['intro', 'player-choice', 'one', 'two', 'game-board'],
    });

    //Set names and start 
    $("form#two-input").on("submit", function (e) {
        
        game.playerOne.name = $('#two-players-one').val()
        game.playerTwo.name = $('#two-players-two').val()

        //Remove the hidden class
        $("#player-cards").removeClass('hide');

        //Set player 1 output
        $('#tp-p1').html(`<div>${p1.name}<span class="secondary-content">WIN: ${p1.results.won}</span></div>`);
        
        //Set player 2 output
        $('#tp-p2').html(`<div>${p2.name}<span class="secondary-content">WIN: ${p2.results.won}</span></div>`);
        
        $.fn.pagepiling.moveSectionDown("game-board");
        e.preventDefault();
    });

    $('#play-again').on('click', function () {
        game.clearBoard()
    })

    //If we have names, proceed to the thing 
    $('#board').on('click', function (e) {
        if (game.playerOne.name.length > 0 && game.playerTwo.name.length > 0) {
            game.playerTurn(e);
        }
    });







})