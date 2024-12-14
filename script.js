const board = document.getElementById("game-board");
const ROWS = 12;
const COLS = 12;

let currentPlayer = 1; // Player 1 starts
let playerPositions = { 1: null, 2: null }; // Track player monster positions

// Initialize the board
for (let row = 0; row < ROWS; row++) {
  for (let col = 0; col < COLS; col++) {
    const hexagon = document.createElement("div");
    hexagon.classList.add("hexagon");
    hexagon.dataset.row = row;
    hexagon.dataset.col = col;

    // Offset for honeycomb effect
    if (row % 2 !== 0) {
      hexagon.style.marginLeft = "30px";
    }

    board.appendChild(hexagon);
  }
}
// Place player monsters
placeMonster(0, 0, 1); // Player 1 starts at top-left
placeMonster(ROWS - 1, COLS - 1, 2); // Player 2 starts at bottom-right

function placeMonster(row, col, player) {
  const hexagon = getHexagon(row, col);
  const monster = document.createElement("div");
  monster.classList.add("monster", `player${player}-monster`);
  hexagon.appendChild(monster);
  hexagon.classList.add(`player${player}`);
  playerPositions[player] = hexagon;
}

// Get hexagon by row and column
function getHexagon(row, col) {
  return document.querySelector(`.hexagon[data-row="${row}"][data-col="${col}"]`);
}
// Handle player clicks
board.addEventListener("click", (e) => {
  const hex = e.target;
  if (!hex.classList.contains("hexagon")) return;

  const currentHex = playerPositions[currentPlayer];
  if (hex.classList.contains("highlight")) {
    moveMonster(currentHex, hex);
  } else {
    highlightValidMoves(currentHex);
  }
});


// Highlight valid moves
function highlightValidMoves(hex) {
  clearHighlights();

  const row = parseInt(hex.dataset.row);
  const col = parseInt(hex.dataset.col);

  const neighbors =
    row % 2 === 0
      ? [[-1, 0], [-1, -1], [0, -1], [0, 1], [1, 0], [1, -1]]
      : [[-1, 0], [-1, 1], [0, -1], [0, 1], [1, 0], [1, 1]];

  neighbors.forEach(([dRow, dCol]) => {
    const neighbor = getHexagon(row + dRow, col + dCol);
    if (neighbor && !neighbor.classList.contains("player1") && !neighbor.classList.contains("player2")) {
      neighbor.classList.add("highlight");
    }
  });
}

// Move monster
function moveMonster(fromHex, toHex) {
  const monster = fromHex.querySelector(".monster");
  toHex.appendChild(monster);
  toHex.classList.add(`player${currentPlayer}`);
  playerPositions[currentPlayer] = toHex;

  clearHighlights();
  endTurn();
}
// Clear all highlights
function clearHighlights() {
  document.querySelectorAll(".hexagon.highlight").forEach((hex) => {
    hex.classList.remove("highlight");
  });
}

// End turn and check win conditions
function endTurn() {
  currentPlayer = currentPlayer === 1 ? 2 : 1;
  document.getElementById("player-turn").textContent = `Player ${currentPlayer}'s Turn`;

  if (document.querySelectorAll(".hexagon:not(.player1):not(.player2)").length === 0) {
    declareWinner();
  }
}

