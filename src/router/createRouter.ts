import createRouter5, { Route, Router } from 'router5';
import browserPlugin from 'router5-plugin-browser';
import loggerPlugin from 'router5-plugin-logger';
import { RouterDependencies } from '../index';
import { userInfoInitPlugin } from './plugins/onStart/userInfoInit';
import { titleMiddlewareFactory } from './middlewares/title';
import { initStateMiddlewareFactory } from './middlewares/initState';
import { paginationMiddlewareFactory } from './middlewares/pagination';
import { filtrationMiddlewareFactory } from './middlewares/filtration';

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

  router.useMiddleware(
    titleMiddlewareFactory(routes),
    initStateMiddlewareFactory(routes),
    filtrationMiddlewareFactory(routes),
    paginationMiddlewareFactory(routes),
  );

  return router;
};