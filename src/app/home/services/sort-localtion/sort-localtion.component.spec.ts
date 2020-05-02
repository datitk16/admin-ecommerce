import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SortLocaltionComponent } from './sort-localtion.component';

describe('SortLocaltionComponent', () => {
  let component: SortLocaltionComponent;
  let fixture: ComponentFixture<SortLocaltionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SortLocaltionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SortLocaltionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
