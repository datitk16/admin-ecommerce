import { ProductItem } from './../models/products.model';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { untilDestroyed } from 'ngx-take-until-destroy';
import { ActivatedRoute } from '@angular/router';
import { ProductRequestById } from '../models/product-request.model';
import { CatalogService } from '../services/catalog.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-main-categories',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.css']
})
export class MainCategoriesComponent implements OnInit, OnDestroy {

  request = new ProductRequestById();
  product :ProductItem;
  constructor(
    private activatedRoute: ActivatedRoute,
    private catalogService: CatalogService,
    private spinner: NgxSpinnerService,
  ) { }

  ngOnInit(): void {
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
