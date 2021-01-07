
$(document).ready(function () {


    //Build the scoreboard
    const buildScoreBoard = () => {
        //Remove the hidden class
        $("#player-cards").removeClass('hide');

        //Set player 1 output
        $('#tp-p1').html(`<div>${p1.icon} ${p1.name}<span class="secondary-content">WIN: ${p1.results.won}</span></div>`);
        //Set player 2 output
        $('#tp-p2').html(`<div>${p2.icon} ${p2.name}<span class="secondary-content">WIN: ${p2.results.won}</span></div>`);

        $.fn.pagepiling.moveSectionDown("game-board");
    }

    //pagepiling.js for scroll effects
    $('#pagepiling').pagepiling({
        menu: null,
        navigation: false,
        sectionsColor: ['white', 'white', 'white', 'white'],
        anchors: ['intro', 'player-choice', 'one', 'two', 'game-board'],
    });

    //Set names and start 
    $("form#two-input").on("submit", function (e) {
        //Set the name values
        game.playerOne.name = $('#two-players-one').val()
        game.playerTwo.name = $('#two-players-two').val()

        //Set the icon values
        const player1Icon = $('input[name=p1-emoji]:checked', '#two-input').val();
        const player2Icon = $('input[name=p2-emoji]:checked', '#two-input').val();

        //If they are the same, let them know and reset
        if (player1Icon === player2Icon) {
            alert('I know you guys are mates, but pick different icons.');
            $('#two-input').trigger("reset");
        } else {
            //if all good, build the score board and set the icons
            game.playerOne.icon = player1Icon;
            game.playerTwo.icon = player2Icon;
            buildScoreBoard();
        }
        e.preventDefault();
    });

    //Clear board on button click
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

