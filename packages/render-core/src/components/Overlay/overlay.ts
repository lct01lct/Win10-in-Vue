import { AnimationParams, animation } from 'utils';

export interface OverlayProps {
  type?: 'click' | 'hover' | 'context';
  animateDir?: 'top' | 'bottom' | 'left' | 'right';
  pos?: 'top' | 'bottom' | 'left' | 'right';
  leftMargin?: number;
  topMargin?: number;
}

export type OverlayPos = 'top' | 'bottom' | 'left' | 'right';

export const setPos = (
  target: HTMLElement,
  trigger: HTMLElement,
  pos: OverlayPos,
  leftMargin: number,
  topMargin: number,
  animate?: OverlayPos
) => {
  const targetOffset = target.getBoundingClientRect();
  const triggerOffset = trigger.getBoundingClientRect();
  let offsetX = 0;
  let offsetY = 0;

  if (pos === 'bottom') {
    offsetY = triggerOffset.y + triggerOffset.height;
    offsetX = triggerOffset.x;
  } else if (pos === 'top') {
    offsetY = triggerOffset.y - triggerOffset.height;
    offsetX = triggerOffset.x;
  } else if (pos === 'left') {
    offsetX = triggerOffset.x - targetOffset.width;
    offsetY = triggerOffset.y;
  } else if (pos === 'right') {
    offsetX = triggerOffset.x + triggerOffset.width;
    offsetY = triggerOffset.y;
  }

  offsetX = offsetX + leftMargin;
  offsetY = offsetY + topMargin;

  const animateOpt: AnimationParams = {
    targets: [target],
    duration: 100,
    complete: () => {
      target.style.transformOrigin = 'center';
    },
  };

  if (animate === 'left' || animate === 'right') {
    animateOpt.scaleX = [0, 1];
  } else if (animate === 'top' || animate === 'bottom') {
    animateOpt.scaleY = [0, 1];
  }

  if (animate) {
    animateOpt.begin = () => {
      target.style.transformOrigin = animate;
    };

    animation(animateOpt);
  }

  target.style.left = offsetX + 'px';
  target.style.top = offsetY + 'px';
};
