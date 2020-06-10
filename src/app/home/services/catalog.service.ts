import { ProductItem, Products } from './../models/products.model';
import { Injectable } from '@angular/core';
import { AppState } from 'src/app/+state/app.state';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Constants } from 'src/app/core/constants';
import { CategoriesLevel1 } from '../models/catalog-category-level1.models';
import { CityParents } from '../models/city-parent.model';
import { Wards } from '../models/ward.models';
import { Paginator } from '../models/paginator.model';
import { ProductRequest } from '../models/product-request.model';

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

  getAllProductByCategoriesLevel1(request: ProductRequest): Observable<Products> {
    console.log(request)
    return this.httpClient.post<Products>(Constants.BASE_API_URL + 'products/all', request);
  }

  getProductByPaginator(request: Paginator): Observable<ProductItem[]> {
    return this.httpClient.post<ProductItem[]>(Constants.BASE_API_URL + 'products/pagination', request);
  }

}
