import { Component } from "@angular/core";
import { Student } from "../../../models/student";
import { NavController, NavParams } from "ionic-angular";
import { PostTestWordDataRecordList } from "../../../models/postTestWordDataRecordList";
import { Storage } from "@ionic/storage";

@Component({
    selector: 'page-viewSubPostTestAssessmentRecord',
    templateUrl: 'viewSubPostTestAssessmentRecord.html'
  })

export class ViewSubPostTestAssessmentRecord{

    private error:string="";
    private studentObject:Student=new Student();
    private postTestWordDataRecordListObject:PostTestWordDataRecordList= new PostTestWordDataRecordList();
    private wordType:number = 0;
    private numbers:Array<number> =[];
    testIndex=-1;
    private totalKnowns:number=0;
    private totalUnKnowns:number = 0;

    constructor(public navCtrl: NavController,
      private storage:Storage,
      private navParams:NavParams) {
        
        
        this.storage.get('wordType').then((val) => {
          var fileData:any = JSON.parse(val);
          this.wordType = fileData.wordType;
     
          this.storage.get('studentObject').then((val) => {
          var fileData:any = JSON.parse(val);
          this.studentObject = fileData.studentObject;
          this.storage.get('testIndex').then((val) => {
              var fileData:any = JSON.parse(val);
              this.testIndex = fileData.testIndex;
              
              if(this.studentObject.studentWordDetailsArray[this.wordType].postTestWordDataRecordListArray!=null && this.testIndex < this.studentObject.studentWordDetailsArray[this.wordType].postTestWordDataRecordListArray.length)
              {
                  this.postTestWordDataRecordListObject= this.studentObject.studentWordDetailsArray[this.wordType].postTestWordDataRecordListArray[this.testIndex];
                  this.numbers = Array.from(Array(this.postTestWordDataRecordListObject.subTestCompleted).keys());
                  this.countKnownWords();
              }
                
          });
        });   
      });
    }
  
    countKnownWords(){
      for(let postTestWordDataObj of this.postTestWordDataRecordListObject.postTestWordDataArray) {
        if(postTestWordDataObj.totalKnownWord >= Math.round(0.67 * this.numbers.length)){
          this.totalKnowns++;
        }
        else{
          this.totalUnKnowns++;
        }
      }
    }
}