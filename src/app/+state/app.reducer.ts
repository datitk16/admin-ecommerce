import { Action, createReducer, on } from '@ngrx/store';

import { routeDataChanged, createUserStatus } from './app.actions';
import { AppState } from './app.state';

const initialState: AppState = {
  activatedRouteData: undefined,
  previousUrl: '',
  pageTitle: '',
  inboxCount: 0,
};

const authenticationReducer = createReducer(
  initialState,
  on(routeDataChanged, (state, action) => ({
    ...state,
    activatedRouteData: action.data,
  })),

);

export function reducer(state: AppState | undefined, action: Action) {
  return authenticationReducer(state, action);
}
