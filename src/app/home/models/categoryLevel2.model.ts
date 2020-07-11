import { Type } from 'class-transformer';

export class CategoryLevel2Item {
  _id: string;
  cateLeve1Id: string;
  name: string;
  name_url: string;
  params_types: string;
  type: string;
}

export class CategoryLevel2 {
  @Type(() => CategoryLevel2Item)
  items: Array<CategoryLevel2Item>;
}

export class CategoryLevel2Request {
  cateLeve1Id: string;
}
