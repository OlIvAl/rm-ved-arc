import { IStore, IStoreWithCurrentModel } from '../stores/interfaces';
import { IClientData } from '../../DataLayer/modules/clients/interfaces';
import { IArticleData } from '../../DataLayer/modules/articles/interfaces';

/**
 * Объект модели
 */
export interface IModel<T extends IStore> {
  readonly store: T;

  readonly id: ID;
}

export interface IClientModel extends IModel<IStoreWithCurrentModel<IClientModel>>, IClientData {

}
export interface IArticleModel extends IModel<IStore<IArticleModel>>, IArticleData {

}