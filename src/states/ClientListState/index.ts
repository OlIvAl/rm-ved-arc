import { action, computed, runInAction } from 'mobx';
import { IStoreWithCurrentModel } from '../../entities/stores/interfaces';
import { IClientModel } from '../../entities/models/interfaces';
import { ClientsInitService } from '../../services/initServices/ClientsInitService';
import { ClientModel } from '../../entities/models/ClientModel';

export class ClientListState {
  @computed loading(): boolean {
    return this.clientsInitService.loading;
  }
  @computed articleList(): any[] {
    return this.clientsStore.models;
  }

  private readonly clientsStore: IStoreWithCurrentModel<IClientModel>;
  private clientsInitService: ClientsInitService;
  constructor(clientsStore: IStoreWithCurrentModel<IClientModel>, clientsInitService: ClientsInitService) {
    this.clientsStore = clientsStore;
    this.clientsInitService = clientsInitService;
  }

  @action.bound async init(): Promise<void> {
    try {
      await this.clientsInitService.init();

      const models = this.clientsInitService.list.map<IClientModel>(item => {
        const model = new ClientModel(this.clientsStore, item.id);

        model.inn = item.inn;
        model.title = item.title;

        return model;
      });

      runInAction(() => {
        this.clientsStore.models = models;
      });
    } catch (e) {
      throw e;
    }
  }
}