import { getRandomPuzzle } from "../data/puzzles.js";
import { createBoard } from "./board.js";
import { undoMove, deleteCell, insertNumber } from "./input.js";

document.addEventListener("DOMContentLoaded", () => {
  setDifficultyFromQuery();
  resetBoard();
  attachEventListeners();
  enableKeyboardInput();
});

function attachEventListeners() {
  document.getElementById("new-game").addEventListener("click", resetBoard);
  document.getElementById("undo").addEventListener("click", undoMove);
  document.getElementById("delete").addEventListener("click", deleteCell);
  document
    .getElementById("difficulty")
    .addEventListener("change", updateDifficulty);

  document.querySelectorAll(".num-btn").forEach((button) => {
    button.addEventListener("click", (e) => {
      insertNumber(e.target.dataset.num);
    });
  });
}

function resetBoard() {
  const difficulty = getDifficultyFromQuery();
  const puzzle = getRandomPuzzle(difficulty);
  createBoard(puzzle);
}

function enableKeyboardInput() {
  document.addEventListener("keydown", (event) => {
    if (event.key >= "1" && event.key <= "9") {
      insertNumber(event.key);
    }
  });
}

function updateDifficulty() {
  const difficulty = document.getElementById("difficulty").value;
  const newUrl = new URL(window.location);
  newUrl.searchParams.set("difficulty", difficulty);
  window.history.replaceState({}, "", newUrl); // URL 업데이트
  resetBoard();
}

function getDifficultyFromQuery() {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get("difficulty") || "medium"; // 기본값은 medium
}

function setDifficultyFromQuery() {
  const difficulty = getDifficultyFromQuery();
  document.getElementById("difficulty").value = difficulty;
}
