import { Type } from 'class-transformer';

export class CommentItem {
  _id: string;
  account_id: string;
  account_name: string;
  comment_id: string;
  product_id: string;
  body: string;
  tagUserName: string;
  date: string;
  avatar:string;
}

export class Comments {
  @Type(() => CommentItem)
  items: Array<CommentItem>;
  comment_id: string;
}

export class RequestNewComment {
  comment_id: string;
  body: string;
  product_id: string;
  tagUserName: string;
}
