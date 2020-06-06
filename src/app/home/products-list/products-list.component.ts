import { Component, OnInit, OnDestroy, ViewChild, AfterViewInit } from '@angular/core';
import { CatalogService } from '../services/catalog.service';
import { untilDestroyed } from 'ngx-take-until-destroy';
import { Products } from '../models/products.model';
import { NgxSpinnerService } from 'ngx-spinner';
import { MatPaginator } from '@angular/material/paginator';
import { startWith } from 'rxjs/operators';
import { Paginator } from '../models/paginator.model';

@Component({
  selector: 'app-services',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.css']
})
export class ServicesComponent implements OnInit, OnDestroy {

  products: Products[] = [];
  image: string;
  productItem = [];
  request = new Paginator();
  constructor(
    private catalogService: CatalogService,
    private spinner: NgxSpinnerService
  ) { }

  ngOnInit(): void {
    this.spinner.show();
    this.request.pageNumber = 1;
    this.request.pageSize = 10;
    this.catalogService.getProductByPaginator(this.request).pipe(untilDestroyed(this)).subscribe(products => {
      this.products = products;
      if (this.products) {
        // tslint:disable-next-line: no-shadowed-variable
        this.products.map((products, index) => {
          this.image = `https://kltn-resales.herokuapp.com/${products.image[0]}`;
          this.productItem.push({ product: products, image: products.image[0] ? this.image : '' });
        });
      }
    });
  }

  ngOnDestroy(): void { }

  public paginatorValue(paginator) {
    this.request.pageNumber = paginator.pageIndex;

    this.request.pageSize = 6;
    this.catalogService.getProductByPaginator(this.request).pipe(untilDestroyed(this)).subscribe(products => {


    });

  }

}
