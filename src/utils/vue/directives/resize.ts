import { Directive, DirectiveBinding } from 'vue';
import { toggleZIndex } from '@/app/base/taskBar';

const name = 'resize';

export interface ResizeBindingValue {
  movedFn?: (param: { width: number; height: number; left: number; top: number }) => void;
  movingFn?: (param: { width: number; height: number; left: number; top: number }) => void;
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
      document.addEventListener('mousedown', onDocMouseDown, true);
    }

    const movedFn = (value && value.movedFn) || (() => {});
    const movingFn = (value && value.movingFn) || (() => {});
    const border = (value && value.border) || { minWidth: 0, minHeight: 0 };

    el.style.position = 'absolute';

    subscriberDocEvent({
      el,
      border,
      movedFn,
      movingFn,
    });
  },

  unmounted(el: ResizeEl) {
    removeResizeElFromArr(el);
    if (!addDirectiveElArr.length) {
      document.removeEventListener('mousemove', onDocMouseMove);
      document.removeEventListener('mousedown', onDocMouseDown, true);
    }
  },
};

const addDirectiveElArr: ResizeEl[] = [];
const regionSize = 4;
let activeResizeEl: ResizeEl | null;
let isTriggerResize = false;

const onDocMouseMove = async (e: MouseEvent) => {
  await nextTick();
  if (isTriggerResize) return;

  let dir = '';
  const oBody = document.body;

  addDirectiveElArr.some((el) => {
    activeResizeEl = el;
    dir = getDir({ el, event: e, regionSize });
    oBody.style.cursor = dir ? `${dir}-resize` : 'default';

    return dir;
  });
};

const onDocMouseDown = async (e: MouseEvent) => {
  await nextTick();

  const el = activeResizeEl!;
  const oBody = document.body;
  const pagex1 = e.pageX;
  const pagey1 = e.pageY;
  const resizeDir = oBody.style.cursor === 'default' ? '' : oBody.style.cursor.split('-')[0];
  const elStyles = window.getComputedStyle(el, null);
  const left1 = parseFloat(elStyles.left);
  const top1 = parseFloat(elStyles.top);
  const width1 = parseFloat(elStyles.width);
  const height1 = parseFloat(elStyles.height);
  const tarSubscriber = getSubscriverItemByEl(el);
  let offsetX = 0;
  let offsetY = 0;

  toggleZIndex(el);
  if (resizeDir) cancelBubble(e);

  const onResizeMouseMove = (e: MouseEvent) => {
    offsetX = e.pageX - pagex1;
    offsetY = e.pageY - pagey1;

    resizeEl({
      el: el,
      resizeDir,
      width: width1,
      height: height1,
      left: left1,
      top: top1,
      offsetX,
      offsetY,
      minWidth: tarSubscriber.border.minWidth,
      minHeight: tarSubscriber.border.minHeight,
      movingFn: tarSubscriber.movingFn,
    });

    isTriggerResize = true;
  };

  const onResizeMouseUp = () => {
    document.removeEventListener('mousemove', onResizeMouseMove);
    document.removeEventListener('mouseup', onResizeMouseUp);

    tarSubscriber.movedFn({
      width: parseInt(el.style.width),
      height: parseInt(el.style.height),
      left: parseInt(el.style.left),
      top: parseInt(el.style.top),
    });

    isTriggerResize = false;
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
  movingFn,
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
  movingFn: ResizeBindingValue['movingFn'];
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
  movingFn &&
    movingFn({
      width: parseInt(el.style.width),
      height: parseInt(el.style.height),
      top: parseInt(el.style.top),
      left: parseInt(el.style.left),
    });
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
