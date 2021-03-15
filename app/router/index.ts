import { Application } from 'beidou';
import { setHost } from 'client/util/server';
import main from './main';

export default (app: Application) => {
  setHost();
  const { router, controller } = app;
  router.get('index', '/', controller.home.index);
  main(app);
};
