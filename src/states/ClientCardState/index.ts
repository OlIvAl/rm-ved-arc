import { action, computed, runInAction } from 'mobx';
import { IClientModel } from '../../entities/models/interfaces';
import { ClientInitService } from '../../services/initServices/ClientInitService';
import { IStoreWithCurrentModel } from '../../entities/stores/interfaces';

export class ClientCardState {
  @computed loading(): boolean {
    return this.clientInitService.loading;
  }
  @computed client(): IClientModel | null {
    return this.clientsStore.currentModel;
  }

  private readonly clientsStore: IStoreWithCurrentModel<IClientModel>;
  private clientInitService: ClientInitService;
  constructor(clientsStore: IStoreWithCurrentModel<IClientModel>, clientInitService: ClientInitService) {
    this.clientsStore = clientsStore;
    this.clientInitService = clientInitService;
  }

  @action.bound async init(id: string): Promise<void> {
    this.clientsStore.setCurrentModel(id);
    try {
      await this.clientInitService.init({ id });

      runInAction(() => {
        if (this.clientsStore.currentModel && this.clientInitService.item) {
          this.clientsStore.currentModel.inn = this.clientInitService.item.inn;
          this.clientsStore.currentModel.title = this.clientInitService.item.title;
        }
      });
    } catch (e) {
      throw e;
    }
  }
}
