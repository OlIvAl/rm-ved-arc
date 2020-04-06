import FetchHelpers from '../../../libs/FetchHelpers';
import { IUserData } from './interfaces';

export class UserRequests {
  static async getUserData(): Promise<IUserData> {
    return await FetchHelpers.getJSON<IUserData>(
      '/data/user.json'
    );
  };
}
