import { Component, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { Test } from '../../test';
import { TestresultsService } from '../../testresults.service';
import { ActivatedRoute } from '@angular/router';
import { NgForm, FormGroup, Validators, FormBuilder} from '@angular/forms';
import { Athlete } from '../../athlete';

@Component({
  selector: 'add-athlete',
  templateUrl: './add-athlete.component.html',
  styleUrls: ['./add-athlete.component.scss']
})

export class AddAthleteComponent  {

  //form heading
  @Input() formHeading: string;
  //disable delete button when creating new athlete
  @Input() isDisableDeleteButton: boolean;
  //object of Athlete class
  @Input() athlete: Athlete;
  //check weather the bottom right section is open or not
  @Input() isCloseSideSection: boolean;
  //close bottom right section
  @Output() closeSideSection = new EventEmitter<boolean>();
  //array object for Test class
  tests: Test[];
  //object of Test class;
  test: Test;
  //table data source
  dataSource: any;
  //get athlete names from TestresultsService
  athleteNames: string[] = this._testResultsService.getAthleteNames();
  //id of test
  testId: number;
  //form group instance for add-athlete form
  addAthleteFormGroup: FormGroup;

  constructor(private _testResultsService: TestresultsService, private _activatedRoute: ActivatedRoute, private _formBuilder: FormBuilder) { }

/**A lifecycle hook that is called after Angular has initialized all data-bound properties of a directive */
  ngOnInit() {

    //class reference
    this.test = new Test();
    this.athlete = new Athlete();

    //get test id from router link
    this._activatedRoute.paramMap.subscribe(e => {
      this.testId = +e.get('id');
      if (this.testId) {
        this.getTest(this.testId);
      }
    });

    //reset and validate form
    this.resetAndValidateAthleteForm();
   
  }

  /**get test  
   * 
   * @param testId: id of test
   */
  getTest(testId: number) {
    this.test = this._testResultsService.getTest(testId);
  }

  /**
   * 
   * @param athlete: reference of Athlete class
   * 
   */
  createAthlete(athlete: Athlete) {

    //assign athlete object to an empty object,then pass to create new athlete
    const newAthlete = Object.assign({}, athlete);
    this._testResultsService.createAthlete(newAthlete, this.test);

    // close bottom right section
    this.closeSideSection.emit(true);
    
  }

  /**reset and validate anthlete form */
  resetAndValidateAthleteForm() {
    this.addAthleteFormGroup = this._formBuilder.group(
      {
        name: ['', Validators.required],
        distance: ['', Validators.required]
      }
    );
  }
  /**delete athlete
   * 
   * @param athlete:reference of Athlete class
   */
  async deleteAthlete(athlete: Athlete) {
  await this._testResultsService.openDialog('delete athlete', 'do you want to delete athlete?', this.testId, athlete);

  // close bottom right section
  this.closeSideSection.emit(true);
   
  }

 
}
