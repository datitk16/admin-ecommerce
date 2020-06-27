import { Component, OnInit, OnDestroy } from '@angular/core';
import { untilDestroyed } from 'ngx-take-until-destroy';
import { ProductItem, Products } from '../models/products.model';
import { NgxSpinnerService } from 'ngx-spinner';
import { Paginator } from '../models/paginator.model';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/+state/app.state';
import { Router, ActivatedRoute } from '@angular/router';
import { CatalogService } from '../services/catalog.service';
import { ProductRequest } from '../models/product-request.model';
import { paramsRouterSelected } from '../+state/home.actions';

@Component({
  selector: 'app-services',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.css']
})
export class ServicesComponent implements OnInit, OnDestroy {

  products: ProductItem[] = [];
  image: string;
  request = new ProductRequest();
  constructor(
    private spinner: NgxSpinnerService,
    private store: Store<AppState>,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private catalogService: CatalogService
  ) { }

  ngOnInit(): void {
    this.spinner.show();
    this.activatedRoute.queryParams.pipe(untilDestroyed(this)).subscribe(params => {
      this.request.category_id = params.cateId;
      this.catalogService.getAllProductByCategoriesLevel1(this.request).pipe(untilDestroyed(this)).subscribe(products => {
        if (products !== undefined && products) {
          this.products = products.items;
        }
      });
    });

  }

  ngOnDestroy(): void { }

  public paginatorValue(paginator) {

  }

  viewDetail(productId) {
    this.router.navigate(['/products/detail'], { queryParams: { productId: productId }, relativeTo: this.activatedRoute },);
  }
}
