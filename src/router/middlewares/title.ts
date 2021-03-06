import { Middleware, MiddlewareFactory, Route } from 'router5/dist/types/router';
import { RouterDependencies } from '../../index';
import { findSegment } from './libs/findSegment';

export const titleMiddlewareFactory =
  (routes: Route<RouterDependencies>[]): MiddlewareFactory<RouterDependencies> =>
    (): Middleware =>
      (toState, fromState, done) => {
        const segment = findSegment(toState.name, routes);

        if (segment) {
          document.title = (segment as any).title;
        }

        done();
      };