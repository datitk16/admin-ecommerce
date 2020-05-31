import { Component, OnInit, OnDestroy } from '@angular/core';
import { CatalogService } from '../services/catalog.service';
import { untilDestroyed } from 'ngx-take-until-destroy';
import { CategoriesLevel1 } from '../models/catalog-category-level1.models';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-index',
  templateUrl: './home-body.component.html',
  styleUrls: ['./home-body.component.css']
})
export class IndexComponent implements OnInit, OnDestroy {

  public categoriesLevel1: CategoriesLevel1[];
  constructor(
    private catalogService: CatalogService,
    private spinner: NgxSpinnerService
  ) { }

  ngOnInit(): void {
    this.spinner.show();

    this.catalogService.getCategories().pipe(untilDestroyed(this)).subscribe(categories => {
      this.categoriesLevel1 = categories;
    });

  }
  ngOnDestroy() { }

}
