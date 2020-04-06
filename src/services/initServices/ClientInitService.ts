import { AbstractInitService } from './AbstractInitService';
import { action, observable, runInAction } from 'mobx';
import DataLayer from '../../DataLayer';
import { IClientListItemData, IClientQueryParams } from '../../DataLayer/modules/clients/interfaces';

export class ClientInitService extends AbstractInitService<IClientQueryParams> {
  @observable item: IClientListItemData | null = null;

  @action.bound protected async getData(params: IClientQueryParams): Promise<void> {
    try {
      const data = await DataLayer.getClientData(params);

      runInAction(() => {
        this.item = data;
      });
    } catch (e) {
      throw e;
    }
  }
}