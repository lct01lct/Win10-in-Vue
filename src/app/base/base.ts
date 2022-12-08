export interface AppViewSizeOpt {
  width?: number;
  height?: number;
  left?: number;
  top?: number;
}

export const maxAppHeight = 703;
export const maxAppWidth = 1536;

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
