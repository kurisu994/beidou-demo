import getWinxinEnv from './fp/getWinxinEnv';
import isSupportSticky from './fp/isSupportSticky';
import { prevAppLaunch } from './fp/prevAppLaunch';
import typeOf from './fp/typeOf';

const isWeixin = (): boolean => {
  return /MicroMessenger/i.test(window.navigator.userAgent);
};

const isAndroid = (): boolean => {
  return /Android/i.test(window.navigator.userAgent);
};

const isIOS = (): boolean => {
  return /iP[hone|ad|od] OS/i.test(window.navigator.userAgent);
};

const isIphone = (): boolean => {
  return /iPhone/i.test(window.navigator.userAgent);
};

// iphoneX iphoneXS 刘海高度 30px
const isIphoneX = (): boolean => {
  return !!(
    isIphone() &&
    window.devicePixelRatio &&
    window.devicePixelRatio === 3 &&
    window.screen.width === 375 &&
    window.screen.height === 812
  );
};

// 刘海高度： 44px
const isIphoneXSMAX = (): boolean => {
  return !!(
    isIphone() &&
    window.devicePixelRatio &&
    window.devicePixelRatio === 3 &&
    window.screen.width === 414 &&
    window.screen.height === 896
  );
};

// 刘海高度 33px
const isIphoneXR = (): boolean => {
  return !!(
    isIphone() &&
    window.devicePixelRatio &&
    window.devicePixelRatio === 2 &&
    window.screen.width === 414 &&
    window.screen.height === 896
  );
};

// iPhoneX版本以上的刘海屏
const isIphoneXup = (): boolean => {
  return isIphoneX() && isIphoneXSMAX() && isIphoneXR();
};

const checkEnv = () => {
  return new Promise<any>((resolve) => {
    const ua = window.navigator.userAgent.toLowerCase();
    if (/MicroMessenger/i.test(ua)) {
      //判断是否是微信环境
      //微信环境
      // @ts-ignore
      if (window.wx && window.wx.miniProgram) {
        // @ts-ignore
        window.wx.miniProgram.getEnv(function(res: any) {
          if (res.miniprogram) {
            // 小程序环境下逻辑
            resolve({
              miniProgram: true,
              wxEnv: true
            });
          } else {
            resolve({
              miniProgram: false,
              wxEnv: true
            });
            //非小程序环境下逻辑
          }
        });
      } else {
        resolve({
          miniProgram: false,
          wxEnv: true
        });
      }
    } else {
      //非微信环境逻辑
      resolve({
        miniProgram: false,
        wxEnv: false
      });
    }
  });
};

export default {
  isWeixin,
  isAndroid,
  isIOS,
  isIphone,
  isIphoneX,
  isIphoneXSMAX,
  isIphoneXR,
  isIphoneXup,

  // function
  getWinxinEnv,
  isSupportSticky,
  typeOf,
  prevAppLaunch,
  checkEnv
};
