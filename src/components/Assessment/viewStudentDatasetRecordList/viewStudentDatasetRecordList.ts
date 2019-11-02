import { Component } from "@angular/core";
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  ValidatorFn
} from "@angular/forms";
import { File } from "@ionic-native/file";
import { Storage } from "@ionic/storage";
import { AlertController, NavController } from "ionic-angular";
import { Dataset } from "../../../models/Dataset";
import { OrganizationDetails } from "../../../models/organizationDetails";
import { Student } from "../../../models/student";
import { StudentDataSetRecord } from "../../../models/studentDataSetRecord";
import { DataSetService } from "../../../services/dataSetServices";
import { AssessmentTest } from "../BeginAssessmentTest/assessmentTest";
import { ViewAssessmentTest } from "../viewAssessment/viewAssessment";

@Component({
  selector: "page-viewStudentDatasetRecordList",
  templateUrl: "viewStudentDatasetRecordList.html"
})
export class ViewStudentDatasetRecordList {
  studentObject: Student = new Student();
  studentDatasetRecordList: Array<StudentDataSetRecord> = [];
  dataSetService: DataSetService = new DataSetService();
  datasetList: Array<Dataset> = [new Dataset()];
  error: string = "Error Message";
  wordType: number = 0;
  selectedDatasetList: Array<StudentDataSetRecord> = [
    new StudentDataSetRecord()
  ];
  restrictedDatasetList: Array<StudentDataSetRecord> = [
    new StudentDataSetRecord()
  ];
  notConvertedcompletedDatasetList: Array<StudentDataSetRecord> = [
    new StudentDataSetRecord()
  ];
  private organizationDetails: OrganizationDetails = new OrganizationDetails();
  controls = this.selectedDatasetList.map(c => new FormControl(false));

  studentDatasetRecordObjectGroup: FormGroup = this.formBuilder.group({
    studentDatasetRecordObjectGroupList: new FormArray(
      this.controls,
      this.minSelectedCheckboxes(0)
    )
  });
  constructor(
    public navCtrl: NavController,
    private storage: Storage,
    private file: File,
    private alertCtrl: AlertController,
    private formBuilder: FormBuilder
  ) {
    this.constructorMethod();
  }
  public ionViewWillEnter() {
    this.constructorMethod();
  }

  constructorMethod() {
    this.controls = this.selectedDatasetList.map(c => new FormControl(true));
  }

  addObjecttoSelectedDataset() {
    this.selectedDatasetList = [];
    this.restrictedDatasetList = [];
    this.notConvertedcompletedDatasetList = [];
    for (let studentDatasetRecordObject of this.studentDatasetRecordList) {
      if (
        !studentDatasetRecordObject.assessmentMethodTestDone &&
        studentDatasetRecordObject.sessionTestDone
      ) {
        if (studentDatasetRecordObject.isConvertedAll)
          this.selectedDatasetList.push(studentDatasetRecordObject);
        else
          this.notConvertedcompletedDatasetList.push(
            studentDatasetRecordObject
          );
      } else {
        this.restrictedDatasetList.push(studentDatasetRecordObject);
      }
    }
  }

  minSelectedCheckboxes(min = 1) {
    const validator: ValidatorFn = (formArray: FormArray) => {
      const totalSelected = formArray.controls
        // get a list of checkbox values (boolean)
        .map(control => control.value)
        // total up the number of checked checkboxes
        .reduce((prev, next) => (next ? prev + next : prev), 0);

      // if the total is not greater than the minimum, return the error message
      return totalSelected >= min ? null : { required: true };
    };

    return validator;
  }

  lockDatasetAssessment() {
    var subSelectedDatasetList: Array<
      StudentDataSetRecord
    > = this.studentDatasetRecordObjectGroup.value.studentDatasetRecordObjectGroupList
      .map((v, i) => (v ? this.selectedDatasetList[i] : null))
      .filter(v => v !== null);

    if (subSelectedDatasetList == null || subSelectedDatasetList.length <= 0) {
      this.error = "select one word at least.";
    } else {
      this.error = "";
      console.log(
        "len:" +
          subSelectedDatasetList.length +
          "  x:" +
          subSelectedDatasetList[0].datasetObject.datasetName
      );
      this.confirmLockDataset(subSelectedDatasetList);
    }
  }

  startPreAssessment(datasetObject: Dataset) {
    var studentDataSetRecordObject: StudentDataSetRecord = new StudentDataSetRecord();
    console.log("wordType:" + this.wordType);
    studentDataSetRecordObject.datasetObject = datasetObject;
    if (
      this.studentObject.studentWordDetailsArray[this.wordType]
        .studentDatasetRecordList == null
    )
      this.studentObject.studentWordDetailsArray[
        this.wordType
      ].studentDatasetRecordList = [];
    this.studentObject.studentWordDetailsArray[
      this.wordType
    ].studentDatasetRecordList.push(studentDataSetRecordObject);

    this.completePreAssessmentTest(
      this.studentObject.studentWordDetailsArray[this.wordType]
        .studentDatasetRecordList.length - 1
    );
  }

  completePreAssessmentTest(index: number) {}

  viewStudentDatasetRecordObject(
    studentDatasetRecordObject: StudentDataSetRecord
  ) {
    const index: number = this.studentObject.studentWordDetailsArray[
      this.wordType
    ].studentDatasetRecordList.indexOf(studentDatasetRecordObject);
  }

  confirmLockDataset(subSelectedDatasetList: Array<StudentDataSetRecord>) {
    let alert = this.alertCtrl.create({
      title: "Lock Datasets",
      message:
        "Do you want to lock selected datasets for session method tests ?",
      buttons: [
        {
          text: "Cancel",
          role: "cancel",
          handler: () => {
            console.log("Cancel clicked");
          }
        },
        {
          text: "yes",
          handler: () => {
            this.makeLockDataset(subSelectedDatasetList);
          }
        }
      ]
    });
    alert.present();
  }

  makeLockDataset(subSelectedDatasetList: Array<StudentDataSetRecord>) {
    if (
      this.studentObject.studentWordDetailsArray[this.wordType]
        .knwonArrayList == null
    )
      this.studentObject.studentWordDetailsArray[
        this.wordType
      ].knwonArrayList = [];
    if (
      this.studentObject.studentWordDetailsArray[this.wordType]
        .unKnownArrayList == null
    )
      this.studentObject.studentWordDetailsArray[
        this.wordType
      ].unKnownArrayList = [];

    for (let obj of subSelectedDatasetList) {
      if (obj.knwonArrayList != null)
        this.studentObject.studentWordDetailsArray[
          this.wordType
        ].knwonArrayList = this.studentObject.studentWordDetailsArray[
          this.wordType
        ].knwonArrayList.concat(obj.knwonArrayList);
      if (obj.unKnownArrayList != null)
        this.studentObject.studentWordDetailsArray[
          this.wordType
        ].unKnownArrayList = this.studentObject.studentWordDetailsArray[
          this.wordType
        ].unKnownArrayList.concat(obj.unKnownArrayList);

      obj.assessmentMethodTestDone = true;
      const index: number = this.studentObject.studentWordDetailsArray[
        this.wordType
      ].studentDatasetRecordList.indexOf(obj);
      console.log("index:" + index);
    }
  }
}
