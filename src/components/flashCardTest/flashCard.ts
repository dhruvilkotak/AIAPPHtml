import { Component } from '@angular/core';
import { File } from '@ionic-native/file';
import { WordData } from '../../models/wordData';
import { Student } from '../../models/student';
import { WordServices } from '../../services/wordServices';
import { NavController, NavParams, ViewController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { ArrayService } from '../../services/arrayService';
import { PreAssessmentFireBaseService } from '../../firebaseServices/PreAssessmentFireBaseService';
import { TextToSpeech } from '@ionic-native/text-to-speech';
import { OrganizationDetails } from '../../models/organizationDetails';
import { FlashcardService } from '../../services/flashcardService';

@Component({
  selector: 'page-blueflashcard',
  templateUrl: '../../htmlpages/blueflashcard/blueflashcard.html'
})


export class FlashCard {
  private wordDataObject: WordData = new WordData();
  private wordDataArray: Array<WordData> = [];
  private TestTitle: String = "";
  private currentCardNumber: number = 0;
  private totalCardNumber: number = 0;
  private wordServiceObject: WordServices = new WordServices();
  private studentObject: Student = new Student();
  private testIndex: number = 0;
  private arrayServiceObj: ArrayService = new ArrayService();
  private studentDataSetRecordIndex: number = -1;
  private organizationDetails: OrganizationDetails;
  private wordType: number = 0;
  private showAnswer: boolean = false;
  private flashcardService: FlashcardService = new FlashcardService();
  private number1: string = "";
  private number2: string = "";
  private operation: string = "";
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

    this.storage.get('wordType').then((val) => {
      var fileData: any = JSON.parse(val);
      this.wordType = fileData.wordType;

      this.storage.get('studentObject').then((val) => {
        var fileData: any = JSON.parse(val);
        this.studentObject = fileData.studentObject;

        this.storage.get('organizationDetails').then((val) => {
          var fileData: any = JSON.parse(val);
          this.organizationDetails = fileData.organizationDetails;

          this.storage.get('studentDataSetRecordIndex').then((val) => {
            var fileData: any = JSON.parse(val);
            this.studentDataSetRecordIndex = fileData.studentDataSetRecordIndex;

            this.storage.get('testIndex').then((val) => {
              var fileData: any = JSON.parse(val);
              this.testIndex = fileData.testIndex;
              this.TestTitle = "Assessment Test " + this.testIndex;

              console.log("test:" + this.TestTitle + "  index:" + this.studentDataSetRecordIndex);

              this.wordDataArray = this.arrayServiceObj.shuffle(this.studentObject.studentWordDetailsArray[this.wordType].studentDatasetRecordList[this.studentDataSetRecordIndex].datasetObject.wordList);
              this.totalCardNumber = this.wordDataArray.length;
              this.studentObject.studentWordDetailsArray[this.wordType].studentDatasetRecordList[this.studentDataSetRecordIndex].assessmentDataArrayObject[this.testIndex].totalWordList = this.wordDataArray.length;
              console.log("len: " + this.totalCardNumber + "  d:" + this.wordDataArray.length);

              if (this.totalCardNumber > 0) {
                this.studentObject.studentWordDetailsArray[this.wordType].studentDatasetRecordList[this.studentDataSetRecordIndex].assessmentDataArrayObject[this.testIndex].unknownWordList = [];
                this.studentObject.studentWordDetailsArray[this.wordType].studentDatasetRecordList[this.studentDataSetRecordIndex].assessmentDataArrayObject[this.testIndex].knownWordList = [];
                this.currentCardNumber = 1;
                this.wordDataObject = this.wordDataArray[this.currentCardNumber - 1];
                this.convertTextToMath(this.wordDataObject.wordText);

              }
              else {
                this.goBackToView(this.studentObject);
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
    this.studentObject.studentWordDetailsArray[this.wordType].studentDatasetRecordList[this.studentDataSetRecordIndex].assessmentDataArrayObject[this.testIndex].knownWordList.push(this.wordDataObject);
    if (this.currentCardNumber + 1 <= this.wordDataArray.length) {
      this.wordDataObject = this.wordDataArray[this.currentCardNumber];
      this.convertTextToMath(this.wordDataObject.wordText);
      this.currentCardNumber++;
    }
    else {
      console.log("else:green");
      this.studentObject.studentWordDetailsArray[this.wordType].studentDatasetRecordList[this.studentDataSetRecordIndex].assessmentDataArrayObject[this.testIndex].testStatus = true;
      if (this.testIndex > 0) {
        var known2Len = 0;
        var known1Len = 0;
        if (this.studentObject.studentWordDetailsArray[this.wordType].studentDatasetRecordList[this.studentDataSetRecordIndex].assessmentDataArrayObject[this.testIndex].knownWordList != null)
          known2Len = this.studentObject.studentWordDetailsArray[this.wordType].studentDatasetRecordList[this.studentDataSetRecordIndex].assessmentDataArrayObject[this.testIndex].knownWordList.length;

        if (this.studentObject.studentWordDetailsArray[this.wordType].studentDatasetRecordList[this.studentDataSetRecordIndex].assessmentDataArrayObject[this.testIndex - 1].knownWordList != null)
          known1Len = this.studentObject.studentWordDetailsArray[this.wordType].studentDatasetRecordList[this.studentDataSetRecordIndex].assessmentDataArrayObject[this.testIndex - 1].knownWordList.length;

        this.studentObject.studentWordDetailsArray[this.wordType].studentDatasetRecordList[this.studentDataSetRecordIndex].assessmentDataArrayObject[this.testIndex].consistancyPercentage =
          known2Len - known1Len;
      }
      this.goBackToView(this.studentObject);
    }
  }
  redCircleClick() {
    this.showAnswer = false;
    this.studentObject.studentWordDetailsArray[this.wordType].studentDatasetRecordList[this.studentDataSetRecordIndex].assessmentDataArrayObject[this.testIndex].unknownWordList.push(this.wordDataObject)
    if (this.currentCardNumber + 1 <= this.wordDataArray.length) {
      this.wordDataObject = this.wordDataArray[this.currentCardNumber];
      this.convertTextToMath(this.wordDataObject.wordText);
      this.currentCardNumber++;
    }
    else {
      console.log("else:red");
      this.studentObject.studentWordDetailsArray[this.wordType].studentDatasetRecordList[this.studentDataSetRecordIndex].assessmentDataArrayObject[this.testIndex].testStatus = true;
      if (this.testIndex > 0) {
        var known2Len = 0;
        var known1Len = 0;
        if (this.studentObject.studentWordDetailsArray[this.wordType].studentDatasetRecordList[this.studentDataSetRecordIndex].assessmentDataArrayObject[this.testIndex].knownWordList != null)
          known2Len = this.studentObject.studentWordDetailsArray[this.wordType].studentDatasetRecordList[this.studentDataSetRecordIndex].assessmentDataArrayObject[this.testIndex].knownWordList.length;

        if (this.studentObject.studentWordDetailsArray[this.wordType].studentDatasetRecordList[this.studentDataSetRecordIndex].assessmentDataArrayObject[this.testIndex - 1].knownWordList != null)
          known1Len = this.studentObject.studentWordDetailsArray[this.wordType].studentDatasetRecordList[this.studentDataSetRecordIndex].assessmentDataArrayObject[this.testIndex - 1].knownWordList.length;

        this.studentObject.studentWordDetailsArray[this.wordType].studentDatasetRecordList[this.studentDataSetRecordIndex].assessmentDataArrayObject[this.testIndex].consistancyPercentage =
          known2Len - known1Len;
      }
      this.goBackToView(this.studentObject);
    }
  }
  goBackToView(studentObject: Student) {
    if (Student != null) {
      var preAssessmentFireBaseService: PreAssessmentFireBaseService = new PreAssessmentFireBaseService(this.organizationDetails.organizationDetailsUID, this.wordType);
      if (this.testIndex >= 2) {
        studentObject.studentWordDetailsArray[this.wordType].studentDatasetRecordList[this.studentDataSetRecordIndex].sessionTestDone = true;
        preAssessmentFireBaseService.updateSessionTestDone(studentObject, this.studentDataSetRecordIndex);
      }
      //   this.studentServiceObject.updateStudentToFile(this.file,this.studentObject,this.studentServiceObject);
      this.storage.set('studentObject', JSON.stringify({ studentObject: this.studentObject }));
      preAssessmentFireBaseService.addAssessmentToStudent(studentObject, this.testIndex, this.studentDataSetRecordIndex);
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