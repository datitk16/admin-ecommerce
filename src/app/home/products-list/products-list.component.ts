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
  request = new Paginator();
  constructor(
    private catalogService: CatalogService,
    private spinner: NgxSpinnerService
  ) { }

  ngOnInit(): void {
    this.spinner.show();
    // this.catalogService.getAllProductByCategoriesLevel1().pipe(untilDestroyed(this)).subscribe(products => {
    //   console.log(products);
    //   this.products = products;
    // });
  }

  ngOnDestroy(): void { }

  public paginatorValue(paginator) {

  }

}
