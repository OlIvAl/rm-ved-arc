import { IStore, IStoreWithCurrentModel } from './stores/interfaces';
import { IArticleModel, IClientModel } from './models/interfaces';
import { ArticleStore } from './stores/ArticleStore';
import { ClientStore } from './stores/ClientStore';

export class RootStore {
  articleStore: IStore<IArticleModel>;
  clientStore: IStoreWithCurrentModel<IClientModel>;

  constructor() {
    this.articleStore = new ArticleStore();
    this.clientStore = new ClientStore();
  }
}
