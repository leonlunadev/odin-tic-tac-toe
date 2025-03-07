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

  const arePointsEqual = (point1, point2, point3, marker) => {
    const [x1, y1] = point1;
    const [x2, y2] = point2;
    const [x3, y3] = point3;

    return (
      gameArray[x1][y1] === marker &&
      gameArray[x2][y2] === marker &&
      gameArray[x3][y3] === marker
    );
  };

  //  0 1 2
  //0
  //1
  //2
  const checkWinner = (marker) => {
    return (
      arePointsEqual([0, 0], [1, 1], [2, 2], marker) || // Diagonal
      arePointsEqual([2, 0], [1, 1], [0, 2], marker) || // Diagonal
      arePointsEqual([0, 0], [0, 1], [0, 2], marker) || // Row 0
      arePointsEqual([1, 0], [1, 1], [1, 2], marker) || // Row 1
      arePointsEqual([2, 0], [2, 1], [2, 2], marker) || // Row 2
      arePointsEqual([0, 0], [1, 0], [2, 0], marker) || // Column 0
      arePointsEqual([0, 1], [1, 1], [2, 1], marker) || // Column 1
      arePointsEqual([0, 2], [1, 2], [2, 2], marker) // Column 2
    );
  };

  return {
    resetGameBoard,
    setValue,
    getValue,
    viewGameBoard,
    checkWinner,
  };
})();

function createPlayer(name, marker) {
  this.name = name;
  this.marker = marker;
  return { name, marker };
}

const displayController = (function () {})();

function game(player1, player2, gameboard) {
  gameBoard.setValue(0, 0, player1.marker);
  gameBoard.setValue(0, 1, player2.marker);
  gameBoard.setValue(0, 2, player1.marker);
  gameBoard.setValue(1, 1, player2.marker);
  gameBoard.setValue(1, 2, player1.marker);
  gameBoard.setValue(2, 1, player2.marker);
  gameBoard.viewGameBoard();
  console.log(gameBoard.checkWinner(player2.marker));
}

const player1 = createPlayer("Adam Smith", "x");
const player2 = createPlayer("George Washington", "o");

console.log(player1, player2);

game(player1, player2, gameBoard);
