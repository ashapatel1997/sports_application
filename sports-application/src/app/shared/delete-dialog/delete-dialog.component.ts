import { Component, Inject } from '@angular/core';
import { MatDialogRef, MatSnackBar, MAT_DIALOG_DATA } from '@angular/material';
import { Athlete } from '../../athlete';
import { Test } from '../../test';

@Component({
  selector: 'app-delete-dialog',
  templateUrl: './delete-dialog.component.html',
  styleUrls: ['./delete-dialog.component.scss']
})


export class DeleteDialogComponent  {

  //dialog heading
  heading: string;

  //dialog message
  message: string;
 
  constructor(public matDialogRef: MatDialogRef<DeleteDialogComponent>,@Inject(MAT_DIALOG_DATA) data)
  {
    this.heading = data.heading;
    this.message = data.message;
  }

  /*close dialog on click of close icon*/
  closeDialog() {
    this.matDialogRef.close(false);
  }


}

