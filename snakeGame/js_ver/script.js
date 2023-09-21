const map = document.querySelector(".grid");
const restartButton = document.querySelector("button");
const gridSize = 20;
const directionMap = { a: -1, d: 1, w: -gridSize, s: gridSize };
let snake, direction, food;

function move() {
  const newHead = snake[0] + direction;

  console.log(direction === 1 && newHead % gridSize === 0);
  console.log(direction === -1 && newHead % gridSize === gridSize - 1);

  if (
    // 벽에 부딪혔거나 자기 자신에게 부딪혔을때 실행되는 코드
    snake.includes(newHead) ||
    newHead < 0 ||
    newHead >= gridSize * gridSize ||
    (direction === 1 && newHead % gridSize === 0) ||
    (direction === -1 && newHead % gridSize === gridSize - 1)
  ) {
    restartButton.style.display = "block";
    return;
  }
  snake = [newHead, ...snake.slice(0, -1)];

  /* 
  newHead가 food일 경우 랜덤으로 food 위치 재배정을 하고
  snake에 food가 있을 경우 snake를 한 개 추가
   */
  if (newHead === food) {
    do {
      food = Math.floor(Math.random() * gridSize * gridSize);
    } while (snake.includes(food));
    snake.push(snake[snake.length - 1]);
  }

  /* map의 children에서 기존에 className들을 지우고 다시 새로운 className을 위치에 맞게 추가 */
  const cells = [...map.children];
  cells.forEach((cell) => cell.classList.remove("snake", "food", "snakeHead"));
  snake.forEach((snakeCell) => cells[snakeCell].classList.add("snake"));
  cells[snake[0]].classList.add("snakeHead");
  cells[food].classList.add("food");
  setTimeout(move, 150);
}

(function main() {
  // 보드판 생성
  map.style.width = `${20 * gridSize}px`;
  map.style.gridTemplateColumns = `repeat(${gridSize}, 1fr)`;
  restartButton.style.display = "none";
  snake = [gridSize + 1, gridSize];
  food = gridSize + 2;
  direction = 1;
  map.innerHTML = '<div class="cell"></div>'.repeat(gridSize * gridSize);

  // w,a,s,d를 사용하여 조작
  window.onkeydown = ({ key }) =>
    directionMap[key] !== -direction && (direction = directionMap[key]);
  restartButton.onclick = main;
  move();
})();
