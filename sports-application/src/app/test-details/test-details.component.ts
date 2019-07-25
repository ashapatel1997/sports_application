import { Component, OnInit } from '@angular/core';
import { TestresultsService } from '../../app/testresults.service';
import { TestDetail } from '../../app/test-detail';
import { MatTableDataSource, } from '@angular/material';

@Component({
  selector: 'app-test-details',
  templateUrl: './test-details.component.html',
  styleUrls: ['./test-details.component.scss']
})

export class TestDetailsComponent  {

  constructor(private _testResultsService: TestresultsService,
   ) { }

  //object for TestDetail class
  testDetails: TestDetail[] = this._testResultsService.getTestDetails();

  //reference to disply test data columns in material table
  dataSource;

  //array to store columns attributes in test data table
  displayedColumns: string[];

  /*variables to change style according to boolean value
   * styleBeforeAction :provide the initial position,width,display properties of the element
   * styleAfterAction: changes the width,display,position of the element
   * hideDeleteButton : hide when add new data form is open/ show when click on athlete to change data
   */
   styleBeforeAction: boolean=true;
   styleAfterAction: boolean = false;
   hideDeleteButton: boolean;

  //dynamic heading of add/edit atlete form
  formHeading: string;

/**A lifecycle hook that is called after
 * Angular has initialized all data-bound properties of a directive */
  ngOnInit() {
    
    //reference to column attribute of table data
    this.displayedColumns = ['id', 'ranking', 'distance','rating'];

    //instance of the mat-table data source
    this.dataSource = new MatTableDataSource<TestDetail>(this.testDetails);

  }


/**
 *on click of "add new athlete to test" button, open/close section for create new test
 **/
  showAddNewAthleteSection() {
    this.formHeading = "add new athlete to test";
    this.hideDeleteButton = true;
    this.show();
  }

  /** on outside click, close section for create new test
   * 
   * @param event listens outside click Event
   */
  onClickedOutside(event: Event) {
    this.hide();
  }

/*close "add new athlete" section on click of close btn icon*/
  closeSideSection() {
    this.hide();
  }

  /**get selected row
  * 
  * @param row gets the values of specific selected row to change data 
  */
  selectRow(row) {
    if (this.styleAfterAction) {
      
      const snackBarMessage = 'Close SideBar Try Again';
      this._testResultsService.openSnackBar(snackBarMessage);
    }
    else {
      //TODO: pass athlete data to form 
      this.formHeading = "change data for athlete";
      this.hideDeleteButton = false;
      this.show();
      
    }
    
  }

  /**save athlete to the test */
  saveAthlete() {
    this.hide();
    //TODO: save athlete to test
  }

  /** open "delete athlete confirmation diaolg" on click of delete button
   *
   * */
  deleteAthlete() {
    this._testResultsService.openDialog('delete athlete','do you want to delete athlete from test?');
  }


  /** open "delete test confirmation diaolg" on click of delete test button
  *
  * */
  deleteTest() {
    this._testResultsService.openDialog('delete test', 'do you want to delete test?');
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
}
