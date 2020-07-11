import { CustomerItem } from './user.model';
export interface Auth {
  user: CustomerItem;
  token: string;
}
