import { Component } from "@angular/core";
import { Storage } from "@ionic/storage";
import { NavController, NavParams } from "ionic-angular";
import { Student } from "../../../models/student";

@Component({
  selector: "page-PostAssessmentDashBoard",
  templateUrl: "PostAssessmentDashBoard.html"
})
export class PostAssessmentDashBoard {
  private error: String = "Error Message";
  private studentObject: Student = new Student();
  private lastPostAssessment: number = 0;
  private wordType: number = 0;
  constructor(
    public navCtrl: NavController,
    private storage: Storage,
    private navParams: NavParams
  ) {}

  public ionViewWillEnter() {}
  startNewPostAssessment() {}
  viewPostAssessmentList() {}
}
