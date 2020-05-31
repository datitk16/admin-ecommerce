import { Injectable } from '@angular/core';
import { AppState } from 'src/app/+state/app.state';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Constants } from 'src/app/core/constants';
import { CategoriesLevel1 } from '../models/catalog-category-level1.models';
import { CityParents } from '../models/city-parent';
import { Wards } from '../models/ward.models';

@Injectable({
  providedIn: 'root'
})
export class CatalogService {

  constructor(
    private httpClient: HttpClient,
  ) { }

  getCategories(): Observable<CategoriesLevel1[]> {
    return this.httpClient.get<CategoriesLevel1[]>(Constants.BASE_API_URL + 'categoriesC1');
  }

  getCity(): Observable<CityParents> {
    return this.httpClient.get<CityParents>('https://kltn-resales.herokuapp.com/api/address/city');
  }

  getWard(request: number): Observable<Wards[]> {
    return this.httpClient.post<Wards[]>('https://kltn-resales.herokuapp.com/api/address/ward', { cityID: request });
  }

}
