import { AuthenticationState } from '../authentication/+state/authentication.reducer';
import { HomeState } from '../home/+state/home.reducer';

export interface AppState {
  authState: AuthenticationState;
  catalog: HomeState;
}
