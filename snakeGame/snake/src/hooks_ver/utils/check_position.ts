import { gridSize } from "../../config.ts";

// 벽에 부딪혔을때
export function isOutsideBoundary(newHead: number, direction: number): boolean {
  return (
    newHead < 0 ||
    newHead >= gridSize * gridSize ||
    (direction === 1 && newHead % gridSize === 0) ||
    (direction === -1 && newHead % gridSize === gridSize - 1)
  );
}

// snake 몸에 newHead가 있을 경우 자기 몸에 자기가 박은것이다
export function willCollideWithSelf(newHead: number, snake: number[]): boolean {
  return snake.includes(newHead);
}
