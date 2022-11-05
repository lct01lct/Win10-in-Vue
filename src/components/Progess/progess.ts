import { PropType } from 'vue';

type SlideType = 'step' | 'percent';
const slideType = ['step', 'percent'];
export const progessProps = {
  modelValue: {
    type: Number,
    default: 50,
  },

  type: {
    type: String as PropType<SlideType>,
    default: 'step',
    validator(val: string) {
      return slideType.includes(val);
    },
  },

  width: {
    type: Number,
    default: 320,
  },

  steps: {
    type: Array,
    default: () => [],
  },

  showText: {
    type: Boolean,
    default: false,
  },
};
