import { Type } from 'class-transformer';

export class CustomerItem {
  _id ?: string;
  email: string;
  password: string;
  fullName: string;
  phoneNumber: string;
  userType?: string;
  avatar?: string;
  authenticate?: boolean;
}

export class Customers {
  @Type(() => CustomerItem)
  items: Array<CustomerItem>;
}
