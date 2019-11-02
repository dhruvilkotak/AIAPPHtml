import { Component } from "@angular/core";
import { Storage } from "@ionic/storage";
import { NavController, NavParams } from "ionic-angular";
import { PostTestWordDataRecordList } from "../../../models/postTestWordDataRecordList";
import { Student } from "../../../models/student";

@Component({
  selector: "page-viewPostAssessmentRecordList",
  templateUrl: "viewPostAssessmentRecordList.html"
})
export class ViewPostAssessmentRecordList {
  private studentObject: Student = new Student();
  private postTestWordDataRecordListArray: Array<
    PostTestWordDataRecordList
  > = [];
  private wordType: number = 0;
  constructor(
    public navCtrl: NavController,
    private navParams: NavParams,
    private storage: Storage
  ) {}
  viewPostTestAssessment(index: number) {}
}
