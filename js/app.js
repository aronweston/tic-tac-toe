$(document).ready(function () {

    $("form#two-input").on("submit", function (e) {

        game.playerOne.name = $('#two-players-one').val()
        game.playerTwo.name = $('#two-players-two').val()

        const player1Icon = $('input[name=p1-emoji]:checked', '#two-input').val();
        const player2Icon = $('input[name=p2-emoji]:checked', '#two-input').val();

        if (player1Icon === player2Icon) {
            alert('I know you guys are mates, but pick different icons.');
            $('#two-input').trigger("reset");
        } else {
        
            game.playerOne.icon = player1Icon;
            game.playerTwo.icon = player2Icon;
            
            $("#get-ready .container").html(`<h2>Are you ready?</h2><h2 id="name">${game.playerOne.name}</h2><h2>you're up first.</h2>`)
            $.fn.pagepiling.moveSectionDown("ready");
            setTimeout(() => {
                game.buildScoreBoard();
                $.fn.pagepiling.moveSectionDown("game-board");
            }, 3000);
        }
        e.preventDefault();
    });

    //If there are names on the board, then the players can play the game. 
    $('#board').on('click', function (e) {
        if (game.playerOne.name.length > 0 && game.playerTwo.name.length > 0) {
            game.playerTurn(e);
        }
    });

    $('#pagepiling').pagepiling({
        menu: null,
        navigation: false,
        direction: 'vertical',
        verticalCentered: true,
        sectionsColor: ['white', 'white', 'white', 'white'],
        anchors: ['player-choice', 'two', 'ready', 'game-board'],
    });

    //Clear board on button click
    $('#play-again').on('click', function () {
        game.clearBoard()
    })

})