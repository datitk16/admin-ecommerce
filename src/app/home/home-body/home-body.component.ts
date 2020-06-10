import { Component, OnInit, OnDestroy } from '@angular/core';
import { CatalogService } from '../services/catalog.service';
import { untilDestroyed } from 'ngx-take-until-destroy';
import { CategoriesLevel1 } from '../models/catalog-category-level1.models';
import { NgxSpinnerService } from "ngx-spinner";
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/+state/app.state';
import { loadProducts } from '../+state/home.actions';

@Component({
  selector: 'app-index',
  templateUrl: './home-body.component.html',
  styleUrls: ['./home-body.component.css']
})
export class IndexComponent implements OnInit, OnDestroy {

  public categoriesLevel1: CategoriesLevel1[];
  constructor(
    private catalogService: CatalogService,
    private spinner: NgxSpinnerService,
    private router: Router,
    private store: Store<AppState>
  ) { }

  ngOnInit(): void {
    this.spinner.show();

    this.catalogService.getCategories().pipe(untilDestroyed(this)).subscribe(categories => {
      this.categoriesLevel1 = categories;
    });

  }
  ngOnDestroy() { }

  // tslint:disable-next-line: variable-name
  getAllProductItem(category_id) {
    // this.catalogService.getAllProductByCategoriesLevel1({category_id}).pipe(untilDestroyed(this)).subscribe(products => {
    //   console.log(products);
    // });
    this.store.dispatch(loadProducts({ category_id }));
    return this.router.navigateByUrl(`/all-product/${category_id}`);
  }
}
