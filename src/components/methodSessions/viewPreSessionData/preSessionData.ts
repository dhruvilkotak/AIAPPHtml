import { Component } from "@angular/core";
import { NavController, NavParams } from "ionic-angular";
import { Student } from "../../../models/student";
import { IncrementalRehersalService } from "../../../services/IncrementalRehersalService";
import { WordData } from "../../../models/wordData";
import { MethodSession } from "../../../models/methodIntervetionSession";
import { PreSessionFlashCard } from "../flashCardTest/preSessionFlashCardTest/preSessionFlashCard";
import { File } from "@ionic-native/file";
import { MyMap } from "../../../models/myMap";
import { MyMApServices } from "../../../services/MyMapServices";
import { Storage } from "@ionic/storage";
import { SessionList } from "../sessionsList/sessionList";
import { TraditionalDrillPracticeService } from "../../../services/TraditionalDrillPracticeService";
import { LineChart } from "../../charts/lineCharts/lineCharts";

@Component({
  selector: "page-preSessionData",
  templateUrl: "preSessionData.html"
})
export class PreSessionView {
  private studentObject: Student = new Student();
  private methodIndex: number = 0;
  private methodName: string = "";
  private totalSessions: number = 0;
  private sessionCounter: number = 0;
  private error: String = "Error Message";
  private incrementalRehersalServiceObject: IncrementalRehersalService = new IncrementalRehersalService();
  private traditionalDrillPracticeService: TraditionalDrillPracticeService = new TraditionalDrillPracticeService();
  //session details
  private wordDataList: Array<WordData> = [new WordData(), new WordData()];
  private knownWordDataList: Array<WordData> = [new WordData(), new WordData()];
  private unKnownWordDataList: Array<WordData> = [
    new WordData(),
    new WordData()
  ];
  private ratio1: number = 0;
  private ratio2: number = 0;
  private myMapServiceObject: MyMApServices = new MyMApServices();
  private methodSessionObject: MethodSession = new MethodSession();
  private previousUnknownArray: Array<WordData> = [
    new WordData(),
    new WordData()
  ];
  private wordType: number = 0;

  constructor(
    private file: File,
    public navCtrl: NavController,
    private navParams: NavParams,
    private storage: Storage
  ) {}

  public ionViewWillEnter() {
    console.log("ionviewwill");
  }

  startNextSession() {}

  doAssessmentTest(
    studentObject: Student,
    methodIndex: number,
    sessionCounter: number
  ) {}

  goBackToView() {}

  sessionSummaries() {}
  viewGraphData() {}

  setuk1MapValues(controlItem: MyMap, previousUnknownArray: Array<WordData>) {
    var returnMap: MyMap = new MyMap();
    console.log("control11:");
    this.myMapServiceObject.printMyMap(controlItem);

    for (let wordObj of previousUnknownArray) {
      if (this.myMapServiceObject.has(controlItem, wordObj)) {
        this.myMapServiceObject.setObject(
          returnMap,
          wordObj,
          this.myMapServiceObject.getValue(controlItem, wordObj)
        );
      } else {
        this.myMapServiceObject.setObject(returnMap, wordObj, false);
      }
    }
    return returnMap;
  }
}
