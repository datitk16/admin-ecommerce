import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder } from '@angular/forms';
import { CatalogService } from 'src/app/home/services/catalog.service';
import { CustomerItem } from 'src/app/shared/models/user.model';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css']
})
export class CreateUserComponent implements OnInit {


  createUserForm: FormGroup;
  requestUser = new CustomerItem();
  constructor(
    private router: Router,
    private fb: FormBuilder,
    private catalogService: CatalogService
  ) { }

  ngOnInit(): void {
    this.createUserForm = this.fb.group({
      email: '',
      password: '',
      fullName: '',
      phoneNumber: '',
    });
  }

  submitForm(value) {
    this.requestUser = value;
    this.catalogService.createCustomer(this.requestUser).subscribe(user => {
      console.log(user)
    })
  }

  toHome() {
    this.router.navigateByUrl('/');
  }

}
