import { PropType } from 'vue';

export type TriggerType = 'click' | 'contextmenu' | 'hover';
export const triggerTypes = ['click', 'contextmenu', 'hover'];

export type AnimationDir = 'top' | 'bottom' | 'left' | 'right';
export const animationDirs = ['top', 'bottom', 'left', 'right'];

export type Pos = 'top' | 'bottom' | 'left' | 'right';
export const posList = ['top', 'bottom', 'left', 'right'];

export const PopoverProps = {
  // 触发方式
  triggerType: {
    type: String as PropType<TriggerType>,
    default: 'click',
    validator(value: string) {
      return triggerTypes.includes(value);
    },
  },

  // 动画指向方向
  animationDir: {
    type: String as PropType<AnimationDir>,
    validator(value: string) {
      return animationDirs.includes(value);
    },
  },

  // 定位位置
  pos: {
    type: String as PropType<Pos>,
    default: 'top',
    validator(value: string) {
      return posList.includes(value);
    },
  },

  leftMargin: {
    type: Number,
    default: 0,
  },

  topMargin: {
    type: Number,
    default: 0,
  },
};

type EmitType =
  | 'open'
  | 'onBeforeEnter'
  | 'onAfterEnter'
  | 'onBeforeLeave'
  | 'onAfterLeave'
  | 'closed';
export const PopoverEmits: EmitType[] = [
  'open',
  'onBeforeEnter',
  'onAfterEnter',
  'onBeforeLeave',
  'onAfterLeave',
  'closed',
];

export const whenTrigger = (type: TriggerType, triggerType: TriggerType, handler: () => void) => {
  if (triggerTypes.includes(type)) {
    type === triggerType && handler();
  } else {
    console.warn('invalid trigger-type');
  }
};
