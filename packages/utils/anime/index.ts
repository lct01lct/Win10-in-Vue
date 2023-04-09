import anime from 'animejs';

export const animation = (opt: anime.AnimeParams) => {
  return anime({
    loop: false,
    direction: 'alternate',
    easing: 'easeInCubic',
    ...opt,
  });
};

export interface SmoothlyChangeOption {
  start: number;
  end: number;
  duration: number;
  init?: (start: number) => void;
  update?: (start: number) => void;
  complete?: (start: number) => void;
}

export const smoothlyChange = ({
  start,
  end,
  duration,
  init,
  update,
  complete,
}: SmoothlyChangeOption) => {
  const delay = 10;
  let currVal = start;
  const isIncrease: boolean = start < end ? true : false;

  init && init(currVal);
  let timer = setInterval(() => {
    if ((currVal < end && isIncrease) || (currVal > end && !isIncrease)) {
      currVal += (end - start) / (duration / delay);
    } else if ((currVal >= end && isIncrease) || (currVal <= end && !isIncrease)) {
      currVal = end;
      clearInterval(timer);
      complete && complete(currVal);
    }

    update && update(currVal);
  }, delay);
};
