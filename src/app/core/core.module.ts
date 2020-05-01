import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DialogMessageComponent } from './components/dialog-message/dialog-message.component';
import {MatDialogModule} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
@NgModule({
  declarations: [DialogMessageComponent],
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule
  ],
  entryComponents: [DialogMessageComponent]
})
export class CoreModule { }
