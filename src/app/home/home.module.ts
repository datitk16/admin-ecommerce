import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomePageComponent } from './home-page/home-page.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { ServicesComponent } from './services/services.component';
import { IndexComponent } from './index/index.component';
import {MatTabsModule} from '@angular/material/tabs';
import {MatMenuModule} from '@angular/material/menu';

const routes: Routes = [
  {
    path: '',
    component: HomePageComponent,
    children: [
      {
        path: '',
        component: IndexComponent,
      },
      {
        path: 'service',
        component: ServicesComponent
      }
    ]
  }
];

@NgModule({
  declarations: [HomePageComponent, HeaderComponent, FooterComponent, ServicesComponent, IndexComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MatTabsModule,
    MatMenuModule,

  ]
})
export class HomeModule { }
