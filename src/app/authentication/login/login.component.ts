import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/+state/app.state';
import { login } from '../+state/authentication.actions';
import { UserService } from 'src/app/core/services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  constructor(
    private store: Store<AppState>,
    private fb: FormBuilder,
    private router: Router
  ) { }

  ngOnInit(): void {

    this.loginForm = this.fb.group({
      email: '',
      password: '',
    });



  }
  onSubmit(result) {
    this.store.dispatch(login({
      email: result.email,
      password: result.password
    }));
  }

  toCreateUser() {
    this.router.navigateByUrl('/createUser');
  }

}
