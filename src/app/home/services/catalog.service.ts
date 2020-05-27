import { Injectable } from '@angular/core';
import { AppState } from 'src/app/+state/app.state';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Constants } from 'src/app/core/constants';
import { CategoriesLevel1 } from '../models/catalog-category-level1.models';

@Injectable({
  providedIn: 'root'
})
export class CatalogService {

  constructor(
    private httpClient: HttpClient,
  ) { }

  getCategories() {
    return this.httpClient.get<CategoriesLevel1[]>(Constants.BASE_API_URL + 'categoriesC1');
  }

}
