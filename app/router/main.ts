import { Application } from 'beidou';

export default (app: Application) => {
  const { router, controller } = app;
  router.get('main', '/main', controller.main.list);
  router.get('main', '/main/report/:callId', controller.main.show);

  // api
  router.get('main', '/api/main/list', controller.api.main.list);
  router.get('main', '/api/main/detail/:callId', controller.api.main.detail);
};
