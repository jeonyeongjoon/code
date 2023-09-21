export const gridSize = 20;
export const gridKeysArray = [...new Array(gridSize * gridSize).keys()];
export const directionMap: { [key: string]: number } = {
  a: -1,
  w: -gridSize,
  d: 1,
  s: gridSize,
};
