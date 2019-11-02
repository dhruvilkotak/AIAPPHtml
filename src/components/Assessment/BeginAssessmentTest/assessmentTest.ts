import { Component } from "@angular/core";
import { NavController, NavParams, ModalController } from "ionic-angular";
import { Student } from "../../../models/student";
import { AssessmentTestData } from "../../../models/AssessmentTestData";
import { WordData } from "../../../models/wordData";
import { FlashCard } from "../../flashCardTest/flashCard";
import { Storage } from "@ionic/storage";
import { File } from "@ionic-native/file";

@Component({
  selector: "page-assessmentTest",
  templateUrl: "assessmentTest.html"
})
export class AssessmentTest {
  studentObject: Student = new Student();
  assessmentTestObjectArray: Array<AssessmentTestData> = [
    new AssessmentTestData(0)
  ];
  assessmentTestDataObject: AssessmentTestData = new AssessmentTestData(0);
  studentDataSetRecordIndex: number = 0;
  wordType: number = 0;
  datasetName: String = "dataset name";
  numberOfTest: number = 0;
  ConsistancyPercentage: Array<number> = [0, 0, 0];
  private error: String = "Error Message";
  constructor(
    private modalCtrl: ModalController,
    public navCtrl: NavController,
    private navParams: NavParams,
    private storage: Storage,
    private file: File
  ) {
    this.constructorMethod();
  }

  public ionViewWillEnter() {
    this.constructorMethod();
  }

  constructorMethod() {
    //   this.assessmentTestObjectArray = this.studentObject.studentWordDetailsArray[this.wordType].studentDatasetRecordList[this.studentDataSetRecordIndex].assessmentDataArrayObject;
    //  this.datasetName = this.studentObject.studentWordDetailsArray[this.wordType].studentDatasetRecordList[this.studentDataSetRecordIndex].datasetObject.datasetName;
    console.log("asse:" + this.assessmentTestObjectArray.length);
    this.numberOfTest = this.assessmentTestObjectArray.length;
  }

  startAssessmentTest(index: number) {
    if (this.assessmentTestObjectArray[index].testStatus) {
      this.error = " Test " + (index + 1) + " is already done";
    } else if (
      index > 0 &&
      !this.assessmentTestObjectArray[index - 1].testStatus
    ) {
      this.error = " First complete test " + index;
    }
  }

  goBackToView(studentObject: Student) {}
}
