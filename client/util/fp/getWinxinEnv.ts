import utils from 'client/utils';

/**
 * 获取当前的微信执行环境
 * 需要注意的是，请直接在页面中使用Script标签引入jssdk，而不要使用动态加载
 */

export interface Res {
  /**
   * 是否在微信环境
   */
  wx: boolean,

  /**
   * 是否在小程序环境
   */
  wxMini: boolean
}

function getWinxinEnv(): Promise<Res> {
  let curEnv = {
    wx: utils.isWeixin(),
    wxMini: false
  }
  let i = 0;

  return new Promise((resolve) => {
    let timer: any = 0;
    function check() {
      clearTimeout(timer);
      timer = setTimeout(() => {
        if (i > 50) {
          return resolve(curEnv);
        }

        // @ts-ignore
        if (!window.wx) {
          i++;
          check();
        }

        // @ts-ignore
        if (window.wx && window.wx.miniProgram) {
          // @ts-ignore
          window.wx.miniProgram.getEnv(res => {
            if (res.miniprogram) {
              curEnv.wxMini = true;
              return resolve(curEnv);
            }
            return resolve(curEnv);
          })
        } else {
          curEnv.wxMini = false;
          resolve(curEnv);
        }
      }, 50)
    }

    check();
  });
}

export default getWinxinEnv;