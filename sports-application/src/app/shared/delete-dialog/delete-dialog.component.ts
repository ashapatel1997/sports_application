import { Component, Inject } from '@angular/core';
import { MatDialogRef, MatSnackBar, MatSnackBarConfig, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-delete-dialog',
  templateUrl: './delete-dialog.component.html',
  styleUrls: ['./delete-dialog.component.scss']
})

export class DeleteDialogComponent  {

  constructor(public matDialogRef: MatDialogRef<DeleteDialogComponent>,
    private _matSnackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) data,
    ) { this.heading = data.heading; this.message = data.message; }

  //dialog heading and confirmation message
  heading: string;
  message: string;

  /*close dialog on click of close icon*/
  closeDialog() {
    this.matDialogRef.close(false);
  }

  /*delete athlete from test*/
  confirmDelete() {
   //TODO: delete athlete from test
    const snackConfig = new MatSnackBarConfig();
    snackConfig.duration = 1000;
    snackConfig.panelClass = ['snackBarStyle'];
    snackConfig.horizontalPosition = 'right';
    snackConfig.verticalPosition = 'bottom';
    this._matSnackBar.open("Delete Successfully", null, snackConfig);
  }

}

