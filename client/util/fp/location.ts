import http from 'client/utils/http';
import host from 'client/utils/host';

/**
 * 请求权限
 */
const getJSApiConfig = (params: any) => {
  return http.get(`${host.passport}/jsApi/ticket`, { params });
};

/**
 * init jssdk
 * @param apiList
 * @returns {*}
 */
export function initJSSDK(apiList: any) {
  return new Promise((resolve, reject) => {
    getJSApiConfig({
      url: window.location.href
    })
      .then((config: any) => {
        //@ts-ignore
        window.wx.config({
          debug: false,
          jsApiList: apiList,
          success: () => {
            resolve();
          },
          fail: () => {
            reject({ message: '配置jssdk失败' });
          },
          complete: () => {},
          ...config.data
        });
        //@ts-ignore
        window.wx.ready(() => {
          resolve();
        });
        //@ts-ignore
        window.wx.error((res: any) => {
          reject({ message: res.errMsg });
        });
      })
      .catch((e: any) => {
        reject({ message: e.message });
      });
  });
}

export const _getLocationFromWx = () => {
  return new Promise((resolve, reject) => {
    initJSSDK(['getLocation'])
      .then(() => {
        //@ts-ignore
        window.wx.getLocation({
          type: 'wgs84', // 默认为wgs84的gps坐标，如果要返回直接给openLocation用的火星坐标，可传入'gcj02'
          success: (res: any) => {
            const latitude = res.latitude; // 纬度，浮点数，范围为90 ~ -90
            const longitude = res.longitude; // 经度，浮点数，范围为180 ~ -180。
            resolve({
              latitude: latitude,
              longitude: longitude
            });
          },
          fail: (res: any) => {
            reject({ message: res.errMsg });
          }
        });
      })
      .catch(reject);
  });
};

const getLocationByGeo = () => {
  //@ts-ignore
  if (!window.BMap) {
    throw new Error('BMap is not an Object.');
  }
  return new Promise((resolve, reject) => {
    //@ts-ignore
    const geoLocation = new window.BMap.Geolocation();
    geoLocation.enableSDKLocation();
    geoLocation.getCurrentPosition(function getCurrPos(r: any) {
      //@ts-ignore
      if (this.getStatus() === window.BMAP_STATUS_SUCCESS) {
        resolve(r);
      } else {
        reject();
      }
    });
  });
};

const getLocationByIP = () => {
  //@ts-ignore
  if (!window.BMap) {
    throw new Error('BMap is not an Object.');
  }
  return new Promise((resolve) => {
    //@ts-ignore
    const localCity = new window.BMap.LocalCity();
    localCity.get((r: any) => {
      resolve(r);
    });
  });
};

export const _getLocationFromBaiDu = async () => {
  let location = null;
  try {
    location = await getLocationByGeo();
  } catch (e) {
    location = await getLocationByIP();
  }
  if (!location) {
    throw new Error('`getLocation()` From map.js error occurred.');
  } else {
    return location;
  }
};
