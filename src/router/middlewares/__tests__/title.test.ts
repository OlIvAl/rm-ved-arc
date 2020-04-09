import createRouter5, { Route, Router } from 'router5';
import { titleMiddlewareFactory } from '../title';
import * as faker from 'faker';

const TEST_TITLE = faker.random.word();

const routes = [
  {
    name: 'index',
    path: '/'
  },
  {
    name: 'pages',
    path: '/pages',
    title: TEST_TITLE
  }
];

const createRouter = (routes: Route[]): Router => {
  const router = createRouter5(routes);

  router.useMiddleware(titleMiddlewareFactory(routes));

  return router;
};

let router: Router;

beforeEach(() => {
  router = createRouter(routes);
  router.start();
});
afterEach(() => {
  router.stop();
  global.window.document.title = '';
});

describe('title middleware', () => {
  it('title in page route is right', () => {
    router.navigate('pages');

    expect(global.window.document.title).toEqual(TEST_TITLE);
  });
});