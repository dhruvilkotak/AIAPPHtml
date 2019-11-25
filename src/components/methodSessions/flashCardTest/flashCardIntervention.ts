import { Component } from '@angular/core';
import { File } from '@ionic-native/file';
import { NavController, NavParams, ViewController } from 'ionic-angular';
import { WordData } from '../../../models/wordData';
import { Student } from '../../../models/student';
import { MethodInterventionWordData } from '../../../models/methodInterventionWordData';
import { MethodSession } from '../../../models/methodIntervetionSession';
import { SessionSummary } from './sessionSummary/sessionSummary';
import { Storage } from '@ionic/storage';
import { WordServices } from '../../../services/wordServices';
import { TextToSpeech } from '@ionic-native/text-to-speech';
import { OrganizationDetails } from '../../../models/organizationDetails';
import { FlashcardService } from '../../../services/flashcardService';

@Component({
  selector: 'page-flashcard',
  templateUrl: '../../../htmlpages/flashcard/flashcard.html'
})


export class FlashCardIntervetion {
  private studentObject: Student = new Student();
  private methodIndex: number =0;
  private wordDataObject: WordData = new WordData();
  private wordDataArray: Array<WordData> = [new WordData()];
  private sessionCounter: number=0;
  private TestTitle: String = "Test Title";
  private currentCardNumber: number = 0;
  private totalCardNumber: number = 0;
  private testIndex: number = 0;
  private testFlag: number = 0; // testType="assessment" :0 ; "IncrementRehrsal" :1
  //private studentObject:Student;
  methodInetrventionWordDataArray: Array<MethodInterventionWordData> = [new MethodInterventionWordData()];
  private methodInterventionWordDataObj: MethodInterventionWordData = new MethodInterventionWordData();
  private methodSessionObject: MethodSession = new MethodSession();
  private startDate: Date = new Date();
  private endDate: Date = new Date();
  private wordServiceObj: WordServices = new WordServices();
  private wordType:number =0;
  private organizationDetails:OrganizationDetails =new OrganizationDetails();
  private showAnswer:boolean = false;
  private flashcardService: FlashcardService = new FlashcardService();
  private number1:string="123";
  private number2:string="1";
  private operation:string="+";
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
 
  }
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
  updateMethodSessionWordDataObject(methodInterventionWordDataObj: MethodInterventionWordData) {
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