import { CreateUserComponent } from './authentication/create-user/create-user.component';
import { LoginComponent } from './authentication/login/login.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';
import { UploadAvatarComponent } from './authentication/upload-avatar/upload-avatar.component';
import { ProfileUserComponent } from './authentication/profile-user/profile-user.component';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./home/home.module').then(m => m.HomeModule)
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'createUser',
    component: CreateUserComponent,
    data: { pageTitle: 'Create User', pageUpdateUser: false }
  },
  {
    path: 'updateUser',
    component: CreateUserComponent,
    data: { pageTitle: 'Update User', pageUpdateUser: true }
  },
  {
    path: 'profileUser',
    component: ProfileUserComponent
  },
  {
    path: 'createUser/uploadAvatar',
    component: UploadAvatarComponent
  },
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full'
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
