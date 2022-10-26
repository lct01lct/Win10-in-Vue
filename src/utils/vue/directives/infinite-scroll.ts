import { Directive, DirectiveBinding } from 'vue';

const name: string = 'infinite-scroll';

const __SCOPE__ = 'scope';

type Dir = 'up' | 'down';

type InfiniteScrollEl = HTMLElement & {
  [__SCOPE__]: {
    onScroll: (e: Event) => void;
  };
};

type DirectiveOpt = {
  load: (dir: Dir) => void;
  initTop: number;
  scrollRate: number;
};

const getScrollOptions = (el: InfiniteScrollEl, binding: DirectiveBinding<DirectiveOpt>) => {
  const fn = binding.value.load;
  const top = binding.value.initTop;
  const rate = binding.value.scrollRate;
  const baseTop = 50;
  const initTop: number = top ? (top < baseTop ? baseTop : top) : baseTop;

  return { fn, initTop, rate };
};

const directive: Directive = {
  async mounted(el: InfiniteScrollEl, binding: DirectiveBinding<any>) {
    // 确保父元素加载完毕
    await nextTick();

    const { fn, initTop, rate } = getScrollOptions(el, binding);
    el.scrollTop = initTop;

    const onScroll = (e: Event) => {
      if (el.clientHeight + el.scrollTop >= el.scrollHeight) {
        for (let i = 0; i < rate; i++) {
          fn('down');
        }
      }
      if (el.scrollTop <= 10) {
        for (let i = 0; i < rate; i++) {
          fn('up');
        }
        el.scrollTop = initTop * rate;
      }
    };

    el[__SCOPE__] = {
      onScroll,
    };

    el.addEventListener('scroll', onScroll);
  },

  unmounted(el: InfiniteScrollEl) {
    const { onScroll } = el[__SCOPE__];

    el.removeEventListener('scroll', onScroll);
  },
};

export { name, directive };
