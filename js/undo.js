import { getSelectedCell } from "./board.js";
import { validateBoard } from "./validator.js";

let moveHistory = [];

function insertNumber(num) {
  console.log("📌 insertNumber() executed! Number:", num);

  const selectedCell = getSelectedCell();
  console.log("📌 getSelectedCell() result:", selectedCell);

  if (!selectedCell) {
    console.warn(
      "🚨 getSelectedCell() returned null! Please select a cell first."
    );
    return;
  }

  if (selectedCell.classList.contains("fixed")) {
    console.warn("🚨 Cannot enter a value in a fixed cell.");
    return;
  }

  console.log("✅ insertNumber() internal logic executed!");

  moveHistory.push({
    cellIndex: selectedCell.dataset.index,
    prevValue: selectedCell.textContent,
  });

  selectedCell.textContent = num;
  validateBoard();

  console.log("✅ moveHistory updated:", moveHistory);
}

function undoMove() {
  console.log("⏪ Undo function executed!");
  console.log("📌 Current moveHistory state:", moveHistory);

  if (moveHistory.length === 0) {
    console.log("🚨 No moves to undo!");
    return;
  }

  const lastMove = moveHistory.pop();
  console.log("⏪ Move to be undone:", lastMove);

  const boardCells = document.querySelectorAll(".cell");
  const targetCell = boardCells[lastMove.cellIndex];

  if (targetCell) {
    targetCell.textContent = lastMove.prevValue;
    targetCell.classList.remove("selected");
    console.log("✅ Undo complete: Cell value restored");
  }

  validateBoard();
}

export { insertNumber, undoMove };
