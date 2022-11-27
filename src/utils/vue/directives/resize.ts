import { Directive, DirectiveBinding } from 'vue';

const name = 'resize';
const SCOPE = '__SCOPE__';

export interface ResizeBindingValue {
  movedFn: (param: { width: number; height: number; left: number; top: number }) => void;
}

type ResizeEl = HTMLElement & {
  [SCOPE]: {
    onMouseMove: (e: MouseEvent) => void;
  };
};

const directive: Directive = {
  async mounted(el: ResizeEl, { value }: DirectiveBinding<ResizeBindingValue | undefined>) {
    await nextTick();

    const regionSize = 4;
    const movedFn = (value && value.movedFn) || (() => {});

    let resizeDir = '';
    let isDirChange = false;
    let onMouseDown: (e: MouseEvent) => void;
    const oBody = document.body;
    let isTriggerResize = false;

    el.style.position = 'absolute';

    const onMouseMove = async (e: MouseEvent) => {
      await nextTick();

      cancelBubble(e);

      const elStyles = window.getComputedStyle(el, null);
      const left1 = parseFloat(elStyles.left);
      const top1 = parseFloat(elStyles.top);
      const width1 = parseFloat(elStyles.width);
      const height1 = parseFloat(elStyles.height);
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
        const resizeDir = oBody.style.cursor === 'default' ? '' : oBody.style.cursor.split('-')[0];
        const elStyles = window.getComputedStyle(el, null);
        const left1 = parseFloat(elStyles.left);
        const top1 = parseFloat(elStyles.top);
        const width1 = parseFloat(elStyles.width);
        const height1 = parseFloat(elStyles.height);
        let offsetX = 0;
        let offsetY = 0;
        if (resizeDir) cancelBubble(e);

        const onResizeMouseMove = (e: MouseEvent) => {
          offsetX = e.pageX - pagex1;
          offsetY = e.pageY - pagey1;

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
          isTriggerResize = false;

          movedFn({
            width: parseInt(el.style.width),
            height: parseInt(el.style.height),
            left: parseInt(el.style.left),
            top: parseInt(el.style.top),
          });
        };

        document.addEventListener('mousemove', onResizeMouseMove);
        document.addEventListener('mouseup', onResizeMouseUp);
      };

      if (dir) {
        if (dir !== resizeDir) {
          isDirChange = true;
        } else {
          isDirChange = false;
        }
        resizeDir = dir;

        if (isDirChange && !isTriggerResize) {
          document.removeEventListener('mousedown', onMouseDown, true);
          document.addEventListener('mousedown', onMouseDown, true);
          isTriggerResize = true;
        }
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

const getDir = ({
  offsetX,
  offsetY,
  width,
  height,
  regionSize,
}: {
  offsetX: number;
  offsetY: number;
  width: number;
  height: number;
  regionSize: number;
}) => {
  const conditions: { cond: boolean; dir: string }[] = [
    {
      dir: 'n', // north
      cond:
        offsetY < regionSize &&
        offsetY > -regionSize &&
        offsetX > regionSize &&
        offsetX < width - regionSize,
    },
    {
      dir: 's', // south
      cond:
        offsetY > height - regionSize &&
        offsetY < height + regionSize &&
        offsetX > regionSize &&
        offsetX < width - regionSize,
    },
    {
      dir: 'w', // west
      cond:
        offsetX < regionSize &&
        offsetX > -regionSize &&
        offsetY > regionSize &&
        offsetY < height - regionSize,
    },
    {
      dir: 'e', // east
      cond:
        offsetX > width - regionSize &&
        offsetX < width + regionSize &&
        offsetY > regionSize &&
        offsetY < height - regionSize,
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
        offsetX > width - regionSize &&
        offsetX < width + regionSize,
    },
    {
      dir: 'sw',
      cond:
        offsetY > height - regionSize &&
        offsetY < height + regionSize &&
        offsetX < regionSize &&
        offsetX > -regionSize,
    },
    {
      dir: 'se',
      cond:
        offsetY > height - regionSize &&
        offsetY < height + regionSize &&
        offsetX > width - regionSize &&
        offsetX < width + regionSize,
    },
  ];
};

export { name, directive };
