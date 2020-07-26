import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { untilDestroyed } from 'ngx-take-until-destroy';
import { CustomerItem } from 'src/app/shared/models/user.model';
import { CatalogService } from 'src/app/home/services/catalog.service';
import { ProductItem } from 'src/app/home/models/products.model';
import { DialogMessageService } from 'src/app/core/services/dialog-message.service';
import Swal from 'sweetalert2';
import { selectActivatedRouteData } from 'src/app/+state/app.selectors';
import { AppState } from 'src/app/+state/app.state';
import { Store } from '@ngrx/store';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-profile-user',
  templateUrl: './profile-user.component.html',
  styleUrls: ['./profile-user.component.css']
})
export class ProfileUserComponent implements OnInit, OnDestroy {

  user: CustomerItem;
  products: ProductItem[] = [];
  userId: string;
  roleAccessProfile: boolean;
  constructor(
    private httpClient: HttpClient,
    private activatedRoute: ActivatedRoute,
    private catalogService: CatalogService,
    private router: Router,
    private dialogMessageService: DialogMessageService,
    private store: Store<AppState>,
    private spinner: NgxSpinnerService,
  ) { }

  ngOnInit(): void {
    this.spinner.show();
    this.store.select(selectActivatedRouteData).pipe(untilDestroyed(this)).subscribe(data => {
      if (data) {
        this.roleAccessProfile = data.roleAccessProfile;
      }
    });

    this.activatedRoute.queryParams.pipe(untilDestroyed(this)).subscribe(params => {
      this.userId = params.id;
      this.httpClient.post(`http://localhost:6789/api/users/getUserById/${params.id}`, null).subscribe((user: CustomerItem) => {
        setTimeout(() => {
          this.user = user;
        }, 1500)

      });
      this.catalogService.getProductByAccountId(params.id).subscribe(products => {
        products.items.map((value, index) => {
          this.catalogService.getWardById(value.ward_id).subscribe(ward => {
            if (value.ward_id == ward.ID) {
              value.titleCity = ward.TinhThanhTitle;
              value.titleWard = ward.Title;
              this.products.push(value);
            }
          });
        });
      });
    });



  }




  ngOnDestroy(): void { }

  viewDetail(productId, wardID) {
    this.router.navigate(['/products/detail'], { queryParams: { productId, wardID }, relativeTo: this.activatedRoute },);
  }

  deleteProduct(id) {
    this.dialogMessageService.showConfirmButton('Thông báo!', 'Bạn muốn xóa sản phẩm này').then((result) => {
      if (result.value) {
        this.catalogService.deleteProduct(id).subscribe(res => {
          Swal.fire(
            'Đã xóa!',
            'Bạn đã xóa thành công.',
            'success'
          );
          window.location.reload();
        });
      }
    })
  }

  updateUser() {
    this.router.navigate(['/updateUser'], { queryParams: { idUser: this.userId } });
  }

}
