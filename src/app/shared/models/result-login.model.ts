import { User } from './user.model';
export interface Auth {
  user: User;
  token: string;
}
