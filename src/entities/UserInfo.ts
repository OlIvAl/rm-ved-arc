import { IUserData } from '../DataLayer/modules/user/interfaces';

export class UserInfo implements IUserData {
  id?: ID;
  // ToDo: refactor to enum
  role?: number;
}