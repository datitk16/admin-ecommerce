import { Component, OnInit, OnDestroy, Input, Output, EventEmitter } from '@angular/core';
import { CatalogService } from '../../services/catalog.service';
import { Address } from '../../models/address';

@Component({
  selector: 'app-sort-localtion',
  templateUrl: './sort-location.component.html',
  styleUrls: ['./sort-location.component.css']
})
export class SortLocationComponent implements OnInit {
   @Input() location: Address[];
   @Output() sendCity = new EventEmitter<Address>();

  constructor() { }

  ngOnInit(): void {}

  selectedCity(items) {
    this.sendCity.emit(items);
  }

}
