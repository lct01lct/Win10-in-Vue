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
    let isEnterRegion = false;

    el.style.position = 'absolute';

    const onMouseMove = async (e: MouseEvent) => {
      await nextTick();

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

      const onMouseDown = (e: MouseEvent) => {
        const pagex1 = e.pageX;
        const pagey1 = e.pageY;

        const onResizeMouseMove = (e: MouseEvent) => {
          console.log(0);
          const offsetX = e.pageX - pagex1;
          const offsetY = e.pageY - pagey1;
          switch (dir) {
            case 'n':
              break;
            case 's':
              break;
            case 'w':
              el.style.left = left1 + offsetX + 'px';
              el.style.width = width1 - offsetX + 'px';
              break;
            case 'e':
              break;
            case 'nw':
              break;
            case 'ne':
              break;
            case 'sw':
              break;
            case 'se':
              break;
            default:
              break;
          }
        };

        const onResizeMouseUp = (e: MouseEvent) => {
          document.removeEventListener('mousemove', onResizeMouseMove);
          document.removeEventListener('mouseup', onResizeMouseUp);
        };
        document.addEventListener('mouseup', onResizeMouseUp);
        document.addEventListener('mousemove', onResizeMouseMove);
      };

      if (dir) {
        oBody.style.cursor = dir + '-resize';

        if (!isEnterRegion) {
          isEnterRegion = true;
          document.addEventListener('mousedown', onMouseDown);
          console.log(1);
        }
      } else {
        oBody.style.cursor = 'default';

        if (isEnterRegion) {
          isEnterRegion = false;
          document.addEventListener('mousedown', onMouseDown);
          console.log(2);
        }
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

const getResizeElScope = (el: ResizeEl) => {
  return el[SCOPE];
};

const cancelBubble = (e: MouseEvent) => {
  e.stopPropagation();
};

export { name, directive };
