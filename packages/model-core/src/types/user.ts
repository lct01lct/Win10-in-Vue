export enum Role {
  Admin = 'admin',
  User = 'user',
}

export enum Role_CN {
  Admin = '管理员',
  User = '用户',
}

export interface User {
  _id: string;
  username: string;
  email: string;
  role: Role;
  avatar: string;
  wallpaper: string;
  downloadedAppIdList: string[];
}
