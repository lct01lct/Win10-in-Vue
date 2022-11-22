import { Directive, DirectiveBinding } from 'vue';

const name = 'resize';
const SCOPE = '__SCOPE__';

interface BindingValue {
  moveFn: (width: number, height: number, left: number, top: number) => void;
}

type ResizeEl = HTMLElement & {
  [SCOPE]: {
    onMouseMove: (e: MouseEvent) => void;
  };
};

const directive: Directive = {
  async mounted(el: ResizeEl, { value }: DirectiveBinding<BindingValue | undefined>) {
    const regionSize = 4;
    const movedFn = (value && value.moveFn) || ((width, height, left, top) => {});

    await nextTick();

    el.style.position = 'absolute';

    const onMouseMove = (e: MouseEvent) => {
      cancelBubble(e);

      const elStyles = window.getComputedStyle(el, null);
      const left1 = parseFloat(elStyles.left);
      const top1 = parseFloat(elStyles.top);
      const width1 = parseFloat(elStyles.width);
      const height1 = parseFloat(elStyles.height);
      const oBody = document.body;
      const offsetX = e.pageX - left1;
      const offsetY = e.pageY - top1;

      const conditions: { cond: boolean; dir: string }[] = [
        { dir: 'n', cond: offsetY < regionSize && offsetY > -regionSize }, // north
        { dir: 's', cond: offsetY > height1 - regionSize && offsetY < height1 + regionSize }, // south
        { dir: 'w', cond: offsetX < regionSize && offsetX > -regionSize }, // west
        { dir: 'e', cond: offsetX > width1 - regionSize && offsetX < width1 + regionSize }, // east
      ];

      const dir = conditions.reduce((initVal, item) => {
        if (item.cond) {
          return initVal + item.dir;
        }
        return initVal;
      }, '');

      if (dir) {
        console.log(dir + 'resize');
        oBody.style.cursor = dir + '-resize';
        document.addEventListener('mousedown', (e: MouseEvent) => {});
      } else {
        oBody.style.cursor = 'default';
      }

      el.addEventListener('mousedown', cancelBubble);
      el.addEventListener('click', cancelBubble);
    };

    el[SCOPE] = {
      onMouseMove,
    };

    document.addEventListener('mousemove', onMouseMove);
  },

  unmounted(el: ResizeEl) {
    const { onMouseMove } = getResizeElScope(el);

    document.removeEventListener('mousemove', onMouseMove);
  },
};

const getOffsetPos = () => {};
const getResizeElScope = (el: ResizeEl) => {
  return el[SCOPE];
};

const cancelBubble = (e: MouseEvent) => {
  e.stopPropagation();
};

export { name, directive };
