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

        let piece = board[row][col];

        if (piece === "A") square.classList.add("pieceA");
        if (piece === "B") square.classList.add("pieceB");

        if (piece === "AK" || piece === "BK") {
          square.style.border = "3px solid gold";
        }
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
      checkWinner();
    } else {
      selected = null;
    }
  } else {
    if (board[row][col] && board[row][col].includes(currentPlayer)) {
      selected = { row, col };
    }
  }
}

function tryMove(fr, fc, tr, tc) {
  if (board[tr][tc] !== null) return false;

  let piece = board[fr][fc];
  let isKing = piece.includes("K");

  let direction = currentPlayer === "A" ? 1 : -1;

  let dr = tr - fr;
  let dc = tc - fc;

  // Movimento normal
  if (
    (dr === direction && Math.abs(dc) === 1) ||
    (isKing && Math.abs(dr) === 1 && Math.abs(dc) === 1)
  ) {
    movePiece(fr, fc, tr, tc);
    return true;
  }

  // Captura
  if (
    (dr === direction * 2 && Math.abs(dc) === 2) ||
    (isKing && Math.abs(dr) === 2 && Math.abs(dc) === 2)
  ) {
    let midRow = fr + dr / 2;
    let midCol = fc + dc / 2;

    if (
      board[midRow][midCol] &&
      !board[midRow][midCol].includes(currentPlayer)
    ) {
      board[midRow][midCol] = null;
      movePiece(fr, fc, tr, tc);
      return true;
    }
  }

  return false;
}

function movePiece(fr, fc, tr, tc) {
  let piece = board[fr][fc];

  board[tr][tc] = piece;
  board[fr][fc] = null;

  // 👑 VIRAR DAMA
  if (piece === "A" && tr === 7) board[tr][tc] = "AK";
  if (piece === "B" && tr === 0) board[tr][tc] = "BK";

  currentPlayer = currentPlayer === "A" ? "B" : "A";
}

function checkWinner() {
  let hasA = false;
  let hasB = false;

  for (let row of board) {
    for (let cell of row) {
      if (cell && cell.includes("A")) hasA = true;
      if (cell && cell.includes("B")) hasB = true;
    }
  }

  if (!hasA) {
    setTimeout(() => alert("Jogador B venceu!"), 100);
  }

  if (!hasB) {
    setTimeout(() => alert("Jogador A venceu!"), 100);
  }
}

initBoard();
renderBoard();
