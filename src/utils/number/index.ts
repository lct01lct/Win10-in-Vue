export const getNearestInt = (num: number) => {
  return num - Math.floor(num) > Math.ceil(num) - num ? Math.ceil(num) : Math.floor(num);
};
