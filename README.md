# Project 0: Tic Tac Toe
Stack: Vanilla JS, HTML/CSS, jQuery.
[Game link](https://aronweston.github.io/tic-tac-toe/)

### Overview

The directive for this project was to build a functional tic-tac-toe app that would have all of the functionality that a normal game interface would require: 

- Win, loss and draw conditions
- Tracker for both players win tallies
- A way to gather player information like names or user selection
- A way to reset the board for that game
- A way to tell the user that they have won
- And a way to show the user where they have won on the board. 


### Instructions

1. [Open the game at this link](https://aronweston.github.io/tic-tac-toe/)
2. Chose either one or two players (one player in development)
3. Enter your name and the name of your mate
4. Chose your character, if you don't, you'll default to your classic X or O. Don't click the same character, or do. Up to you.
5. Get ready because you're up player one.
6. Chose wisely and remember it's only a game.


### Approach  

To approach the logic of the game, I boiled it down to tackling a handful of questions and statements and with those answers feeding into the answers to the next problem and so on. 

### Data Structure

I chose to use an object-orientated approach over a functional approach for this project as I felt it would allow me to contain all of my game methods within the one game object and assist in scaling and persisting the data to localStorage or a database in the future. As such I created a game object and set each player the following structure: 

```js
const game = {
    playerOne: {
        name: '',
        icon: 'X',
        turn: true,
        choices: [],
        results: {
            won: 0,
            lost: 0
        }
    },
    playerTwo: {
        name: '',
        icon: 'O',
        turn: false,
        choices: [],
        results: {
            won: 0,
            lost: 0
        }
    }
}
```

Throughout the game, I needed a place to keep track of all of the users decisions and their results and this structure was very easy to implement. By targeting the `game.playerOne` or `game.playerTwo` properties, I could change the name, reset the board and update the results object easily. This structure also assists in building out a AI component and persisting the data to localStorage in the future.

### Building the board 

I build the board using [CSS Grid](https://css-tricks.com/snippets/css/complete-guide-grid/) and assigning each of the squares an ID to a number as shown below for a few reasons. 

The first was to open the door for adding more squares to the board as CSS Grid provides a more flexible solution than something like a HTML table. 

The second was to assign each of the square's an ID so that ID would exist as the player choice and be pushed to the player choice array properties. 

```html
<div id="board">
    <div class="square" id="1"></div>
    <div class="square" id="2"></div>
    <div class="square" id="3"></div>
    <div class="square" id="4"></div>
    <div class="square" id="5"></div>
    <div class="square" id="6"></div>
    <div class="square" id="7"></div>
    <div class="square" id="8"></div>
    <div class="square" id="9"></div>
</div>
```

### `game.playerTurn(e)`: Where did they click and who's turn is it?

The first method created is the `game.playerTurn(e)` method. This method takes a single argument, [the event object](https://developer.mozilla.org/en-US/docs/Web/API/Event). After the users have submitted their name and icon choice, a click handler on `app.js` passes the event object to `.playerTurn()`. 

As the event object is passed in we can both access the ID of the DOM square that the user has chosen, convert it to a number, and push to each players choices array. 

The `.playerTurn()` method also rotates each players turn through an if-else check, and then outputs the players chosen icon into the square they have chosen. We then use materialise.css `.active` class on the score board generated through a separate method, to determine who's turn it is.

🐛 No checks have been placed in to prevent the user from only clicking one square per turn. At the current commit, the user can add as many random square ID's to their respective arrays as they click. 

### `game.checkWinner()`: Who wins then?

The `game.checkWinner()` method was the most difficult to implement as it determines the win, lose and draw conditions based on the two arguments it takes in, the `choice: []` properties of each user. 

I broke this logic down into three specific parts: 
1. How do I know how you can win?
2. How do I know if there is a win condition? 
3. How do I decide which player win or lost?


My approach to this was to deciding how to win was to write all of the possible win conditions into an array of arrays. Thanks to @oisa for the advice in doing it this way. 

```js 
const win = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
    [1, 4, 7],
    [2, 5, 8],
    [3, 6, 9],
    [1, 5, 9],
    [3, 5, 7]
]
```

The issue then was to loop through each of the win conditions and check if the user choice matched the winning condition. The first problem faced here was through my original approach was to use `.every()` to check if every number in the user choice array, matched those in the `win[i]` arrays.

The problem faced here was that each result would be false in the conditions where the users array lengths were over 3. With assistance, I've used a more explicit method of checking with `.includes()` and destructing as detailed below:

```js
const check = ([a, b, c], arr) => {
    if (arr.includes(a) && arr.includes(b) && arr.includes(c)) {
        return true;
    } else {
        return false;
    }
}
```

The `check()` function takes in two arguments, each potential winning array and the array of the user we want to check if won. I use destructuring here to isolate if the user array at `arr` includes each of the values of the winning array `[a,b,c]`. The function returns true if there is a match. 

The `check()` function is the called within a `for` loop that loops through the `win` array and calls the `check()` function on every possible win combination, until either the first player at `oneWin` or second at `twoWIn` returns true. In that case, the winner, loser and the winning array is passed to the `game.alertWinner()` method, which outputs the winner to the DOM.

In the case of tie, the last if checks that neither first or second player have won, and that all the squares are occupied. This is through combining the length of each player array.

```js 

for (i = 0; i < win.length; i++) {
    const oneWin = check(win[i], playerOne)
    const twoWin = check(win[i], playerTwo)

    if (oneWin) {
        game.alertWinner(p1, p2, win[i]);
    }

    if (twoWin) {
        game.alertWinner(p2, p1, win[i]);
    }

    if (tie === 9 && !twoWin && !oneWin) {
        game.showTie(true);
        setTimeout(() => {
            game.clearBoard();
        }, 2000);
        break;
    }
};
```

### UI Methods

After all data is collected, I've created a series of DOM output functions that all work together for separate scenarios. 

* `game.alertWinner()`: this method uses jQuery to update the alert UI and notify the winner and loser, then update each players results in the game, it then passes a destructured winning array to the `game.showWin()` method.

* `game.showWin()`: this method outputs to the DOM where the user has won by passing in the winning numbers into the `game.loopBoard()` method that returns all of the squares of the board. The method then adds the `.green` class with a green background on the winning squares. The `game.showTie()` method has a similar structure if the tie argument is true, all of the squares are turned red.

* `game.clearBoard()`: this is a reset method that will set each of the player choices to empty arrays, then loop all of the squares remove all children of each square, if that specific square has a HTML element within it. 

* `game.loopBoard(callBack)`: this is my favourite method due to its refinement into a utility method for use across the above UI methods. The idea of this method was to prevent repeating loops everywhere and to provide a way of getting all of the squares on the board for different conditionals. This is achieved through the callBack function that will execute within a loop on the board array.


```js
loopBoard: function (callBack) {
    const board = Array.from(document.getElementById('board').children);
    board.forEach(square => {
        callBack(square);
    })
}
```

### To Do's
- [ ] Remove the scroll abilitly for the above sections to avoid any issues during game play
- [ ] Implement a remove last turn option for each player 
- [ ] Create a success goal or outcome in the DOM when a player reaches a milestone. I.e, an alert saying they've reach 10 wins.
- [ ] Persist data to localStorage to ensure game data is not lost on refresh. 
 
### Bugs
🐛  No checks have been placed in to prevent the user from only clicking one square per turn. At the current commit, the user can add as many random square ID's to their respective arrays as they click.
🐛  Currently the board is always present at the bottom of the page as a result of the pagePiling configuration on app.js
🐛  On refresh, the #game-board anchor tag remains when I want it to return to the first page. 

### Key deliverables
- [x] Render a game board in the browser
- [x] Successfully return a win and tie condition to the DOM
- [x] Switch turns between X and O (or whichever markers you select). Players have the option of choosing an emoji of their choice.
- [x] Keep track of multiple game rounds with a win counter

### Stretch goals
- [ ] Rebuild using ES6 Classes and constructors.
- [ ] Build Ultimate Tic Tac Toe.
- [ ] Create an AI system.
- [ ] Create a networked app with Firebase.
- [ ] Implement a system where the grid grows to 6*6 and 9*9 with auto generated IDs.
