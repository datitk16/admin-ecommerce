import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DialogMessageComponent } from './components/dialog-message/dialog-message.component';
import {MatDialogModule} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptor } from './interceptors/token.interceptor';
@NgModule({
  declarations: [DialogMessageComponent],
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule
  ],
  entryComponents: [DialogMessageComponent],
  providers: [

    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    },

  ],
})
export class CoreModule { }
