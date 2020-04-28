import { createAction, props } from '@ngrx/store';

export const login = createAction(
  '[Authentication] login',
  props<{ email: string; password: string }>()
);

export const loginFailed = createAction(
  '[Authentication] Login Failed',
);

export const authenticated=createAction(
  '[Authenticated] Authenticated',
)
