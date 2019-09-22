import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import { Student } from '../../../models/student';
import { AssessmentTestData } from '../../../models/AssessmentTestData';
import { WordData } from '../../../models/wordData';
import { ViewAssessmentWordObjects } from '../../../models/viewAssessmentWordObjects';
import { Storage } from '@ionic/storage';
import { ViewAssessmentFireBaseService } from '../../../firebaseServices/viewAssessmentFireBaseService';
import { StudentFireBaseService } from '../../../firebaseServices/studentFireBaseService';
import { PreAssessmentFireBaseService } from '../../../firebaseServices/PreAssessmentFireBaseService';
import { OrganizationDetails } from '../../../models/organizationDetails';

@Component({
    selector: 'page-viewAssessment',
    templateUrl: 'viewAssessment.html'
  })
export class ViewAssessmentTest
{
    datasetName:String="";
    private isenabled:boolean = true;
    private knownsTime:number=0;
    private totalKnowns:number=0;
    private totalUnKnowns:number=0;
    studentObject:Student=new Student();
    intArray:Array<number>=[];
    private error:String="";
    assessmentTestObjectArray:Array<AssessmentTestData>=[];
    assessmentTestDataObject:AssessmentTestData;
    assessmentWordDataArray:Array<ViewAssessmentWordObjects>=[];
    private viewAssessmentFireBaseService:ViewAssessmentFireBaseService;
    private organizationDetails:OrganizationDetails = new OrganizationDetails();
    private studentDataSetRecordIndex:number=-1;
    preAssessmentFireBaseService:PreAssessmentFireBaseService ;
    wordType:number = 0;
    constructor(
        public navCtrl: NavController,
        private alertCtrl:AlertController,
        private storage:Storage) {
            
            this.storage.get('wordType').then((val) => {
                var fileData:any = JSON.parse(val);
                this.wordType = fileData.wordType;
                
                this.storage.get('studentObject').then((val) => {
                    var fileData:any = JSON.parse(val);
                    this.studentObject = fileData.studentObject;
        
                    this.storage.get('organizationDetails').then((val) => {
                        var fileData:any = JSON.parse(val);
                        this.organizationDetails = fileData.organizationDetails;
                        
                        this.viewAssessmentFireBaseService = new ViewAssessmentFireBaseService(this.organizationDetails.organizationDetailsUID,this.wordType);
                        this.preAssessmentFireBaseService = new PreAssessmentFireBaseService(this.organizationDetails.organizationDetailsUID,this.wordType);
                        
                        this.storage.get('studentDataSetRecordIndex').then((val) => {
                        var fileData:any = JSON.parse(val);
                        this.studentDataSetRecordIndex = fileData.studentDataSetRecordIndex;
                        this.datasetName= this.studentObject.studentWordDetailsArray[this.wordType].studentDatasetRecordList[this.studentDataSetRecordIndex].datasetObject.datasetName;
                        if(this.studentObject.studentWordDetailsArray[this.wordType].studentDatasetRecordList[this.studentDataSetRecordIndex].assessmentWordDataArray == null || this.studentObject.studentWordDetailsArray[this.wordType].studentDatasetRecordList[this.studentDataSetRecordIndex].assessmentWordDataArray.length==0)
                        {
                           console.log("converted:");
                           this.convertAssessmentTestObjectToword(this.studentObject);
                           this.studentObject.studentWordDetailsArray[this.wordType].studentDatasetRecordList[this.studentDataSetRecordIndex].assessmentWordDataArray=this.assessmentWordDataArray;
                           this.viewAssessmentFireBaseService.updateAssessmentWordDataArray(this.studentObject,this.studentDataSetRecordIndex);
                             this.goBackToView(this.studentObject);
                        }   
                        else{
                           this.assessmentTestObjectArray = this.studentObject.studentWordDetailsArray[this.wordType].studentDatasetRecordList[this.studentDataSetRecordIndex].assessmentDataArrayObject;
                            this.assessmentWordDataArray=this.studentObject.studentWordDetailsArray[this.wordType].studentDatasetRecordList[this.studentDataSetRecordIndex].assessmentWordDataArray;
                            console.log("converted:"+this.studentObject.studentWordDetailsArray[this.wordType].convertToAssessmentWord+" size:"+this.assessmentTestObjectArray.length+"  len:"+this.assessmentWordDataArray.length);
                             
                        }
                        this.knownsTime = Math.floor((this.assessmentTestObjectArray.length) /2)  +1
                        var j:number=1;
                        this.intArray=[];
                        while(j<=this.assessmentTestObjectArray.length)
                        {
                            this.intArray.push(j++);
                        }
                        console.log("length:"+this.assessmentTestObjectArray.length+" "+this.intArray);
            
                          this.showKnownUnKnownWords();
            
                        if(this.assessmentWordDataArray.length==0)
                        {
                         //   this.studentObject.studentDatasetRecordList[this.studentDataSetRecordIndex].PreInterventionAssessmentResults=true;
                            
                            this.goBackToView(this.studentObject);
                           
                            this.error="No data Available";
                            console.log(this.error);
                        }
                        this.chekEnableDisable();
                    });
                });
              
            });
            
        });      
   }

   convertAssessmentTestObjectToword(studentObject:Student)
   {
        this.assessmentTestObjectArray = this.studentObject.studentWordDetailsArray[this.wordType].studentDatasetRecordList[this.studentDataSetRecordIndex].assessmentDataArrayObject;
        console.log("assessize:"+this.assessmentTestObjectArray.length+"  s:"+this.assessmentTestObjectArray[0].testStatus);
        for(let assessmentTestDataObject of this.assessmentTestObjectArray)
        {
            if(assessmentTestDataObject.knownWordList!=null)
            {
                for(let wordDataObj of assessmentTestDataObject.knownWordList)
                {
                    let viewAssessmentWordObject:ViewAssessmentWordObjects= this.getAssessmentObject(wordDataObj);
                    if(viewAssessmentWordObject==null)
                    {
                        viewAssessmentWordObject=new ViewAssessmentWordObjects();
                        viewAssessmentWordObject.totalTest=studentObject.studentWordDetailsArray[this.wordType].studentDatasetRecordList[this.studentDataSetRecordIndex].assessmentDataArrayObject.length;
                    }
                    viewAssessmentWordObject.wordData=wordDataObj;
                    viewAssessmentWordObject.testArrayKnown.push(true);
                    viewAssessmentWordObject.stringKnownArray.push("Known");
                    viewAssessmentWordObject.totalKnownTime=viewAssessmentWordObject.totalKnownTime+1;
                    this.updateAssessmentObjectToArray(viewAssessmentWordObject);
                }  
            }
            if(assessmentTestDataObject.unknownWordList != null)
            {
                for(let wordDataObj of assessmentTestDataObject.unknownWordList)
                {
                    let viewAssessmentWordObject:ViewAssessmentWordObjects= this.getAssessmentObject(wordDataObj);
                    if(viewAssessmentWordObject==null)
                    {
                        viewAssessmentWordObject=new ViewAssessmentWordObjects();
                        viewAssessmentWordObject.totalTest=studentObject.studentWordDetailsArray[this.wordType].studentDatasetRecordList[this.studentDataSetRecordIndex].assessmentDataArrayObject.length;
                    }
                    viewAssessmentWordObject.wordData=wordDataObj;
                    viewAssessmentWordObject.testArrayKnown.push(false);
                    viewAssessmentWordObject.stringKnownArray.push("Unknown");
                    this.updateAssessmentObjectToArray(viewAssessmentWordObject);
                }
            }

        }
        

   }
    getAssessmentObject( wordData:WordData)
    {
        for(let obj of this.assessmentWordDataArray)
        {

            if(obj.wordData.wordId == wordData.wordId)
            {
                console.log("same : "+obj.wordData.wordText+" s:"+wordData.wordText);
                return obj;
            } 
        }
        return null;
    }

    updateAssessmentObjectToArray(viewAssessmentWordObject:ViewAssessmentWordObjects)
    {
        var i:number=0;
        if(this.assessmentWordDataArray==null)
            this.assessmentWordDataArray=[];
        for(let obj of this.assessmentWordDataArray)
        {
            if(obj.assessmentWordObjectId==viewAssessmentWordObject.assessmentWordObjectId)
            {
                this.assessmentWordDataArray[i]=viewAssessmentWordObject;
                return;
            }
            i++;
        }
        this.assessmentWordDataArray.push(viewAssessmentWordObject);
    }

    addToKnownList(wordDataObj:WordData)
    {
        this.knownConfirm(wordDataObj);
       
    }
    addToUnKnownList(wordDataObj:WordData)
    {
        this.unKnownConfirm(wordDataObj);
     
         
    }
    removeWordFromStudentAssessment(wordDataObj:WordData,wordType:String)
    {
        var i:number=0
        for(let obj of this.studentObject.studentWordDetailsArray[this.wordType].studentDatasetRecordList[this.studentDataSetRecordIndex].assessmentWordDataArray)
        {
            if(obj.wordData.wordId == wordDataObj.wordId)
            {
                if(this.studentObject.studentWordDetailsArray[this.wordType].studentDatasetRecordList[this.studentDataSetRecordIndex].assessmentWordDataArray[i].wordAdded)
                    return;
                this.studentObject.studentWordDetailsArray[this.wordType].studentDatasetRecordList[this.studentDataSetRecordIndex].assessmentWordDataArray[i].wordType=wordType;
                this.studentObject.studentWordDetailsArray[this.wordType].studentDatasetRecordList[this.studentDataSetRecordIndex].assessmentWordDataArray[i].wordAdded=true;
                
                this.viewAssessmentFireBaseService.updateAssessmentWordDataArray(this.studentObject,this.studentDataSetRecordIndex);
                this.assessmentWordDataArray=this.studentObject.studentWordDetailsArray[this.wordType].studentDatasetRecordList[this.studentDataSetRecordIndex].assessmentWordDataArray;
                return;
            }
             i++;
        }
    }

    saveToKnownUnknown()
    {
        var anyChanges:boolean =false;
        console.log("student view2:"+this.studentObject.studentData.studentUID);
        for(let obj of this.studentObject.studentWordDetailsArray[this.wordType].studentDatasetRecordList[this.studentDataSetRecordIndex].assessmentWordDataArray)
        {
            if(!obj.wordAdded)
            {
                anyChanges=true;
                //loginc
                if(obj.totalKnownTime>=this.knownsTime)
                {
                    
                    obj.wordType="Known";
                    obj.wordAdded=true;
                    if(this.studentObject.studentWordDetailsArray[this.wordType].studentDatasetRecordList[this.studentDataSetRecordIndex].knwonArrayList==null)
                        this.studentObject.studentWordDetailsArray[this.wordType].studentDatasetRecordList[this.studentDataSetRecordIndex].knwonArrayList=[];
                    this.studentObject.studentWordDetailsArray[this.wordType].studentDatasetRecordList[this.studentDataSetRecordIndex].knwonArrayList.push(obj.wordData);
                }
                else
                {
                    obj.wordType="UnKnown";
                    obj.wordAdded=true;
                    if(this.studentObject.studentWordDetailsArray[this.wordType].studentDatasetRecordList[this.studentDataSetRecordIndex].unKnownArrayList==null)
                        this.studentObject.studentWordDetailsArray[this.wordType].studentDatasetRecordList[this.studentDataSetRecordIndex].unKnownArrayList=[];
                    this.studentObject.studentWordDetailsArray[this.wordType].studentDatasetRecordList[this.studentDataSetRecordIndex].unKnownArrayList.push(obj.wordData);
                }
                obj.wordAdded=true;
            }   
        }
        this.assessmentWordDataArray=this.studentObject.studentWordDetailsArray[this.wordType].studentDatasetRecordList[this.studentDataSetRecordIndex].assessmentWordDataArray;
        //this.assessmentWordDataArray=[];
        if(anyChanges)
        {
            
            this.viewAssessmentFireBaseService.updateAssessmentWordDataArray(this.studentObject,this.studentDataSetRecordIndex);
            if(this.studentObject.studentWordDetailsArray[this.wordType].studentDatasetRecordList[this.studentDataSetRecordIndex].knwonArrayList!=null)
                this.preAssessmentFireBaseService.updateKnownList(this.studentObject,this.studentDataSetRecordIndex);
            if(this.studentObject.studentWordDetailsArray[this.wordType].studentDatasetRecordList[this.studentDataSetRecordIndex].unKnownArrayList!=null)
                this.preAssessmentFireBaseService.updateUnKnownList(this.studentObject,this.studentDataSetRecordIndex);
            this.goBackToView(this.studentObject);
        }    
    }

    chekEnableDisable()
    {
        var counter:number=0;
        var previBool:boolean= this.studentObject.studentWordDetailsArray[this.wordType].studentDatasetRecordList[this.studentDataSetRecordIndex].isConvertedAll;
        if(previBool)
        {
            this.isenabled=false
            return;
        }
        else{
            for(let assessmentwordObject of this.assessmentWordDataArray)
            {
                if(assessmentwordObject.wordAdded)
                {
                    counter++;
                }
            }
            if(counter == this.assessmentWordDataArray.length && counter>0)
            {
                this.isenabled=false;
                this.studentObject.studentWordDetailsArray[this.wordType].studentDatasetRecordList[this.studentDataSetRecordIndex].isConvertedAll = true;
                this.preAssessmentFireBaseService.updateDatasetIsConvertedAll(this.studentObject,this.studentDataSetRecordIndex);
            }
     
        }
        
    }
    goBackToView(studentObject:Student)
    {
        this.showKnownUnKnownWords();
        this.chekEnableDisable();
        if(Student!=null)
        {
            this.storage.set('studentObject',JSON.stringify({ studentObject: this.studentObject }) );
        }
    }

    knownConfirm(wordDataObj:WordData) {
        let alert = this.alertCtrl.create({
          title: 'Known Word',
          message: 'Do you want to set as Known word '+wordDataObj.wordText +'?',
          buttons: [
            {
              text: 'Cancel',
              role: 'cancel',
              handler: () => {
           //     alert.dismiss();
                console.log('Cancel clicked');
              }
            },
            {
              text: 'yes',
              handler: () => {
                if(this.studentObject.studentWordDetailsArray[this.wordType].studentDatasetRecordList[this.studentDataSetRecordIndex].knwonArrayList==null)
                    this.studentObject.studentWordDetailsArray[this.wordType].studentDatasetRecordList[this.studentDataSetRecordIndex].knwonArrayList=[];
                this.studentObject.studentWordDetailsArray[this.wordType].studentDatasetRecordList[this.studentDataSetRecordIndex].knwonArrayList.push(wordDataObj);

                
                this.removeWordFromStudentAssessment(wordDataObj,"Known");
                this.preAssessmentFireBaseService.updateKnownList(this.studentObject,this.studentDataSetRecordIndex);
                this.goBackToView(this.studentObject);  
              }
            }
          ]
        });
        alert.present();
      }


      unKnownConfirm(wordDataObj:WordData) {
        let alert = this.alertCtrl.create({
          title: 'unKnown word',
          message: 'Do you want to set as unKnown word'+wordDataObj.wordText +'?',
          buttons: [
            {
              text: 'Cancel',
              role: 'cancel',
              handler: () => {
              //  alert.dismiss();
                console.log('Cancel clicked');
              }
            },
            {
              text: 'yes',
              handler: () => {
                if(this.studentObject.studentWordDetailsArray[this.wordType].studentDatasetRecordList[this.studentDataSetRecordIndex].unKnownArrayList == null)
                    this.studentObject.studentWordDetailsArray[this.wordType].studentDatasetRecordList[this.studentDataSetRecordIndex].unKnownArrayList=[];      
                this.studentObject.studentWordDetailsArray[this.wordType].studentDatasetRecordList[this.studentDataSetRecordIndex].unKnownArrayList.push(wordDataObj);
                this.removeWordFromStudentAssessment(wordDataObj,"UnKnown");
                this.preAssessmentFireBaseService.updateUnKnownList(this.studentObject,this.studentDataSetRecordIndex);
                //this.studentFireBaseService.updateUnKnownList(this.studentObject);
                this.goBackToView(this.studentObject);   
               // alert.dismiss();  
              }
            }
          ]
        });
        alert.present();
      }

      showKnownUnKnownWords(){
          this.totalKnowns=0;
          this.totalUnKnowns=0;
          console.log("size::"+this.assessmentWordDataArray.length);
            for(let assessmentwordObject of this.assessmentWordDataArray)
            {
                console.log("word obj::"+assessmentwordObject.wordAdded);
                if(assessmentwordObject.wordAdded != null && assessmentwordObject.wordAdded)
                {
                    if(assessmentwordObject.wordType == "Known" )
                        this.totalKnowns++;
                    else
                        this.totalUnKnowns++;
                }
                else{
                    if(assessmentwordObject.totalKnownTime>= this.knownsTime)
                        this.totalKnowns++;
                    else
                        this.totalUnKnowns++;
                }
            }
      }
}