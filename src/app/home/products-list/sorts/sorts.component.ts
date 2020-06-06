import { Component, OnInit, OnDestroy } from '@angular/core';
import { Address } from '../../models/address.model';
import { CatalogService } from '../../services/catalog.service';
import { untilDestroyed } from 'ngx-take-until-destroy';
import { Wards } from '../../models/ward.models';

@Component({
  selector: 'app-sorts',
  templateUrl: './sorts.component.html',
  styleUrls: ['./sorts.component.css']
})
export class SortsComponent implements OnInit, OnDestroy {

  public cities: Address[];
  public wards: Address[];

  constructor(
    private catalogService: CatalogService
  ) { }

  ngOnInit(): void {
    this.catalogService.getCity().pipe(untilDestroyed(this)).subscribe(city => {
      this.cities = city.LtsItem;
    });
  }

  ngOnDestroy() { }

  selectedCity(items){
    this.catalogService.getWard(items.ID).pipe(untilDestroyed(this)).subscribe(wards => {
      this.wards = wards;
    });
  }

}
