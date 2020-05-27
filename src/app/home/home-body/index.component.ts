import { Component, OnInit, OnDestroy } from '@angular/core';
import { CatalogService } from '../services/catalog.service';
import { untilDestroyed } from 'ngx-take-until-destroy';
import { CategoriesLevel1 } from '../models/catalog-category-level1.models';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit, OnDestroy {

  public categoriesLevel1: CategoriesLevel1[];
  constructor(
    private catalogService: CatalogService,
  ) { }

  ngOnInit(): void {
    this.catalogService.getCategories().pipe(untilDestroyed(this)).subscribe(categories => {
      this.categoriesLevel1 = categories;
      console.log(this.categoriesLevel1)
    });
  }
  ngOnDestroy() { }

}
