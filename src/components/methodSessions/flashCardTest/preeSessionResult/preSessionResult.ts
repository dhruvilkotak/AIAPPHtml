import { Component } from "@angular/core";
import { File } from "@ionic-native/file";
import { Storage } from "@ionic/storage";
import { ModalController, NavController, NavParams } from "ionic-angular";
import { KnownUnknownWordData } from "../../../../models/knownUnknownWordData";
import { MethodSession } from "../../../../models/methodIntervetionSession";
import { MyMap } from "../../../../models/myMap";
import { OrganizationDetails } from "../../../../models/organizationDetails";
import { PreSessionResultTest } from "../../../../models/PreSessionAssessmentResultTest";
import { Student } from "../../../../models/student";
import { WordData } from "../../../../models/wordData";
import { IncrementalRehersalService } from "../../../../services/IncrementalRehersalService";
import { MyMApServices } from "../../../../services/MyMapServices";
import { TraditionalDrillPracticeService } from "../../../../services/TraditionalDrillPracticeService";
import { WordServices } from "../../../../services/wordServices";
import { MethodRatioSelection } from "../../../studentDashBoard/methodRatioSelection/methodRatioSelection";
import { ViewPreSessionUnKnownWord } from "./viewPreSessionUnknownWord/viewPreSessionUnKnownWord";

@Component({
  selector: "page-preSessionResult",
  templateUrl: "preSessionResult.html"
})
export class PreSessionResult {
  private error: String = "Error Message";
  private studentObject: Student = new Student();
  private sessionCounter: number = 0;
  private methodIndex: number = 0;
  private preSessionWordDataArray: Array<PreSessionResultTest> = [];
  private test1Map: MyMap = new MyMap();
  private test2Map: MyMap = new MyMap();
  private incrementalRehrsalService: IncrementalRehersalService = new IncrementalRehersalService();
  private wordServiceObj: WordServices = new WordServices();
  private tempUnknownList: Array<WordData> = [new WordData()];
  private testWordDataList: Array<WordData> = [new WordData()];
  private incrementalRehersalServiceObject: IncrementalRehersalService = new IncrementalRehersalService();
  private methodSessionObject: MethodSession = new MethodSession();
  //private remainUnknownWordArray:Array<WordData>=[];
  private dimethodStart: boolean = true;
  private ratio1: number = 0;
  private ratio2: number = 0;
  private oldUnknownWordData: Array<WordData> = [];

  private traditionalDrillPracticeService: TraditionalDrillPracticeService = new TraditionalDrillPracticeService();
  private organizationDetails: OrganizationDetails = new OrganizationDetails();
  private maxRatio2: number = 0;
  private maxRatio1: number = 0;
  private wordType: number = 0;

  constructor(
    private file: File,
    public navCtrl: NavController,
    private navParams: NavParams,
    private storage: Storage,
    public modalCtrl: ModalController
  ) {
    this.myConstructorMethod();
  }

  public ionViewWillEnter() {}

  myConstructorMethod() {}

  refreshObjects(ratio1: number, ratio2: number) {
    this.ratio1 = ratio1;
    this.ratio2 = ratio2;
    this.methodSessionObject.unknownWordList = [];
    this.oldUnknownWordData = [];
    console.log("session :" + this.sessionCounter);
    if (this.sessionCounter == 0) {
      this.balanceRatios(); // do everyTime {

      // later
      this.addUnknownWordDataListToMethod();
      console.log(
        "un length:",
        this.methodSessionObject.unknownWordList.length
      );
      var i: number = 0;
      var myMapServiceObject: MyMApServices = new MyMApServices();

      for (let uk2MapObj of this.methodSessionObject.unknownWordList) {
        if (i > this.ratio2)
          // i > 3
          break;
        myMapServiceObject.setObject(
          this.methodSessionObject.retentionWordList,
          uk2MapObj,
          false
        );
        myMapServiceObject.setObject(
          this.methodSessionObject.controlItems,
          uk2MapObj,
          false
        );
        i++;
      }
    } else if (this.sessionCounter >= 1) {
      i = 0;
      for (let presetObj of this.preSessionWordDataArray) {
        console.log("preset knonw:" + presetObj.isKnownWord);
        if (!presetObj.isKnownWord) {
          if (i < this.ratio2)
            this.methodSessionObject.unknownWordList.push(presetObj.wordData);
          else this.oldUnknownWordData.push(presetObj.wordData);
          i++;
        } else {
          if (
            this.studentObject.studentWordDetailsArray[this.wordType]
              .knownUnknownArrayList == null
          )
            this.studentObject.studentWordDetailsArray[
              this.wordType
            ].knownUnknownArrayList = [];
          if (
            this.studentObject.studentWordDetailsArray[this.wordType]
              .newKnownUnknownArrayList == null
          )
            this.studentObject.studentWordDetailsArray[
              this.wordType
            ].newKnownUnknownArrayList = [];
          // this.wordServiceObj.removeWordFromArray(this.studentObject.knownUnknownArrayList,presetObj.wordData);
          this.wordServiceObj.removeKnownUnKnownWordFromArray(
            this.studentObject.studentWordDetailsArray[this.wordType]
              .newKnownUnknownArrayList,
            presetObj.wordData
          );
          var knownUnknownWordDataObject: KnownUnknownWordData = new KnownUnknownWordData();
          knownUnknownWordDataObject.wordData = presetObj.wordData;
          knownUnknownWordDataObject.methodIndex = this.methodIndex;
          knownUnknownWordDataObject.wordId = presetObj.wordData.wordId;
          knownUnknownWordDataObject.methodName = this.studentObject.studentWordDetailsArray[
            this.wordType
          ].methodArray[this.methodIndex].methodName;
          knownUnknownWordDataObject.postAssessmentCounter = 0;
          this.studentObject.studentWordDetailsArray[
            this.wordType
          ].newKnownUnknownArrayList.push(knownUnknownWordDataObject);
        }
      }
      console.log(" me un:" + this.methodSessionObject.unknownWordList.length);
      console.log(
        " stu un:" +
          this.studentObject.studentWordDetailsArray[this.wordType]
            .unKnownArrayList.length
      );
      console.log(" old un:" + this.oldUnknownWordData.length);
      this.maxRatio2 =
        this.methodSessionObject.unknownWordList.length +
        this.studentObject.studentWordDetailsArray[this.wordType]
          .unKnownArrayList.length +
        this.oldUnknownWordData.length;
      this.balanceRatios();
      var j = 0;
      while (
        i < this.ratio2 &&
        j <
          this.studentObject.studentWordDetailsArray[this.wordType]
            .unKnownArrayList.length
      ) {
        this.methodSessionObject.unknownWordList.push(
          this.studentObject.studentWordDetailsArray[this.wordType]
            .unKnownArrayList[j++]
        );
        i++;
      }
    }
    this.addKnownWordDataListToMethod();
    console.log(
      "r1:" +
        this.ratio1 +
        "  r2:" +
        this.ratio2 +
        "  kn.leng:" +
        this.methodSessionObject.knownWordList.length
    );

    this.goBackToView();
  }

  updatePreSessionResultTest() {
    this.preSessionWordDataArray = this.incrementalRehrsalService.compareAssessment(
      this.test1Map,
      this.test2Map,
      this.preSessionWordDataArray
    );
  }

  startSession() {}

  getWordDataList() {
    console.log("  get word list r1:" + this.ratio1 + "  r2:" + this.ratio2);
    if (this.methodIndex == 0) {
      this.testWordDataList = this.incrementalRehersalServiceObject.startSessionTest(
        this.methodSessionObject,
        this.ratio1,
        this.ratio2
      );
    } else if (
      this.methodIndex == 1 &&
      this.methodSessionObject.unknownWordList.length <= this.ratio2
    ) {
      this.dimethodStart = true;
    } else if (this.methodIndex == 2) {
      this.testWordDataList = this.traditionalDrillPracticeService.getWorDataList(
        this.methodSessionObject,
        this.ratio2,
        this.ratio1
      );
    } else if (this.methodIndex == 3) {
      this.testWordDataList = this.traditionalDrillPracticeService.getWorDataList(
        this.methodSessionObject,
        this.ratio2,
        this.ratio1
      );
    }
  }

  goBackToView() {
    if (this.methodSessionObject != null) {
      this.storage.set(
        "methodSessionObject",
        JSON.stringify({ methodSessionObject: this.methodSessionObject })
      );
    }
    if (this.studentObject != null) {
      this.storage.set(
        "studentObject",
        JSON.stringify({ studentObject: this.studentObject })
      );
    }
  }

  showModalWord(wordDataObj: WordData) {
    let profileModal = this.modalCtrl.create(
      ViewPreSessionUnKnownWord,
      {
        wordDataObject: wordDataObj
      },
      {
        cssClass: "update-profile-modal"
      }
    );

    profileModal.present();
  }

  updateRatio() {
    let profileModal = this.modalCtrl.create(
      MethodRatioSelection,
      {
        methodIndex: this.methodIndex,
        studentObject: this.studentObject,
        organizationDetailsUID: this.organizationDetails.organizationDetailsUID,
        maxRatio2: this.maxRatio2,
        wordType: this.wordType
      },
      {
        cssClass: "update-profile-modal"
      }
    );
    profileModal.present();

    profileModal.onDidDismiss(data => {
      if (data != null) {
        var updated: boolean = data.updated;
        console.log("updated r1:" + data.ratio1 + "  r2:" + data.ratio2);
        if (updated) this.refreshObjects(data.ratio1, data.ratio2);
      }
    });
  }

  startDirectFirstSession(methodIndex: number) {}

  addKnownWordDataListToMethod() {}

  addUnknownWordDataListToMethod() {
    var j = 0;

    if (this.methodSessionObject.unknownWordList == null) {
      this.methodSessionObject.unknownWordList = [];
    }

    while (j < this.ratio2) {
      this.methodSessionObject.unknownWordList.push(
        this.studentObject.studentWordDetailsArray[this.wordType]
          .unKnownArrayList[j]
      );
      j++;
    }
  }

  balanceRatios() {
    console.log(
      "balance  maxr1:" + this.maxRatio1 + "  max r2:" + this.maxRatio2
    );
    if (this.methodIndex == 1) {
      var minMaxRatios: number = Math.min(this.maxRatio2, this.maxRatio1);
      if (this.ratio1 > minMaxRatios) {
        this.ratio1 = minMaxRatios;
      }
      if (this.ratio2 > minMaxRatios) {
        this.ratio2 = minMaxRatios;
      }
      if (this.ratio1 != this.ratio2) {
        this.ratio1 = Math.min(this.ratio1, this.ratio2);
        this.ratio2 = this.ratio1;
      }

      this.updateRatio1();
      this.updateRatio2();
    } else {
      if (this.methodIndex == 0) {
        if (this.ratio1 > this.maxRatio1) {
          this.ratio1 = this.maxRatio1;
          this.updateRatio1();
        }
      }

      if (this.ratio2 > this.maxRatio2) {
        this.ratio2 = this.maxRatio2;
        this.updateRatio2();
      }
    }
  }

  updateRatio2() {}

  updateRatio1() {}
}
