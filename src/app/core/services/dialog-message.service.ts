import { Injectable, Inject, OnDestroy } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { DialogMessageComponent } from '../components/dialog-message/dialog-message.component';
import { isUndefined } from 'lodash';
import { untilDestroyed } from 'ngx-take-until-destroy';
import { merge } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class DialogMessageService implements OnDestroy {

  constructor(public dialog: MatDialog) { }
  ngOnDestroy() { }

  confirmMessage(
    message: string,
    onOkHandler: () => void,
    onCancelHandler = () => { }): void {
    this.showDialogMessage("Confirmation", "question-circle", "confirm", message, onOkHandler, onCancelHandler)
  }

  private showDialogMessage(
    titleText: string,
    titleIcon: string,
    titleClass: string,
    messageText: string,
    onOkHandler: () => void,
    onCancelHandler = () => { }
  ) {
    const dialogRef = this.dialog.open(DialogMessageComponent, {
      data: {
        titleText,
        titleIcon,
        titleClass,
        messageText,
        showCancelButton: !isUndefined(onCancelHandler)
      },
      closeOnNavigation: true,
      minWidth: 300,
      maxWidth: 500,
    });

    merge(dialogRef.afterClosed()).pipe(untilDestroyed(this)).subscribe((res) => {
      console.log(res);
      if (res) {// Click modal button
        if (res !== 'Cancel' && !isUndefined(onOkHandler)) {
          onOkHandler();
        } else if (res === 'Cancel' && !isUndefined(onCancelHandler)) {
          onCancelHandler();
        }
      } else {// Click modal backdrop
        if (titleText !== 'Confirmation' && !isUndefined(onOkHandler)) {
          onOkHandler();
        }
      }
    });

  }
}
