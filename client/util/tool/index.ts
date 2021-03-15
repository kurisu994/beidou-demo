/**
 * 补零
 * @param number
 * @param length
 */
export function fixO(number: string | number, length = 2): string {
  let temp = number.toString();
  while (temp.length < length) {
    temp = `0${temp}`;
  }
  return temp;
}

/**
 * 保留两位小数
 */
export function toDouble(source: any, length = 2): number {
  if (!source) return 0;
  let result = source;
  if (typeof source !== 'number') {
    result = Number(source);
  }
  try {
    result = Number(result.toFixed(length));
  } catch (e) {
    result = 0;
  }
  return result;
}

/**
 * getIdxById
 * @param {Array} arr
 * @param {Int} id
 * @return {Int} index
 */
export const getIndexByValue = (arr: Array<any>, value: number, key = 'value') => {
  if (!arr || !arr.length) return -1;
  if (!value) return -1;
  let isPrimitive = true;
  for (let i = 0, l = arr.length; i < l; i++) {
    const e = arr[i];

    if (e !== null && typeof e === 'object') {
      isPrimitive = false;
      break;
    }
  }
  for (let i = 0, l = arr.length; i < l; i++) {
    const item = arr[i];
    if (isPrimitive ? item === value : item[key] === value) {
      return i;
    }
  }
  return -1;
};

const defaultFieldName = 'label';
const defaultValueFieldName = 'value';

/**
 * 根据给定数据值获取集合中项目的指定项
 * @param value 数据值
 * @param data 数据集合
 * @param options 选项
 */
export const getItemInList = <T, R>(
  value: T,
  data: any[],
  options: {
    fieldName?: string;
    valueFieldName?: string;
    defaultValue?: R;
  } = {},
): R => {
  const opt = { fieldName: defaultFieldName, valueFieldName: defaultValueFieldName, ...options };
  const item = data.find((item) => {
    return item[opt.valueFieldName] === value;
  });
  return item || {};
};

/**
 * 隐藏电话中间部分
 * @param phone
 * @param length
 */
export const hiddenPhone = (phone: string, length = 4): string => {
  const start = 3;
  let temp = phone;
  if (temp && temp.length > start) {
    temp = `${temp.substr(0, start)}${new Array(length + 1).join('*')}${temp.substr(
      start + length,
      temp.length - start - length,
    )}`;
  }
  return temp;
};
