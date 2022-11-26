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
    await nextTick();

    const regionSize = 4;
    const movedFn = (value && value.moveFn) || ((width, height, left, top) => {});
    let resizeDir = '';
    let isDirChange = false;
    let elStyles: CSSStyleDeclaration;
    let left1: number;
    let top1: number;
    let width1: number;
    let height1: number;
    let onMouseDown: (e: MouseEvent) => void;
    const oBody = document.body;

    el.style.position = 'absolute';

    const onMouseMove = async (e: MouseEvent) => {
      await nextTick();

      cancelBubble(e);

      elStyles = window.getComputedStyle(el, null);
      left1 = parseFloat(elStyles.left);
      top1 = parseFloat(elStyles.top);
      width1 = parseFloat(elStyles.width);
      height1 = parseFloat(elStyles.height);
      let offsetX = e.pageX - left1;
      let offsetY = e.pageY - top1;

      const conditions: { cond: boolean; dir: string }[] = [
        {
          dir: 'n', // north
          cond:
            offsetY < regionSize &&
            offsetY > -regionSize &&
            offsetX > regionSize &&
            offsetX < width1 - regionSize,
        },
        {
          dir: 's', // south
          cond:
            offsetY > height1 - regionSize &&
            offsetY < height1 + regionSize &&
            offsetX > regionSize &&
            offsetX < width1 - regionSize,
        },
        {
          dir: 'w', // west
          cond:
            offsetX < regionSize &&
            offsetX > -regionSize &&
            offsetY > regionSize &&
            offsetY < height1 - regionSize,
        },
        {
          dir: 'e', // east
          cond:
            offsetX > width1 - regionSize &&
            offsetX < width1 + regionSize &&
            offsetY > regionSize &&
            offsetY < height1 - regionSize,
        },
        {
          dir: 'nw',
          cond:
            offsetY < regionSize &&
            offsetY > -regionSize &&
            offsetX < regionSize &&
            offsetX > -regionSize,
        },
        {
          dir: 'ne',
          cond:
            offsetY < regionSize &&
            offsetY > -regionSize &&
            offsetX > width1 - regionSize &&
            offsetX < width1 + regionSize,
        },
        {
          dir: 'sw',
          cond:
            offsetY > height1 - regionSize &&
            offsetY < height1 + regionSize &&
            offsetX < regionSize &&
            offsetX > -regionSize,
        },
        {
          dir: 'se',
          cond:
            offsetY > height1 - regionSize &&
            offsetY < height1 + regionSize &&
            offsetX > width1 - regionSize &&
            offsetX < width1 + regionSize,
        },
      ];
      const isDir = conditions.find((item) => item.cond);
      const dir = isDir ? isDir.dir : '';

      onMouseDown = (e: MouseEvent) => {
        const pagex1 = e.pageX;
        const pagey1 = e.pageY;

        const onResizeMouseMove = (e: MouseEvent) => {
          const offsetX = e.pageX - pagex1;
          const offsetY = e.pageY - pagey1;
          switch (resizeDir) {
            case 'n':
              el.style.top = top1 + offsetY + 'px';
              el.style.height = height1 - offsetY + 'px';
              break;
            case 's':
              el.style.height = height1 + offsetY + 'px';
              break;
            case 'w':
              el.style.left = left1 + offsetX + 'px';
              el.style.width = width1 - offsetX + 'px';
              break;
            case 'e':
              el.style.width = width1 + offsetX + 'px';
              break;
            case 'nw':
              el.style.top = top1 + offsetY + 'px';
              el.style.height = height1 - offsetY + 'px';
              el.style.left = left1 + offsetX + 'px';
              el.style.width = width1 - offsetX + 'px';
              break;
            case 'ne':
              el.style.top = top1 + offsetY + 'px';
              el.style.height = height1 - offsetY + 'px';
              el.style.width = width1 + offsetX + 'px';
              break;
            case 'sw':
              el.style.height = height1 + offsetY + 'px';
              el.style.left = left1 + offsetX + 'px';
              el.style.width = width1 - offsetX + 'px';
              break;
            case 'se':
              el.style.height = height1 + offsetY + 'px';
              el.style.width = width1 + offsetX + 'px';
              break;
            default:
              break;
          }
        };
        const onResizeMouseUp = (e: MouseEvent) => {
          document.removeEventListener('mousemove', onResizeMouseMove);
          document.removeEventListener('mouseup', onResizeMouseUp);
        };

        document.addEventListener('mousemove', onResizeMouseMove);
        document.addEventListener('mouseup', onResizeMouseUp);
      };

      if (dir) {
        if (dir !== resizeDir) {
        }
        resizeDir = dir;

        if (isDirChange) {
          document.removeEventListener('mousedown', onMouseDown);
        }

        // document.addEventListener('mousedown', onMouseDown);
      } else {
        resizeDir = '';
      }
      oBody.style.cursor = resizeDir ? `${resizeDir}-resize` : 'default';

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

const getResizeElScope = (el: ResizeEl) => {
  return el[SCOPE];
};

const cancelBubble = (e: MouseEvent) => {
  e.stopPropagation();
};

export { name, directive };
