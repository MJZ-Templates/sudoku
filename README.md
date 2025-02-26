# 🧩 스도쿠

- 구현: jamie.ryu

<br >

## 프로젝트 구조

```
/sudoku
│── /css                 # 스타일 파일
│   ├── styles.css       # 전체 스타일 정의
│── /js                  # 자바스크립트 파일
│   ├── app.js           # 게임 로직 전체 관리 (이벤트 핸들링 포함)
│   ├── board.js         # 보드 초기화 및 관련 기능
│   ├── input.js         # 사용자 입력 처리
│   ├── undo.js          # Undo, Redo 기능
│   ├── validator.js     # 숫자 검증 (가로/세로 중복 체크)
│── /data
│   ├── puzzles.js       # 미디움 난이도 퍼즐 저장
│── index.html           # 메인 HTML 파일
```

<br >

## 파일

1. **index.html**
   - 게임 보드를 생성하는 HTML 기본 구조 포함.
   - JavaScript와 CSS 파일을 불러옴.
2. **css/styles.css**
   - 기본적인 스타일 및 선택한 셀 강조 효과 추가.
3. **js/app.js**
   - `New Game` 버튼 이벤트 핸들링.
   - 게임 초기화 및 전반적인 흐름 관리.
4. **js/board.js**
   - 스도쿠 보드 생성 및 UI 관련 동작 구현.
   - 선택된 셀의 가로/세로 강조 기능 추가.
5. **js/input.js**
   - 사용자가 선택한 셀에 숫자 입력.
   - `Delete` 버튼 클릭 시 특정 셀 지우기.
   - `Undo` 기능을 위한 입력 기록 관리.
6. **js/undo.js**
   - `Undo`, `Redo` 기능을 구현.
   - 이전 상태를 저장하고 복원하는 기능 포함.
7. **js/validator.js**
   - 숫자 입력 시 같은 행, 열에 동일한 숫자가 있으면 빨간색 표시.
8. **data/puzzles.js**
   - 미리 정의된 스도쿠 퍼즐을 난이도별로 저장.
