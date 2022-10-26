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
  const initTop: number =
    binding.value.initTop < 10
      ? (el as HTMLElement).children[0].clientHeight
      : binding.value.initTop;

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
