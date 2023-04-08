import anime from 'animejs';
import { AnimationDir } from './trigger';

const beforeEnterAnimeHandler = (el: HTMLElement, dir: AnimationDir | undefined) => {
  const styles = getOffset(el);
  switch (dir) {
    case 'top':
      el.style.transform = `translateY(${styles.height}px)`;
      break;
    case 'bottom':
      el.style.transform = `translateY(${-styles.height}px)`;
      break;
    case 'left':
      el.style.transform = `translateX(${styles.width}px)`;
      break;
    case 'right':
      el.style.transform = `translateX(${-styles.width}px)`;
      break;
    default:
      break;
  }
};

const enterAnimeHandler = (el: HTMLElement, dir: AnimationDir | undefined) => {
  const animeOpt = {
    targets: el,
    easing: 'easeInOutExpo',
    duration: 300,
  };
  const tmp = {} as { translateY: number; translateX: number };

  switch (dir) {
    case 'top':
      tmp.translateY = 0;
      break;
    case 'bottom':
      tmp.translateY = 0;
      break;
    case 'left':
      tmp.translateX = 0;
      break;
    case 'right':
      tmp.translateX = 0;
      break;
    default:
      break;
  }
  anime(Object.assign(animeOpt, tmp));
};

const LeaveAnimeHandler = (el: HTMLElement, dir: AnimationDir | undefined, done: Function) => {
  const styles = getOffset(el);

  const animeOpt = {
    targets: el,
    easing: 'easeInOutExpo',
    duration: 300,
    complete() {
      done();
    },
  };

  const tmp = {} as { translateY: number; translateX: number };
  switch (dir) {
    case 'top':
      tmp.translateY = styles.height;
      break;
    case 'bottom':
      tmp.translateY = -styles.height;
      break;
    case 'left':
      tmp.translateX = styles.width;
      break;
    case 'right':
      tmp.translateX = -styles.width;
      break;
    default:
      break;
  }

  anime(Object.assign(animeOpt, tmp));
};

const getOffset = (el: HTMLElement): { width: number; height: number } => {
  const styles = window.getComputedStyle(el, null);
  return {
    width: parseInt(styles.width),
    height: parseInt(styles.height),
  };
};

export { beforeEnterAnimeHandler, enterAnimeHandler, LeaveAnimeHandler, getOffset };
