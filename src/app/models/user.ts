export interface User {
  id: number;
  firstName?: string;
  lastName?: string;
  username: string;
  email?: string,
  avatar?: string,
  gender?: string,
  phone?: string,
  birthday?: string,
  status?: boolean,
  createdAt?: number,
  modifiedAt?: number,
  accessToken:string,
  refreshToken:string
}
