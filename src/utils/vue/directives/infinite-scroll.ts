import { Directive, DirectiveBinding, Ref } from 'vue';

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
  scrollCb: (scrolledPx: number) => void;
  scrollingCb: (isScrolling: boolean) => void;
};

const getScrollOptions = (el: InfiniteScrollEl, binding: DirectiveBinding<DirectiveOpt>) => {
  const fn = binding.value.load;
  const top = binding.value.initTop || 50;
  const rate = binding.value.scrollRate || 5;
  const scrollCb = binding.value.scrollCb || (() => {});
  const scrollingCb = binding.value.scrollingCb || (() => {});
  const baseTop = 50;
  const initTop: number = top < baseTop ? baseTop : top;

  return { fn, initTop, rate, scrollCb, scrollingCb };
};

const directive: Directive = {
  async mounted(el: InfiniteScrollEl, binding: DirectiveBinding<any>) {
    // 确保父元素加载完毕
    await nextTick();

    const { fn, initTop, rate, scrollCb, scrollingCb } = getScrollOptions(el, binding);
    el.scrollTop = initTop;

    let scrolledPx: number = 0;
    let newAddedpx: number = 0;

    let isScrolling = ref(false);
    let timer: NodeJS.Timeout | null;

    watch(isScrolling, () => {
      scrollingCb(isScrolling.value);
    });

    const onScroll = async (e: Event) => {
      isScrolling.value = true;

      timer && clearTimeout(timer);
      timer = setTimeout(() => {
        isScrolling.value = false;
      }, 200);

      if (el.clientHeight + el.scrollTop >= el.scrollHeight) {
        // 触发底部
        for (let i = 0; i < rate; i++) {
          fn('down');
          scrolledPx = el.scrollTop - initTop - newAddedpx;
        }
      } else if (el.scrollTop <= 10) {
        // 触发顶部
        for (let i = 0; i < rate; i++) {
          fn('up');
          newAddedpx += initTop;
        }
        el.scrollTop = 11;
      } else {
        scrolledPx = el.scrollTop - initTop - newAddedpx;
      }
      scrollCb(scrolledPx);
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
