import FetchHelpers from '../../../libs/FetchHelpers';
import { IClientData, IClientListItemData, IClientQueryParams } from './interfaces';

export class ClientsRequests {
  static async getClientsListData(): Promise<IClientListItemData[]> {
    return await FetchHelpers.getJSON<IClientListItemData[]>(
      '/data/clients.json'
    );
  };
  static async getClientData(params: IClientQueryParams): Promise<IClientData> {
    return await FetchHelpers.getJSON<IClientData>(
      '/data/client.json'
    );
  };
}
