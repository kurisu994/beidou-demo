import { createBrowserHistory, History } from 'history';
import { syncHistoryWithStore, RouterStore } from 'mobx-react-router';

export function createHistory({ basename, pathname }: { basename?: string; pathname?: string }): History {
  const browserHistory = createBrowserHistory({
    basename,
  });

  if (pathname) {
    browserHistory.location.pathname = pathname;
  }

  const routerStore = new RouterStore();

  const history = syncHistoryWithStore(browserHistory, routerStore) as History;

  return history;
}
