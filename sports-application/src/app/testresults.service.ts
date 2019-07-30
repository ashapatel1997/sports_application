import { Injectable } from '@angular/core';
import { Test } from '../app/test';
import { Athlete } from '../app/athlete';
import { MatDialog, MatDialogConfig, MatSnackBarConfig, MatSnackBar } from '@angular/material';
import { DeleteDialogComponent } from './shared/delete-dialog/delete-dialog.component';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})


export class TestresultsService {

  constructor(private _matDialog: MatDialog, private _matSnackBar: MatSnackBar, private _router: Router) { }

  /*variables to change style according to boolean value
   * changeElementWidth : changes the width,display,position of the element
   * initialStyle: provide the initial position,width,display properties of the element
   */
  changeElementWidth: boolean = false;
  initialStyle: boolean = true;

  //athlete names
  athleteName: any[] = [
    { name: 'Queen Jacobi' },
    { name: 'Magen Faye' },
    { name: 'Delicia Ledonne' },
    { name: 'Camille Grantham' },
    { name: 'Marc Voth' },
    { name: 'Randy Rondon' },
    { name: 'Delora Saville' },
    { name: 'Rosario Reuben' },
    { name: 'Lula Uhlman' }
  ];

  //test types
  testType: any[] = [{ type: 'Cooper Test' }, { type: 'Sprint test' }];

  //object of Athlete class;
  athlete: Athlete;

  //dummy test data
  test: Test[] = [
    {
      id: 1,
      date: 110719,
      testType: this.testType[0].type,
      athlete: []
    },
    {
      id: 2,
      date: 120719,
      testType: this.testType[1].type,
      athlete: []
    }

  ];


  //get all tests
  getTests() {
    return this.test;
  }

  //get test based on id
  getTest(id: number) {
    const index = this.test.findIndex(x => x.id === id);
    return this.test[index];
  }

  //get test type
  getTestTypes() {
    return this.testType;
  }

  //get athlete names
  getAthleteNames() {
    return this.athleteName;
  }

  //maxId is to find out last maximum id of test
  maxTestId: number;

  //array index
  i: number;

  //compare date
  isDifferentDate: boolean = true;

  //maximum athlete id in specific test
  maxAthleteId: number

  //index of test in array
  testIndex: number;

  //distance covered by athlete
  distance: number;

  //set fitness rating based on distance
  setFitnessRating: string;

  /**create new test
   * 
   * @param test:object that stores created test data
   */
  createTest(test: Test) {

    //stores boolean value as par the date comparision
    const testDate = this.compareDateType(test);

    //create new test if test-id is undefined)
    if (test.id == undefined) {
      //if array is empty then assign new test-id=0, else new test-id = maxTestId + 1
      if (this.test.length == 0) {
        if (testDate) {
          this.maxTestId = 0;
          this.addTest(test, this.maxTestId);
        }
      }

      else {
        if (testDate) {
          this.maxTestId = this.test.reduce(function (i1, i2) { return (i1 > i2) ? i1 : i2 }).id;
          this.addTest(test, this.maxTestId);
        }
        else {
          this.openSnackBar('Test Is Already Created');
        }
      }
    }
  }

  /**add test to array
   * 
   * @param test:object stores new created test data
   * @param maxTestId: maximum id of test
   */
  addTest(test: Test, maxTestId: number) {
    test.id = maxTestId + 1;
    test.athlete = [];
    this.test.push(test);
  }


  /**compare (date & testType) of existing test and new created test to prevent duplication
   * 
   * @param test: object stores new created test
   */
  compareDateType(test: Test) {
    for (this.i = 0; this.i < this.test.length; this.i++) {

      if (this.test[this.i].date == test.date && this.test[this.i].testType == test.testType) {
        this.isDifferentDate = false;
        break;
      }

      else {
        this.isDifferentDate = true;
      }
    }
    return this.isDifferentDate
  }

  /**create new athlete
   * 
   * @param athlete:reference of Athlete class
   * @param test:reference of test class
   */
  createAthlete(athlete: Athlete, test: Test) {

    this.testIndex = this.test.findIndex(i => i.id == test.id);

    //add new athlete
    if (athlete.id == undefined) {
      //if athlete list is epmty them maximum athlete-id=0, else find maximum athlete-id
      if (test.athlete.length == 0) {
        this.maxAthleteId = 0;
        this.addAthlete(athlete, this.maxAthleteId);
      }

      else {
        this.maxAthleteId = this.test[this.testIndex].athlete.reduce(function (i1, i2) { return (i1 > i2) ? i1 : i2 }).id;
        this.addAthlete(athlete, this.maxAthleteId);

      }
    }

    //edit athlete
    else {
      const index = this.test[this.testIndex].athlete.findIndex(i => i.id == athlete.id);

      //fitness rating based on distance covered
      this.distance = athlete.distance * 1000;
      athlete.fitnessRating = this.setRating(this.distance, athlete.fitnessRating);

      this.test[this.testIndex].athlete[index] = athlete;
    }
  }
  
  /** add athlete to test
   * 
   * @param athlete:reference of Athlete class
   * @param maxAthleteId
   */
  addAthlete(athlete: Athlete, maxAthleteId: number) {
    this.athlete = new Athlete();
    this.athlete.id = maxAthleteId + 1;
    this.athlete.name = athlete.name;
    this.athlete.distance = athlete.distance;
    
   // fitness rating based on distance covered
    this.distance = athlete.distance * 1000;
    this.athlete.fitnessRating = this.setRating(this.distance, this.athlete.fitnessRating);
    
    this.test[this.testIndex].athlete.push(this.athlete);
  }

  /**set rating nased on distance
   * 
   * @param distance:distance covered by athlete
   * @param fitnessRating:fitness rating based on distance
   */
  setRating(distance: number, fitnessRating: string) {
    
    if (distance <= 1000)
      fitnessRating = 'Below Average';
    else if (distance > 1000 && distance <= 2000)
      fitnessRating = 'Average';
    else if (distance > 2000 && distance <= 3500)
      fitnessRating = 'Good';
    else
      fitnessRating = 'Very Good';

    return fitnessRating;
  }

  /**delete test
   * 
   * @param id:id of the test that is being deleted
   */
  deleteTest(id: number) {
    const index = this.test.findIndex(x => x.id === id);
    this.test.splice(index, 1);
    this.openSnackBar('Test Deleted Successfully');
    this._router.navigate(['testresults']);
  }
 
  /**delete athlete from test
   * 
   * @param testId:id of test from which athlete is being deleted
   * @param athlete: delete athlete reference
   */
  deleteAthlete(testId: number, athlete: Athlete) {
    const index = this.test.findIndex(i => i.id == testId);
    const athleteIndex = this.test[index].athlete.findIndex(i => i.id == athlete.id)
    this.test[index].athlete.splice(athleteIndex, 1);
    this.openSnackBar('Athlete Deleted Successfully');
  }

  /**open "delete dialog"
   * 
   * @param heading: heading og the dialog
   * @param message:confirmation message in dialog
   */
  openDialog(heading: string, message: string, id: number) {

    const dialogConfig = new MatDialogConfig();
    dialogConfig.panelClass = ['dialogStyle'];
    dialogConfig.position = { top: '30px' };
    dialogConfig.autoFocus = false;
    dialogConfig.restoreFocus = false;
    dialogConfig.data = { 'heading': heading, 'message': message, };
    this._matDialog.open(DeleteDialogComponent, dialogConfig)
      .beforeClosed()
      .subscribe(res => {
        //delete test 
        if (res == true) {
          this.deleteTest(id);
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
