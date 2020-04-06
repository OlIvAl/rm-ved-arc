export interface IClientListItemData {
  id: ID;
  title: string;
  inn: number;
}

export interface IClientData extends IClientListItemData {

}

export interface IClientQueryParams {
  id: string;
}

export interface IClientsRequests {
  getClientData: (params: IClientQueryParams) => Promise<IClientData>;
  getClientsListData: () => Promise<IClientListItemData[]>;
}
