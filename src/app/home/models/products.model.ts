import { Type } from 'class-transformer';

export class ProductItem {
  image: any;
  // tslint:disable-next-line: variable-name
  account_id: string;
  // tslint:disable-next-line: variable-name
  account_name: string;
  // tslint:disable-next-line: variable-name
  city_id: string;
  // tslint:disable-next-line: variable-name
  city_name: string;
  avatar: string;
  body: string;
  // tslint:disable-next-line: variable-name
  category_id: number;
  // tslint:disable-next-line: variable-name
  category_name: string;
  phone: string;
  // tslint:disable-next-line: variable-name
  price: number;
  // tslint:disable-next-line: variable-name
  price_string: string;
  // tslint:disable-next-line: variable-name
  reviewer_image: string;
  // tslint:disable-next-line: variable-name
  reviewer_nickname: string;
  subject: string;
  // tslint:disable-next-line: variable-name
  type_name: string;
  // tslint:disable-next-line: variable-name
  ward_name: string;
}

export class Products {
  @Type(() => ProductItem)
  items: Array<ProductItem>;
}
