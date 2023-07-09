import { getViewPort } from 'utils';
import { useEventListener } from '@vueuse/core';

export interface AppViewSizeOpt {
  width?: number;
  height?: number;
  left?: number;
  top?: number;
}

export let maxAppHeight = getViewPort().height - 50;
export let maxAppWidth = getViewPort().width;

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
