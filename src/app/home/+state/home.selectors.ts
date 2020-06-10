import { createSelector } from '@ngrx/store';
import { HomeState } from './home.reducer';
import { AppState } from 'src/app/+state/app.state';

export const selectCatalogState = (state: AppState) => state.catalog;

export const selectProducts = createSelector(
  selectCatalogState,
  (state: HomeState) => state.products
);

export const selectParamsRouter = createSelector(
  selectCatalogState,
  (state: HomeState) => state.paramsNavigation
);
