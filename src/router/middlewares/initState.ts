import { MiddlewareFactory, Route } from 'router5/dist/types/router';
import { RouterDependencies } from '../../index';
import { findSegment } from './libs/findSegment';

export const initStateMiddlewareFactory =
  (routes: Route<RouterDependencies>[]): MiddlewareFactory<RouterDependencies> =>
    (router) =>
      (toState, fromState, done) => {
        const segment = findSegment(toState.name, routes);

        if (segment && (segment as any).initState) {
          (segment as any).initState(toState.params, router.getDependencies());
        }

        done();
      };