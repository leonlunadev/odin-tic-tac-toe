const gameBoard = (function () {
  const gameArray = [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""],
  ];

  const resetGameBoard = () => {
    for (let i = 0; i < gameArray.length; i++) {
      gameArray[i].fill(""); // fills each row with empty strings
    }
  };

  const setValue = (x, y, value) => (gameArray[x][y] = value);

  const viewGameBoard = () => {
    console.log("\n");
    console.log(gameArray[0]);
    console.log(gameArray[1]);
    console.log(gameArray[2]);
  };

  const getValue = (x, y) => gameArray[x][y];

  return {
    resetGameBoard,
    setValue,
    getValue,
    viewGameBoard,
  };
})();

// Test if the script is running
console.log("Script is running!");
gameBoard.viewGameBoard(); // This will show the initial empty board

gameBoard.setValue(0, 0, "x");
gameBoard.viewGameBoard();

console.log(gameBoard.getValue(0, 0));
