import { RouterDependencies } from '../../../index';
import { PluginFactory } from 'router5';
import { UserInfoInitService } from '../../../services/initServices/UserInfoInitService';
import { UserInfoState } from '../../../states/UserInfoState';

export const userInfoInitPlugin: PluginFactory<RouterDependencies> = (
  router,
  dependencies
) => {
  return {
    onStart: () => {
      if(!dependencies?.userInfo) {
        return;
      }

      const userInfoInitService = new UserInfoInitService();
      const userInfoState = new UserInfoState(dependencies.userInfo, userInfoInitService);

      userInfoState.init();
    }
  };
};
