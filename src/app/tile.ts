export interface Tile {
  label: string;
  x: number;
  y: number;
  direction?: DIRECTION;
}

export const enum  DIRECTION {
  N = 1, E, S, W
}