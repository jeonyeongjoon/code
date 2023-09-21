import "../../SnakeGame.css";
import { gridKeysArray, gridSize } from "../../config.ts";
import { useSnakeGame } from "../hooks/useSnakeGame.ts";
import Cell from "./Cell.tsx";

export default function SnakeGameHooks() {
  const { isGameOver, restartGame, food, snake } = useSnakeGame();

  return (
    <div>
      <div
        className="grid"
        style={{
          width: `${20 * gridSize}px`,
          gridTemplateColumns: `repeat(${gridSize}, 1fr)`,
        }}
      >
        {gridKeysArray.map((_, index) => (
          <Cell {...{ snake, index, food }} key={index} />
        ))}
      </div>
      {isGameOver && <button onClick={restartGame}>Restart</button>}
    </div>
  );
}
