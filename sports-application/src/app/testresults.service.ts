import { Injectable } from '@angular/core';
import { Test } from '../app/test';
import { TestType } from '../app/test-type';
import { TestDetail } from '../app/test-detail';
import { MatDialog, MatDialogConfig, MatSnackBarConfig, MatSnackBar } from '@angular/material';
import { DeleteDialogComponent } from './shared/delete-dialog/delete-dialog.component';

@Injectable({
  providedIn: 'root'
})


export class TestresultsService {

  constructor(private _matDialog: MatDialog, private _matSnackBar: MatSnackBar) { }

  /*variables to change style according to boolean value
   * changeElementWidth : changes the width,display,position of the element
   * initialStyle: provide the initial position,width,display properties of the element
   */
  changeElementWidth: boolean = false;
  initialStyle: boolean = true;

  //object for Test class
  tests: Test[] = [
    { id: 1, date: 150719, numberOfParticipants: 5, testType: 'Cooper test' },
    { id: 2, date: 160719, numberOfParticipants: 6, testType: 'Cooper test' },
    { id: 3, date: 170719, numberOfParticipants: 7, testType: 'Sprint test' },
    { id: 4, date: 180719, numberOfParticipants: 3, testType: 'Cooper test' },
    { id: 1, date: 150719, numberOfParticipants: 5, testType: 'Sprint test' },
    { id: 2, date: 160719, numberOfParticipants: 6, testType: 'Cooper test' }
  
  ];

  //object for testType class
  testTypes: TestType[] = [{ testType: 'Cooper test' }, { testType: 'Sprint test' }];

  //test details
  testDetails: TestDetail[] = [
    { id: 1, ranking:'Queen Jacobi', distance:4.808, rating:'Very Good' },
    { id: 2, ranking: 'Magen Faye ', distance: 4.654, rating: 'Very Good' },
    { id: 3, ranking: 'Delicia Ledonne ', distance: 3.789, rating: 'Very Good' },
    { id: 4, ranking: 'Camille Grantham ', distance: 3.667, rating: 'Very Good' },
    { id: 5, ranking:'Marc  Voth ', distance:2.556, rating: 'Average'},
    { id: 6, ranking: 'Randy Rondon', distance: 2.555, rating: 'Average' }
   
  ];

  //return all Test
  getTests() {
    return this.tests;
  }

  //return test type
  getTestTypes() {
    return this.testTypes;
  }

  //return test details
  getTestDetails() {
    return this.testDetails;
  }


/**open "delete dialog"
 * 
 * @param heading: heading og the dialog
 * @param message:confirmation message in dialog
 */
  openDialog(heading: string,message:string)
  {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.panelClass = ['dialogStyle'];
    dialogConfig.position = { top: '30px' };
    dialogConfig.autoFocus = false;
    dialogConfig.data = { 'heading': heading, 'message': message };
    this._matDialog.open(DeleteDialogComponent, dialogConfig)
      .afterClosed()
      .subscribe(res => {
        if (res == true) {
          //TODO: delete athlete from test
        }
      });
  }

  /** notification
   * 
   * @param message: notification message
   */
  openSnackBar(message: string) {
    const snackConfig = new MatSnackBarConfig();
    snackConfig.duration = 1000;
    snackConfig.panelClass = ['snackBarStyle'];
    snackConfig.horizontalPosition = 'right';
    snackConfig.verticalPosition = 'bottom';
    this._matSnackBar.open(message, null, snackConfig);
  }
}
