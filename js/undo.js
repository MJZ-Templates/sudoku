import { getSelectedCell } from "./board.js";
import { validateBoard } from "./validator.js";

let moveHistory = [];

function insertNumber(num) {
  console.log("📌 insertNumber() 실행됨! 숫자:", num);

  const selectedCell = getSelectedCell();
  console.log("📌 getSelectedCell() 결과:", selectedCell);

  if (!selectedCell) {
    console.warn(
      "🚨 getSelectedCell() 결과가 null입니다! 먼저 셀을 선택하세요."
    );
    return;
  }

  if (selectedCell.classList.contains("fixed")) {
    console.warn("🚨 fixed 상태의 셀에는 값을 입력할 수 없습니다.");
    return;
  }

  console.log("✅ insertNumber() 내부 로직 실행!");

  moveHistory.push({
    cellIndex: selectedCell.dataset.index,
    prevValue: selectedCell.textContent,
  });

  selectedCell.textContent = num;
  validateBoard();

  console.log("✅ moveHistory 업데이트됨:", moveHistory);
}

function undoMove() {
  console.log("⏪ Undo 함수 실행됨!");
  console.log("📌 현재 moveHistory 상태:", moveHistory);

  if (moveHistory.length === 0) {
    console.log("🚨 Undo 할 내역 없음!");
    return;
  }

  const lastMove = moveHistory.pop();
  console.log("⏪ 되돌릴 데이터:", lastMove);

  const boardCells = document.querySelectorAll(".cell");
  const targetCell = boardCells[lastMove.cellIndex];

  if (targetCell) {
    targetCell.textContent = lastMove.prevValue;
    targetCell.classList.remove("selected");
    console.log("✅ Undo 완료: 셀 값 복구됨");
  }

  validateBoard();
}

export { insertNumber, undoMove };
