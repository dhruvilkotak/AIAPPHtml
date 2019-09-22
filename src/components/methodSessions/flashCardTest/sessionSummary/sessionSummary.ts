import { Component } from '@angular/core';
import { File } from '@ionic-native/file';
import { NavController, NavParams, ViewController } from 'ionic-angular';
import { WordData } from '../../../../models/wordData';
import { Student } from '../../../../models/student';
import { methodInterventionWordData } from '../../../../models/methodInterventionWordData';
import { Storage } from '@ionic/storage';
import { StudentFireBaseService } from '../../../../firebaseServices/studentFireBaseService';
import { OrganizationDetails } from '../../../../models/organizationDetails';
@Component({
  selector: 'page-sessionSummary',
  templateUrl: 'sessionSummary.html'
})


export class SessionSummary{
      private studentObject:Student=new Student();
      private methodIndex:number;
      private methodName:string="";
      private totalWordsResponded:number;
      private error: String  = "Error Message";
      private sessionDate:String="";
      private sessionCounter:number;
      private TestTitle:String="";
      private sessionWordList:Array<methodInterventionWordData>=[];
      private completionTime="";
      private organizationDetails: OrganizationDetails = new OrganizationDetails();
      private oldUnknownWordData: Array<WordData> = [];
      //private studentObject:Student;
      methodInetrventionWordDataArray:Array<methodInterventionWordData>;
      private wordType:number=0;
    
    
  constructor(private file:File,
    public navCtrl: NavController,
    private navParams:NavParams,
    private viewCtrl:ViewController,
    private storage:Storage) {

      this.storage.get('organizationDetails').then((val) => {
        var fileData:any = JSON.parse(val);
        this.organizationDetails = fileData.organizationDetails;
  
       
        this.storage.get('wordType').then((val) => {
          var fileData:any = JSON.parse(val);
          this.wordType = fileData.wordType;
          
          storage.get('studentObject').then((val) => {
            var fileData:any = JSON.parse(val);
            this.studentObject = fileData.studentObject;
      
            
            storage.get('methodIndex').then((val) => {
              var fileData:any = JSON.parse(val);
              this.methodIndex = fileData.methodIndex;
              this.methodName=this.studentObject.studentWordDetailsArray[this.wordType].methodArray[this.methodIndex].methodName;
              console.log("methodIndex:"+this.methodIndex);
              storage.get('sessionCounter').then((val) => {
                var fileData:any = JSON.parse(val);
                this.sessionCounter = fileData.sessionCounter;
               
                storage.get('oldUnknownWordData').then((val) => {
                  var fileData:any = JSON.parse(val);
                  this.oldUnknownWordData = fileData.oldUnknownWordData;
                 if(this.oldUnknownWordData!=null)
                    this.moveUnknownWordDataBack()
                  
                });  
                this.sessionDate=this.studentObject.studentWordDetailsArray[this.wordType].methodArray[this.methodIndex].sessionsArray[this.sessionCounter].sessionDate;
                this.totalWordsResponded=this.studentObject.studentWordDetailsArray[this.wordType].methodArray[this.methodIndex].sessionsArray[this.sessionCounter].totalOppurtunitiesToRespond;
                this.TestTitle="Session "+this.sessionCounter;
                this.sessionWordList=this.studentObject.studentWordDetailsArray[this.wordType].methodArray[this.methodIndex].sessionsArray[this.sessionCounter].sessionWordDataList;
                console.log("flashcard detaails:"+this.studentObject.studentWordDetailsArray[this.wordType].methodArray[this.methodIndex].sessionsArray[this.sessionCounter].sessionWordDataList.length);
                this.completionTime= this.studentObject.studentWordDetailsArray[this.wordType].methodArray[this.methodIndex].sessionsArray[this.sessionCounter].sessionCompletedTime+"";
              });
            });
        });
      });
    });
  }
 
  continue()
  {
    this.updateAllObjects();
    
  }

  moveUnknownWordDataBack(){
    var i:number = 0 ;
    while(i<this.oldUnknownWordData.length)
    {
        this.studentObject.studentWordDetailsArray[this.wordType].unKnownArrayList.push(this.oldUnknownWordData[i]);
        i++;
    }
    var studentFirebaseService:StudentFireBaseService = new StudentFireBaseService(this.organizationDetails.organizationDetailsUID,this.wordType);
    studentFirebaseService.updateUnKnownList(this.studentObject);
   
}
  updateAllObjects()
  {
    if(this.studentObject.studentWordDetailsArray[this.wordType].methodArray[this.methodIndex].sessionsArray[this.sessionCounter]!=null)
        this.storage.set('methodSessionObject',JSON.stringify({ methodSessionObject: this.studentObject.studentWordDetailsArray[this.wordType].methodArray[this.methodIndex].sessionsArray[this.sessionCounter] }) );
    
    if(this.studentObject!=null)
    {

      this.storage.set('studentObject',JSON.stringify({ studentObject: this.studentObject }) );
      this.goBackToView();
    }
  
    
  }
  goBackToView()
  {
    this.navCtrl.pop();
  }

 
}