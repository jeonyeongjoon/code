import { useCallback, useRef, useState } from "react";
import { gridSize } from "../../config.ts";
import {
  isOutsideBoundary,
  willCollideWithSelf,
} from "../utils/check_position.ts";
import { getNewFood } from "../utils/get_new_food.ts";
import { useInterval } from "./useInterval.ts";
import { useKeyboardControls } from "./useKeyboardControls.ts";

export function useSnakeGame() {
  const [snake, setSnake] = useState<number[]>([gridSize + 1, gridSize]);
  const directionReference = useRef<number>(1);
  const [food, setFood] = useState<number>(gridSize + 2);
  const [isGameOver, setIsGameOver] = useState<boolean>(false);

  const move = useCallback(() => {
    const direction = directionReference.current;
    const newHead = snake[0] + direction;

    // 벽에 부딪히거나 자기 몸에 부딪혔을때 게임 오버
    if (
      isOutsideBoundary(newHead, direction) ||
      willCollideWithSelf(newHead, snake)
    ) {
      setIsGameOver(true);
      return;
    }

    // newHead가 food를 먹었을때 snake 증가 및 Food 위치 재설정
    const newSnake = [newHead, ...snake.slice(0, -1)];
    if (newHead === food) {
      newSnake.push(snake[snake.length - 1]);
      setFood(getNewFood(newSnake));
    }

    setSnake(newSnake);
  }, [snake, food]);

  // 게임 다시 시작
  const restartGame = useCallback(() => {
    setSnake([gridSize + 1, gridSize]);
    setFood(gridSize + 3);
    setIsGameOver(false);
    directionReference.current = 1;
  }, []);

  // 게임 진행 체크
  useInterval(move, isGameOver ? null : 150);
  useKeyboardControls(directionReference);

  return { snake, food, isGameOver, restartGame };
}
