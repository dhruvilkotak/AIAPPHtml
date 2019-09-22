import { Component } from '@angular/core';
import { NavController, NavParams, ModalController } from 'ionic-angular';
import { Student } from '../../models/student';
import { Method } from '../../models/methodIntervetion';
import { PreSessionView } from '../methodSessions/viewPreSessionData/preSessionData';
import { Storage } from '@ionic/storage';
import { File } from '@ionic-native/file';
import { ViewStudentAllWords } from './ViewStudentAllWords/viewStudentAllWords';
import { PostAssessmentDashBoard } from '../PostAssessment/postAssessmentDashBoard/postAssessmentDashBoard';
import { ViewStudentDatasetRecordList } from '../Assessment/viewStudentDatasetRecordList/viewStudentDatasetRecordList';
import { MethodRatioSelection } from './methodRatioSelection/methodRatioSelection';
import { OrganizationDetails } from '../../models/organizationDetails';
import { PreSessionResult } from '../methodSessions/flashCardTest/preeSessionResult/preSessionResult';
import { MethodSession } from '../../models/methodIntervetionSession';

@Component({
  selector: 'page-StudentdashBoaord',
  templateUrl: 'studentDashBoard.html'
})
export class StudentdashBoard {

    private studentObject: Student = new Student();
   // private beginAssessmentDone:boolean ;
    private methodObjectArray:Array<Method>=[];
    private PreInterventionAssessmentResults:boolean;
    private knownWordLength:number=0;
    private newLearnedWordLength:number=0;
    private unKnownWordLength:number=0;
    private learningWordsLength:number=0;
    private ratio1=0;
    private ratio2=0;
    private error: String  = "Error Message";
    private organizationDetails:OrganizationDetails=new OrganizationDetails();
    private isWord:boolean = true;
    private wordType:number = 0;
    constructor(public navCtrl: NavController,
      private navParams:NavParams, 
      private storage:Storage,
      private file:File,
      public modalCtrl: ModalController) {
        this.constructorMethod();
      
    }

    constructorMethod(){
      this.storage.set('wordType',JSON.stringify({ wordType: this.wordType }) );
   
      this.storage.get('studentObject').then((val) => {
        var fileData:any = JSON.parse(val);
        this.studentObject = fileData.studentObject;
      
        this.storage.get('organizationDetails').then((val) => {
          var fileData:any = JSON.parse(val);
          this.organizationDetails = fileData.organizationDetails;
          this.refreshData();
        });

        
      });
    }
  public ionViewWillEnter() {
    
    this.constructorMethod();
}

refreshData(){

  if(this.studentObject.studentWordDetailsArray[this.wordType].knwonArrayList==null)
    this.studentObject.studentWordDetailsArray[this.wordType].knwonArrayList=[];
  if(this.studentObject.studentWordDetailsArray[this.wordType].unKnownArrayList==null)
    this.studentObject.studentWordDetailsArray[this.wordType].unKnownArrayList=[];
  if(this.studentObject.studentWordDetailsArray[this.wordType].newKnownUnknownArrayList==null)
    this.studentObject.studentWordDetailsArray[this.wordType].newKnownUnknownArrayList=[];
  
  this.knownWordLength=this.studentObject.studentWordDetailsArray[this.wordType].knwonArrayList.length;
  this.unKnownWordLength=this.studentObject.studentWordDetailsArray[this.wordType].unKnownArrayList.length;
  this.newLearnedWordLength=this.studentObject.studentWordDetailsArray[this.wordType].newKnownUnknownArrayList.length;
  this.methodObjectArray=this.studentObject.studentWordDetailsArray[this.wordType].methodArray;
  this.learningWordsLength = this.getLearningWordsLength();
}

getLearningWordsLength(){
  
  var learningWordsLength:number=0;
   for(let methodObj of this.studentObject.studentWordDetailsArray[this.wordType].methodArray)
   {
     console.log("learningWordsLength:"+learningWordsLength+"  l:"+methodObj.methodIndex);
      if(methodObj.sessionsArray!=null && methodObj.sessionsArray.length>0 &&  methodObj.sessionsArray[methodObj.sessionsArray.length-1].unknownWordList !=null)
       learningWordsLength += methodObj.sessionsArray[methodObj.sessionsArray.length-1].unknownWordList.length;
   }
  
  return learningWordsLength;

}

  viewAssessment(){
    this.storage.set('studentObject',JSON.stringify({ studentObject: this.studentObject }) );
    this.navCtrl.push(ViewStudentDatasetRecordList);
  }

  startInterventionTest(methodIndex:number)
  {
   // this.checkRatio(methodIndex);

     if(this.studentObject.studentWordDetailsArray[this.wordType].methodArray[methodIndex].sessionsArray == null)
       this.studentObject.studentWordDetailsArray[this.wordType].methodArray[methodIndex].sessionsArray = [];
     var sessionCounter= this.studentObject.studentWordDetailsArray[this.wordType].methodArray[methodIndex].sessionsArray.length;
     
     this.storage.set('studentObject',JSON.stringify({ studentObject: this.studentObject }) );
     this.storage.set('methodIndex',JSON.stringify({ methodIndex: methodIndex }) );
    
     if(sessionCounter == 0)
     {
        var methodSessionObject:MethodSession= new MethodSession();
        //set method session attribute
        methodSessionObject.sessionIndex=sessionCounter;
      
        this.storage.set('methodSessionObject',JSON.stringify({ methodSessionObject: methodSessionObject }) );
        this.storage.set('sessionCounter',JSON.stringify({ sessionCounter: sessionCounter }) );
        this.navCtrl.push(PreSessionResult).then(()=>{
                        this.goBackToView();
        });   
     }
     else{
      this.storage.set('methodIndex',JSON.stringify({ methodIndex: methodIndex }));
      this.navCtrl.push(PreSessionView);
      this.error="";  
     }
     
  }

  doPostAssessment(){
    this.storage.set('studentObject',JSON.stringify({ studentObject: this.studentObject }) );
    this.navCtrl.push(PostAssessmentDashBoard);
  }

  viewStudentWords()
  {
      this.storage.set('studentObject',JSON.stringify({ studentObject: this.studentObject }) );
      this.navCtrl.push(ViewStudentAllWords);
  }

  checkRatio(methodIndex:number)
  {
    if(this.studentObject.studentWordDetailsArray[this.wordType].methodArray[methodIndex].sessionsArray ==null || this.studentObject.studentWordDetailsArray[this.wordType].methodArray[methodIndex].sessionsArray.length==0)
    {
      let profileModal = this.modalCtrl.create(MethodRatioSelection,{
          methodIndex: methodIndex,
          studentObject: this.studentObject,
          organizationDetailsUID: this.organizationDetails.organizationDetailsUID,
          wordType: this.wordType
      },{
          cssClass: 'update-profile-modal'
      });
      profileModal.present();

      profileModal.onDidDismiss(data => {
        var flag:boolean = data;
        if(flag)
        {
            this.storage.set('methodIndex',JSON.stringify({ methodIndex: methodIndex }));
            this.navCtrl.push(PreSessionView);
            this.error="";  
             
        }
        
      });
      
    }
    else{
        this.storage.set('studentObject',JSON.stringify({ studentObject: this.studentObject }) );
        this.storage.set('methodIndex',JSON.stringify({ methodIndex: methodIndex }) );
        this.navCtrl.push(PreSessionView);
        this.error="";
    }
  }

  goBackToView()
  {
      if(this.studentObject!=null)
      {
          this.storage.set('studentObject',JSON.stringify({ studentObject: this.studentObject }) );
      }        
  }

  changeWordType(){
    if(this.isWord)
      this.wordType = 0;
    else
      this.wordType = 1;
    this.storage.set('wordType',JSON.stringify({ wordType: this.wordType }) );
    this.refreshData();
  }

}
