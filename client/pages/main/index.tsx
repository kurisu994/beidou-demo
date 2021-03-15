import { ViewProps } from 'beidou';
import MainStore from 'client/pages/main/store';
import { createHistory } from 'client/util/historyUtil';
import * as React from 'react';
import { hydrate } from 'react-dom';
import Layout from 'client/layout';
import App from './app';
import { Provider, useStaticRendering } from 'mobx-react';
class Main extends React.Component<ViewProps> {
  public static getInitialProps({ data = {}, ctx }) {
    const { path } = ctx;
    const store = new MainStore();
    store.init(data);
    useStaticRendering(true);

    const history = createHistory({ pathname: path });

    return {
      store,
      history,
    };
  }

  public static getPartial({ store, history }) {
    return {
      html: <App store={store} history={history} />,
    };
  }

  public render() {
    const { html, state, ...others } = this.props;
    const props = {
      ...others,
      entry: 'main',
      store: state,
      title: '通话记录',
    };
    return <Layout {...props}>{html}</Layout>;
  }
}

if (__CLIENT__) {
  const initState = window.__STORE__;
  useStaticRendering(false);
  const app = (
    <Provider mainStore={new MainStore(initState)}>
      <App />
    </Provider>
  );
  hydrate(app, document.getElementById('_'));
}

export default Main;
