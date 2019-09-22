import { Component } from '@angular/core';
import { NavController, NavParams, ModalController } from 'ionic-angular';
import { Student } from '../../../models/student';
import { AssessmentTestData } from '../../../models/AssessmentTestData';
import { WordData } from '../../../models/wordData';
import { FlashCard } from '../../flashCardTest/flashCard';
import { Storage } from '@ionic/storage';
import { File } from '@ionic-native/file';

@Component({
    selector: 'page-assessmentTest',
    templateUrl: 'assessmentTest.html'
  })
export class AssessmentTest
{
    studentObject:Student=new Student();
    assessmentTestObjectArray:Array<AssessmentTestData>=[];
    assessmentTestDataObject:AssessmentTestData;
    studentDataSetRecordIndex:number=-1;
    wordType:number = 0;
    datasetName:String="";
    numberOfTest:number =0;
    ConsistancyPercentage:Array<number>=[0,0,0];
    private error: String  = "Error Message";
    constructor(private modalCtrl: ModalController,
        public navCtrl: NavController,
        private navParams:NavParams,
        private storage:Storage,
        private file:File) {

        this.constructorMethod();
      
   }

   public ionViewWillEnter() {
        this.constructorMethod();
    } 

    constructorMethod(){

        this.storage.get('wordType').then((val) => {
            var fileData:any = JSON.parse(val);
            this.wordType = fileData.wordType;
            
            this.storage.get('studentObject').then((val) => {
                var fileData:any = JSON.parse(val);
                this.studentObject = fileData.studentObject;
    
                this.storage.get('studentDataSetRecordIndex').then((val) => {
                    var fileData:any = JSON.parse(val);
                    this.studentDataSetRecordIndex = fileData.studentDataSetRecordIndex;
                    
                    this.assessmentTestObjectArray=this.studentObject.studentWordDetailsArray[this.wordType].studentDatasetRecordList[this.studentDataSetRecordIndex].assessmentDataArrayObject;
                    this.datasetName= this.studentObject.studentWordDetailsArray[this.wordType].studentDatasetRecordList[this.studentDataSetRecordIndex].datasetObject.datasetName;
                    console.log("asse:"+this.assessmentTestObjectArray.length);
                    this.numberOfTest=this.assessmentTestObjectArray.length;
                    
                });    

            });
        });
    }

    startAssessmentTest(index:number){
        if(this.assessmentTestObjectArray[index].testStatus)
        {
            this.error=" Test "+(index+1)+" is already done";
        }
        else if(index > 0 && !this.assessmentTestObjectArray[index-1].testStatus)
        {
            this.error=" First complete test "+index;
        }
        else
        {
            this.error="";
            this.storage.set('studentObject',JSON.stringify({ studentObject: this.studentObject }) );
            this.storage.set('studentDataSetRecordIndex',JSON.stringify({ studentDataSetRecordIndex: this.studentDataSetRecordIndex }) );
            this.storage.set('testIndex',JSON.stringify({ testIndex: index }) );    
            this.navCtrl.push(FlashCard);
        }
        
    }
    
    goBackToView(studentObject:Student)
    {
        if(Student!=null)
        {
            this.storage.set('studentObject',JSON.stringify({ studentObject: this.studentObject }) );
        }
        
    }
}