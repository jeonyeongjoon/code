import classNames from "classnames";

export default function Cell({
  snake,
  index,
  food,
}: {
  snake: number[];
  index: number;
  food: number;
}) {
  const isSnakePart = snake.includes(index);
  const isHead = isSnakePart && snake[0] === index;

  return (
    <div
      className={classNames({
        cell: true,
        snake: isSnakePart,
        snakeHead: isHead,
        food: food === index,
      })}
    />
  );
}
