import { Action, createReducer, on } from '@ngrx/store';
import { loadAllProductByCategoriesLevel1, paramsRouterSelected } from './home.actions';
import { Products } from '../models/products.model';
import { Navigation } from '../models/catalog-navigation.model';


export interface HomeState {
  products: Products;
  paramsNavigation: Navigation;
}

const initialState: HomeState = {
  products: undefined,
  paramsNavigation: {
    catId: null,
    page: null,
    search: ''
  }
};

const homeReducer = createReducer(
  initialState,
  on(loadAllProductByCategoriesLevel1, (state, action) => ({
    ...state, products: {
      ...action, items: action.items
    }
  })),
  on(paramsRouterSelected, (state, action) => ({
    ...state,
    paramsNavigation: { ...action.paramsNavigation }
  })),
)

export function reducer(state: HomeState | undefined, action: Action) {
  return homeReducer(state, action);
}
