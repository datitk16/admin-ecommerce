import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomePageComponent } from './home-page/home-page.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { ServicesComponent } from './services/services.component';
import { IndexComponent } from './index/index.component';
import { MatTabsModule } from '@angular/material/tabs';
import { MatMenuModule } from '@angular/material/menu';
import { SortsComponent } from './services/sorts/sorts.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule } from '@angular/forms';
import { SortLocaltionComponent } from './services/sort-localtion/sort-localtion.component';
import { SortCategoryComponent } from './services/sort-category/sort-category.component';
import { SearchProductComponent } from './services/search-product/search-product.component';
import {MatCardModule} from '@angular/material/card';
import { MainCategoriesComponent } from './main-categories/main-categories.component';

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
  declarations: [
    HomePageComponent,
    HeaderComponent,
    FooterComponent,
    ServicesComponent,
    IndexComponent,
    SortsComponent,
    SortLocaltionComponent,
    SortCategoryComponent,
    SearchProductComponent,
    MainCategoriesComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MatTabsModule,
    MatMenuModule,
    NgSelectModule,
    FormsModule,
    MatCardModule

  ]
})
export class HomeModule { }
