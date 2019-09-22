import { Component } from '@angular/core';
import { File } from '@ionic-native/file';
import { WordData } from '../../../models/wordData';
import { WordServices } from '../../../services/wordServices';
import { Student } from '../../../models/student';
import { ArrayService } from '../../../services/arrayService';
import { NavController, NavParams, ViewController, RangeKnob } from 'ionic-angular';
import { KnownUnknownWordData } from '../../../models/knownUnknownWordData';
import { PostTestWordData } from '../../../models/PostTestWordData';
import { PostTestWordDataRecordList } from '../../../models/postTestWordDataRecordList';
import { PostTestAssessmentService } from '../../../services/postTestAssessmentService';
import { Storage } from '@ionic/storage';
import { TextToSpeech } from '@ionic-native/text-to-speech';
import { OrganizationDetails } from '../../../models/organizationDetails';
import { FlashcardService } from '../../../services/flashcardService';

@Component({
  selector: 'page-blueflashcard',
  templateUrl: '../../../htmlpages/blueflashcard/blueflashcard.html'
})


export class PostAssessmentFlashCard {

  private postTestWordDataObject: PostTestWordData = new PostTestWordData();
  private wordDataObject: WordData = new WordData();


  private wordDataArray: Array<PostTestWordData> = [new PostTestWordData()];
  private TestTitle: String = "";
  private currentCardNumber: number = 0;
  private totalCardNumber: number = 0;
  private studentObject: Student = new Student();
  private testIndex: number = 0;
  private arrayServiceObj: ArrayService = new ArrayService();
  private subTestIndex: number = 0;
  postTestWordDataRecordListObject: PostTestWordDataRecordList = new PostTestWordDataRecordList();
  private totalKnownCounter: number = 0;
  private organizationDetails: OrganizationDetails = new OrganizationDetails();
  private wordType: number = 0;
  private showAnswer: boolean = false;
  private flashcardService: FlashcardService = new FlashcardService();
  private number1: string = "123";
  private number2: string = "1";
  private operation: string = "+";
  private result = [];
  ionViewDidLoad() {
    console.log("onviewdidload");
  }

  constructor(private file: File,
    public navCtrl: NavController,
    private navParams: NavParams,
    private viewCtrl: ViewController,
    private storage: Storage,
    private tts: TextToSpeech) {

   }

  greenCircleClick() {
    this.showAnswer = false;
    this.totalKnownCounter++;
    if (this.postTestWordDataObject.isKnown == null)
      this.postTestWordDataObject.isKnown = [];
    this.postTestWordDataObject.isKnown.push(true)
    if (this.postTestWordDataObject.totalKnownWord == null)
      this.postTestWordDataObject.totalKnownWord = 0;
    this.postTestWordDataObject.totalKnownWord++;

    if (this.currentCardNumber < this.wordDataArray.length) {

      this.postTestWordDataObject = this.wordDataArray[this.currentCardNumber];
      this.wordDataObject = this.postTestWordDataObject.wordData;
      this.convertTextToMath(this.postTestWordDataObject.wordData.wordText);
      this.currentCardNumber++;
    }
    else {
      console.log("else:green");
      this.goBackToView();
    }
  }
  redCircleClick() {
    this.showAnswer = false;
    if (this.postTestWordDataObject.isKnown == null)
      this.postTestWordDataObject.isKnown = [];

    this.postTestWordDataObject.isKnown.push(false)

    if (this.currentCardNumber < this.wordDataArray.length) {
      this.postTestWordDataObject = this.wordDataArray[this.currentCardNumber];
      this.wordDataObject = this.postTestWordDataObject.wordData;
      this.convertTextToMath(this.postTestWordDataObject.wordData.wordText);
      this.currentCardNumber++;
    }
    else {
      console.log("else:green");
      this.goBackToView();
    }
  }
  goBackToView() {
    if (this.studentObject.studentWordDetailsArray[this.wordType].postTestWordDataRecordListArray == null)
      this.studentObject.studentWordDetailsArray[this.wordType].postTestWordDataRecordListArray = [];

    this.postTestWordDataRecordListObject.postTestWordDataArray = this.wordDataArray;
    if (this.postTestWordDataRecordListObject.knownCounterArray == null) {
      this.postTestWordDataRecordListObject.knownCounterArray = [];
    }
    else {
      this.postTestWordDataRecordListObject.knownCounterArray[this.subTestIndex] = this.totalKnownCounter;
    }
    if (this.postTestWordDataRecordListObject.subTestCompleted == null)
      this.postTestWordDataRecordListObject.subTestCompleted = 0;
    this.postTestWordDataRecordListObject.subTestCompleted++;
    if (this.subTestIndex > 0) {
      if (this.postTestWordDataRecordListObject.consistancyPercentageArray == null) {
        this.postTestWordDataRecordListObject.consistancyPercentageArray = [];
      }
      this.postTestWordDataRecordListObject.consistancyPercentageArray[this.subTestIndex] =
        this.postTestWordDataRecordListObject.knownCounterArray[this.subTestIndex] -
        this.postTestWordDataRecordListObject.knownCounterArray[this.subTestIndex - 1];
    }

    var postTestAssessmentService: PostTestAssessmentService = new PostTestAssessmentService(this.organizationDetails.organizationDetailsUID, this.wordType);
    if (this.testIndex < this.studentObject.studentWordDetailsArray[this.wordType].postTestWordDataRecordListArray.length)
      this.studentObject.studentWordDetailsArray[this.wordType].postTestWordDataRecordListArray[this.testIndex] = this.postTestWordDataRecordListObject;
    else
      this.studentObject.studentWordDetailsArray[this.wordType].postTestWordDataRecordListArray.push(this.postTestWordDataRecordListObject);
    postTestAssessmentService.addPostTestWordDataRecordListObject(this.studentObject, this.testIndex);
    if (this.subTestIndex == 2)

      postTestAssessmentService.updateKnownUnknownWordData(this.studentObject, this.wordDataArray);

    if (Student != null) {
      //console.log("studentName:"+studentObject.firstName+" "+studentObject.lastName+" ass len:"+studentObject.assessmentDataArrayObject.length);
      this.storage.set('studentObject', JSON.stringify({ studentObject: this.studentObject }));
    }

    this.navCtrl.pop();
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