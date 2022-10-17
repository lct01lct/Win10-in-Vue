export type TriggerType = 'click' | 'contextmenu';
const triggerTypes = ['click', 'contextmenu'];

const visible = ref<boolean>(false);

const hideContent = () => {
  visible.value = false;
};

const toggle = () => {
  visible.value = !visible.value;
};

const whenTrigger = (type: TriggerType, triggerType: TriggerType, handler: () => void) => {
  if (triggerTypes.includes(type)) {
    type === triggerType && handler();
  } else {
    console.warn('invalid trigger-type');
  }
};

export { visible, hideContent, toggle, whenTrigger };
