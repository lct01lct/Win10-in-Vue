export enum Role {
  Admin = 'admin',
  User = 'user',
}

export interface User {
  _id: string;
  username: string;
  email: string;
  role: Role;
  avatar: string;
}
