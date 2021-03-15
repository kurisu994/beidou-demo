import 'core-js/stable';
import 'regenerator-runtime/runtime';
import cls from 'classnames/bind';
import { Result } from 'antd';
import React from 'react';
import Layout from 'client/layout';
import { ViewProps } from 'beidou';
import style from './style.m.less';
import { hydrate } from 'react-dom';

cls.bind(style);

class NoFoundPage extends React.Component<ViewProps> {
  public static getPartial({ store, history }) {
    return {
      html: <Result status="404" title="404" subTitle="Sorry, the page you visited does not exist." />,
    };
  }

  public render() {
    const { html, state, ...others } = this.props;
    const props = {
      ...others,
      entry: '404',
      title: '404',
    };
    return <Layout {...props}>{html}</Layout>;
  }
}

if (__CLIENT__) {
  const app = <Result status="404" title="404" subTitle="Sorry, the page you visited does not exist." />;
  hydrate(app, document.getElementById('_'));
}

export default NoFoundPage;
