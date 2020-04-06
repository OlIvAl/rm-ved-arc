import { IStoreWithCurrentModel } from '../stores/interfaces';
import { IClientModel } from './interfaces';
import AbstractModel from './AbstractModel';

export class ClientModel extends AbstractModel<IStoreWithCurrentModel<IClientModel>> implements IClientModel {
  title = '';
  inn = 0;
}
