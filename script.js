const boardElement = document.getElementById("board");

let board = [];

function createBoard() {
  boardElement.innerHTML = "";
  board = [];

  for (let row = 0; row < 8; row++) {
    board[row] = [];

    for (let col = 0; col < 8; col++) {
      const square = document.createElement("div");
      square.classList.add("square");

      if ((row + col) % 2 === 0) {
        square.classList.add("light");
      } else {
        square.classList.add("dark");

        if (row < 3) {
          square.classList.add("pieceA");
          board[row][col] = "A";
        } else if (row > 4) {
          square.classList.add("pieceB");
          board[row][col] = "B";
        }
      }

      boardElement.appendChild(square);
    }
  }
}

createBoard();