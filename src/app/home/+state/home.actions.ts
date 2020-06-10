import { createAction, props } from '@ngrx/store';
import { ProductItem, Products } from '../models/products.model';
import { Paginator } from '../models/paginator.model';
import { ProductRequest } from '../models/product-request.model';
import { Navigation } from '../models/catalog-navigation.model';

export const loadProducts = createAction(
  '[Home] Load Products',
  props<ProductRequest>()
);

export const loadAllProductByCategoriesLevel1 = createAction(
  '[Home] Load All Products',
  props<Products>()
);

export const paramsRouterSelected = createAction(
  '[Home] Params Router Selected',
  props<{ paramsNavigation: Navigation }>()
);
