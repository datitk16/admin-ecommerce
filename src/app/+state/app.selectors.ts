import { createSelector } from '@ngrx/store';

import { AppState } from './app.state';

export const appState: (state: any) => AppState = state => state.app;

export const selectActivatedRouteData = createSelector(
    appState,
    (state: AppState) => state.activatedRouteData
);

