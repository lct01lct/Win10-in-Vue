interface Pos {
  x: number;
  y: number;
}

export type LimitPositionParamter = {
  target: HTMLElement;
  maxX?: number;
  maxY?: number;
  minX?: number;
  minY?: number;
  onDone?: (x: number, y: number) => void | Pos;
} & Pos;

export const limitPosition = (option: LimitPositionParamter) => {
  let { target, maxX, maxY, minY, minX, x, y } = option;
  minX = minX ?? 0;
  minY = minY ?? 0;

  if (x < 0) {
    x = 0;
  } else if (maxX && x > maxX) {
    x = maxX;
  }

  if (y < 0) {
    y = 0;
  } else if (maxY && y > maxY) {
    y = maxY;
  }

  option.onDone?.(x, y);
  target.style.left = `${x}px`;
  target.style.top = `${y}px`;
};
