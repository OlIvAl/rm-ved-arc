import { action, observable } from 'mobx';
import { IStoreWithCurrentModel } from './interfaces';
import AbstractStore from './AbstractStore';
import { IModel } from '../models/interfaces';

export default abstract class AbstractStoreWithCurrentModel<T extends IModel<any>>
  extends AbstractStore<T>
  implements IStoreWithCurrentModel<T> {
  @observable currentModel: T | null = null;

  @action.bound setCurrentModel(id: ID): void {
    const currentModel = this.models.find(model => model.id === id);

    if (!currentModel) {
      throw Error('The desired model does not exist');
    }

    this.currentModel = currentModel;
  }

  @action.bound resetStore(): void {
    super.resetStore();
    this.resetCurrentModel();
  }

  @action.bound resetCurrentModel(): void {
    this.currentModel = null;
  }
}
