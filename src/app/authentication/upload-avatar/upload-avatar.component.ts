import { Component, OnInit, ElementRef, ViewChild, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { untilDestroyed } from 'ngx-take-until-destroy';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-upload-avatar',
  templateUrl: './upload-avatar.component.html',
  styleUrls: ['./upload-avatar.component.css']
})
export class UploadAvatarComponent implements OnInit, OnDestroy {

  idUser: string;
  @ViewChild('selectAvatarInput', { static: false }) selectAvatarInput: ElementRef;

  constructor(
    private router: Router,
    private httpClient: HttpClient,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.activatedRoute.queryParams.pipe(untilDestroyed(this)).subscribe(params => {
      this.idUser = params.id;
    })
  }

  ngOnDestroy(): void {}

  toHome() {
    this.router.navigateByUrl('/');
  }

  onSubmit() {
    const imgUrl = this.selectAvatarInput.nativeElement.files[0];
    const file = new FormData();
    file.set('avatar', imgUrl);
    this.httpClient.post(`http://localhost:6789/api/users/avatarNewUser/${this.idUser}`, file).subscribe(user => {
       Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Bạn đã đăng ký thành công vui lòng chờ xác nhận!',
        showConfirmButton: false,
        timer: 1500
      });
      setTimeout(() => { this.router.navigateByUrl('/');},1500)
    })
  }

}
