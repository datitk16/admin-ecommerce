import { Component, OnInit, OnDestroy } from '@angular/core';
import { Address } from '../../models/address.model';
import { CatalogService } from '../../services/catalog.service';
import { untilDestroyed } from 'ngx-take-until-destroy';
import { Wards } from '../../models/ward.models';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CategoriesLevel1, CategoriesLevel1Item } from '../../models/catalog-category-level1.models';

@Component({
  selector: 'app-sorts',
  templateUrl: './sorts.component.html',
  styleUrls: ['./sorts.component.css']
})
export class SortsComponent implements OnInit, OnDestroy {

  public cities: Address[];
  public wards: Address[];
  public selectAddressForm: FormGroup;
  public categoriesLevel1: CategoriesLevel1Item[] = [];

  constructor(
    private catalogService: CatalogService,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {

    this.selectAddressForm = this.fb.group({
      cityName: '',
      wardName: '',
      category: ''
    })

    this.catalogService.getCity().pipe(untilDestroyed(this)).subscribe(city => {
      this.cities = city.LtsItem;
    });

    this.catalogService.getCategories().subscribe(categories => {
      this.categoriesLevel1 = categories.items;
    });
  }

  ngOnDestroy() { }

  selectedCity(cityID) {
    this.catalogService.getWard(cityID).pipe(untilDestroyed(this)).subscribe(wards => {
      this.wards = wards;
    });
  }

  submitFormAddress(value) {
    console.log(value);
  }



}
