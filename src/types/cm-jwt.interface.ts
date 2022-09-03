import { JwtPayload } from 'jwt-decode';

export interface IJwtPayload extends JwtPayload {
  userID: string;
  email: string;
  groups: string[];
  name: string;
}
