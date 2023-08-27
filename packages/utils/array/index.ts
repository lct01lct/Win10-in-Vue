export const isTwoArray = (
  array: Array<any>,
  isEvery: 'every' | 'some' = 'every'
): array is any[][] => {
  return array[isEvery]((items) => {
    return Array.isArray(items);
  });
};

export type RemoveItemCb = <T>(item: T) => boolean;
export function removeItem<T>(arr: Array<T>, itemOrCb: T | RemoveItemCb) {
  const index = arr.findIndex((el) => {
    if (typeof itemOrCb === 'function') {
      return (itemOrCb as RemoveItemCb)(el);
    } else {
      return el === itemOrCb;
    }
  });

  if (index > -1) {
    return arr.splice(index, 1)[0];
  } else {
    return void 0;
  }
}
