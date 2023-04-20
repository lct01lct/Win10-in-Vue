type KeyCodeRes = 'enter' | 'up' | 'left' | 'right' | 'down' | '';

const keyCodeMap: Partial<Record<number, KeyCodeRes>> = {
  13: 'enter',
  37: 'left',
  38: 'up',
  39: 'right',
  40: 'down',
};

export const handleKeyCode = (keyCode: number): KeyCodeRes => {
  return keyCodeMap[keyCode] || '';
};
