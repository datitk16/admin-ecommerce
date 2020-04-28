import { AppState } from './app.state';
import { createSelector } from '@ngrx/store';
import { AuthenticationState } from '../authentication/+state/authentication.reducer';


export const selectAuthState = (state: AppState) => state.authState;

export const selectAuthenticationState = createSelector(
  selectAuthState,
  (state: AuthenticationState) => state
)
