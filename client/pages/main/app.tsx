import 'core-js/stable';
import 'regenerator-runtime/runtime';
import cls from 'classnames/bind';
import * as React from 'react';
import { History } from 'history';
import { Route, StaticRouter, Switch } from 'react-router';
import style from './style.m.less';
import Detail from './View/detail';
import List from './View/list';
import { BrowserRouter } from 'react-router-dom';

const cx = cls.bind(style);

interface IAppProps {
  history?: History;
  [key: string]: any;
}
const Router: any = __CLIENT__ ? BrowserRouter : StaticRouter;

const App = ({ history }: IAppProps) => {
  return (
    <Router history={history}>
      <div className={cx('app', '')}>
        <div className={cx('content')}>
          <Switch>
            <Route exact path="/main/report/:callId" component={Detail} />
            <Route exact path="/main" component={List} />
          </Switch>
        </div>
      </div>
    </Router>
  );
};
export default App;
