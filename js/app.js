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

  document.querySelectorAll(".num-btn").forEach((button) => {
    button.addEventListener("click", (e) => {
      console.log("🔢 숫자 버튼 클릭됨:", e.target.dataset.num);
      insertNumber(e.target.dataset.num);
    });
  });
}

function resetBoard() {
  const puzzle = getRandomPuzzle();
  createBoard(puzzle);
}

function enableKeyboardInput() {
  document.addEventListener("keydown", (event) => {
    if (event.key >= "1" && event.key <= "9") {
      console.log(`⌨️ 키 입력 감지: ${event.key}`);
      insertNumber(event.key);
    }
  });
}
