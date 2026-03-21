const board = document.getElementById("board");
const statusText = document.getElementById("status");
const popup = document.getElementById("popup");
const resultText = document.getElementById("resultText");

let cells = [];
let currentPlayer = "X";
let gameActive = true;

const winningCombinations = [
  [0,1,2],[3,4,5],[6,7,8],
  [0,3,6],[1,4,7],[2,5,8],
  [0,4,8],[2,4,6]
];

function createBoard() {
  board.innerHTML = "";
  cells = [];

  for (let i = 0; i < 9; i++) {
    const cell = document.createElement("div");
    cell.classList.add("cell");
    cell.addEventListener("click", handleClick);
    board.appendChild(cell);
    cells.push(cell);
  }
}

function handleClick(e) {
  const cell = e.target;

  if (cell.textContent !== "" || !gameActive) return;

  cell.textContent = currentPlayer;

  if (checkWinner()) {
    showResult(`Player ${currentPlayer} Wins!`);
    return;
  }

  if (cells.every(c => c.textContent !== "")) {
    showResult("It's a Draw!");
    return;
  }

  currentPlayer = currentPlayer === "X" ? "O" : "X";
  statusText.textContent = `Player ${currentPlayer}'s Turn`;
}

function checkWinner() {
  return winningCombinations.some(combo => {
    const [a, b, c] = combo;
    return (
      cells[a].textContent &&
      cells[a].textContent === cells[b].textContent &&
      cells[a].textContent === cells[c].textContent
    );
  });
}

function showResult(message) {
  resultText.textContent = message;
  popup.classList.remove("hidden");
  gameActive = false;
}

function resetGame() {
  currentPlayer = "X";
  gameActive = true;
  statusText.textContent = "Player X's Turn";
  popup.classList.add("hidden");
  createBoard();
}

createBoard();