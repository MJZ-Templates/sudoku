function validateBoard() {
  document.querySelectorAll(".cell").forEach((cell) => {
    cell.classList.remove("invalid");
  });

  let duplicateCells = new Set();

  document.querySelectorAll(".cell").forEach((cell) => {
    if (cell.textContent) {
      const index = parseInt(cell.dataset.index);
      const row = Math.floor(index / 9);
      const col = index % 9;
      const value = cell.textContent;

      const duplicates = findDuplicates(row, col, value, index);
      duplicates.forEach((dupIndex) => duplicateCells.add(dupIndex));
    }
  });

  duplicateCells.forEach((index) => {
    document
      .querySelector(`.cell[data-index="${index}"]`)
      .classList.add("invalid");
  });
}

function findDuplicates(row, col, value, currentIndex) {
  let duplicates = [];

  document.querySelectorAll(".cell").forEach((cell, i) => {
    const r = Math.floor(i / 9);
    const c = i % 9;

    if (
      (r === row || c === col || isSameBox(row, col, r, c)) &&
      cell.textContent === value &&
      i !== currentIndex
    ) {
      duplicates.push(i);
    }
  });

  return duplicates;
}

function isSameBox(row1, col1, row2, col2) {
  return (
    Math.floor(row1 / 3) === Math.floor(row2 / 3) &&
    Math.floor(col1 / 3) === Math.floor(col2 / 3)
  );
}

function isPuzzleComplete() {
  // 1️⃣ 빈 셀이 있는지 체크 (공백 문자열 포함)
  const hasEmptyCells = [...document.querySelectorAll(".cell")].some(
    (cell) => cell.textContent.trim() === ""
  );
  if (hasEmptyCells) return false;

  // 2️⃣ 중복된 숫자가 있는지 체크
  const hasError = [...document.querySelectorAll(".cell")].some((cell) =>
    cell.classList.contains("invalid")
  );

  return !hasError; // 중복이 없으면 true 반환 (퍼즐 성공)
}

export { validateBoard, isPuzzleComplete };
