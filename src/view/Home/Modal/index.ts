const brightnessVal = ref<number>(100);

export const setBrightnessVal = (val: number) => {
  brightnessVal.value = val;
};

export const opactiyRange = 0.6;

export const opacity = computed(() => {
  return (1 - brightnessVal.value / 100) * opactiyRange;
});
