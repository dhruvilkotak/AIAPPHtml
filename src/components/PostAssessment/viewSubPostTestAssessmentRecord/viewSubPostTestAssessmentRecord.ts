import { Component } from "@angular/core";
import { Storage } from "@ionic/storage";
import { NavController, NavParams } from "ionic-angular";
import { PostTestWordDataRecordList } from "../../../models/postTestWordDataRecordList";
import { Student } from "../../../models/student";

@Component({
  selector: 'page-viewSubPostTestAssessmentRecord',
  templateUrl: 'viewSubPostTestAssessmentRecord.html'
})

export class ViewSubPostTestAssessmentRecord {

  private error: String = "Error Message";
  private studentObject: Student = new Student();
  private postTestWordDataRecordListObject: PostTestWordDataRecordList = new PostTestWordDataRecordList();
  private wordType: number = 0;
  private numbers: Array<number> = [1, 2, 3];
  testIndex = 0;
  private totalKnowns: number = 0;
  private totalUnKnowns: number = 0;

  constructor(public navCtrl: NavController,
    private storage: Storage,
    private navParams: NavParams) {
  }

  countKnownWords() {
    for (let postTestWordDataObj of this.postTestWordDataRecordListObject.postTestWordDataArray) {
      if (postTestWordDataObj.totalKnownWord >= Math.round(0.67 * this.numbers.length)) {
        this.totalKnowns++;
      }
      else {
        this.totalUnKnowns++;
      }
    }
  }
}