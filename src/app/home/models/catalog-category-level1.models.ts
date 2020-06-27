import { Type } from 'class-transformer';


export class CategoriesLevel1Item {
  _id: string;
  name: string;
  name_url: string;
  params_types: string;
  type: string;
  icon: string;
}

export class CategoriesLevel1 {
  @Type(() => CategoriesLevel1Item)
  items: Array<CategoriesLevel1Item>;
}
