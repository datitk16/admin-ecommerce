import { ProductItem } from './../models/products.model';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { untilDestroyed } from 'ngx-take-until-destroy';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductRequestById } from '../models/product-request.model';
import { CatalogService } from '../services/catalog.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { Gallery, GalleryItem, ImageItem } from 'ng-gallery';
import { Lightbox } from 'ng-gallery/lightbox';
import { CommentItem, Comments, RequestNewComment } from '../models/comment.modal';
import { FormGroup, FormBuilder } from '@angular/forms';
import { UserService } from 'src/app/core/services/user.service';
import { CustomerItem } from 'src/app/shared/models/user.model';
import { HttpClient } from '@angular/common/http';
import { CategoriesLevel1Item } from '../models/catalog-category-level1.models';
import { DialogMessageService } from 'src/app/core/services/dialog-message.service';

@Component({
  selector: 'app-main-categories',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.css']
})
export class MainCategoriesComponent implements OnInit, OnDestroy {

  request = new ProductRequestById();
  product: ProductItem;
  galleryItem: GalleryItem[];
  imageData = data;
  comment: CommentItem[] = [];
  commentChildren: Comments;
  list = new Array(Comments);
  isComment = false;
  isView = false;
  commentForm: FormGroup;
  customerItem: CustomerItem;
  requestNewComment = new RequestNewComment();
  cityName: string;
  wardName: string;
  category_id: string;
  categoryName: string;
  constructor(
    private activatedRoute: ActivatedRoute,
    private catalogService: CatalogService,
    private spinner: NgxSpinnerService,
    public gallery: Gallery,
    public lightbox: Lightbox,
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router,
    private httpClient: HttpClient,
    private dialogMessageService: DialogMessageService
  ) { }

  ngOnInit(): void {
    this.commentForm = this.fb.group({
      comment_id: '',
      body: '',
      tagUserName: ''
    });

    this.getAllComment();
    this.spinner.show();
    this.activatedRoute.queryParams.pipe(untilDestroyed(this)).subscribe(params => {




      this.request.product_id = params.productId;
      this.catalogService.getProductItem(this.request).pipe(untilDestroyed(this)).subscribe(product => {
        this.category_id = product.items[0].category_id;
        this.httpClient.post('http://localhost:6789/api/categoriesC1/getCategoryLevel1ById', { id: this.category_id }).subscribe((category: CategoriesLevel1Item) => {
          this.categoryName = category.name;
        });

        this.galleryItem = product.items[0].imageList.map(item => new ImageItem({ src: item.srcUrl, thumb: item.previewUrl }));
        this.catalogService.getCustomerById(product.items[0].account_id).subscribe(customer => {
          this.customerItem = customer;
        });
        setTimeout(() => {
          this.product = product.items[0];
        }, 1500);
      });
      this.catalogService.getWardById(params.wardID).subscribe(ward => {
        this.cityName = ward.TinhThanhTitle;
        this.wardName = ward.Title;
        console.log(ward);
      });
      //ward

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
    if (!this.userService.getToken) {
      this.dialogMessageService.showInfoMessage('Thông báo', 'Vui lòng đăng nhập!');
      this.router.navigateByUrl('/login');
    }

  }

  viewComment(id) {
    this.isView = !this.isView;
    this.loadCommentChildren(id);
  }

  loadCommentChildren(idParent) {
    this.catalogService.getAddCommentChildren(idParent).subscribe(commentChildren => {
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
    if (this.userService.getToken) {
      this.isComment = true;
      this.commentForm.patchValue({ comment_id: data.comment_id })
      this.commentForm.patchValue({ tagUserName: account_name });
    }
    else {
      this.router.navigateByUrl('/login');
    }
  }

  parentReply(data) {
    if (this.userService.getToken) {
      this.isComment = true;
      this.commentForm.patchValue({ comment_id: data._id });
    }
    else {
      this.router.navigateByUrl('/login');
    }
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
