import { Component, OnInit, ViewChild, Input, } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort, } from '@angular/material';
import { FormGroup, Validators, FormBuilder, NgForm } from '@angular/forms';
import { Event } from '@angular/router';
import { TestresultsService } from '../../app/testresults.service';
import { Test } from '../../app/test';
import { Router } from '@angular/router';

@Component({
  selector: 'app-test-results',
  templateUrl: './test-results.component.html',
  styleUrls: ['./test-results.component.scss']
})


export class TestResultsComponent implements OnInit {

  constructor(private _testResultsService: TestresultsService,
    private _router: Router,
    private _formBuilder: FormBuilder
  ) { }


  //object for Test class
  tests: Test[];

  //binding value from class
  test: Test;

  //object for testType class
  testTypes: any[] = this._testResultsService.getTestTypes();

  //data source of test list table
  dataSource;

  //array to store columns attributes in test list table
  displayedColumns: string[];

  /*variables to change style according to boolean value
   * styleBeforeAction :provide the initial position,width,display properties of the element 
   * styleAfterAction: changes the width,display,position of the element
   */
  styleBeforeAction: boolean = true;
  styleAfterAction: boolean = false;

  //form group instance for add-test form
  addTestFormGroup: FormGroup;

  //check weather the test is available or not
  isTestAvailable: boolean;

  //read refernce od test list table 
   @ViewChild('createTestForm', { static: true }) createTestForm: NgForm;

  //table paginator
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  //initial page size and page size options
  pageSize = 2;
  pageSizeOptions: number[] = [0, 2, 5, 10,15];
 
  /**A lifecycle hook that is called after
   * Angular has initialized all data-bound properties of a directive */
  ngOnInit() {

    //get all tests
    this.tests = this._testResultsService.getTests();

    //reference of Test class
    this.test = new Test();

    //reference to column attribute of test table data
    this.displayedColumns = ['date', 'athlete', 'testType'];

    //instance of the mat-table data source
    this.dataSource = new MatTableDataSource<Test>(this.tests);

    //check weather the test is available or not
    this.checkIsTestAvailable();

    //add-test form validation
    this.addTestFormGroup = this._formBuilder.group(
      {
        testType: ['', Validators.required],
        testDate: ['', Validators.required]
      }
    );

  }

  /**
   *open bottom right section
   **/
  showCreateNewTestSection() {

    //if section is already open, then disply snack bar message
    if (this.styleAfterAction == true) {
      const message = 'Form is already open';
      this._testResultsService.openSnackBar(message);
    }

    //else open bottom right section
    else {
      this.show();
    }
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

  /**get selected row of test and navigate to test details
   * 
   * @param row gets the values of specific selected row on click
   */
  selectRow(row) {
    //find test with specific date
    const findTest = this.tests.find(x => x.date === row['date']);
    this._router.navigate(['testdetails', findTest.id]);
  }

  /**create new test
   * 
   * @param test:object pass to create new test
   * @param createTestForm:template reference variable of create-test form
   */
  createTest(test: Test, createTestForm: NgForm) {

    //assign test object to empty object 
    const newTest: Test = Object.assign({}, test);

    //function call to create new test
    this._testResultsService.createTest(newTest);

    //instance of the mat-table data source
    this.dataSource = new MatTableDataSource<Test>(this.tests);
   
    this.isTestAvailable = true;

    //reset form
    createTestForm.reset();

    //close bottom right section
    this.hide();

  }

  /*hide bottom right section*/
  hide() {
    this.styleAfterAction = false;
    this.styleBeforeAction = true;
    this.createTestForm.reset();
  }

  /*show bottom right section*/
  show() {
    this.styleAfterAction = true;
    this.styleBeforeAction = false;
  }

/**check weather the Test is available or not */
  checkIsTestAvailable() {

     //if test is not avilable then hide list and user-instruction, else display
    if (this.tests.length == 0) {
      this.isTestAvailable = false;
    }
    else {
      this.isTestAvailable = true;

    }
  }

}
