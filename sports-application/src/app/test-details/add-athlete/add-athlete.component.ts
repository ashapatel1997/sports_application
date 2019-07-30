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

  constructor(private _testResultsService: TestresultsService, private _activatedRoute: ActivatedRoute, private _formBuilder: FormBuilder) { }

/*received data from test-details component*/

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
  
  //static: true => results available in ngOnInit
  @ViewChild('addAthleteForm', { static: true }) athleteForm: NgForm;

  //array object for Test class
  tests: Test[];

  //object of Test class;
  test: Test;

  //table data source
  dataSource:any;
  
  //get athlete names from TestresultsService
  athleteNames: string[] = this._testResultsService.getAthleteNames();

  //id of test
  testId: number;

  //form group instance for add-athlete form
  addAthleteFormGroup: FormGroup;

  /**Respond when Angular (re)sets data-bound input properties */
  ngOnChanges()
  {
    if (this.isCloseSideSection) {
      this.athleteForm.reset();
    }
  }

  /**Initialize the directive/component after Angular first displays
   * the data-bound properties and sets the directive/component's input
   * properties.
   * */
  ngOnInit() {

    this.test = new Test();
    this.athlete = new Athlete();

    //get test id from router link
    this._activatedRoute.paramMap.subscribe(e => {
      this.testId = +e.get('id');
      if (this.testId) {
        this.getTest(this.testId);
      }
    });

    //add-athlete form validation
    this.addAthleteFormGroup = this._formBuilder.group(
      {
        name: ['', Validators.required],
        distance: ['', Validators.required]
      }
    );
    
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
   * @param addAthleteForm: template reference variable of add-athlete form
   */
  createAthlete(athlete: Athlete, addAthleteForm: NgForm) {

    //assign athlete object to an empty object,then pass to create new athlete
    const newAthlete = Object.assign({}, athlete);
    this._testResultsService.createAthlete(newAthlete, this.test);

    //reset form
    addAthleteForm.reset();
    
    //boolean true to close side section
    this.closeSideSection.emit(true);
    
  }

  /**delete athlete
   * 
   * @param athlete:reference of Athlete class
   */
  deleteAthlete(athlete: Athlete) {
    this._testResultsService.deleteAthlete(this.testId, athlete);
  }

 
}
