import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { mergeMap, switchMap, tap, throttleTime, map } from 'rxjs/operators';
import { Router, ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { CatalogService } from '../services/catalog.service';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/+state/app.state';
import { loadAllProductByCategoriesLevel1, loadProducts, paramsRouterSelected } from './home.actions';

@Injectable()
export class HomeEffects {
  loadProducts$ = createEffect(() => this.actions$.pipe(
    ofType(loadProducts),
    switchMap((request) =>
      this.catalogService.getAllProductByCategoriesLevel1(request).pipe(
        map(products => loadAllProductByCategoriesLevel1(products))
      )
    )
  )
  );

  paramsRouterSelected$ = createEffect(() =>
    this.actions$.pipe(
      ofType(paramsRouterSelected),
      switchMap(({ paramsNavigation }) => {
        this.navigationRouter(paramsNavigation.catId, paramsNavigation.page, paramsNavigation.search);
        return of(null);
      })
    ),
    { dispatch: false }
  );

  private navigationRouter(catId, page, search) {

    this.router.navigate([], {
      relativeTo: this.activatedRoute,
      queryParams: {
        catId: catId ? catId : 0,
        page: page ? page : 1
      },
      queryParamsHandling: ''
    });
  }

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router, private actions$: Actions,
    private store$: Store<AppState>, private catalogService: CatalogService,
  ) { }
}

