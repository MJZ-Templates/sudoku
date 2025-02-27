import { getRandomPuzzle } from "../data/puzzles.js";
import { createBoard } from "./board.js";
import { undoMove, deleteCell, insertNumber } from "./input.js";

document.addEventListener("DOMContentLoaded", () => {
  resetBoard();
  attachEventListeners();
  enableKeyboardInput();
});

function attachEventListeners() {
  document.getElementById("new-game").addEventListener("click", resetBoard);
  document.getElementById("undo").addEventListener("click", undoMove);
  document.getElementById("delete").addEventListener("click", deleteCell);
  document.getElementById("difficulty").addEventListener("change", resetBoard);

  document.querySelectorAll(".num-btn").forEach((button) => {
    button.addEventListener("click", (e) => {
      console.log("🔢 Number button clicked:", e.target.dataset.num);
      insertNumber(e.target.dataset.num);
    });
  });
}

function resetBoard() {
  const difficulty = document.getElementById("difficulty").value;
  const puzzle = getRandomPuzzle(difficulty);
  createBoard(puzzle);
}

function enableKeyboardInput() {
  document.addEventListener("keydown", (event) => {
    if (event.key >= "1" && event.key <= "9") {
      console.log(`⌨️ Key press detected: ${event.key}`);
      insertNumber(event.key);
    }
  });
}
