import { Middleware, MiddlewareFactory } from 'router5/dist/types/router';
import { RouterDependencies } from '../../index';

export const titleMiddleware: MiddlewareFactory<RouterDependencies> = (router): Middleware =>
  (toState, fromState) => {
    console.log(toState, fromState);
  };