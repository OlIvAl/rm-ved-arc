import React from 'react';
import ReactDOM from 'react-dom';
import { createRouter, routes } from './router';

import { RootStore } from './entities/RootStore';
import { UserInfo } from './entities/UserInfo';

const rootStore = new RootStore();
const userInfo = new UserInfo();

export type RouterDependencies = Record<string, any>

const router = createRouter(routes, { rootStore, userInfo });

// auth in router plugin

const renderApp = () => {
  ReactDOM.render(
    <div />,
    document.getElementById('root'),
  );
};

router.start(renderApp);