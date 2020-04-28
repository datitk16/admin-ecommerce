import { Auth } from 'src/app/shared/models/result-login.model';
import { Action, createReducer, on } from '@ngrx/store';
import { authenticated } from './authentication.actions';

export interface AuthenticationState {
  isAuthenticated: boolean;
  auth: Auth;
}

const initialState: AuthenticationState = {
  isAuthenticated: false,
  auth: null
};
const authenticationReducer = createReducer(
  initialState,
  on(authenticated, (state) => ({
    ...state,
    isAuthenticated: true
  }))
);

export function reducer(state: AuthenticationState | undefined, action: Action) {
  return authenticationReducer(state, action);
}
