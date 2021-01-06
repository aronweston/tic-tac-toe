# Project 0: Tic Tac Toe

This branch contains the version of the project that uses word ID sets that are specific to the square locations on the board. I.e `top-left` and `bottom-right`. 

The win conditions for this version break using array methods and push the vertical and horizontal positions to an array for each player.

Each player then has a horizontal and vertical choice array. Then, if the length of each array is greater than 3, I use the `.every()` method to check each players choice array against each element in the winning data set. 

For example, if the user chose something like this: 

```js 
const player1 = ['top', 'top', 'top']
```

The `.every()` method would return true as all elements in the user choice array match the winning condition of `top`. This method of win checking is successful on the horizontal and vertical checks as it's impossible for one player to have all three verticals or three horizontals at the same time.

The issues with this branch are: 

1. **Win conditions are repetitive**: I have to run `.every()` on each possible outcome to get a bunch of true or false conditions, and only then do I run if checks to see who won and where. Not only is this cumbersome, it's also expensive as `.every()` is a higher order array method and if this were to scale, this would be an inefficient system.

2. **Using strings and not numbers**: By retrieving each of the squares with the `window.event()` object, in this version, returns a string ID that I then need to use array methods to push each vertical and horizontal position. This is an intuitive way, but not scalable. If I were to add more squares, the logic would break. With numbered ID's, I just check the user choice array against winning conditions. Less code, less future headaches. 