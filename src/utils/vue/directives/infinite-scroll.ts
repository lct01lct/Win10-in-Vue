import { Directive, DirectiveBinding } from 'vue';

const name: string = 'infinite-scroll';

const __SCOPE__ = 'scope';

type Dir = 'up' | 'down';

type InfiniteScrollEl = HTMLElement & {
  [__SCOPE__]: {
    onScroll: (e: Event) => void;
  };
};

const getScrollOptions = (el: InfiniteScrollEl, binding: DirectiveBinding<any>) => {
  const fn = binding.value.load as (dir: Dir) => void;
  const top = binding.value.initTop;
  const baseTop = 50;
  const initTop: number = top ? (top < baseTop ? baseTop : top) : baseTop;

  return { fn, initTop };
};

const directive: Directive = {
  async mounted(el: InfiniteScrollEl, binding: DirectiveBinding<any>) {
    // 确保父元素加载完毕
    await nextTick();

    const { fn, initTop } = getScrollOptions(el, binding);

    el.scrollTop = initTop;

    const onScroll = (e: Event) => {
      if (el.clientHeight + el.scrollTop >= el.scrollHeight) {
        fn('down');
      }
      if (el.scrollTop <= 10) {
        fn('up');
        el.scrollTop = 100;
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
