import { Component } from '@angular/core';
import { File } from '@ionic-native/file';
import { NavController, NavParams, ViewController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { Student } from '../../../../models/student';
import { WordData } from '../../../../models/wordData';
import { methodInterventionWordData } from '../../../../models/methodInterventionWordData';
import { MethodSession } from '../../../../models/methodIntervetionSession';
import { SessionSummary } from '../sessionSummary/sessionSummary';
import { DirectInstructionServices } from '../../../../services/DirectInstructionSevice';
import { WordServices } from '../../../../services/wordServices';
import { StudentFireBaseService } from '../../../../firebaseServices/studentFireBaseService';
import { PreAssessmentFireBaseService } from '../../../../firebaseServices/PreAssessmentFireBaseService';
import { TextToSpeech } from '@ionic-native/text-to-speech';
import { MethodStudentService } from '../../../../firebaseServices/methodStudentService';
import { OrganizationDetails } from '../../../../models/organizationDetails';
import { FlashcardService } from '../../../../services/flashcardService';

@Component({
  selector: 'page-flashcard',
  templateUrl: '../../../../htmlpages/flashcard/flashcard.html'
})


export class DIFlashCardSessionTest {
  private studentObject: Student = new Student();
  private methodIndex: number;
  private studentFireBaseService: StudentFireBaseService ;

  private wordDataObject: WordData = new WordData();
  private wordDataArray: Array<WordData> = [];
  private sessionCounter: number;
  private TestTitle: String;
  private currentCardNumber: number = 0;
  private totalCardNumber: number = 0;
  private testIndex: number = 0;
  private testFlag: number = 0; // testType="assessment" :0 ; "IncrementRehrsal" :1
  //private studentObject:Student;
  private methodInetrventionWordDataArray: Array<methodInterventionWordData>;
  private methodInterventionWordDataObj: methodInterventionWordData;
  private methodSessionObject: MethodSession;
  private DIServiceObject: DirectInstructionServices = new DirectInstructionServices();
  private ratio1: number = 0;
  private ratio2: number = 0;
  private startDate: Date;
  private endDate: Date;
  private wordServiceObj: WordServices = new WordServices();
  private organizationDetails:OrganizationDetails =new OrganizationDetails();
  private wordType:number = 0;
  private showAnswer:boolean = false;
  private flashcardService: FlashcardService = new FlashcardService();
  private number1:string="";
  private number2:string="";
  private operation:string="";
  private result=[];   

  ionViewDidLoad() {
    console.log("onviewdidload");
  }

  constructor(private file: File,
    private navCtrl: NavController,
    private navParams: NavParams,
    private viewCtrl: ViewController,
    private storage: Storage,
    private tts: TextToSpeech) {

      this.storage.get('wordType').then((val) => {
        var fileData:any = JSON.parse(val);
        this.wordType = fileData.wordType;
    
        storage.get('studentObject').then((val) => {
          var fileData: any = JSON.parse(val);
          this.studentObject = fileData.studentObject;
    
          this.storage.get('organizationDetails').then((val) => {
            var fileData:any = JSON.parse(val);
            this.organizationDetails = fileData.organizationDetails;
          
            this.studentFireBaseService = new StudentFireBaseService(this.organizationDetails.organizationDetailsUID,this.wordType);
    
            storage.get('methodIndex').then((val) => {
              var fileData: any = JSON.parse(val);
              this.methodIndex = fileData.methodIndex;
      
              storage.get('methodSessionObject').then((val) => {
                var fileData: any = JSON.parse(val);
                this.methodSessionObject = fileData.methodSessionObject;
      
      
                this.startDate = new Date();
                this.ratio1 = this.studentObject.studentWordDetailsArray[this.wordType].methodArray[this.methodIndex].ratio1;
                this.ratio2 = this.studentObject.studentWordDetailsArray[this.wordType].methodArray[this.methodIndex].ratio2;
                this.methodInetrventionWordDataArray = this.DIServiceObject.makeSessionList(this.methodSessionObject.knownWordList , this.methodSessionObject.unknownWordList, this.ratio1, this.ratio2);
                this.sessionCounter = this.methodSessionObject.sessionIndex;
                this.TestTitle = "Session " + this.sessionCounter;
                console.log("total otr:");
                console.log("total otr:"+this.studentObject.studentWordDetailsArray[this.wordType].methodArray[this.methodIndex].totalOppurtunitiesToRespond);
                if(this.studentObject.studentWordDetailsArray[this.wordType].methodArray[this.methodIndex].totalOppurtunitiesToRespond ==null || this.studentObject.studentWordDetailsArray[this.wordType].methodArray[this.methodIndex].totalOppurtunitiesToRespond==0)
                {
                  this.studentObject.studentData[this.wordType].methodArray[this.methodIndex].totalOppurtunitiesToRespond = 120;
                  // update to firebase too.
                  var methodStudentService: MethodStudentService = new MethodStudentService(this.organizationDetails.organizationDetailsUID,this.wordType);
                  methodStudentService.updateMethodOTR(this.studentObject,this.methodIndex);
                  this.storage.set('studentObject', JSON.stringify({ studentObject: this.studentObject }));
                }
                this.methodSessionObject.totalOppurtunitiesToRespond = this.studentObject.studentWordDetailsArray[this.wordType].methodArray[this.methodIndex].totalOppurtunitiesToRespond;
                this.totalCardNumber = this.methodSessionObject.totalOppurtunitiesToRespond;
                if (this.totalCardNumber > 0) {
                  this.currentCardNumber = 1;
                  this.methodInterventionWordDataObj = this.methodInetrventionWordDataArray[0];
                  this.wordDataObject = this.methodInterventionWordDataObj.wordData;
                  this.convertTextToMath(this.wordDataObject.wordText);
            
                }
                else {
                  this.navCtrl.pop();
                  //  console.log("size:"+this.wordDataArray.length+" id:"+this.wordDataArray[0].wordId);
                  //   this.updateAllObjects();
                }
      
              });
            });
          });
        });
    });


  }
  greenCircleClick() {
    // this.methodInterventionWordDataObj= this.getMethodSessionWordDataObject(this.wordDataObject);
    this.showAnswer = false;
    if (this.methodInterventionWordDataObj != null) {
      this.methodInterventionWordDataObj.knownTime++;
      this.methodInterventionWordDataObj.totalAskedTime++;
    }

    this.updateMethodSessionWordDataObject(this.methodInterventionWordDataObj, true);
    if (this.currentCardNumber + 1 <= this.totalCardNumber) {
      this.methodInterventionWordDataObj = this.methodInetrventionWordDataArray[0];
      this.wordDataObject = this.methodInterventionWordDataObj.wordData;
      this.convertTextToMath(this.wordDataObject.wordText);
            
      this.currentCardNumber++;
    }
    else {
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
    this.updateMethodSessionWordDataObject(this.methodInterventionWordDataObj, false);
    if (this.currentCardNumber + 1 <= this.totalCardNumber) {
      this.methodInterventionWordDataObj = this.methodInetrventionWordDataArray[0];
      this.wordDataObject = this.methodInterventionWordDataObj.wordData;
      this.convertTextToMath(this.wordDataObject.wordText);
            
      this.currentCardNumber++;
    }
    else {
      console.log("else:red");
      this.updateAllObjects();
    
    }
  }

  updateAllObjects(){
    var methodStudentServiceObj : MethodStudentService = new MethodStudentService(this.organizationDetails.organizationDetailsUID,this.wordType);
    methodStudentServiceObj.updateAllObjects(this.startDate,this.methodSessionObject,this.methodInetrventionWordDataArray,this.sessionCounter,this.studentObject ,this.methodIndex,this.storage);
     this.goBackToView();
  }
 goBackToView() {
    this.storage.set('studentObject', JSON.stringify({ studentObject: this.studentObject }));
    this.storage.set('methodIndex', JSON.stringify({ methodIndex: this.methodIndex }));
    this.storage.set('methodSessionObject', JSON.stringify({ methodSessionObject: this.methodSessionObject }));
    this.storage.set('sessionCounter', JSON.stringify({ sessionCounter: this.sessionCounter }));

    this.navCtrl.push(SessionSummary).then(() => {
      const startIndex = this.navCtrl.getActive().index - 2;
      this.navCtrl.remove(startIndex, 2);

    });
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

  updateMethodSessionWordDataObject(methodInterventionWordDataObj: methodInterventionWordData, KnownThisTime: boolean) {

 //   this.DIServiceObject.printmethodInetrventionWordDataArray(this.methodInetrventionWordDataArray);

    if (methodInterventionWordDataObj.isKnownWord) {
      this.DIServiceObject.removeObjectFromArray(this.methodInetrventionWordDataArray, 0);
      this.methodInetrventionWordDataArray.push(methodInterventionWordDataObj);
    }
    else {
      if (KnownThisTime) {//known 
        console.log("known word");
        if (!methodInterventionWordDataObj.drillmode) {
          console.log("unKnown item:yes  drill:not mode adding last:");
          this.DIServiceObject.removeObjectFromArray(this.methodInetrventionWordDataArray, 0);
          this.methodInetrventionWordDataArray.push(methodInterventionWordDataObj);
        }
        else {
          //put it after ratio2 steps , now put it after 2 steps
          methodInterventionWordDataObj.drillmodeKnownCounter++;
          this.DIServiceObject.removeObjectFromArray(this.methodInetrventionWordDataArray, 0);
          if (methodInterventionWordDataObj.drillmodeKnownCounter < 3) {
            console.log("unKnown item:yes   drill mode:yes adding 3rd index: drill mode known time counter:" + methodInterventionWordDataObj.drillmodeKnownCounter);
            this.DIServiceObject.addObjectToArray(this.methodInetrventionWordDataArray, methodInterventionWordDataObj, this.ratio2 - 1);

          }
          else {
            console.log("unKnown item:yes   drill mode:yes adding last index:");
            methodInterventionWordDataObj.drillmode = false;
            methodInterventionWordDataObj.drillmodeKnownCounter = 0;
            this.methodInetrventionWordDataArray.push(methodInterventionWordDataObj);
          }

        }
      }
      else { // this time unknown
        if (!methodInterventionWordDataObj.drillmode) {
          methodInterventionWordDataObj.drillmode = true;
        }
        
        console.log("unKnown item:yes   drill mode making:yes adding 3rd index:");
        methodInterventionWordDataObj.drillmodeKnownCounter = 0;
        this.DIServiceObject.removeObjectFromArray(this.methodInetrventionWordDataArray, 0);
        this.DIServiceObject.addObjectToArray(this.methodInetrventionWordDataArray, methodInterventionWordDataObj, this.ratio2 - 1);

      }
    }
  }

  textToSpeechWordData(text: string) {
    this.flashcardService.textToSpeechWordData(text, this.tts, this.showAnswer)

  }

  getAnswer(equation: string) {
    return this.flashcardService.getAnswer(equation);
  }

  flipCard() {
    this.showAnswer = !this.showAnswer;
  }

  convertTextToMath(mathString: String) {

    var convertTextToMathResult = this.flashcardService.convertTextToMath(mathString);
    this.result = convertTextToMathResult.result;
    this.operation = convertTextToMathResult.operation;
    this.number1 = convertTextToMathResult.number1;
    this.number2 = convertTextToMathResult.number2;
  }
}