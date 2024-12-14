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
