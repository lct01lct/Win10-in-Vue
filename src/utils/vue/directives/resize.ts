import { Directive, DirectiveBinding } from 'vue';

const name = 'resize';

export interface ResizeBindingValue {
  movedFn: (param: { width: number; height: number; left: number; top: number }) => void;
  border?: {
    minWidth: number;
    minHeight: number;
  };
}

type ResizeEl = HTMLElement & {};

const directive: Directive = {
  async mounted(el: ResizeEl, { value }: DirectiveBinding<ResizeBindingValue | undefined>) {
    await nextTick();
    addDirectiveElArr.push(el);

    if (addDirectiveElArr.length === 1) {
      document.addEventListener('mousemove', onDocMouseMove);
      document.addEventListener('mousedown', onDocMouseDown);
    }

    const movedFn = (value && value.movedFn) || (() => {});
    const border = (value && value.border) || { minWidth: 0, minHeight: 0 };

    el.style.position = 'absolute';

    subscriberDocEvent({
      el,
      border,
      movedFn,
    });
  },

  unmounted(el: ResizeEl) {
    removeResizeElFromArr(el);
    if (!addDirectiveElArr.length) {
      document.removeEventListener('mousemove', onDocMouseMove);
      document.removeEventListener('mousedown', onDocMouseDown);
    }
  },
};

const addDirectiveElArr: ResizeEl[] = [];
const regionSize = 4;
let activeResizeEl: ResizeEl | null;

const onDocMouseMove = async (e: MouseEvent) => {
  await nextTick();

  let dir = '';
  const oBody = document.body;

  for (const el of addDirectiveElArr) {
    activeResizeEl = el;
    dir = getDir({ el, event: e, regionSize });
    oBody.style.cursor = dir ? `${dir}-resize` : 'default';

    if (dir) break;
  }
};

const onDocMouseDown = (e: MouseEvent) => {
  const oBody = document.body;
  const pagex1 = e.pageX;
  const pagey1 = e.pageY;
  const resizeDir = oBody.style.cursor === 'default' ? '' : oBody.style.cursor.split('-')[0];
  const elStyles = window.getComputedStyle(activeResizeEl!, null);
  const left1 = parseFloat(elStyles.left);
  const top1 = parseFloat(elStyles.top);
  const width1 = parseFloat(elStyles.width);
  const height1 = parseFloat(elStyles.height);
  const subscriberItem = getSubscriverItemByEl(activeResizeEl!);
  let offsetX = 0;
  let offsetY = 0;
  if (resizeDir) cancelBubble(e);

  const onResizeMouseMove = (e: MouseEvent) => {
    offsetX = e.pageX - pagex1;
    offsetY = e.pageY - pagey1;

    resizeEl({
      el: activeResizeEl!,
      resizeDir,
      width: width1,
      height: height1,
      left: left1,
      top: top1,
      offsetX,
      offsetY,
      minWidth: subscriberItem.border.minWidth,
      minHeight: subscriberItem.border.minHeight,
    });
  };

  const onResizeMouseUp = () => {
    document.removeEventListener('mousemove', onResizeMouseMove);
    document.removeEventListener('mouseup', onResizeMouseUp);
    subscriberItem.movedFn({
      width: parseInt(activeResizeEl!.style.width),
      height: parseInt(activeResizeEl!.style.height),
      left: parseInt(activeResizeEl!.style.left),
      top: parseInt(activeResizeEl!.style.top),
    });
  };

  document.addEventListener('mousemove', onResizeMouseMove);
  document.addEventListener('mouseup', onResizeMouseUp);
};

type SubscriberItem = Required<ResizeBindingValue> & {
  el: ResizeEl;
};
const subscribers: SubscriberItem[] = [];
const subscriberDocEvent = (subscriberItem: SubscriberItem) => {
  subscribers.push(subscriberItem);
};
const getSubscriverItemByEl = (el: ResizeEl) => {
  const index = subscribers.findIndex((item) => item.el === el);

  return subscribers[index];
};

const cancelBubble = (e: MouseEvent) => {
  e.stopPropagation();
};

const getDir = ({
  el,
  event: e,
  regionSize,
}: {
  el: ResizeEl;
  event: MouseEvent;
  regionSize: number;
}) => {
  const elStyles = window.getComputedStyle(el, null);
  const width = parseFloat(elStyles.width);
  const height = parseFloat(elStyles.height);
  const offsetX = e.pageX - parseFloat(elStyles.left);
  const offsetY = e.pageY - parseFloat(elStyles.top);

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

  const isDir = conditions.find((item) => item.cond);

  return isDir ? isDir.dir : '';
};

const resizeEl = ({
  el,
  resizeDir,
  width,
  height,
  left,
  top,
  offsetX,
  offsetY,
  minWidth = 0,
  minHeight = 0,
}: {
  el: ResizeEl;
  resizeDir: string;
  width: number;
  height: number;
  left: number;
  top: number;
  offsetX: number;
  offsetY: number;
  minWidth?: number;
  minHeight?: number;
}) => {
  const resizeMap = new Map<string, () => void>();
  resizeMap.set('n', () => {
    whenResize(height - offsetY, minHeight, () => {
      el.style.top = top + offsetY + 'px';
      el.style.height = height - offsetY + 'px';
    });
  });
  resizeMap.set('s', () => {
    whenResize(height + offsetY, minHeight, () => {
      el.style.height = height + offsetY + 'px';
    });
  });
  resizeMap.set('w', () => {
    whenResize(width - offsetX, minWidth, () => {
      el.style.left = left + offsetX + 'px';
      el.style.width = width - offsetX + 'px';
    });
  });
  resizeMap.set('e', () => {
    whenResize(width + offsetX, minWidth, () => {
      el.style.width = width + offsetX + 'px';
    });
  });

  if (resizeDir.length === 1) {
    resizeMap.get(resizeDir)!();
  } else if (resizeDir.length === 2) {
    for (let dir of resizeDir) {
      resizeMap.get(dir)!();
    }
  }
};

const whenResize = (movePx: number, minPx: number, cb: Function) => {
  if (movePx >= minPx) {
    cb();
  }
};

const removeResizeElFromArr = (el: ResizeEl) => {
  const index = addDirectiveElArr.indexOf(el);
  index > -1 && addDirectiveElArr.splice(index, 1);
};

export { name, directive };
