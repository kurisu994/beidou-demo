import { AxiosError } from 'axios';
import { HttpClientResponse } from 'urllib';

interface ErrorCode {
  [key: number]: string;
}

interface ErrorMsg extends Error {
  errorCode?: number | string;
  errorMsg?: string;
  response?: any;
}

export const ERROR_MSG: ErrorCode = {
  500: '500, 服务器异常，请稍后再试',
  503: '抱歉，当前服务器异常，请稍后再试',
  504: '服务器响应超时',

  401: '抱歉，您还未登录',
  40101: '抱歉，您还未登录',
  40102: '抱歉，您还未登录',
  40103: '抱歉，您还未登录',
  40104: '登录已过期，您需要重新登录',
  40001: '获取版本信息失败',
  403: '抱歉，您没有权限访问该页面',
  404: '你访问的接口不存在',

  // 自定义
  10001: '解析失败，_bodyInit为非正确的JSON格式字符串',
  10002: '网络异常，请确保您能够正常访问网络',
  10003: '该数据为app版本发布信息，数据格式与普通的返回结果不一致',
  10004: '请求已经终止',
  0: '当前请求异常',
};

function createError(responseError: HttpClientResponse<any>) {
  let errorCode;
  let errorMsg;
  let response = {};

  // 请求已经发送，并且服务器有返回
  if (responseError.data || responseError.status) {
    response = responseError.data || responseError;

    let data = responseError.data;

    if (data && typeof data === 'object') {
      errorMsg = data.result || data.error_msg || data.message || data.description;
      errorCode = data.code || data.status || responseError.status;
    }
    if (!errorCode) {
      errorCode = responseError.status;
    }
    if (!errorMsg) {
      errorMsg = responseError?.res?.statusMessage;
    }
  } else if (responseError.res.complete) {
    // 请求已经发送但是没有收到服务端响应
    console.log('请求已经发送但是没有收到服务端响应');
    if (!errorCode) {
      errorCode = responseError.status;
      errorMsg = responseError?.res?.statusMessage;
    }
  } else {
    // 请求未发送
    errorMsg = '请求未发送成功';
  }

  if (!errorCode) {
    errorCode = -1;
  }

  const error: ErrorMsg = new Error(errorMsg);
  error.errorCode = errorCode;
  error.errorMsg = errorMsg || ERROR_MSG[errorCode];
  error.response = response;
  throw error;
}

export function createErrorByError(error: AxiosError): ICommon.ServerResponse<any> {
  const defaultRes: ICommon.ServerResponse<any> = {
    code: Number(error.code) || -1,
    result: '网络异常，请稍后再试',
    data: undefined,
    success: false,
  };

  if (error.response) {
    defaultRes.code = error?.code || error.response?.data?.status;
    defaultRes.result = error.response?.data?.message || error?.message;
    defaultRes.data = error?.response?.data;

    return defaultRes;
  }

  return defaultRes;
}

export default createError;
