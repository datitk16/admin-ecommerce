import { login, loginFailed, authenticated } from './authentication.actions';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { UserService } from 'src/app/core/services/user.service';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/+state/app.state';
import { mergeMap, switchMap, tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Injectable()
export class AuthenticationEffect {

  login$ = createEffect(() => this.actions$.pipe(
    ofType(login),
    mergeMap(({ email, password }) => this.userService.login(email, password)),
    switchMap(result => {
      this.userService.setUser(result);
      if (result !== null) {
        return [
          authenticated()
        ]
      } else {
        return [loginFailed()];
      }
    })
  ));

  authenticated$ = createEffect(() => this.actions$.pipe(
    ofType(authenticated),
    tap(() => {
      this.router.navigateByUrl('/');
    }),
    switchMap(() => [

    ])
  ));

  loginFailed$ = createEffect(() => this.actions$.pipe(
    ofType(loginFailed),
    tap(() => {
      alert('Login failed');
    })
  ),
    { dispatch: false }
  );

  constructor(
    private userService: UserService,
    private actions$: Actions,
    private store: Store<AppState>,
    private router: Router,
    private cookieService: CookieService
  ) { }
}
