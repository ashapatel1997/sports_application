import { Component, Inject } from '@angular/core';
import { MatDialogRef, MatSnackBar, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-delete-dialog',
  templateUrl: './delete-dialog.component.html',
  styleUrls: ['./delete-dialog.component.scss']
})


export class DeleteDialogComponent  {

  constructor(public matDialogRef: MatDialogRef<DeleteDialogComponent>,
              private _matSnackBar: MatSnackBar,
              @Inject(MAT_DIALOG_DATA) data,
              )
  {
    this.heading = data.heading; this.message = data.message;
  }

  //dialog heading and confirmation message
  heading: string;
  message: string;

  /*close dialog on click of close icon*/
  closeDialog() {
    this.matDialogRef.close(false);
  }

 

}

