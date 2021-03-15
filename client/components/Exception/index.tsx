import React from 'react';
import './style.less';

import ExceptionAccessDenied from './images/accessDenied.png';
import ExceptionDataFault from './images/dataFault.png';
import ExceptionNoCoupon from './images/noCoupon.png';
import ExceptionNoData from './images/noData.png';
import ExceptionNoMessage from './images/noMessage.png';
import ExceptionNoOrder from './images/noOrder.png';
import ExceptionNoSearch from './images/noSearch.png';
import ExceptionPageLost from './images/pageLost.png';
import ExceptionTimeOut from './images/timeOut.png';

export type ExceptionType =
  | 'default'
  | 'accessDenied'
  | 'dataFault'
  | 'noCoupon'
  | 'noData'
  | 'noMessage'
  | 'noOrder'
  | 'noSearch'
  | 'pageLost'
  | 'timeOut';

const imageSource: { [key: string]: any } = {
  default: {
    image: ExceptionNoData,
    message: '暂无相关内容~'
  },
  accessDenied: {
    image: ExceptionAccessDenied,
    message: '暂无访问权限~'
  },
  dataFault: {
    image: ExceptionDataFault,
    message: '获取数据失败~'
  },
  noCoupon: {
    image: ExceptionNoCoupon,
    message: '暂无优惠券~'
  },
  noData: {
    image: ExceptionNoData,
    message: '暂无相关数据~'
  },
  noMessage: {
    image: ExceptionNoMessage,
    message: '暂无任何消息~'
  },
  noOrder: {
    image: ExceptionNoOrder,
    message: '暂无订单~'
  },
  noSearch: {
    image: ExceptionNoSearch,
    message: '暂无搜索结果~'
  },
  pageLost: {
    image: ExceptionPageLost,
    message: '页面走丢了~'
  },
  timeOut: {
    image: ExceptionTimeOut,
    message: '当前网络不给力，请下拉刷新~'
  }
};

export interface ExceptionProps {
  height?: number;
  message?: string;
  type?: ExceptionType;
  children?: any;
}

function Exception({ height, type = 'default', message, children }: ExceptionProps) {
  return (
    <section className="exception" style={height ? { height: `${height}rpx` } : {}}>
      <img className="image" src={imageSource[type].image} />
      {message ? <span className="text">{message}</span> : <span className="text">{imageSource[type].message}</span>}
      <span className="text">{children}</span>
    </section>
  );
}

Exception.options = {
  addGlobalClass: true
};

export default Exception;
