import { getSelectedCell } from "./board.js";
import { validateBoard, isPuzzleComplete } from "./validator.js";
import { showGameResult } from "./board.js"; // 메시지 표시 함수 추가

let moveHistory = [];

// 숫자 삽입 함수
function insertNumber(num) {
  console.log("📌 insertNumber() 실행됨! 숫자:", num);

  const selectedCell = getSelectedCell();
  if (!selectedCell) {
    console.warn("🚨 먼저 셀을 선택하세요.");
    return;
  }

  if (selectedCell.classList.contains("fixed")) {
    console.warn("🚨 고정된 셀에는 값을 입력할 수 없습니다.");
    return;
  }

  moveHistory.push({
    cellIndex: selectedCell.dataset.index,
    prevValue: selectedCell.textContent,
  });

  selectedCell.textContent = num;

  // 숫자 입력 후 전체 보드 검증
  validateBoard();

  // 퍼즐이 완성되었는지 체크
  if (isPuzzleComplete()) {
    showGameResult(true); // 퍼즐 성공 메시지
  } else if (
    ![...document.querySelectorAll(".cell")].some(
      (cell) => cell.textContent.trim() === ""
    )
  ) {
    // 빈칸이 없는데 퍼즐이 틀렸다면 실패 메시지 표시
    showGameResult(false);
  }
}

// Undo 함수
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

function deleteCell() {
  const selectedCell = getSelectedCell();

  if (!selectedCell) {
    console.warn("🚨 먼저 셀을 선택하세요.");
    return;
  }

  if (selectedCell.classList.contains("fixed")) {
    console.warn("🚨 고정된 셀에는 값을 삭제할 수 없습니다.");
    return;
  }

  moveHistory.push({
    cellIndex: selectedCell.dataset.index,
    prevValue: selectedCell.textContent,
  });

  selectedCell.textContent = "";

  console.log("❌ 셀 내용 삭제됨!");
  validateBoard();
}

export { insertNumber, undoMove, deleteCell };
