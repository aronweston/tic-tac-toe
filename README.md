# Project 0: Tic Tac Toe

### ToDo's 
- [x] Build out the board
- [ ] Sort out the business logic after a basic board is created.



Possibilities 
### Straight lines
1. Top-left, top-center, top-right
2. midde-left, top-center, top-right
3. Top-left, middle-left, top-right

1. Diagonal: top-left, middle-center, bottom right
2. Top-middle, middle-center, 



      //Horizontal win conditions are left word of the id: top, middle, bottom
        //Vertical: right word of the id - left, center, right
        //Diagonal
        //Tie = the combined length of both arrays are equal to 9
        // //loop through or check if the array contains the winning   




### Instructions

### Big Goals

* **Build a web application from scratch**, without a starter codebase
* Use your programming skills to **map out the game logic for a simple game like Tic Tac Toe**
* **Separate HTML, CSS, and JavaScript files** in your application
* Build an application **to a spec that someone else gives you**
* **Build a dynamic game that allows two players to compete**
* **Craft a ``readme.md`` file that explains your app** to the world

---

### Technical Requirements

Your app must:

* **Render a game board in the browser**
* **Switch turns** between X and O (or whichever markers you select)
* **Visually display which side won** if a player gets three in a row or show a draw/"cat’s game" if neither wins
* **Include separate HTML / CSS / JavaScript files**
* Stick with **KISS (Keep It Simple Stupid)** and **DRY (Don't Repeat Yourself)** principles
* Use **Javascript** for **DOM manipulation**
* **Deploy your game online**, where the rest of the world can access it
* Use **semantic markup** for HTML and CSS (adhere to best practices)

---

### Bonus

These are for extra credit! Don't focus on these until you've hit the core requirements.

* Keep track of **multiple game rounds** with a win counter
* Allow players to **customize their tokens** (X, O, name, picture, etc)
* **Get inventive with your styling**, e.g. use hover effects or animations to spiff things up
* **Use LocalStorage** to persist data locally to allow games to continue after page refresh or loss of internet connectivity
* **Support custom board sizes**: default is 3x3 but you could allow users to choose a larger board
* **Support networked multiplayer**: https://www.firebase.com/ has a nice quickstart guide
* **TRICKIEST**: Create an AI opponent: teach Javascript to play an unbeatable game against you

---

### Necessary Deliverables

* A **working game, built by you**, hosted somewhere on the internet
* A **link to your hosted working game** in the URL section of your Github repo
* A **git repository hosted on Github**, with a link to your hosted game, and frequent commits dating back to the very beginning of the project
* **A ``readme.md`` file** with explanations of the technologies used, the approach taken, installation instructions, unsolved problems, etc.

---

### Suggested Ways to Get Started

* **Break the project down into different components** (data, presentation, views, style, DOM manipulation) and brainstorm each component individually. Use whiteboards!
* **Use your Development Tools** (console.log, inspector, alert statements, etc) to debug and solve problems
* Work through the lessons in class, **ask questions and come to office hours** when you need to. Think about adding relevant code to your Tic Tac Toe game each night, instead of, you know... _procrastinating_.
* **Commit early, commit often.** Don’t be afraid to break something because you can always go back in time to a previous version.
* **Check out Tutorial and Documentation resources** (jQuery tutorial) at home to better understand what you’ll be getting into.
* **Don’t be afraid to write code that you know you will have to remove later.** Create temporary elements (buttons, links, etc) that trigger events if real data is not available. For example, if you’re trying to figure out how to change some text when the game is over but you haven’t solved the win/lose game logic, you can create a button to simulate that until then.

---

### Useful Resources

* **[MDN Javascript Docs](https://developer.mozilla.org/en-US/docs/Web/JavaScript)** _(a great reference for all things Vanilla Javascript)_
* **[jQuery Docs](http://api.jquery.com)**
* **[Github Pages](https://pages.github.com)** _(for hosting your game)_

---

### If You Finish Early

We invite you to work on any or all of the following:

* A more advanced game (Memory? Battleship? Connect Four?)
* Your Github portfolio site
* Any other front-end project that interests you