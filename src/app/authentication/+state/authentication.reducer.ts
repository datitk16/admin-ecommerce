import { Action, createReducer, on } from '@ngrx/store';
import { Customer } from 'src/app/shared/models/Customer.model';

export interface AuthenticationState {
  isAuthenticated: boolean;
  customer: Customer;
}

const initialState: AuthenticationState = {
  isAuthenticated: false,
  customer: null
}

