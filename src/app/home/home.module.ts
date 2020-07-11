import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomePageComponent } from './home-page/home-page.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { ServicesComponent } from './products-list/products-list.component';
import { IndexComponent } from './home-body/home-body.component';
import { MatTabsModule } from '@angular/material/tabs';
import { MatMenuModule } from '@angular/material/menu';
import { SortsComponent } from './products-list/sorts/sorts.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SortLocationComponent } from './products-list/sort-location/sort-location.component';
import { SearchProductComponent } from './products-list/search-product/search-product.component';
import { MatCardModule } from '@angular/material/card';
import { MainCategoriesComponent } from './product-item/product-item.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTreeModule } from '@angular/material/tree';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { NgxSpinnerModule } from 'ngx-spinner';
import { MatInputModule } from '@angular/material/input';
import { PaginatorComponent } from './paginator/paginator.component';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { HomeEffects } from './+state/home.effects';
import { reducer } from './+state/home.reducer';
import { EmptyMessageComponent } from './empty-message/empty-message.component';
import { GalleryModule } from 'ng-gallery';
import { LightboxModule } from 'ng-gallery/lightbox';
import { PostComponent } from './post/post.component';

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
        path: 'products',
        component: ServicesComponent
      },
      {
        path: 'products/detail',
        component: MainCategoriesComponent
      },
      {
        path: 'post',
        component: PostComponent
      },
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
    SortLocationComponent,
    SearchProductComponent,
    MainCategoriesComponent,
    PaginatorComponent,
    EmptyMessageComponent,
    PostComponent,
    ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MatTabsModule,
    MatMenuModule,
    NgSelectModule,
    FormsModule,
    MatCardModule,
    MatPaginatorModule,
    MatTreeModule,
    MatIconModule,
    MatButtonModule,
    NgxSpinnerModule,
    MatInputModule,
    StoreModule.forFeature('catalog', reducer),
    EffectsModule.forFeature([HomeEffects]),
    GalleryModule,
    LightboxModule,
    ReactiveFormsModule
  ]
})
export class HomeModule { }
