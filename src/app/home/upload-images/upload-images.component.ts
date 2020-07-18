import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { untilDestroyed } from 'ngx-take-until-destroy';
import { CatalogService } from '../services/catalog.service';
import Swal from 'sweetalert2';
import { HttpClient } from '@angular/common/http';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-upload-images',
  templateUrl: './upload-images.component.html',
  styleUrls: ['./upload-images.component.css']
})
export class UploadImagesComponent implements OnInit, OnDestroy {

  id: string;
  inputListImage = false;
  imageForm: FormGroup;

  @ViewChild('selectAvatarInput', { static: false }) selectAvatarInput: ElementRef;

  constructor(
    private activatedRoute: ActivatedRoute,
    private httpClient: HttpClient,
    private catalogService: CatalogService,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.imageForm = this.fb.group({
      imageUrl: ''
    });

    this.activatedRoute.queryParams.pipe(untilDestroyed(this)).subscribe(params => {
      this.id = params.id;
    })
  }

  ngOnDestroy(): void { }

  uploadImage(value) {
    console.log(value);

  }

  onSubmit(data) {
    if (!this.inputListImage) {
      const imgUrl = this.selectAvatarInput.nativeElement.files[0];
      const file = new FormData();
      if (!this.inputListImage) {
        file.set('products', imgUrl);
        this.httpClient.post(`http://localhost:6789/api/products/images/${this.id}`, file).subscribe(res => {
          this.inputListImage = true;
        });
      }
    }
    else {
      if (data.imageUrl !== '') {
        this.catalogService.uploadImageArrProduct(this.id, data.imageUrl).subscribe(products => {
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Ảnh đã được upload',
            showConfirmButton: false,
            timer: 1500
          });
        });
      }
      else {
        Swal.fire({
          icon: 'error',
          title: 'Lỗi...',
          text: 'Vui lòng nhập đường dẫn!',
        });
      }
    }

  }
}
