import createRouter5, { Route, Router } from 'router5';
import { filtrationMiddlewareFactory } from '../filtration';


let initStateFn: any;
let routes: any;
let router: Router;

const createRouter = (routes: Route[]): Router => {
  const router = createRouter5(routes);

  router.useMiddleware(filtrationMiddlewareFactory(routes));

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
      filtration: true,
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
  it('call init state callback, when filtration params have been changed', () => {
    router.navigate('pages');

    expect(initStateFn).not.toHaveBeenCalled();

    const TEST_FILTRATION_PARAMS = { search: 'foobar' };

    router.navigate('pages', TEST_FILTRATION_PARAMS);

    expect(initStateFn).toHaveBeenCalledWith(TEST_FILTRATION_PARAMS, {});
  });
  it('not call init state callback, when filtration params have not been changed', () => {
    router.navigate('pages');

    expect(initStateFn).not.toHaveBeenCalled();

    const TEST_PAGINATION_PARAMS = { offset: 10, limit: 100 };

    router.navigate('pages', TEST_PAGINATION_PARAMS);

    expect(initStateFn).not.toHaveBeenCalled();
  });
});