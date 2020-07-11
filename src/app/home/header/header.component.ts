import { Component, OnInit, OnDestroy } from '@angular/core';
import { DialogMessageService } from 'src/app/core/services/dialog-message.service';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/+state/app.state';
import { logout } from 'src/app/authentication/+state/authentication.actions';
import { Router } from '@angular/router';
import { UserService } from 'src/app/core/services/user.service';
import { untilDestroyed } from 'ngx-take-until-destroy';
import { CustomerItem } from 'src/app/shared/models/user.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {

  account: CustomerItem;
  showBox = false;
  constructor(
    private dialogMessageService: DialogMessageService,
    private store: Store<AppState>,
    private router: Router,
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.account = this.userService.getAuth().user;
  }

  login() {
    this.router.navigateByUrl('/login');
  }

  logOut() {
    this.dialogMessageService.confirmMessage('Bạn có muốn đăng xuất?', () => {
      this.store.dispatch(logout({}));
    })
  }
  ngOnDestroy() { }
  showOption() {
    this.showBox = !this.showBox;
  }



}
