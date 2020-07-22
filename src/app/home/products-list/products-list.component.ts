import { SearchProductRequest } from './../models/products.model';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { untilDestroyed } from 'ngx-take-until-destroy';
import { ProductItem } from '../models/products.model';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router, ActivatedRoute } from '@angular/router';
import { CatalogService } from '../services/catalog.service';
import { ProductRequest } from '../models/product-request.model';

@Component({
  selector: 'app-services',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.css']
})
export class ServicesComponent implements OnInit, OnDestroy {

  products: ProductItem[] = [];
  image: string;
  request = new ProductRequest();
  loadedSpinner = false;
  cityId: number = 4;
  address: [];
  nameCategory: string;
  private searchProductRequest = new SearchProductRequest();
  constructor(
    private spinner: NgxSpinnerService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private catalogService: CatalogService
  ) { }

  ngOnInit(): void {

    this.spinner.show();
    this.activatedRoute.queryParams.pipe(untilDestroyed(this)).subscribe(params => {
      this.nameCategory = params.name;
      if (params.cateId) {
        this.request.category_id = params.cateId;
        this.catalogService.getAllProductByCategoriesLevel1(this.request).pipe(untilDestroyed(this)).subscribe(products => {
          products.items.map((value, index) => {
            this.catalogService.getWardById(value.ward_id).subscribe(ward => {
              if (value.ward_id == ward.ID) {
                value.titleCity = ward.TinhThanhTitle;
                value.titleWard = ward.Title;
                this.products.push(value);
              }
            });
          });
        });
      }
      if (params.keyword) {
        this.searchProductRequest.subject = params.keyword;
        this.catalogService.searchProduct(this.searchProductRequest).subscribe(products => {
          this.products = products.items;
        });
      }
      setTimeout(() => {
        this.loadedSpinner = true;
      }, 1000);

    });
  }

  ngOnDestroy(): void { }

  public paginatorValue(paginator) {

  }

  viewDetail(productId, wardID) {
    this.router.navigate(['/products/detail'], { queryParams: { productId, wardID }, relativeTo: this.activatedRoute },);
  }

  receiveProduct(products) {
    this.nameCategory = "Tìm kiếm";
    this.products = []
    products.items.map((value, index) => {
      this.catalogService.getWardById(value.ward_id).subscribe(ward => {
        if (value.ward_id == ward.ID) {
          value.titleCity = ward.TinhThanhTitle;
          value.titleWard = ward.Title;
          this.products.push(value);
        }
      });
    });
  }

  sortByPrice(value) {
    this.products = [];
    if (value == 1) {
      this.catalogService.sortProductLowToHight( this.request.category_id).subscribe(products => {
        this.products = products.items;
      })
    }
    if(value==2){
      this.catalogService.sortProductHightToLow( this.request.category_id).subscribe(products => {
        this.products = products.items;
      })
    }

  }
}
