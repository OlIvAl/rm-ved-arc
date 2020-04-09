import createRouter5, { Route, Router } from 'router5';
import { initStateMiddlewareFactory } from '../initState';

const initStateFn = jest.fn();

const routes = [
  {
    name: 'index',
    path: '/'
  },
  {
    name: 'pages',
    path: '/pages',
    initState: initStateFn
  }
];

const createRouter = (routes: Route[]): Router => {
  const router = createRouter5(routes);

  router.useMiddleware(initStateMiddlewareFactory(routes));

  return router;
};

let router: Router;

beforeEach(() => {
  router = createRouter(routes);
  router.start();
});
afterEach(() => {
  router.stop();
});

describe('init state middleware', () => {
  it('call init state callback', () => {
    router.navigate('pages');

    expect(initStateFn).toHaveBeenCalledTimes(1);
  });
});