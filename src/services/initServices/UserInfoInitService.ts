import { AbstractInitService } from './AbstractInitService';
import { action, observable, runInAction } from 'mobx';
import DataLayer from '../../DataLayer';
import { IUserData } from '../../DataLayer/modules/user/interfaces';

export class UserInfoInitService extends AbstractInitService {
  @observable userData: IUserData | null = null;

  @action.bound protected async getData(): Promise<void> {
    try {
      const data = await DataLayer.getUserData();

      runInAction(() => {
        this.userData = data;
      });
    } catch (e) {
      throw e;
    }
  }
}