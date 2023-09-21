import "./SnakeGame.css";
import classNames from "classnames";
import { useCallback, useEffect, useRef, useState } from "react";
import { directionMap, gridKeysArray, gridSize } from "./config.ts";

export default function SnakeGame() {
  const [snake, setSnake] = useState<number[]>([gridSize + 1, gridSize]);
  const directionReference = useRef<number>(1);
  const [food, setFood] = useState<number>(gridSize + 2);
  const [isGameOver, setIsGameOver] = useState<boolean>(false);

  /* useCallback은 함수를 메모이제이션하고 렌더링 간에 동일한 함수를 재사용하는 데 사용된다. 
     그런데 이 함수 내부에서 값을 지역 변수에 할당하면 각 렌더링 사이에 해당 변수의 값이 초기화되어 버리게 된다.
     이렇게 되면 useCallback이 의도대로 동작하지 않을 수 있으며 함수가 예상대로 메모이제이션되지 않을 수 있다. 
     
    ex) newSnake?, newFood?   
  */

  const move = useCallback(() => {
    const direction = directionReference.current;
    const newHead = snake[0] + direction;

    // 벽에 부딪혔을 때
    if (
      snake.includes(newHead) ||
      newHead < 0 ||
      newHead >= gridSize * gridSize ||
      (direction === 1 && newHead % gridSize === 0) ||
      (direction === -1 && newHead % gridSize === gridSize - 1)
    ) {
      setIsGameOver(true);
      return;
    }

    // food를 먹었을 경우
    const newSnake = [newHead, ...snake.slice(0, -1)];
    if (newHead === food) {
      let newFood;
      do {
        newFood = Math.floor(Math.random() * gridSize * gridSize);
      } while (newSnake.includes(newFood));

      setFood(newFood);
      newSnake.push(snake[snake.length - 1]);
    }
    setSnake(newSnake);
  }, [snake, food]);

  // 게임 다시 시작하기
  const restartGame = () => {
    setSnake([gridSize + 1, gridSize]);
    setFood(gridSize + 3);
    setIsGameOver(false);
    directionReference.current = 1;
  };

  // 키보드 조작
  useEffect(() => {
    const handleKeydown = (event: KeyboardEvent) => {
      const newDirection = directionMap[event.key];
      const direction = directionReference.current;
      if (
        newDirection &&
        newDirection !== direction &&
        newDirection !== -direction
      ) {
        directionReference.current = newDirection;
      }
    };
    window.addEventListener("keydown", handleKeydown);
    return () => window.removeEventListener("keydown", handleKeydown);
  }, []);

  // 게임 진행 감지
  useEffect(() => {
    if (isGameOver) {
      return;
    }
    const interval = setInterval(move, 150);
    return () => clearInterval(interval);
  }, [move, isGameOver]);

  return (
    <div>
      <div
        className="grid"
        style={{
          width: `${20 * gridSize}px`,
          gridTemplateColumns: `repeat(${gridSize}, 1fr)`,
        }}
      >
        {gridKeysArray.map((_, index) => {
          const isSnakePart = snake.includes(index);
          const isHead = isSnakePart && snake[0] === index;
          return (
            <div
              key={index}
              className={classNames({
                cell: true,
                snake: isSnakePart,
                snakeHead: isHead,
                food: food === index,
              })}
            />
          );
        })}
      </div>
      {isGameOver && <button onClick={restartGame}>Restart</button>}
    </div>
  );
}
