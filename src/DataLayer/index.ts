import { ActionsRequests } from './modules/actions/requests';
import { IArticlesRequests } from './modules/articles/interfaces';
import { ClientsRequests } from './modules/clients/requests';
import { UserRequests } from './modules/user/requests';
import { IClientsRequests } from './modules/clients/interfaces';
import { IUserRequests } from './modules/user/interfaces';

function applyMixins(derivedCtor: any, baseCtors: any[]) {
  baseCtors.forEach(baseCtor => {
    Object.getOwnPropertyNames(baseCtor.prototype).forEach(name => {
      // @ts-ignore
      Object.defineProperty(derivedCtor.prototype, name, Object.getOwnPropertyDescriptor(baseCtor.prototype, name));
    });
  });
}

interface IDataLayer extends IClientsRequests, IArticlesRequests, IUserRequests {}

class DataLayer {}

export default (applyMixins(DataLayer, [ActionsRequests, ClientsRequests, UserRequests]) as unknown) as IDataLayer;
