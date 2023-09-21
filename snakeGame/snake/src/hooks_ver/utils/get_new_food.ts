import { gridSize } from "../../config.ts";

// food 재생성 newSnake에 newFood가 있다면
export function getNewFood(newSnake: number[]): number {
  let newFood;
  do {
    newFood = Math.floor(Math.random() * gridSize * gridSize);
  } while (newSnake.includes(newFood));

  return newFood;
}
