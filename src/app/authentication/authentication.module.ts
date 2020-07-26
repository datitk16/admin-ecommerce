import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { reducer } from './+state/authentication.reducer';
import { EffectsModule } from '@ngrx/effects';
import { AuthenticationEffect } from './+state/authentication.effects';
import { CreateUserComponent } from './create-user/create-user.component';
import { UploadAvatarComponent } from './upload-avatar/upload-avatar.component';
import { ProfileUserComponent } from './profile-user/profile-user.component';
import { NgxSpinnerModule } from 'ngx-spinner';

@NgModule({
  declarations: [LoginComponent, CreateUserComponent, UploadAvatarComponent,ProfileUserComponent],
  imports: [
    CommonModule,
    MatInputModule,
    MatFormFieldModule,
    MatIconModule,
    MatButtonModule,
    FormsModule,
    ReactiveFormsModule,
    StoreModule.forRoot({}),
    StoreModule.forFeature('authState', reducer),
    EffectsModule.forRoot([]),
    EffectsModule.forFeature([AuthenticationEffect]),
    NgxSpinnerModule,

  ]
})
export class AuthenticationModule { }
