import { Component } from "@angular/core";
import { FormArray, FormBuilder, FormControl, FormGroup, ValidatorFn } from "@angular/forms";
import { Storage } from "@ionic/storage";
import { NavController, NavParams } from "ionic-angular";
import { KnownUnknownWordData } from "../../../models/knownUnknownWordData";
import { Student } from "../../../models/student";


@Component({
  selector: 'page-startNewPostAssessment',
  templateUrl: 'startNewPostAssessment.html'
})
export class StartNewPostAssessment {

  studentObject: Student = new Student();
  error: string = "Error Message";
  newLearnedWords: Array<KnownUnknownWordData> = [new KnownUnknownWordData()];
  allData_newLearnedWords: Array<KnownUnknownWordData> = [new KnownUnknownWordData()];
  private searchTerm: string = '';
  selectAll: boolean = true;
  wordType: number = 0;
  controls = this.allData_newLearnedWords.map(c => new FormControl(false));

  myGroup: FormGroup = this.formBuilder.group({
    wordObjectsList: new FormArray(this.controls, this.minSelectedCheckboxes(0))
  });;


  constructor(public navCtrl: NavController,
    private navParams: NavParams,
    private storage: Storage,
    private formBuilder: FormBuilder) {

  }

  public ionViewWillEnter() {

  }
  filterItems() {

    this.newLearnedWords = this.allData_newLearnedWords.filter((newKnownUnknownObject) => {
      return newKnownUnknownObject.wordData.wordText.toLowerCase().indexOf(this.searchTerm.toLowerCase()) > -1 ||
        newKnownUnknownObject.wordData.wordCategory.toLowerCase().indexOf(this.searchTerm.toLowerCase()) > -1;
    });
  }

  startNewPostAssessmentTest() {



  }

  minSelectedCheckboxes(min = 1) {
    const validator: ValidatorFn = (formArray: FormArray) => {
      const totalSelected = formArray.controls
        // get a list of checkbox values (boolean)
        .map(control => control.value)
        // total up the number of checked checkboxes
        .reduce((prev, next) => next ? prev + next : prev, 0);

      // if the total is not greater than the minimum, return the error message
      return totalSelected >= min ? null : { required: true };
    };

    return validator;
  }

  updateSelectAll() {
    this.controls = this.allData_newLearnedWords.map(c => new FormControl(this.selectAll));
    this.myGroup = this.formBuilder.group({
      wordObjectsList: new FormArray(this.controls, this.minSelectedCheckboxes(1))
    });
    console.log("checked all :" + this.selectAll);
  }


}