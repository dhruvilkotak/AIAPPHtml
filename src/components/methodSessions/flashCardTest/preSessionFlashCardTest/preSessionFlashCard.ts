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

    this.storage.get('wordType').then((val) => {
      var fileData: any = JSON.parse(val);
      this.wordType = fileData.wordType;
      //this.TestTitle= "Assessment Test ";//test index
      storage.get('studentObject').then((val) => {
        var fileData: any = JSON.parse(val);
        this.studentObject = fileData.studentObject;

        storage.get('methodIndex').then((val) => {
          var fileData: any = JSON.parse(val);
          this.methodIndex = fileData.methodIndex;

          storage.get('methodSessionObject').then((val) => {
            var fileData: any = JSON.parse(val);
            this.methodSessionObject = fileData.methodSessionObject;

            storage.get('sessionCounter').then((val) => {
              var fileData: any = JSON.parse(val);
              this.sessionCounter = fileData.sessionCounter;

              this.TestTitle = "Assessment Test for Session " + this.sessionCounter;
              console.log("test:" + this.TestTitle);
              console.log("ret:");
              this.myMapServiceObject.printMyMap(this.methodSessionObject.retentionWordList);
              console.log("con:");
              this.myMapServiceObject.printMyMap(this.methodSessionObject.controlItems);
              this.wordDataArray = Array.from(this.methodSessionObject.retentionWordList.keys);

              if (this.wordDataArray.length < this.studentObject.studentWordDetailsArray[this.wordType].methodArray[this.methodIndex].ratio2) {
                var n: number = this.studentObject.studentWordDetailsArray[this.wordType].methodArray[this.methodIndex].ratio2 - this.wordDataArray.length;
                while (n > 0) {
                  this.wordDataArray.push(this.studentObject.studentWordDetailsArray[this.wordType].unKnownArrayList[this.wordDataArray.length]);
                  n--;
                }

              }
              this.arrayService.shuffle(this.wordDataArray);
              this.sessionControlItems = new MyMap();
              this.totalCardNumber = this.wordDataArray.length;
              if (this.wordDataArray.length > 0) {

                console.log("size:" + this.wordDataArray.length + " id:");
                this.currentCardNumber = 1;
                this.wordDataObject = this.wordDataArray[this.currentCardNumber - 1];
                this.convertTextToMath(this.wordDataObject.wordText);
              }
              else {
                console.log("size:" + this.wordDataArray.length + " id:");
                this.navCtrl.pop();
              }


            });

          });

        });
      });
    });
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
    this.goBackToView();
    console.log("session control items:" + this.sessionControlItems.values);
    this.storage.set('studentObject', JSON.stringify({ studentObject: this.studentObject }));
    this.storage.set('methodIndex', JSON.stringify({ methodIndex: this.methodIndex }));
    this.storage.set('sessionCounter', JSON.stringify({ sessionCounter: this.sessionCounter }));
    this.storage.set('methodSessionObject', JSON.stringify({ methodSessionObject: this.methodSessionObject }));
    this.myMapServiceObject.printMyMap(this.methodSessionObject.retentionWordList);
    this.myMapServiceObject.printMyMap(this.methodSessionObject.controlItems);
    this.navCtrl.push(PreSessionResult).then(() => {
      const startIndex = this.navCtrl.getActive().index - 1;
      this.navCtrl.remove(startIndex, 1);
    });
  }
  goBackToView() {
    if (this.methodSessionObject != null) {
      this.methodSessionObject.controlItems = this.sessionControlItems;

      this.storage.set('methodSessionObject', JSON.stringify({ methodSessionObject: this.methodSessionObject })).then(() => {

      });
    }
    if (this.studentObject != null) {
      //  this.studentServiceObject.updateStudentToFile(this.file,this.studentObject,this.studentServiceObject);
      this.storage.set('studentObject', JSON.stringify({ studentObject: this.studentObject }));
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