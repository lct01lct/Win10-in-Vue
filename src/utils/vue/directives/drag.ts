import { Directive, DirectiveBinding } from 'vue';
import { toggleZIndex } from '@/app/base/taskBar';

const name = 'drag';

export interface DragBindingValue {
  tar: string;
  movedFn?: (x: number, y: number) => void;
}

const directive: Directive = {
  async mounted(el: HTMLElement, binding: DirectiveBinding<DragBindingValue | undefined>) {
    await nextTick();

    const tar = binding.value ? findParentElement(el, binding.value.tar) : el;

    if (!tar) throw new Error('Unable to find the target node of draggable!');

    const onMouseDown = (e: MouseEvent) => {
      // e.stopPropagation();
      toggleZIndex(tar);

      const pos1 = { x: e.pageX, y: e.pageY };
      const tarStyle = window.getComputedStyle(tar, null);
      const tarPos1 = { left: parseFloat(tarStyle.left), top: parseFloat(tarStyle.top) };
      const movePx = { x: 0, y: 0 };

      const onMouseMove = (e: MouseEvent) => {
        const pos2 = { x: e.pageX, y: e.pageY };

        movePx.x = pos2.x - pos1.x;
        movePx.y = pos2.y - pos1.y;

        tar.style.left = tarPos1.left + movePx.x + 'px';
        tar.style.top = tarPos1.top + movePx.y + 'px';
      };

      const onMouseUp = () => {
        binding.value &&
          binding.value.movedFn &&
          binding.value.movedFn(tarPos1.left + movePx.x, tarPos1.top + movePx.y);

        document.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('mouseup', onMouseUp);
      };

      document.addEventListener('mousemove', onMouseMove);
      document.addEventListener('mouseup', onMouseUp);
    };

    el.addEventListener('mousedown', onMouseDown);
  },
};

const findParentElement = (el: HTMLElement, tar: string): HTMLElement | null => {
  let parent: HTMLElement = el;

  while (!parent.classList.contains(tar.slice(1))) {
    if (parent.parentElement) {
      parent = parent.parentElement;
    } else {
      return null;
    }
  }

  return parent;
};

export { name, directive };
