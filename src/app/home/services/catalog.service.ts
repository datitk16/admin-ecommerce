import { ProductItem, SearchProductRequest, CreateProductRequest, Products } from './../models/products.model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Constants } from 'src/app/core/constants';
import { CategoriesLevel1 } from '../models/catalog-category-level1.models';
import { CityParents } from '../models/city-parent.model';
import { Wards } from '../models/ward.models';
import { Paginator } from '../models/paginator.model';
import { ProductRequest, ProductRequestById } from '../models/product-request.model';
import { Comments, RequestNewComment } from '../models/comment.modal';
import { CategoryLevel2, CategoryLevel2Request } from '../models/categoryLevel2.model';
import { Customers, CustomerItem } from 'src/app/shared/models/user.model';

@Injectable({
  providedIn: 'root'
})
export class CatalogService {

  constructor(
    private httpClient: HttpClient,
  ) { }

  getCategories(): Observable<CategoriesLevel1> {
    return this.httpClient.get<CategoriesLevel1>(Constants.BASE_API_URL + 'categoriesC1');
  }

  getCategoryLevel2(request: CategoryLevel2Request): Observable<CategoryLevel2> {
    return this.httpClient.post<CategoryLevel2>(Constants.BASE_API_URL + 'categoriesC2' + '/categoriesLevel2ByLevel1Id', request);
  }

  getCity(): Observable<CityParents> {
    return this.httpClient.get<CityParents>('https://kltn-resales.herokuapp.com/api/address/city');
  }

  getWard(request: number): Observable<Wards[]> {
    return this.httpClient.post<Wards[]>('https://kltn-resales.herokuapp.com/api/address/ward', { cityID: request });
  }

  getAllProductByCategoriesLevel1(request: ProductRequest): Observable<Products> {
    return this.httpClient.post<Products>(Constants.BASE_API_URL + 'products/all', request);
  }

  getProductItem(request: ProductRequestById): Observable<Products> {
    return this.httpClient.post<Products>(Constants.BASE_API_URL + 'products/item', request);
  }

  getProductByPaginator(request: Paginator): Observable<ProductItem[]> {
    return this.httpClient.post<ProductItem[]>(Constants.BASE_API_URL + 'products/pagination', request);
  }

  getAllComment(): Observable<Comments> {
    return this.httpClient.get<Comments>(Constants.BASE_API_URL + 'comment');
  }

  getAddCommentChildren(request: String): Observable<Comments> {
    return this.httpClient.post<Comments>(Constants.BASE_API_URL + 'commentChildren/getCommentChildren', { comment_id: request });
  }

  createComment(request: RequestNewComment): Observable<Comments> {
    return this.httpClient.post<Comments>(Constants.BASE_API_URL + 'comment', request);
  }

  public searchProduct(request: SearchProductRequest): Observable<Products> {
    return this.httpClient.post<Products>(Constants.BASE_API_URL + 'products/search', request);
  }

  public createProduct(request: CreateProductRequest): Observable<ProductItem> {
    return this.httpClient.post<ProductItem>(Constants.BASE_API_URL + 'products', request);
  }

  /**USER */

  public createCustomer(request: CustomerItem): Observable<CustomerItem> {
    return this.httpClient.post<CustomerItem>(Constants.BASE_API_URL + 'users', request);
  }

  public getCustomerById(request: string): Observable<CustomerItem> {
    return this.httpClient.post<CustomerItem>(Constants.BASE_API_URL + 'users/userInfo', { id: request });
  }

  public uploadImageArrProduct(id: string, imageUrl: string): Observable<CustomerItem> {
    return this.httpClient.post<CustomerItem>(Constants.BASE_API_URL + `products/uploadImageArr/${id}`, { id, imageUrl });
  }

  public getCityById(request: string): Observable<any> {
    return this.httpClient.post<any>(Constants.BASE_API_URL + 'address/getCityById', { cityID: request });
  }

  public getWardById(request: string): Observable<any> {
    return this.httpClient.post<any>(Constants.BASE_API_URL + 'address/getWardById', { wardID: request });
  }

  public filterProduct(city_id: string, ward_id: string, category_id: string): Observable<Products> {
    return this.httpClient.post<any>(Constants.BASE_API_URL + 'products/filterProduct', { city_id, ward_id, category_id });
  }

  public sortProductLowToHight(category_id: string): Observable<Products> {
    return this.httpClient.post<any>(Constants.BASE_API_URL + 'products/sortLowPriceToHightPrice', { category_id });
  }

  public sortProductHightToLow(category_id: string): Observable<Products> {
    return this.httpClient.post<any>(Constants.BASE_API_URL + 'products/sortHightPriceToLowPrice', { category_id });
  }


}
