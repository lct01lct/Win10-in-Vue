export const useDebounce = (trailingFn: () => void, delay: number, immediatelyFn?: () => void) => {
  let flag = false;
  let timerId: number;

  const debounced = () => {
    immediatelyFn?.();

    if (flag) {
      clearTimeout(timerId);
    } else {
      timerId = window.setTimeout(() => {
        trailingFn();
        flag = false;
      }, delay);
    }

    flag = true;
  };

  const clearup = () => {
    clearTimeout(timerId);
  };

  return {
    debounced,
    clearup,
  };
};
