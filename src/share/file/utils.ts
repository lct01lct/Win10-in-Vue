import { Files, Folder, Desc } from '.';

export type BinType = Desc | Folder | Files;

const units = ['B', 'KB', 'MB', 'GB', 'TB'];
const baseRadix = 1024;

/**
 * 根据不同单位求内存的和
 *
 * @param {String} num1 任意类型的单位
 * @param {String} num2 任意类型的单位
 * @returns {String} 单位为 B 的数据
 */
export const addStorageUnit = (num1: string, num2: string) => {
  return getBytes(num1) + getBytes(num2) + 'B';
};

/**
 * 内存占用率
 *
 * @param {String} usage 使用的内存，任意类型的单位
 * @param {String} totol 总内存，任意类型的单位
 * @returns {String} 百分比数据
 */
export const divStorageUnit = (usage: string, totol: string) => {
  return (getBytes(usage) / getBytes(totol)) * 100 + '%';
};

/**
 * 以合适的单位展示内存
 *
 * @param {String} num  任意类型的单位
 * @returns {String} 内存大小
 */
export const showProperUnit = (num: string) => {
  const res = separateUnit(num);
  let size = res.size;
  let index = units.indexOf(res.unit);
  while (size >= baseRadix) {
    size /= baseRadix;
    index++;
  }

  return size + units[index];
};

/**
 * 根据数据分离单位和内存大小数字
 *
 * @param {String} num 任意类型的单位
 * @returns {Array} 返回数字和单位的数组
 */
export function separateUnit(num: string) {
  const res = {
    size: 0,
    unit: '',
  };
  res.size = parseFloat(num);
  res.unit = num.match(/[a-z|A-Z]+/gi)![0].toUpperCase();
  return res;
}

/**
 * 获取单位为字节的内存数据
 *
 * @param {String} num 任意类型的单位
 * @returns {Number} 没有单位的数据
 */
export function getBytes(num: string): number {
  const res = separateUnit(num);
  const index = units.indexOf(res.unit);

  return res.size * Math.pow(baseRadix, index);
}

export const isRepeatFolder = (tarNodes: (Files | Folder)[], name: string) => {
  return (
    tarNodes.findIndex((item) => {
      if (item instanceof Folder) {
        return item.name === name;
      }
      return false;
    }) > -1
  );
};

export const isRepeatFile = (tarNodes: (Files | Folder)[], name: string) => {
  return (
    tarNodes.findIndex((item) => {
      if (item instanceof Files) {
        return item.name === name;
      }
      return false;
    }) > -1
  );
};

export const isFile = (data: any) => {
  return data instanceof Files;
};

export const isFolder = (data: any) => {
  return data instanceof Folder;
};

export const isDesc = (data: any) => {
  return data instanceof Desc;
};
