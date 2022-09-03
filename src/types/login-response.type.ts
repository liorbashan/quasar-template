export type LoginData = {
  user?: LoginDataUser;
  error?: string;
  message?: string;
  statusCode?: number;
  access_token?: string;
};

export type LoginDataUser = {
  displayName: string;
  email: string;
  roles: string[];
};
