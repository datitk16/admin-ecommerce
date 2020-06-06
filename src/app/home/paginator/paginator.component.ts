import { Component, OnInit, ViewChild, AfterViewInit, Output, EventEmitter } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.css']
})
export class PaginatorComponent implements OnInit, AfterViewInit {

  constructor() { }
  pageNumber: number;
  totalCount = 100;

  @Output() emitPaginator = new EventEmitter();
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;

  ngOnInit(): void {

  }

  ngAfterViewInit(): void {
    this.paginator.page.subscribe(
      (event) => {
      this.emitPaginator.emit(event);
      }
    );
  }

}
