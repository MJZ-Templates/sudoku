let selectedCell = null;

function createBoard(puzzle) {
  const board = document.getElementById("sudoku-board");

  if (!board) {
    console.error("❌ Cannot find the 'sudoku-board' element");
    return;
  }

  board.innerHTML = "";

  for (let i = 0; i < 81; i++) {
    const cell = document.createElement("div");
    cell.classList.add("cell");
    cell.dataset.index = i;

    if (puzzle[i] !== "0") {
      cell.textContent = puzzle[i];
      cell.classList.add("fixed");
    } else {
      cell.addEventListener("click", () => {
        console.log("📌 Cell clicked:", i);
        selectCell(cell);
      });
    }

    board.appendChild(cell);
  }
}

function selectCell(cell) {
  if (selectedCell) {
    clearHighlights();
    selectedCell.classList.remove("selected");
  }

  selectedCell = cell;
  selectedCell.classList.add("selected");
  highlightRelatedCells(selectedCell);

  console.log(
    "✅ selectCell() executed! Selected cell:",
    selectedCell.dataset.index
  );
}

function highlightRelatedCells(cell) {
  const index = parseInt(cell.dataset.index);
  const row = Math.floor(index / 9);
  const col = index % 9;

  document.querySelectorAll(".cell").forEach((c, i) => {
    const r = Math.floor(i / 9);
    const cIdx = i % 9;

    if (r === row || cIdx === col || isSameBox(row, col, r, cIdx)) {
      if (c !== selectedCell) {
        c.classList.add("highlight");
      }
    }
  });
}

function clearHighlights() {
  document.querySelectorAll(".cell").forEach((cell) => {
    cell.classList.remove("highlight", "selected");
  });
}

function isSameBox(row1, col1, row2, col2) {
  return (
    Math.floor(row1 / 3) === Math.floor(row2 / 3) &&
    Math.floor(col1 / 3) === Math.floor(col2 / 3)
  );
}

function getSelectedCell() {
  return selectedCell;
}

function showGameResult(isSuccess) {
  const message = isSuccess
    ? "Sudoku solved successfully! 🎉"
    : "There are numbers that do not follow Sudoku rules. 🥲";

  setTimeout(() => alert(message), 100);
}

export {
  createBoard,
  selectCell,
  getSelectedCell,
  clearHighlights,
  showGameResult,
};
