import { Component } from "@angular/core";
import { NavController, NavParams } from "ionic-angular";
import { StartNewPostAssessment } from "../startNewPostAssessment/startNewPostAssessment";
import { ViewPostAssessmentRecordList } from "../viewPostAssessment/viewPostAssessmentRecordList";
import { Storage } from "@ionic/storage";
import { Student } from "../../../models/student";
import { ViewPostAssessmentList } from "../viewPostAssessmentList/ViewPostAssessmentList";


@Component({
    selector: 'page-PostAssessmentDashBoard',
    templateUrl: 'PostAssessmentDashBoard.html'
  })
export class PostAssessmentDashBoard{

    private error:string="";
    private studentObject:Student=new Student();
    private lastPostAssessment:number=-1; 
    private wordType:number = 0;
    constructor(public navCtrl: NavController,
      private storage:Storage,
      private navParams:NavParams) {
      
      this.storage.set('testIndex',null );   
      
      this.storage.get('wordType').then((val) => {
        var fileData:any = JSON.parse(val);
        this.wordType = fileData.wordType;
   
        this.storage.get('studentObject').then((val) => {
          var fileData:any = JSON.parse(val);
          this.studentObject = fileData.studentObject;
          
            if(this.studentObject.studentWordDetailsArray[this.wordType].postTestWordDataRecordListArray==null)
              this.studentObject.studentWordDetailsArray[this.wordType].postTestWordDataRecordListArray=[];
            this.lastPostAssessment = this.studentObject.studentWordDetailsArray[this.wordType].postTestWordDataRecordListArray.length-1;
        });
      });
    }

    public ionViewWillEnter() {

      this.storage.set('testIndex',null );   
      this.storage.get('studentObject').then((val) => {
      
        var fileData:any = JSON.parse(val);
        this.studentObject = fileData.studentObject;
        if(this.studentObject.studentWordDetailsArray[this.wordType].postTestWordDataRecordListArray==null)
          this.studentObject.studentWordDetailsArray[this.wordType].postTestWordDataRecordListArray=[];
        this.lastPostAssessment = this.studentObject.studentWordDetailsArray[this.wordType].postTestWordDataRecordListArray.length-1;
      });
  } 
    startNewPostAssessment()
    {
      if(this.lastPostAssessment>=0)
      {
        if(this.studentObject.studentWordDetailsArray[this.wordType].postTestWordDataRecordListArray[this.lastPostAssessment].subTestCompleted == this.studentObject.studentWordDetailsArray[this.wordType].postTestWordDataRecordListArray[this.lastPostAssessment].maxTest)
        {
          console.log("last index:"+this.lastPostAssessment +"  start new");
          this.navCtrl.push(StartNewPostAssessment);
        }
        else{
          console.log("last index:"+this.lastPostAssessment+" continue");
          this.storage.set('testIndex',JSON.stringify({ testIndex: this.lastPostAssessment }) );   
          this.navCtrl.push(ViewPostAssessmentList);
        }
      }
      else{
        console.log("last index:"+this.lastPostAssessment +"  start new");
        this.navCtrl.push(StartNewPostAssessment);
      }
    
    }
    viewPostAssessmentList()
    {
      this.navCtrl.push(ViewPostAssessmentRecordList);
    }
}