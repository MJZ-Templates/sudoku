import { getSelectedCell } from "./board.js";
import { validateBoard, isPuzzleComplete } from "./validator.js";
import { showGameResult } from "./board.js"; // Added function to display messages

let moveHistory = [];

// Function to insert a number
function insertNumber(num) {
  console.log("📌 insertNumber() executed! Number:", num);

  const selectedCell = getSelectedCell();
  if (!selectedCell) {
    console.warn("🚨 Please select a cell first.");
    return;
  }

  if (selectedCell.classList.contains("fixed")) {
    console.warn("🚨 Cannot enter a value in a fixed cell.");
    return;
  }

  moveHistory.push({
    cellIndex: selectedCell.dataset.index,
    prevValue: selectedCell.textContent,
  });

  selectedCell.textContent = num;

  // Validate the entire board after inserting a number
  validateBoard();

  // Check if the puzzle is complete
  if (isPuzzleComplete()) {
    showGameResult(true); // Display success message
  } else if (
    ![...document.querySelectorAll(".cell")].some(
      (cell) => cell.textContent.trim() === ""
    )
  ) {
    // If there are no empty cells but the puzzle is incorrect, display a failure message
    showGameResult(false);
  }
}

// Undo function
function undoMove() {
  console.log("⏪ Undo function executed!");
  console.log("📌 Current moveHistory state:", moveHistory);

  if (moveHistory.length === 0) {
    console.log("🚨 No undo history!");
    return;
  }

  const lastMove = moveHistory.pop();
  console.log("⏪ Undoing data:", lastMove);

  const boardCells = document.querySelectorAll(".cell");
  const targetCell = boardCells[lastMove.cellIndex];

  if (targetCell) {
    targetCell.textContent = lastMove.prevValue;
    targetCell.classList.remove("selected");
    console.log("✅ Undo complete: Cell value restored");
  }

  validateBoard();
}

// Function to delete a cell's content
function deleteCell() {
  const selectedCell = getSelectedCell();

  if (!selectedCell) {
    console.warn("🚨 Please select a cell first.");
    return;
  }

  if (selectedCell.classList.contains("fixed")) {
    console.warn("🚨 Cannot delete a value from a fixed cell.");
    return;
  }

  moveHistory.push({
    cellIndex: selectedCell.dataset.index,
    prevValue: selectedCell.textContent,
  });

  selectedCell.textContent = "";

  console.log("❌ Cell content deleted!");
  validateBoard();
}

export { insertNumber, undoMove, deleteCell };
