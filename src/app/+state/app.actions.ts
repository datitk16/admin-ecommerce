import { Data } from '@angular/router';
import { createAction, props } from '@ngrx/store';

export const routeDataChanged = createAction(
    '[App] Route Data Changed',
    props<{ data: Data }>()
);

export const createUserStatus = createAction(
  '[App] Create User',
  props<{ status:boolean }>()
);
