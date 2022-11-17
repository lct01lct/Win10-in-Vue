import anime from 'animejs';

export default (opt: anime.AnimeParams) => {
  return anime({
    loop: false,
    direction: 'alternate',
    easing: 'easeInCubic',
    ...opt,
  });
};
