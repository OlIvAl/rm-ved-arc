import { MiddlewareFactory, Route } from 'router5/dist/types/router';
import { RouterDependencies } from '../../index';
import { findSegment } from './libs/findSegment';

export const filtrationMiddlewareFactory =
  (routes: Route<RouterDependencies>[]): MiddlewareFactory<RouterDependencies> =>
    (router) =>
      (toState, fromState, done) => {
        if(!fromState || toState.name !== fromState.name) {
          return true;
        }
        const segment = findSegment(toState.name, routes);

        const filtrationCondition: boolean = Object.keys(toState.params)
          .filter((key: string) => key !== 'offset' && key !== 'limit')
          .some((key: string) => fromState.params[key] !== toState.params[key]);

        if ((toState.name === fromState.name) && segment && (segment as any).filtration && filtrationCondition) {
          if(toState.params.offset) {
            toState.params.offset = 0;
          }

          (segment as any).initState(toState.params, router.getDependencies());
        }

        done();
      };