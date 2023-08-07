export const isTwoArray = (
  array: Array<any>,
  isEvery: 'every' | 'some' = 'every'
): array is any[][] => {
  return array[isEvery]((items) => {
    return Array.isArray(items);
  });
};
