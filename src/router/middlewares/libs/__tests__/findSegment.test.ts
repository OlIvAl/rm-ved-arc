import createRouter5, { Route, Router } from 'router5';

const routes: Route[] = [
  {
    name: 'index',
    path: '/'
  },
  {
    name: 'outer1',
    path: '/outer1',
    children: [
      {
        name: 'middle1',
        path: '/middle1'
      },
      {
        name: 'middle2',
        path: '/middle2',
        children: [
          {
            name: 'inner1',
            path: '/inner1'
          },
          {
            name: 'inner2',
            path: '/inner2'
          },
          {
            name: 'inner3',
            path: '/inner3'
          },
        ]
      },
      {
        name: 'middle3',
        path: '/middle3'
      }
    ]
  },
  {
    name: 'outer2',
    path: '/outer2'
  },
];

const createRouter = (routes: Route[]): Router => {
  return createRouter5(routes);
};

let router: Router;

beforeEach(() => {
  router = createRouter(routes);
  router.start('/');
});
afterEach(() => {
  router.stop();
});

describe('findSegment', () => {
  it('return right outer segment from home', () => {
    router.navigate('outer1');

    expect(router.getState().name).toEqual('outer1');
  });
  it('return right outer segment from other segment', () => {
    router.navigate('outer1.middle2.inner3');
    router.navigate('outer1');

    expect(router.getState().name).toEqual('outer1');
  });
  it('return right middle segment from home', () => {
    router.navigate('outer1.middle2.inner3');

    expect(router.getState().name).toEqual('outer1.middle2.inner3');
  });
  it('return right middle segment from other segment', () => {
    router.navigate('outer1.middle2.inner3');
    router.navigate('outer1.middle2');

    expect(router.getState().name).toEqual('outer1.middle2');
  });
  it('return right inner segment from home', () => {
    router.navigate('outer1.middle2');

    expect(router.getState().name).toEqual('outer1.middle2');
  });
  it('return right inner segment from other segment', () => {
    router.navigate('outer1.middle2.inner3');
    router.navigate('outer1.middle2.inner2');

    expect(router.getState().name).toEqual('outer1.middle2.inner2');
  });
});