const boardElement = document.getElementById("board");
const turnText = document.getElementById("turn");

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

  turnText.innerText = "Turno: Jogador " + currentPlayer;
}

function handleClick(row, col) {
  if (selected) {
    if (tryMove(selected.row, selected.col, row, col)) {
      selected = null;
      renderBoard();
    } else {
      selected = null;
    }
  } else {
    if (board[row][col] === currentPlayer) {
      selected = { row, col };
    }
  }
}

function tryMove(fr, fc, tr, tc) {
  if (board[tr][tc] !== null) return false;

  let direction = currentPlayer === "A" ? 1 : -1;

  let dr = tr - fr;
  let dc = tc - fc;

  // Movimento simples
  if (dr === direction && Math.abs(dc) === 1) {
    movePiece(fr, fc, tr, tc);
    return true;
  }

  // Captura
  if (dr === direction * 2 && Math.abs(dc) === 2) {
    let midRow = fr + direction;
    let midCol = fc + (dc > 0 ? 1 : -1);

    if (
      board[midRow][midCol] !== null &&
      board[midRow][midCol] !== currentPlayer
    ) {
      board[midRow][midCol] = null;
      movePiece(fr, fc, tr, tc);
      return true;
    }
  }

  return false;
}

function movePiece(fr, fc, tr, tc) {
  board[tr][tc] = board[fr][fc];
  board[fr][fc] = null;

  currentPlayer = currentPlayer === "A" ? "B" : "A";
}

initBoard();
renderBoard();
