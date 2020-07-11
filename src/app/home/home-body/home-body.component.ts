import { CategoriesLevel1Item } from './../models/catalog-category-level1.models';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { CatalogService } from '../services/catalog.service';
import { untilDestroyed } from 'ngx-take-until-destroy';
import { CategoriesLevel1 } from '../models/catalog-category-level1.models';
import { NgxSpinnerService } from "ngx-spinner";
import { Router, ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/+state/app.state';
import { loadProducts } from '../+state/home.actions';

@Component({
  selector: 'app-index',
  templateUrl: './home-body.component.html',
  styleUrls: ['./home-body.component.css']
})
export class IndexComponent implements OnInit, OnDestroy {

  public categoriesLevel1: CategoriesLevel1Item[] = [];
  constructor(
    private catalogService: CatalogService,
    private spinner: NgxSpinnerService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.spinner.show();

    this.catalogService.getCategories().subscribe(categories => {
      this.categoriesLevel1 = categories.items;
    });

  }
  ngOnDestroy() { }

  getAllProductItem(category_id) {
    // this.store.dispatch(loadProducts({ category_id }));
    this.router.navigate(['/products'], {
      queryParams: { cateId: category_id },
      relativeTo: this.activatedRoute
    });
    // return this.router.navigateByUrl(`/all-product/${category_id}`);
  }
}
