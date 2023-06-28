export enum Role {
  Admin = 'admin',
  User = 'user',
}

export interface User {
  username: string;
  email: string;
  role: Role;
}
