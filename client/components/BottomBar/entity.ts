/**
 * 小程序主页
 */
export const MiniPageHome = '/pages/home/NewCar/Index/index';

/**
 * 登录页面
 */
export const IndexLogin = '/pages/auth/getUserInfo/index';
/**
 * 小程序主页
 */
export const MiniPageCarDetail = '/pgMcar/CarDetail/Index/index';

/**
 * 小程序分享页
 */
export const MiniPageShare = '/pages/profile/Share/index';

/**
 * 小程序关注页
 */
export const MiniPageFollow = '/pages/common/Follow/index';

/**
 * 小程序试驾页
 */
export const MiniPageTestDrive = '/pgMcar/TestDrive/Index/index';

/**
 * 小程序销售顾问
 */
export const MiniPageConsult = '/pgProfile/Consult/Index/index';

/**
 * 小程序支付页
 */
export const MiniPageWxpay = '/pages/pay/OnlinePay/index';

/**
 * 小程序外勤评价
 */
export const MiniPageVisitSev = '/pgProfile/Evaluat/VisitSev/index';

/**
 * 售后主页
 */
export const MiniPageAfterSale = '/pages/home/AfterSale/index';

/**
 * 购买vip卡
 */
export const MiniPageVipBuy = '/pgCas/VipWelfare/ShoppingCard/Index/index';

/**
 * 购买套餐卡
 */
export const MiniPageMpBuy = '/pgCas/MaintainCard/Index/index';

/**
 * 优惠券页面
 */
export const MiniPageCoupon = '/pgProfile/Coupon/Index/index';

/**
 * 我的奖励页面
 */
export const MiniPageMyReward = '/pgProfile/Invite/Reward/index';

/**
 * 我的基金页面
 */
export const MiniPageMyFunds = '/pgProfile/Funds/Detail/index';

/**
 * 超长省略
 */
export const StyleOverEclipse = (
  row?: number
): {
  display: '-webkit-box';
  WebkitBoxOrient: 'vertical';
  WebkitLineClamp: number;
  overflow: 'hidden';
} => ({
  display: '-webkit-box',
  WebkitBoxOrient: 'vertical',
  WebkitLineClamp: row || 1,
  overflow: 'hidden'
});

/**
 * 分享类型
 */
export const ShareType: {
  ACTIVITY: '1'; // 市场活动
  ARTICLE: '2'; // 软文文章
  POSTOR: '3'; // 海报
  NEWS: '4'; // 新闻
  AUTO: '5'; // 定巡展
  REWARD: '6'; // 我的奖励
} = {
  ACTIVITY: '1', // 市场活动
  ARTICLE: '2', // 软文文章
  POSTOR: '3', // 海报
  NEWS: '4', // 新闻
  AUTO: '5', // 定巡展
  REWARD: '6' // 我的奖励
};
