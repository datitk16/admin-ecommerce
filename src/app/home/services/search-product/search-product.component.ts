import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs';
import { DataService, Person } from '../data.service';

@Component({
  selector: 'app-search-product',
  templateUrl: './search-product.component.html',
  styleUrls: ['./search-product.component.css']
})
export class SearchProductComponent implements OnInit {

  people$: Observable<Person[]>;
  selectedPersonId = '5a15b13c36e7a7f00cf0d7cb';

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    this.people$ = this.dataService.getPeople();
  }

}
