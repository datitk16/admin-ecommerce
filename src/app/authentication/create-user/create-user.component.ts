import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { FormGroup, FormBuilder } from '@angular/forms';
import { CatalogService } from 'src/app/home/services/catalog.service';
import { CustomerItem } from 'src/app/shared/models/user.model';
import { Store } from '@ngrx/store';
import { AppState } from '../../../app/+state/app.state';
import { untilDestroyed } from 'ngx-take-until-destroy';
import { selectActivatedRouteData } from '../../+state/app.selectors';
import { routeDataChanged } from '../../../app/+state/app.actions';
import { HttpClient } from '@angular/common/http';
import { UserService } from 'src/app/core/services/user.service';
import { DialogMessageService } from 'src/app/core/services/dialog-message.service';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css']
})
export class CreateUserComponent implements OnInit, OnDestroy {


  createUserForm: FormGroup;
  pageUser: boolean = true;
  requestUser = new CustomerItem();
  user: CustomerItem;
  constructor(
    private router: Router,
    private fb: FormBuilder,
    private catalogService: CatalogService,
    private activatedRoute: ActivatedRoute,
    private store: Store<AppState>,
    private httpClient: HttpClient,
    private userService: UserService,
    private dialogMessageService: DialogMessageService
  ) { }

  ngOnInit(): void {
    this.activatedRoute.queryParams.pipe(untilDestroyed(this)).subscribe(params => {
      if (params.idUser) {
        this.httpClient.post(`http://localhost:6789/api/users/getUserById/${params.idUser}`, null).subscribe((user: CustomerItem) => {
          this.user = user;
        });
      }
    });

    this.createUserForm = this.fb.group({
      email: '',
      password: '',
      fullName: '',
      phoneNumber: '',
    });

    this.store.select(selectActivatedRouteData).pipe(untilDestroyed(this)).subscribe(data => {
      if (data) {
        this.pageUser = data.pageUpdateUser;
      }
    });

  }

  ngOnDestroy() { }

  submitForm(user) {
    if (this.pageUser) {
      this.userService.editProfileUser(user.password, user.fullName, user.phoneNumber).subscribe(user => {
        this.dialogMessageService.showInfoMessageSuccess('Thông báo', 'Cập nhật thông tin thành công!');
      })
    }
    else {
      this.requestUser = user;
      this.catalogService.createCustomer(this.requestUser).subscribe(user => {
        this.router.navigate(['/createUser/uploadAvatar'], { queryParams: { id: user._id }, relativeTo: this.activatedRoute });
      });
    }

  }

  toHome() {
    this.router.navigateByUrl('/');
  }

}
