import { Component } from '@angular/core';
import { File } from '@ionic-native/file';
import { NavController, NavParams, ViewController } from 'ionic-angular';
import { WordData } from '../../../../models/wordData';
import { Student } from '../../../../models/student';
import { PreSessionResult } from '../preeSessionResult/preSessionResult';
import { MethodSession } from '../../../../models/methodIntervetionSession';
import { MyMap } from '../../../../models/myMap';
import { MyMApServices } from '../../../../services/MyMapServices';
import { Storage } from '@ionic/storage';
import { ArrayService } from '../../../../services/arrayService';
import { TextToSpeech } from '@ionic-native/text-to-speech';
import { FlashcardService } from '../../../../services/flashcardService';

@Component({
  selector: 'page-blueflashcard',
  templateUrl: '../../../../htmlpages/blueflashcard/blueflashcard.html'
})


export class PreSessionFlashCard {
  private studentObject: Student = new Student();
  private methodIndex: number;
  private sessionCounter: number;

  private wordDataObject: WordData = new WordData();
  private wordDataArray: Array<WordData> = [];
  private TestTitle: String = "";
  private currentCardNumber: number = 0;
  private totalCardNumber: number = 0;
  private testIndex: number = 0;
  private sessionControlItems: MyMap = new MyMap();
  private methodSessionObject: MethodSession = new MethodSession();
  private myMapServiceObject: MyMApServices = new MyMApServices();
  private arrayService: ArrayService = new ArrayService();
  private wordType: number = 0;
  private showAnswer: boolean = false;
  private flashcardService: FlashcardService = new FlashcardService();
  private number1: string = "";
  private number2: string = "";
  private operation: string = "";
  private result = [];

  constructor(private file: File,
    private navCtrl: NavController,
    private navParams: NavParams,
    private viewCtrl: ViewController,
    private storage: Storage,
    private tts: TextToSpeech) {

   
  }
  greenCircleClick() {
    this.showAnswer = false;
    this.myMapServiceObject.setObject(this.sessionControlItems, this.wordDataObject, true);
    if (this.currentCardNumber + 1 <= this.wordDataArray.length) {
      this.wordDataObject = this.wordDataArray[this.currentCardNumber];
      this.convertTextToMath(this.wordDataObject.wordText);
      this.currentCardNumber++;
    }
    else {
      console.log("else:green");
      this.goBackToView();
      this.gotopreSessionResult();
    }
  }
  redCircleClick() {
    this.showAnswer = false;
    this.myMapServiceObject.setObject(this.sessionControlItems, this.wordDataObject, false);
    if (this.currentCardNumber + 1 <= this.wordDataArray.length) {
      this.wordDataObject = this.wordDataArray[this.currentCardNumber];
      this.convertTextToMath(this.wordDataObject.wordText);
      this.currentCardNumber++;
    }
    else {
      console.log("else:red");
      this.gotopreSessionResult();
    }
  }

  gotopreSessionResult() {
  
  }
  goBackToView() {
  
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