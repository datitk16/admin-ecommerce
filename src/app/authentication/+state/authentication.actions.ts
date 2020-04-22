import { createAction, props } from '@ngrx/store';

export const login = createAction(
  '[Authentication] login',
  props<{ email: string; password: string }>()
)
