import { AbstractInitService } from './AbstractInitService';
import { action, observable, runInAction } from 'mobx';
import DataLayer from '../../DataLayer';
import { IClientListItemData } from '../../DataLayer/modules/clients/interfaces';

export class ClientsInitService  extends AbstractInitService {
  @observable list: IClientListItemData[] = [];

  @action.bound protected async getData(): Promise<void> {
    try {
      const data = await DataLayer.getClientsListData();

      runInAction(() => {
        this.list = data;
      });
    } catch (e) {
      throw e;
    }
  }
}