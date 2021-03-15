import * as React from 'react';
import utils from 'client/util';
import { Toast } from 'antd-mobile';
import { IndexLogin, MiniPageAfterSale, MiniPageHome, MiniPageShare, MiniPageTestDrive, MiniPageWxpay } from './entity';
import _URL from 'client/util/url';
import './style.less';
import storeIcon from './images/store@3x.png';
import carIcon from './images/car@3x.png';
import shareIcon from './images/share@3x.png';
import myRewardIcon from './images/myReward.png';

interface ShareOptions {
  shareType?: string; // 分享类型
  referId?: string; // 关联ID
}

interface Props {
  disabled?: boolean;
  bizType?: number;
  mainText?: string;
  shareText?: string;
  onClick?: Function;
  shareOptions: ShareOptions;
  visitor?: string;
}

/**
 * 环境判断
 */
let EnvConfig: any = {
  wx: false,
  wxMini: false,
};

export default class BottomBar extends React.PureComponent<Props, Object> {
  public static defaultProps = {
    disabled: true,
  };

  public async componentDiMount() {
    EnvConfig = await utils.prevAppLaunch();
  }

  /**
   * 跳转小程序首页
   */
  public handlePageHome = () => {
    if (EnvConfig.wxMini) {
      const { bizType } = this.props;
      // @ts-ignore
      wx.miniProgram.switchTab({ url: bizType == 1 ? MiniPageHome : MiniPageAfterSale });
    } else {
      Toast.info('请在小程序中打开');
    }
  };

  /**
   * 跳转小程序试驾页
   */
  public handleTestDrive = () => {
    if (EnvConfig.wxMini) {
      const { visitor } = this.props;
      if (visitor === undefined || visitor === 'true') {
        this.handleLoginPage();
        return;
      }
      // @ts-ignore
      wx.miniProgram.navigateTo({ url: MiniPageTestDrive });
    } else {
      Toast.info('请在小程序中打开');
    }
  };

  /**
   * 跳转小程序我的奖励
   */
  public handleMyReward = () => {
    if (EnvConfig.wxMini) {
      const { visitor } = this.props;
      if (visitor === undefined || visitor === 'true') {
        this.handleLoginPage();
        return;
      }
      // @ts-ignore
      wx.miniProgram.navigateTo({ url: MiniPageMyReward });
    } else {
      Toast.info('请在小程序中打开');
    }
  };

  /**
   * 跳转小程序分享页
   */
  public handleShare = () => {
    if (EnvConfig.wxMini) {
      const { shareOptions, visitor } = this.props;
      if (visitor === undefined || visitor === 'true') {
        this.handleLoginPage();
        return;
      }
      let url = MiniPageShare;
      const query = _URL.current(window.location.href).query;
      const params = { ...shareOptions, ...query };
      url += _URL.queryToUrlParams(params);
      // @ts-ignore
      wx.miniProgram.navigateTo({ url });
    } else {
      Toast.info('请在小程序中打开');
    }
  };

  /**
   * 跳转小程序支付页
   */
  public handlePayment = (token: string) => {
    if (EnvConfig.wxMini) {
      const { visitor } = this.props;
      if (visitor === undefined || visitor === 'true') {
        this.handleLoginPage();
        return;
      }
      // @ts-ignore
      wx.miniProgram.navigateTo({ url: `${MiniPageWxpay}?token=${token}&message=活动报名支付成功` });
    } else {
      Toast.info('请在小程序中打开');
    }
  };

  public handleMainClick = () => {
    const { onClick, visitor } = this.props;
    if (EnvConfig.wxMini) {
      if (visitor === undefined || visitor === 'true') {
        if (EnvConfig.wxMini) this.handleLoginPage();
        return;
      }
      onClick?.(this.handlePayment);
    } else {
      Toast.info('请在小程序中打开');
    }
  };

  public handleLoginPage = () => {
    try {
      // @ts-ignore
      wx.miniProgram.navigateTo({ url: IndexLogin });
    } finally {
      console.log('')
    }
  };

  public render() {
    const { disabled, mainText, shareText, bizType } = this.props;
    return (
      <section className="bottomBarWrapper">
        <section className="left">
          <button className="item" onClick={this.handlePageHome}>
            <img src={storeIcon} />
            <span>店铺首页</span>
          </button>
          {bizType === 1 && (
            <button className="item" onClick={this.handleTestDrive}>
              <img src={carIcon} />
              <span>预约试驾</span>
            </button>
          )}
          {bizType === 3 && (
            <button className="item" onClick={this.handleMyReward}>
              <img src={myRewardIcon} />
              <span>我的奖励</span>
            </button>
          )}
          <button className="item" onClick={this.handleShare}>
            <img src={shareIcon} />
            <span>{shareText || '分享有礼'}</span>
          </button>
        </section>
        <button disabled={disabled} className="itemLast" onClick={this.handleMainClick}>
          {mainText || '我要报名'}
        </button>
      </section>
    );
  }
}
