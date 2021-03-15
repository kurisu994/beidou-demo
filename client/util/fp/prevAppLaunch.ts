/**
 * @author yangbo
 * app启动之前需要执行的逻辑
 * 0.
 * 1. 判断执行环境
 * 2. 如果在微信中，需要初始化微信JSSDK的权限，与分享配置
 * 3. 如果是在小程序中，需要从url中解析出token以及其他参数
 *
 */

import getWinxinEnv from './getWinxinEnv';

export const prevAppLaunch = async () => {
  /**
   * 针对移动端
   */
  if ('addEventListener' in document) {
    document.addEventListener(
      'DOMContentLoaded',
      function() {
        // @ts-ignore
        window.FastClick && window.FastClick.attach(document.body);
      },
      false
    );
  }

  return new Promise<any>((resolve) => {
    getWinxinEnv().then((res) => {
      resolve(res);
    });
  });
};
