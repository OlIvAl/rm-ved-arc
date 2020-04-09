import { ArticleListState } from '../states/ArticleListState';
import { RouterDependencies } from '../index';
import { ArticlesInitService } from '../services/initServices/ArticlesInitService';
import { ClientListState } from '../states/ClientListState';
import { ClientsInitService } from '../services/initServices/ClientsInitService';
import { ClientInitService } from '../services/initServices/ClientInitService';
import { IClientQueryParams } from '../DataLayer/modules/clients/interfaces';
import { ClientCardState } from '../states/ClientCardState';

export const routes = [
  {
    name: 'home',
    path: '/',
    forwardTo: 'articles'
  },
  {
    name: 'articles',
    path: '/articles',
    title: 'База знаний',
    pagination: true,
    filtration: true,
    initState: async (params: any, { rootState }: RouterDependencies) => {
      const articlesInitService = new ArticlesInitService();
      const articlesListState = new ArticleListState(rootState.articleStore, articlesInitService);

      await articlesListState.init();

      return articlesListState;
    },
  },
  {
    name: 'clients',
    path: '/clients',
    title: 'Клиенты',
    pagination: true,
    filtration: true,
    initState: async (params: any, { rootState }: RouterDependencies) => {
      const clientsInitService = new ClientsInitService();
      const clientListState = new ClientListState(rootState.clientStore, clientsInitService);

      await clientListState.init();

      return clientListState;
    },
    children: [
      {
        name: 'client',
        path: '/:id',
        initState: async (params: IClientQueryParams, { rootState }: RouterDependencies) => {
          const clientInitService = new ClientInitService();
          const clientCardState = new ClientCardState(rootState.clientStore, clientInitService);

          await clientCardState.init(params.id);

          return clientCardState;
        }
      },
    ]
  }
];
