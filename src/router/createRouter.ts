import createRouter5, { Route, Router } from 'router5';
import browserPlugin from 'router5-plugin-browser';
import loggerPlugin from 'router5-plugin-logger';
import { RouterDependencies } from '../index';
import { userInfoInitPlugin } from './plugins/onStart/userInfoInit';
import { titleMiddleware } from './middlewares/title';

export const createRouter = (routes: Route[], dependencies: RouterDependencies): Router => {
  const router = createRouter5(routes, {
    defaultRoute: 'index'
  }, dependencies);

  router.usePlugin(userInfoInitPlugin);
  router.usePlugin(loggerPlugin);
  router.usePlugin(
    browserPlugin({
      useHash: false
    })
  );

  router.useMiddleware(titleMiddleware);

  return router;
};