import { getDeskTopPort, getViewPort } from 'utils';
import { useEventListener } from '@vueuse/core';

export interface AppViewSizeOpt {
  width?: number;
  height?: number;
  left?: number;
  top?: number;
}

const appMaxPort = getDeskTopPort();

export let maxAppHeight = appMaxPort.height;
export let maxAppWidth = appMaxPort.width;

useEventListener(window, 'resize', () => {
  maxAppHeight = getViewPort().height - 50;
  maxAppWidth = getViewPort().width;
});

export type ResizeMoveingScbscriber = (params: Required<AppViewSizeOpt>) => void;
export type SubscribeResizeMovingType = ReturnType<typeof useResize>['subscribeResizeMoving'];

export const useResize = () => {
  const resizeMovingSubscribers: ResizeMoveingScbscriber[] = [];
  const subscribeResizeMoving = (fn: ResizeMoveingScbscriber) => {
    resizeMovingSubscribers.push(fn);
  };

  return {
    resizeMovingSubscribers,
    subscribeResizeMoving,
  };
};
