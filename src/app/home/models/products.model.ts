import { Type } from 'class-transformer';



export class ProductItem {
  _id: string;
  image: any;
  account_id: string;
  account_name: string;
  city_id: string;
  city_name: string;
  avatar: string;
  body: string;
  category_id: string;
  category_name: string;
  phone: string;
  price: number;
  price_string: string;
  reviewer_image: string;
  reviewer_nickname: string;
  subject: string;
  type_name: string;
  ward_name: string;
  ward_id: string;
  titleCity: string;
  titleWard: string;
  date: string;
  imageList: [{
    srcUrl: string;
    previewUrl: string;
  }];
}

export class Products {
  @Type(() => ProductItem)
  items: Array<ProductItem>;
}

export class SearchProductRequest {
  subject: string;
}


export class CreateProductRequest {
  category_id: string;
  category_id_2: string;
  city_id: string;
  ward_id: string;
  price: number;
  phone: string;
  body: string;
  subject: string;
}
