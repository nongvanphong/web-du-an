export interface User {
  id: number;
  user_name?: string;
  phone?: string;
  password?: string;
  permission?: number | string;
  status?: number | string;
  image?: string;
  address?: string;
}
