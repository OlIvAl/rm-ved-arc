import createRouter5, { Route, Router } from 'router5';
import { paginationMiddlewareFactory } from '../pagination';

let initStateFn: any;
let routes: any;
let router: Router;

const createRouter = (routes: Route[]): Router => {
  const router = createRouter5(routes);

  router.useMiddleware(paginationMiddlewareFactory(routes));

  return router;
};

beforeEach(() => {
  initStateFn = jest.fn();

  routes = [
    {
      name: 'index',
      path: '/'
    },
    {
      name: 'pages',
      path: '/pages',
      pagination: true,
      initState: initStateFn
    },
    {
      name: 'clients',
      path: '/clients'
    }
  ];

  router = createRouter(routes);
  router.start();
});
afterEach(() => {
  router.stop();
  jest.restoreAllMocks();
});

describe('filtration middleware', () => {
  it('call init state callback, when pagination params have been changed', () => {
    router.navigate('pages');

    expect(initStateFn).not.toHaveBeenCalled();

    const TEST_PAGINATION_PARAMS = { offset: 10, limit: 100 };

    router.navigate('pages', TEST_PAGINATION_PARAMS);

    expect(initStateFn).toHaveBeenLastCalledWith(TEST_PAGINATION_PARAMS, {});
  });
  it('not call init state callback, when pagination params have not been changed', () => {
    router.navigate('pages');

    expect(initStateFn).not.toHaveBeenCalled();
  });
});
