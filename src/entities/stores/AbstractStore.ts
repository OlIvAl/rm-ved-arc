import { action, observable } from 'mobx';
import { IStore } from './interfaces';
import { IModel } from '../models/interfaces';

export default abstract class AbstractStore<T extends IModel<any>> implements IStore<T> {
  @observable models: T[] = [];

  @action.bound resetStore(): void {
    this.models = [];
  }
}
