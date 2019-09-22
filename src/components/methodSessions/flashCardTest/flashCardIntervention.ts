import { Component } from '@angular/core';
import { File } from '@ionic-native/file';
import { NavController, NavParams, ViewController } from 'ionic-angular';
import { WordData } from '../../../models/wordData';
import { Student } from '../../../models/student';
import { methodInterventionWordData } from '../../../models/methodInterventionWordData';
import { MethodSession } from '../../../models/methodIntervetionSession';
import { SessionSummary } from './sessionSummary/sessionSummary';
import { Storage } from '@ionic/storage';
import { WordServices } from '../../../services/wordServices';
import { StudentFireBaseService } from '../../../firebaseServices/studentFireBaseService';
import { PreAssessmentFireBaseService } from '../../../firebaseServices/PreAssessmentFireBaseService';
import { TextToSpeech } from '@ionic-native/text-to-speech';
import { OrganizationDetails } from '../../../models/organizationDetails';
import { MethodStudentService } from '../../../firebaseServices/methodStudentService';
import { FlashcardService } from '../../../services/flashcardService';

@Component({
  selector: 'page-flashcard',
  templateUrl: '../../../htmlpages/flashcard/flashcard.html'
})


export class FlashCardIntervetion {
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
  methodInetrventionWordDataArray: Array<methodInterventionWordData>;
  private methodInterventionWordDataObj: methodInterventionWordData;
  private methodSessionObject: MethodSession;
  private startDate: Date;
  private endDate: Date;
  private wordServiceObj: WordServices = new WordServices();
  private wordType:number =0;
  private organizationDetails:OrganizationDetails =new OrganizationDetails();
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
            
            this.studentFireBaseService = new StudentFireBaseService (this.organizationDetails.organizationDetailsUID,this.wordType)
    
            storage.get('methodIndex').then((val) => {
              var fileData: any = JSON.parse(val);
              this.methodIndex = fileData.methodIndex;
      
              storage.get('methodSessionObject').then((val) => {
                var fileData: any = JSON.parse(val);
                this.methodSessionObject = fileData.methodSessionObject;
      
                storage.get('wordDataList').then((val) => {
                  var fileData: any = JSON.parse(val);
                  this.wordDataArray = fileData.wordDataList;
                  this.startDate = new Date();
      
                  this.sessionCounter = this.methodSessionObject.sessionIndex;
                  this.methodInetrventionWordDataArray = this.methodSessionObject.sessionWordDataList;
                  this.TestTitle = "Session " + this.sessionCounter;
                  this.methodSessionObject.totalOppurtunitiesToRespond = this.wordDataArray.length;
          
                  if (this.studentObject.studentWordDetailsArray[this.wordType].methodArray[this.methodIndex].sessionsArray == null)
                  this.studentObject.studentWordDetailsArray[this.wordType].methodArray[this.methodIndex].sessionsArray = [];
               
                  this.totalCardNumber = this.wordDataArray.length;
                  if (this.wordDataArray.length > 0) {
      
                    //   console.log("size:"+this.wordDataArray.length+" id:"+this.wordDataArray[0].wordId);
                    this.currentCardNumber = 1;
                    this.wordDataObject = this.wordDataArray[this.currentCardNumber - 1];
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
    });


  }
  greenCircleClick() {
    this.showAnswer = false;
    this.methodInterventionWordDataObj = this.getMethodSessionWordDataObject(this.wordDataObject);
    if (this.methodInterventionWordDataObj != null) {
      this.methodInterventionWordDataObj.knownTime++;
      this.methodInterventionWordDataObj.totalAskedTime++;
    }
    this.updateMethodSessionWordDataObject(this.methodInterventionWordDataObj);
    if (this.currentCardNumber + 1 <= this.wordDataArray.length) {
      this.wordDataObject = this.wordDataArray[this.currentCardNumber];
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
    this.methodInterventionWordDataObj = this.getMethodSessionWordDataObject(this.wordDataObject);
    if (this.methodInterventionWordDataObj != null) {
      this.methodInterventionWordDataObj.totalAskedTime++;
    }
    this.updateMethodSessionWordDataObject(this.methodInterventionWordDataObj);
    if (this.currentCardNumber + 1 <= this.wordDataArray.length) {
      this.wordDataObject = this.wordDataArray[this.currentCardNumber];
      this.convertTextToMath(this.wordDataObject.wordText);
            
      this.currentCardNumber++;
    }
    else {
      console.log("else:red");
      this.updateAllObjects();
      //     this.goBackToView();
    }
  }

  updateAllObjects() {
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
  updateMethodSessionWordDataObject(methodInterventionWordDataObj: methodInterventionWordData) {
    for (let obj of this.methodInetrventionWordDataArray) {
      if (obj.wordData.wordId == methodInterventionWordDataObj.wordData.wordId) {
        this.methodInetrventionWordDataArray[this.methodInetrventionWordDataArray.indexOf(obj)] = methodInterventionWordDataObj;
      }
    }
    return null;
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