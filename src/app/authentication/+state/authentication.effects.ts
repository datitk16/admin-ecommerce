import { login, loginFailed, authenticated, logout } from './authentication.actions';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { UserService } from 'src/app/core/services/user.service';
import { mergeMap, switchMap, tap, throttleTime } from 'rxjs/operators';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import Swal from 'sweetalert2';

@Injectable()
export class AuthenticationEffect {

  login$ = createEffect(() => this.actions$.pipe(
    ofType(login),
    mergeMap(({ email, password }) => this.userService.login(email, password)),
    switchMap(result => {
      if (result.token) {
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Đănh nhập thành công!',
          showConfirmButton: false,
          timer: 1500
        });
        this.userService.setAuth(result);
        return [authenticated()];
      }
      else{

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

  logout$ = createEffect(() => this.actions$.pipe(
    ofType(logout),
    throttleTime(1000),
    switchMap(({ showMessage }) => {
      this.userService.logout(showMessage);
      return of(null);
    })
  ), { dispatch: false })

  constructor(
    private userService: UserService,
    private actions$: Actions,
    private router: Router,
  ) { }
}

