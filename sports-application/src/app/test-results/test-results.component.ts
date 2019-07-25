import { Component, OnInit, } from '@angular/core';
import { MatTableDataSource, } from '@angular/material';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Event } from '@angular/router';
import { TestresultsService } from '../../app/testresults.service';
import { Test } from '../../app/test';
import { TestType } from '../../app/test-type';
import {  Router } from '@angular/router';

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
  tests: Test[] = this._testResultsService.getTests();

  //object for testType class
  testTypes: TestType[] = this._testResultsService.getTestTypes();

  //reference to disply test data columns in material table
  dataSource;

  //array to store columns attributes in test data table
  displayedColumns: string[];

  /*variables to change style according to boolean value
   * styleBeforeAction :provide the initial position,width,display properties of the element 
   * styleAfterAction: changes the width,display,position of the element
   */

  styleBeforeAction: boolean = true;
  styleAfterAction: boolean = false;

  //form group instance for "create new test" form
  newTestgroup: FormGroup;

  /**A lifecycle hook that is called after
   * Angular has initialized all data-bound properties of a directive */

  ngOnInit() {

    //reference to column attribute of test table data
    this.displayedColumns = ['date', 'numberOfParticipants', 'testType'];

    //instance of the mat-table data source
    this.dataSource = new MatTableDataSource<Test>(this.tests);

    //form validation
    this.newTestgroup = this._formBuilder.group({
      testDate: ['', Validators.required]
    });
  }

  /**
   *on click of "create new test" button, open/close section for create new test
   **/
  showCreateNewTestSection() {
    if (this.styleAfterAction == true) {
      const message = 'Form is already open';
      this._testResultsService.openSnackBar(message);
    }
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
    this._router.navigate(['testdetails']);
  }

/*function call when "create test" button click from buttom right section*/
  createTest() {
    this.hide();
  }

/*hide bottom right section*/
  hide() {
    this.styleAfterAction = false;
    this.styleBeforeAction = true;
  }

/*show bottom right section*/
  show() {
    this.styleAfterAction = true;
    this.styleBeforeAction = false;
  }

}
