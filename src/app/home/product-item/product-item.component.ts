import { ProductItem } from './../models/products.model';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { untilDestroyed } from 'ngx-take-until-destroy';
import { ActivatedRoute } from '@angular/router';
import { ProductRequestById } from '../models/product-request.model';
import { CatalogService } from '../services/catalog.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { Gallery, GalleryItem, ImageItem } from 'ng-gallery';
import { Lightbox } from 'ng-gallery/lightbox';

@Component({
  selector: 'app-main-categories',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.css']
})
export class MainCategoriesComponent implements OnInit, OnDestroy {

  request = new ProductRequestById();
  product :ProductItem;
  items: GalleryItem[];
  imageData = data;

  constructor(
    private activatedRoute: ActivatedRoute,
    private catalogService: CatalogService,
    private spinner: NgxSpinnerService,
    public gallery: Gallery,
     public lightbox: Lightbox
  ) { }

  ngOnInit(): void {

    this.items = this.imageData.map(item => new ImageItem({ src: item.srcUrl, thumb: item.previewUrl }));

    this.spinner.show();
    this.activatedRoute.queryParams.pipe(untilDestroyed(this)).subscribe(params => {
      console.log(params);
      this.request.product_id = params.productId;
      this.catalogService.getProductItem(this.request).pipe(untilDestroyed(this)).subscribe(product => {
        this.product = product.items[0];
      });
    });
  }

  ngOnDestroy() { }
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
