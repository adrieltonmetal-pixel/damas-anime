const boardElement = document.getElementById("board");

let board = [];
let selected = null;
let currentPlayer = "A";

function initBoard() {
  board = [];

  for (let row = 0; row < 8; row++) {
    board[row] = [];

    for (let col = 0; col < 8; col++) {
      if ((row + col) % 2 === 1) {
        if (row < 3) board[row][col] = "A";
        else if (row > 4) board[row][col] = "B";
        else board[row][col] = null;
      } else {
        board[row][col] = null;
      }
    }
  }
}

function renderBoard() {
  boardElement.innerHTML = "";

  for (let row = 0; row < 8; row++) {
    for (let col = 0; col < 8; col++) {
      const square = document.createElement("div");
      square.classList.add("square");

      if ((row + col) % 2 === 0) {
        square.classList.add("light");
      } else {
        square.classList.add("dark");

        if (board[row][col] === "A") square.classList.add("pieceA");
        if (board[row][col] === "B") square.classList.add("pieceB");
      }

      square.onclick = () => handleClick(row, col);

      boardElement.appendChild(square);
    }
  }
}

function handleClick(row, col) {
  if (selected) {
    move(selected.row, selected.col, row, col);
    selected = null;
    renderBoard();
  } else {
    if (board[row][col] === currentPlayer) {
      selected = { row, col };
    }
  }
}

function movefunction move(fr, fc, tr, tc) {
  if (board[tr][tc] !== null) return;

  let direction = currentPlayer === "A" ? 1 : -1;

  // Movimento normal
  if (tr === fr + direction && Math.abs(tc - fc) === 1) {
    board[tr][tc] = board[fr][fc];
    board[fr][fc] = null;
  }

  // CAPTURA
  if (tr === fr + direction * 2 && Math.abs(tc - fc) === 2) {
    let midRow = (fr + tr) / 2;
    let midCol = (fc + tc) / 2;

    if (board[midRow][midCol] && board[midRow][midCol] !== currentPlayer) {
      board[tr][tc] = board[fr][fc];
      board[fr][fc] = null;
      board[midRow][midCol] = null;
    }
  }

  currentPlayer = currentPlayer === "A" ? "B" : "A";
}

initBoard();
renderBoard();
