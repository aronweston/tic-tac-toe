$(document).ready(function () {

    //Multiplayer - player one
    $("form#multiplayer-one").on("submit", function (e) {

        multiplayer.playerOne.name = $('#multi-two').val();
        multiplayer.playerTwo.icon = $('input[name=p1-multi-emoji]:checked', '#two-input').val();
        // firebase.pushDB(game.playerOne);

        if (connected) {
            $("#get-ready .container").html(`<h2>Player 2 Connected. Are you ready?</h2><h2 id="name">${playerOne.name}</h2><h2>you're up first.</h2>`)
            $.fn.pagepiling.moveSectionDown("ready");
            setTimeout(() => {
                ui.buildScoreBoard();
                $.fn.pagepiling.moveSectionDown("game-board");
            }, 3000);
        }
        e.preventDefault();
    });


    //Multiplayer - player two 

    $("form#multi-input").on("submit", function (e) {

        //Player Two
        game.playerTwo.name = $('#multi-two').val();
        game.playerTwo.icon = $('input[name=p2-emoji]:checked', '#two-input').val();
        firebase.pushDB(game.playerTwo);

        //once player two 


        if (connected) {
            $("#get-ready .container").html(`<h2>Player 2 Connected. Are you ready?</h2><h2 id="name">${game.playerOne.name}</h2><h2>you're up first.</h2>`)
            $.fn.pagepiling.moveSectionDown("ready");
            setTimeout(() => {
                game.buildScoreBoard();
                $.fn.pagepiling.moveSectionDown("game-board");
            }, 3000);
        }
        e.preventDefault();
    });
















    // Two Players
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
                ui.buildScoreBoard();
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
        anchors: ['player-choice', 'two-players', 'multiplayer-one', 'multiplayer-two', 'ready', 'game-board'],
    });

    //Clear board on button click
    $('#play-again').on('click', function () {
        ui.clearBoard()
    })

})