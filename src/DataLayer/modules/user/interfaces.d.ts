export interface IUserData {
  id?: ID;
  role?: number;
}

export interface IUserRequests {
  getUserData: () => Promise<IUserData>;
}
