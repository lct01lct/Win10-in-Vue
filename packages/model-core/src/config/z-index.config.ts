type ZIndexType = 'messageBox';

export const taskBarZIndex = 9999; // 任务栏

export const taskBarContentZIndex = 9998; // 任务栏中触发的 popover 内容

const zIndexMap: Record<string, number> = {
  messageBoxZIndex: 10000,
};

export const useZIndex = (type: ZIndexType) => {
  const set = (el: HTMLElement) => {
    el.style.zIndex = String(zIndexMap[type + 'ZIndex']++);
  };

  const remove = () => {
    zIndexMap[type + 'ZIndex']--;
  };

  return {
    set,
    remove,
  };
};
