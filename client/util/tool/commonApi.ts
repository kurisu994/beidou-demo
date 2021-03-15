import http from 'client/util/http';
import host from 'client/util/host';
import { request } from 'client/util/http/interface';
import _URL from 'client/util/url';

const _url = _URL.current(window.location.href);
const token = _url.query.token as string;

/**
 * 检测是否关注公众号
 */
export function checkFollowOffice(): request.PromiseResp<boolean> {
  return http.get(`${host.passport}/getWechatUserInfo/byUserId`, { params: { token } });
}
