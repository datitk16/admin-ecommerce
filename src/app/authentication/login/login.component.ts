import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/+state/app.state';
import { UserService } from 'src/app/core/services/user.service';
import { Router } from '@angular/router';
import { DialogMessageService } from 'src/app/core/services/dialog-message.service';

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
    private router: Router,
    private userService: UserService,
    private dialogMessageService: DialogMessageService
  ) { }

  ngOnInit(): void {

    this.loginForm = this.fb.group({
      email: '',
      password: '',
    });
  }
  onSubmit(result) {
    this.userService.login(result.email, result.password).subscribe(user => {
      this.userService.setAuth(user);
      this.router.navigateByUrl('/');
      this.dialogMessageService.showInfoMessageSuccess('Thông báo', 'Đăng nhập thành công!');
    },
      err => {
        if (err.error.status === 304) {
          this.dialogMessageService.showInfoMessageErr('Thông báo', 'Vui lòng chờ quản trị xác nhận!')
        }
        else {
          this.dialogMessageService.showInfoMessageErr('Thông báo', 'Tài khoản hoặc mật khẩu không chính xác!');
        }

      });
  }

  toCreateUser() {
    this.router.navigateByUrl('/createUser');
  }

}
