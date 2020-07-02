import { ProductItem } from './../models/products.model';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { untilDestroyed } from 'ngx-take-until-destroy';
import { ActivatedRoute } from '@angular/router';
import { ProductRequestById } from '../models/product-request.model';
import { CatalogService } from '../services/catalog.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { Gallery, GalleryItem, ImageItem } from 'ng-gallery';
import { Lightbox } from 'ng-gallery/lightbox';
import { CommentItem, Comments, RequestNewComment } from '../models/comment.modal';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-main-categories',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.css']
})
export class MainCategoriesComponent implements OnInit, OnDestroy {

  request = new ProductRequestById();
  product: ProductItem;
  items: GalleryItem[];
  imageData = data;
  comment: CommentItem[] = [];
  commentChildren: Comments;
  list = new Array(Comments);
  isComment = false;
  isView = false;
  commentForm: FormGroup;
  requestNewComment = new RequestNewComment();
  constructor(
    private activatedRoute: ActivatedRoute,
    private catalogService: CatalogService,
    private spinner: NgxSpinnerService,
    public gallery: Gallery,
    public lightbox: Lightbox,
    private fb: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.commentForm = this.fb.group({
      comment_id: '',
      body: '',
      tagUserName: ''
    })

    this.getAllComment();

    this.items = this.imageData.map(item => new ImageItem({ src: item.srcUrl, thumb: item.previewUrl }));
    this.spinner.show();
    this.activatedRoute.queryParams.pipe(untilDestroyed(this)).subscribe(params => {
      this.request.product_id = params.productId;
      this.catalogService.getProductItem(this.request).pipe(untilDestroyed(this)).subscribe(product => {
        this.product = product.items[0];
      });
    });
  }

  ngOnDestroy() { }

  getAllComment() {
    this.catalogService.getAllComment().subscribe(comment => {
      this.comment = comment.items;
    });
  }

  showForm() {
    this.isComment = !this.isComment;
  }

  viewComment(id) {
    this.isView = !this.isView;
    this.loadCommentChildren(id);
  }

  loadCommentChildren(idParent) {
    this.catalogService.getAddCommentChildren(idParent).subscribe(commentChildren => {
      console.log(commentChildren)
      this.commentChildren = commentChildren;
    })
  }

  onSubmit(value) {
    this.requestNewComment.body = value.body;
    this.requestNewComment.product_id = this.request.product_id;
    this.requestNewComment.comment_id = value.comment_id;
    this.requestNewComment.tagUserName = value.tagUserName;
    this.catalogService.createComment(this.requestNewComment).subscribe(() => {
      if (value.comment_id !== null) {
        this.isView = true;
        this.loadCommentChildren(value.comment_id);
      }
      else {
        this.getAllComment();
      }
    })

    this.commentForm.reset();
  }

  childrenReply(data, account_name) {
    this.isComment = true;
    this.commentForm.patchValue({ comment_id: data.comment_id })
    this.commentForm.patchValue({ tagUserName: account_name });

  }

  parentReply(data) {
    this.isComment = true;
    this.commentForm.patchValue({ comment_id: data._id });

  }

}

const data = [
  {
    srcUrl: 'https://preview.ibb.co/jrsA6R/img12.jpg',
    previewUrl: 'https://preview.ibb.co/jrsA6R/img12.jpg'
  },
  {
    srcUrl: 'https://preview.ibb.co/kPE1D6/clouds.jpg',
    previewUrl: 'https://preview.ibb.co/kPE1D6/clouds.jpg'
  },
  {
    srcUrl: 'https://preview.ibb.co/mwsA6R/img7.jpg',
    previewUrl: 'https://preview.ibb.co/mwsA6R/img7.jpg'
  },
  {
    srcUrl: 'https://preview.ibb.co/kZGsLm/img8.jpg',
    previewUrl: 'https://preview.ibb.co/kZGsLm/img8.jpg'
  }
];
