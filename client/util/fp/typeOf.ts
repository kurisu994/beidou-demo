/**
 * @author: yangbo
 * @desc: 判断一个值的具体数据类型
 */

function typeOf(value: any): string {
  return Object.prototype.toString.call(value).split(' ')[1].slice(0, -1)
    .replace(/^[A-Z]{1}/, (p: any) => p.toLowerCase());
}

export default typeOf;
