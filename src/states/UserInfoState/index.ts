import { action, computed, runInAction } from 'mobx';
import { IUserData } from '../../DataLayer/modules/user/interfaces';
import { UserInfoInitService } from '../../services/initServices/UserInfoInitService';

export class UserInfoState {
  @computed loading(): boolean {
    return this.userInfoInitService.loading;
  }

  private userInfo: IUserData;
  private userInfoInitService: UserInfoInitService;
  constructor(userInfo: IUserData, userInfoInitService: UserInfoInitService) {
    this.userInfo = userInfo;
    this.userInfoInitService = userInfoInitService;
  }

  @action.bound async init(): Promise<void> {
    try {
      await this.userInfoInitService.init();

      runInAction(() => {
        if (this.userInfoInitService.userData) {
          this.userInfo.id = this.userInfoInitService.userData.id;
          this.userInfo.role = this.userInfoInitService.userData.role;
        }
      });
    } catch (e) {
      throw e;
    }
  }
}
