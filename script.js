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

  const translateID = (id) => {
    switch (id) {
      case "one":
        return [0, 0];
        break;
      case "two":
        return [0, 1];
        break;
      case "three":
        return [0, 2];
        break;
      case "four":
        return [1, 0];
        break;
      case "five":
        return [1, 1];
        break;
      case "six":
        return [1, 2];
        break;
      case "seven":
        return [2, 0];
        break;
      case "eight":
        return [2, 1];
        break;
      case "nine":
        return [2, 2];
        break;
    }
  };

  return {
    resetGameBoard,
    setValue,
    getValue,
    viewGameBoard,
    checkWinner,
    translateID,
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

gameBoard.resetGameBoard();

const createO = () => {
  return `<svg width="100" height="100" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <circle cx="50" cy="50" r="30" stroke="#00ffcc" stroke-width="8" fill="none" stroke-linecap="round"/>
    </svg>`;
};

const createX = () => {
  return `<svg width="100" height="100" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <line x1="20" y1="20" x2="80" y2="80" stroke="#00ffcc" stroke-width="8" stroke-linecap="round"/>
      <line x1="80" y1="20" x2="20" y2="80" stroke="#00ffcc" stroke-width="8" stroke-linecap="round"/>
  </svg>`;
};

let turn = 0;

const clicked = (e) => {
  const squareElement = e.target.closest(".square");
  const clickedPoint = gameBoard.translateID(squareElement.id);
  if (gameBoard.getValue(clickedPoint[0], clickedPoint[1]) == "") {
    if (turn % 2 == 0) {
      e.target.innerHTML = createX();
      gameBoard.setValue(clickedPoint[0], clickedPoint[1], "0");
    } else {
      e.target.innerHTML = createO();
      gameBoard.setValue(clickedPoint[0], clickedPoint[1], "1");
    }

    if (turn > 3) {
      console.log(turn);
      if (gameBoard.checkWinner(String(turn % 2))) {
        alert(turn % 2);
      }
    }
    turn += 1;
  } else {
    squareElement.style.backgroundColor = "#ff073a";
    setTimeout(() => {
      squareElement.style.backgroundColor = "#ffffff";
    }, 250);
  }
};

const startGame = (e) => {
  e.target.innerHTML = "Restart";
  gameBoard.resetGameBoard();

  let squares = document.getElementsByClassName("square");

  for (let i = 0; i < squares.length; i++) {
    squares[i].innerHTML = "";
    squares[i].addEventListener("click", clicked);
  }
};

let start = document.getElementById("start");
start.addEventListener("click", startGame);
