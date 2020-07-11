import { Component, OnInit } from '@angular/core';
import { CatalogService } from '../services/catalog.service';
import { Address } from '../models/address.model';
import { CategoriesLevel1Item } from '../models/catalog-category-level1.models';
import { CategoryLevel2Request, CategoryLevel2 } from '../models/categoryLevel2.model';
import { FormGroup, FormBuilder } from '@angular/forms';
import { CreateProductRequest } from '../models/products.model';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {

  public cities: Address[];
  public wards: Address[];
  categoryLevel2 = new CategoryLevel2();
  public categoriesLevel1: CategoriesLevel1Item[] = [];
  categoryLeve2Request = new CategoryLevel2Request();
  postProductForm: FormGroup;
  createProductRequest:CreateProductRequest

  constructor(
    private catalogService: CatalogService,
    private fb: FormBuilder,
  ) { }

  ngOnInit(): void {

    this.postProductForm = this.fb.group({
      city_id: '',
      ward_id: '',
      category_id: '',
      category_id_2: '',
      date: '',
      body: '',
      phone: '',
      price_string: '',
      subject: ''
    });

    this.catalogService.getCity().subscribe(city => {
      this.cities = city.LtsItem;
    });

    this.catalogService.getCategories().subscribe(categories => {
      this.categoriesLevel1 = categories.items;
    });

  }

  postProduct(data){
    this.createProductRequest=data;
   this.catalogService.createProduct(this.createProductRequest).subscribe(x=>{
    const Toast = Swal.mixin({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      onOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer)
        toast.addEventListener('mouseleave', Swal.resumeTimer)
      }
    })

    Toast.fire({
      icon: 'success',
      title: 'Tạo mới thành công'
    })
   })
  }

  selectedCategoryLevel1(id) {
    this.categoryLeve2Request.cateLeve1Id = id;
    this.catalogService.getCategoryLevel2(this.categoryLeve2Request).subscribe(category => {
      this.categoryLevel2 = category;
    })
  }


  selectedCity(cityID) {
    this.catalogService.getWard(cityID).subscribe(wards => {
      this.wards = wards;
    });
  }


}
