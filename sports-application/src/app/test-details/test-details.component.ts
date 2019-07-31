import { Component } from '@angular/core';
import { TestresultsService } from '../../app/testresults.service';
import { MatTableDataSource } from '@angular/material';
import { Test } from '../test';
import { ActivatedRoute } from '@angular/router';
import { Athlete } from '../athlete';

@Component({
  selector: 'app-test-details',
  templateUrl: './test-details.component.html',
  styleUrls: ['./test-details.component.scss']
})

export class TestDetailsComponent {

  /*variables to change style according to boolean value
  * styleBeforeAction :provide the initial position,width,display properties of the element
  * styleAfterAction: changes the width,display,position of the element
  * hideDeleteButton : hide when add new data form is open/ show when click on athlete to change data
  */
  styleBeforeAction: boolean = true;
  styleAfterAction: boolean = false;
  hideDeleteButton: boolean;

  //dynamic heading of add/edit atlete form
  formHeading: string;

  //test name and date to display in heading
  testName: string;
  testDate: number;

  //test id fetch from router link
  testId: number;

  //if athlete is not availale then hide list and  user-instruction, else display
  isAthleteAvailable: boolean;

  //object of Test class
  test: Test;

  //object of Athlete class
  athlete: Athlete;

  //table data source
  dataSource: any;

  //array to store columns attributes in test data table
  displayedColumns: string[];

  constructor(private _testResultsService: TestresultsService,private _activatedRoute: ActivatedRoute) { }

 
  /**A lifecycle hook that is called after Angular has initialized all data-bound properties of a directive */
  ngOnInit() {

    this.test = new Test();

    //fetch test id from route and get all details of the test
    this._activatedRoute.paramMap.subscribe(e => {
      this.testId = +e.get('id');
      if (this.testId) {
        this.test = this._testResultsService.getTest(this.testId);
        this.testName = this.test.testType;
        this.testDate = this.test.date;
      }
    });

    //column attributes and data source
    this.displayedColumns = ['sr', 'name', 'ranking', 'fitnessRating'];
    this.dataSource = new MatTableDataSource<Athlete>(this.test.athlete);

    //check weather the athletes are available or not
    this.checkIsAthleteAvailable();
   
  }

  /**
   *on click of "add new athlete" button, open bottom right section 
   **/
  showAddNewAthleteSection() {
    this.formHeading = "add new athlete to test";
    this.hideDeleteButton = true;
    this.athlete = new Athlete();
    this.show();
  }

  /**get selected row to edit
  * 
  * @param row gets the values of specific selected row to change data 
  */
  selectRow(row) {

    //if form is already open then show snack bar message
    if (this.styleAfterAction) {
      const snackBarMessage = 'Close SideBar and Try Again';
      this._testResultsService.openSnackBar(snackBarMessage);
    }

    //else open bottom right section to change data for athlete
    else {

      //assign selected row object to empty object,then pass to form fields
      const rowValue = Object.assign({}, row);
      this.athlete = rowValue;

      //change form heading
      this.formHeading = "change data for athlete";

      //show delete button
      this.hideDeleteButton = false;

      //show bottom right section
      this.show();
    }

  }

  /** delete test
  *
  * */
  deleteTest() {
    this._testResultsService.openDialog('delete test', 'do you want to delete test?', this.test.id, undefined);
  }

  /** on outside click, close section for create new test
   * 
   * @param event listens outside click Event
   */
  onClickedOutside(event: Event) {
    this.hide();
  }

  /*close bottom right section on click of close btn icon*/
  closeSideSection() {
    this.hide();
  }


  /*show bottom right section*/
  show() {
    this.styleBeforeAction = false;
    this.styleAfterAction = true;
  }

  /*hide bottom right section*/
  hide() {
    this.styleAfterAction = false;
    this.styleBeforeAction = true;
  }

  /**receive value from child component
   * 
   * @param receivedValue: true to hide bottom right section
   */
  receiveFromChild(receivedValue: boolean) {

    this.styleAfterAction = !receivedValue;
    this.styleBeforeAction = receivedValue;

    //table data source data source
    this.dataSource = new MatTableDataSource<Athlete>(this.test.athlete);

    this.checkIsAthleteAvailable();
   
  }

  /**check weather the athlete is available or not */
  checkIsAthleteAvailable() {

    //if athlete is not availale then hide list and  user-instruction, else display
    if (this.test.athlete.length == 0) {
      this.isAthleteAvailable = false;
    }
    else {
      this.isAthleteAvailable = true;
    }

  }

}
