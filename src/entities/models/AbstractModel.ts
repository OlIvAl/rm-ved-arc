import { IStore } from '../stores/interfaces';
import { IModel } from './interfaces';

export default abstract class AbstractModel<T extends IStore<any>> implements IModel<T> {
  readonly store: T;
  readonly id: ID;

  constructor(store: T, id: ID) {
    this.store = store;
    this.id = id;
  }
}