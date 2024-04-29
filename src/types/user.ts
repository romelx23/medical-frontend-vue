export interface IUserResponse {
  message: string;
  access_token: string;
  user: IUser;
  errors?: {
    email?: string[];
  };
}

export interface IRolesResponse {
  message: string;
  roles: IRole[];
}

export interface IUsersResponse {
  message: string;
  access_token: string;
  users: IUser[];
  page: number;
  limit: number;
  errors?: {
    email?: string[];
  };
}

export interface IUser {
  id: number;
  name: string;
  email: string;
  email_verified_at: string;
  role: string;
  created_at: string;
  updated_at: string;
}

export interface IRole {
  id: number;
  name: string;
}
