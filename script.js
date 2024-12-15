const board = document.getElementById("game-board");
const ROWS = 12;
const COLS = 12;

let currentPlayer = 1; // Player 1 starts
let playerPositions = { 1: null, 2: null };

// Initialize the board
for (let row = 0; row < ROWS; row++) {
  for (let col = 0; col < COLS; col++) {
    const hexagon = document.createElement("div");
    hexagon.classList.add("hexagon");
    hexagon.dataset.row = row;
    hexagon.dataset.col = col;

    if (row % 2 !== 0) hexagon.style.marginLeft = "30px";
    board.appendChild(hexagon);
  }
}

// Place initial monsters
placeMonster(0, 0, 1); // Player 1
placeMonster(ROWS - 1, COLS - 1, 2); // Player 2

function placeMonster(row, col, player) {
  const hexagon = getHexagon(row, col);
  const monster = document.createElement("div");
  monster.classList.add("monster", `player${player}-monster`);
  hexagon.appendChild(monster);
  hexagon.classList.add(`player${player}`);
  playerPositions[player] = hexagon;
}

function getHexagon(row, col) {
  return document.querySelector(`.hexagon[data-row="${row}"][data-col="${col}"]`);
}

board.addEventListener("click", (e) => {
  const hex = e.target;
  if (!hex.classList.contains("hexagon")) return;

  const currentHex = playerPositions[currentPlayer];
  if (hex.classList.contains("highlight")) {
    moveMonster(hex);
  } else {
    highlightValidMoves(currentHex);
  }
});

function moveMonster(targetHex) {
  const currentHex = playerPositions[currentPlayer]; // Get the current hexagon with the monster
  const monster = currentHex.querySelector(".monster");

  // Check if the move is valid
  if (!targetHex.classList.contains("highlight")) return;

  // 1. Mark the current hex as dominated
  currentHex.classList.add(`player${currentPlayer}-owned`);
  currentHex.classList.remove(`player${currentPlayer}`); // Remove "occupied" class

  // 2. Move the monster to the new hex
  targetHex.appendChild(monster); // Transfer the monster to the new hexagon
  targetHex.classList.add(`player${currentPlayer}`); // Mark the new hexagon as occupied

  // 3. Update the player's position
  playerPositions[currentPlayer] = targetHex;

  // Clear highlights and switch turns
  clearHighlights();
  endTurn();
}

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
    if (neighbor && !neighbor.querySelector(".monster")) {
      neighbor.classList.add("highlight");
    }
  });
}
function clearHighlights() {
  document.querySelectorAll(".hexagon.highlight").forEach((hex) => {
    hex.classList.remove("highlight");
  });
}

function endTurn() {
  currentPlayer = currentPlayer === 1 ? 2 : 1;
  document.getElementById("player-turn").textContent = `Player ${currentPlayer}'s Turn`;
}
document.getElementById('play-button').addEventListener('click', () => {
  window.location.href = 'game.html'; // Link to your game page
});