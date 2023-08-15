export interface User {
  id: number;
  user_name?: string;
  phone?: string;
  password?: string;
  permission?: number | string;
  status?: number | string;
  refresh_token?: string;
  accessToken?: string;
  image?: string;
}
