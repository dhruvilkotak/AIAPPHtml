import { Component } from "@angular/core";
import { File } from "@ionic-native/file";
import { Storage } from "@ionic/storage";
import { ModalController, NavController, NavParams } from "ionic-angular";
import { Method } from "../../models/methodIntervetion";
import { OrganizationDetails } from "../../models/organizationDetails";
import { Student } from "../../models/student";

@Component({
  selector: "page-StudentdashBoaord",
  templateUrl: "studentDashBoard.html"
})
export class StudentdashBoard {
  private studentObject: Student = new Student();
  // private beginAssessmentDone:boolean ;
  private methodObjectArray: Array<Method> = [new Method("method name", 0)];
  private PreInterventionAssessmentResults: boolean = true;
  private knownWordLength: number = 0;
  private newLearnedWordLength: number = 0;
  private unKnownWordLength: number = 0;
  private learningWordsLength: number = 0;
  private ratio1 = 0;
  private ratio2 = 0;
  private error: String = "Error Message";
  private organizationDetails: OrganizationDetails = new OrganizationDetails();
  private isWord: boolean = true;
  private wordType: number = 0;
  constructor(
    public navCtrl: NavController,
    private navParams: NavParams,
    private storage: Storage,
    private file: File,
    public modalCtrl: ModalController
  ) {
    this.constructorMethod();
  }

  constructorMethod() {}
  public ionViewWillEnter() {
    this.constructorMethod();
  }

  refreshData() {
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
    if (
      this.studentObject.studentWordDetailsArray[this.wordType]
        .newKnownUnknownArrayList == null
    )
      this.studentObject.studentWordDetailsArray[
        this.wordType
      ].newKnownUnknownArrayList = [];

    this.knownWordLength = this.studentObject.studentWordDetailsArray[
      this.wordType
    ].knwonArrayList.length;
    this.unKnownWordLength = this.studentObject.studentWordDetailsArray[
      this.wordType
    ].unKnownArrayList.length;
    this.newLearnedWordLength = this.studentObject.studentWordDetailsArray[
      this.wordType
    ].newKnownUnknownArrayList.length;
    this.methodObjectArray = this.studentObject.studentWordDetailsArray[
      this.wordType
    ].methodArray;
    this.learningWordsLength = this.getLearningWordsLength();
  }

  getLearningWordsLength() {
    var learningWordsLength: number = 0;
    for (let methodObj of this.studentObject.studentWordDetailsArray[
      this.wordType
    ].methodArray) {
      console.log(
        "learningWordsLength:" +
          learningWordsLength +
          "  l:" +
          methodObj.methodIndex
      );
      if (
        methodObj.sessionsArray != null &&
        methodObj.sessionsArray.length > 0 &&
        methodObj.sessionsArray[methodObj.sessionsArray.length - 1]
          .unknownWordList != null
      )
        learningWordsLength +=
          methodObj.sessionsArray[methodObj.sessionsArray.length - 1]
            .unknownWordList.length;
    }

    return learningWordsLength;
  }

  viewAssessment() {}

  startInterventionTest(methodIndex: number) {
    // this.checkRatio(methodIndex);
  }

  doPostAssessment() {}

  viewStudentWords() {}

  checkRatio(methodIndex: number) {}

  goBackToView() {}

  changeWordType() {}
}
