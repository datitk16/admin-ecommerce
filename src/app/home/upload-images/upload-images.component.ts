import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { untilDestroyed } from 'ngx-take-until-destroy';
import { CatalogService } from '../services/catalog.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-upload-images',
  templateUrl: './upload-images.component.html',
  styleUrls: ['./upload-images.component.css']
})
export class UploadImagesComponent implements OnInit, OnDestroy {

  id: string;
  constructor(
    private activatedRoute: ActivatedRoute,
    private catalogService: CatalogService
  ) { }

  ngOnInit(): void {
    this.activatedRoute.queryParams.pipe(untilDestroyed(this)).subscribe(params => {
      this.id = params.id;
    })
  }

  ngOnDestroy(): void { }

  uploadImage(value) {
    if(value){
      this.catalogService.uploadImageArrProduct(this.id, value).subscribe(products => {
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Ảnh đã được upload',
          showConfirmButton: false,
          timer: 1500
        })
      });
    }
    else{
      Swal.fire({
        icon: 'error',
        title: 'Lỗi...',
        text: 'Vui lòng nhập đường dẫn!',
      })
    }

  }

}
