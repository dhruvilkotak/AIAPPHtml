import { Component } from "@angular/core";
import { File } from "@ionic-native/file";
import { TextToSpeech } from "@ionic-native/text-to-speech";
import { Storage } from "@ionic/storage";
import { NavController, NavParams, ViewController } from "ionic-angular";
import { MethodInterventionWordData } from "../../../../models/methodInterventionWordData";
import { MethodSession } from "../../../../models/methodIntervetionSession";
import { OrganizationDetails } from "../../../../models/organizationDetails";
import { Student } from "../../../../models/student";
import { WordData } from "../../../../models/wordData";
import { DirectInstructionServices } from "../../../../services/DirectInstructionSevice";
import { FlashcardService } from "../../../../services/flashcardService";
import { WordServices } from "../../../../services/wordServices";

@Component({
  selector: "page-flashcard",
  templateUrl: "../../../../htmlpages/flashcard/flashcard.html"
})
export class DIFlashCardSessionTest {
  private studentObject: Student = new Student();
  private methodIndex: number = 0;

  private wordDataObject: WordData = new WordData();
  private wordDataArray: Array<WordData> = [new WordData()];
  private sessionCounter: number = 0;
  private TestTitle: String = "Test Title";
  private currentCardNumber: number = 0;
  private totalCardNumber: number = 0;
  private testIndex: number = 0;
  private testFlag: number = 0; // testType="assessment" :0 ; "IncrementRehrsal" :1
  //private studentObject:Student;
  private methodInetrventionWordDataArray: Array<MethodInterventionWordData> = [
    new MethodInterventionWordData()
  ];
  private methodInterventionWordDataObj: MethodInterventionWordData = new MethodInterventionWordData();
  private methodSessionObject: MethodSession = new MethodSession();
  private DIServiceObject: DirectInstructionServices = new DirectInstructionServices();
  private ratio1: number = 0;
  private ratio2: number = 0;
  private startDate: Date = new Date();
  private endDate: Date = new Date();
  private wordServiceObj: WordServices = new WordServices();
  private organizationDetails: OrganizationDetails = new OrganizationDetails();
  private wordType: number = 0;
  private showAnswer: boolean = false;
  private flashcardService: FlashcardService = new FlashcardService();
  private number1: string = "123";
  private number2: string = "23";
  private operation: string = "+";
  private result = [];

  ionViewDidLoad() {
    console.log("onviewdidload");
  }

  constructor(
    private file: File,
    private navCtrl: NavController,
    private navParams: NavParams,
    private viewCtrl: ViewController,
    private storage: Storage,
    private tts: TextToSpeech
  ) {}
  greenCircleClick() {
    // this.methodInterventionWordDataObj= this.getMethodSessionWordDataObject(this.wordDataObject);
    this.showAnswer = false;
    if (this.methodInterventionWordDataObj != null) {
      this.methodInterventionWordDataObj.knownTime++;
      this.methodInterventionWordDataObj.totalAskedTime++;
    }

    this.updateMethodSessionWordDataObject(
      this.methodInterventionWordDataObj,
      true
    );
    if (this.currentCardNumber + 1 <= this.totalCardNumber) {
      this.methodInterventionWordDataObj = this.methodInetrventionWordDataArray[0];
      this.wordDataObject = this.methodInterventionWordDataObj.wordData;
      this.convertTextToMath(this.wordDataObject.wordText);

      this.currentCardNumber++;
    } else {
      console.log("else:green");
      this.updateAllObjects();
      //    this.goBackToView();
    }
  }
  redCircleClick() {
    this.showAnswer = false;
    if (this.methodInterventionWordDataObj != null) {
      this.methodInterventionWordDataObj.totalAskedTime++;
    }
    this.updateMethodSessionWordDataObject(
      this.methodInterventionWordDataObj,
      false
    );
    if (this.currentCardNumber + 1 <= this.totalCardNumber) {
      this.methodInterventionWordDataObj = this.methodInetrventionWordDataArray[0];
      this.wordDataObject = this.methodInterventionWordDataObj.wordData;
      this.convertTextToMath(this.wordDataObject.wordText);

      this.currentCardNumber++;
    } else {
      console.log("else:red");
      this.updateAllObjects();
    }
  }

  updateAllObjects() {}
  goBackToView() {
    //this.navCtrl.pop();
  }

  getMethodSessionWordDataObject(wordDataObject: WordData) {
    for (let obj of this.methodInetrventionWordDataArray) {
      if (obj.wordData.wordId == wordDataObject.wordId) {
        return obj;
      }
    }
    return null;
  }

  updateMethodSessionWordDataObject(
    methodInterventionWordDataObj: MethodInterventionWordData,
    KnownThisTime: boolean
  ) {
    //   this.DIServiceObject.printmethodInetrventionWordDataArray(this.methodInetrventionWordDataArray);

    if (methodInterventionWordDataObj.isKnownWord) {
      this.DIServiceObject.removeObjectFromArray(
        this.methodInetrventionWordDataArray,
        0
      );
      this.methodInetrventionWordDataArray.push(methodInterventionWordDataObj);
    } else {
      if (KnownThisTime) {
        //known
        console.log("known word");
        if (!methodInterventionWordDataObj.drillmode) {
          console.log("unKnown item:yes  drill:not mode adding last:");
          this.DIServiceObject.removeObjectFromArray(
            this.methodInetrventionWordDataArray,
            0
          );
          this.methodInetrventionWordDataArray.push(
            methodInterventionWordDataObj
          );
        } else {
          //put it after ratio2 steps , now put it after 2 steps
          methodInterventionWordDataObj.drillmodeKnownCounter++;
          this.DIServiceObject.removeObjectFromArray(
            this.methodInetrventionWordDataArray,
            0
          );
          if (methodInterventionWordDataObj.drillmodeKnownCounter < 3) {
            console.log(
              "unKnown item:yes   drill mode:yes adding 3rd index: drill mode known time counter:" +
                methodInterventionWordDataObj.drillmodeKnownCounter
            );
            this.DIServiceObject.addObjectToArray(
              this.methodInetrventionWordDataArray,
              methodInterventionWordDataObj,
              this.ratio2 - 1
            );
          } else {
            console.log("unKnown item:yes   drill mode:yes adding last index:");
            methodInterventionWordDataObj.drillmode = false;
            methodInterventionWordDataObj.drillmodeKnownCounter = 0;
            this.methodInetrventionWordDataArray.push(
              methodInterventionWordDataObj
            );
          }
        }
      } else {
        // this time unknown
        if (!methodInterventionWordDataObj.drillmode) {
          methodInterventionWordDataObj.drillmode = true;
        }

        console.log(
          "unKnown item:yes   drill mode making:yes adding 3rd index:"
        );
        methodInterventionWordDataObj.drillmodeKnownCounter = 0;
        this.DIServiceObject.removeObjectFromArray(
          this.methodInetrventionWordDataArray,
          0
        );
        this.DIServiceObject.addObjectToArray(
          this.methodInetrventionWordDataArray,
          methodInterventionWordDataObj,
          this.ratio2 - 1
        );
      }
    }
  }

  textToSpeechWordData(text: string) {
    this.flashcardService.textToSpeechWordData(text, this.tts, this.showAnswer);
  }

  getAnswer(equation: string) {
    return this.flashcardService.getAnswer(equation);
  }

  flipCard() {
    this.showAnswer = !this.showAnswer;
  }

  convertTextToMath(mathString: String) {
    var convertTextToMathResult = this.flashcardService.convertTextToMath(
      mathString
    );
    this.result = convertTextToMathResult.result;
    this.operation = convertTextToMathResult.operation;
    this.number1 = convertTextToMathResult.number1;
    this.number2 = convertTextToMathResult.number2;
  }
}
