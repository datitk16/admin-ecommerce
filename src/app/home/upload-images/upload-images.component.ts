import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { untilDestroyed } from 'ngx-take-until-destroy';
import { CatalogService } from '../services/catalog.service';
import Swal from 'sweetalert2';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-upload-images',
  templateUrl: './upload-images.component.html',
  styleUrls: ['./upload-images.component.css']
})
export class UploadImagesComponent implements OnInit, OnDestroy {

  id: string;
  @ViewChild('selectAvatarInput', { static: false }) selectAvatarInput: ElementRef;

  constructor(
    private activatedRoute: ActivatedRoute,
    private httpClient: HttpClient
  ) { }

  ngOnInit(): void {
    this.activatedRoute.queryParams.pipe(untilDestroyed(this)).subscribe(params => {
      this.id = params.id;
    })
  }

  ngOnDestroy(): void { }

  uploadImage(value) {
    // if(value){
    //   this.catalogService.uploadImageArrProduct(this.id, value).subscribe(products => {
    //     Swal.fire({
    //       position: 'top-end',
    //       icon: 'success',
    //       title: 'Ảnh đã được upload',
    //       showConfirmButton: false,
    //       timer: 1500
    //     })
    //   });
    // }
    // else{
    //   Swal.fire({
    //     icon: 'error',
    //     title: 'Lỗi...',
    //     text: 'Vui lòng nhập đường dẫn!',
    //   })
    // }

    const imgUrl = this.selectAvatarInput.nativeElement.files[0];
    const file = new FormData();
    file.set('products', imgUrl);
    this.httpClient.post(`http://localhost:6789/api/products/images/${this.id}`, file).subscribe(res => {
      console.log('success')
    })

  }

}
