import { Component } from "@angular/core";
import { NavController, AlertController } from "ionic-angular";
import { Storage } from "@ionic/storage";
import { Student } from "../../../models/student";
import { StudentDataSetRecord } from "../../../models/studentDataSetRecord";
import { DataSetService } from "../../../services/dataSetServices";
import { File } from "@ionic-native/file";
import { Dataset } from "../../../models/Dataset";
import { StudentDatasetRecordService } from "../../../firebaseServices/studentDatasetRecordService";
import { FormBuilder, FormGroup, FormArray, ValidatorFn, FormControl } from "@angular/forms";
import { Login } from "../../login/login";
import { AssessmentTest } from "../BeginAssessmentTest/assessmentTest";
import { ViewAssessmentTest } from "../viewAssessment/viewAssessment";
import { PreAssessmentFireBaseService } from "../../../firebaseServices/PreAssessmentFireBaseService";
import { StudentFireBaseService } from "../../../firebaseServices/studentFireBaseService";
import { OrganizationDetails } from "../../../models/organizationDetails";

@Component({
    selector: 'page-viewStudentDatasetRecordList',
    templateUrl: 'viewStudentDatasetRecordList.html'
  })
export class ViewStudentDatasetRecordList{

    studentObject:Student = new Student();
    studentDatasetRecordList:Array<StudentDataSetRecord>=[];
    dataSetService: DataSetService = new DataSetService();
    datasetList:Array<Dataset>=[];
    error:string="";
    wordType:number = 0;
    selectedDatasetList:Array<StudentDataSetRecord>=[];
    restrictedDatasetList:Array<StudentDataSetRecord>=[];
    notConvertedcompletedDatasetList:Array<StudentDataSetRecord>=[];
    private organizationDetails:OrganizationDetails =new OrganizationDetails();
    controls = this.selectedDatasetList.map(c => new FormControl(false));
               
    studentDatasetRecordObjectGroup: FormGroup=this.formBuilder.group({

      studentDatasetRecordObjectGroupList: new FormArray(this.controls, this.minSelectedCheckboxes(0))
      
    });
    constructor(
        public navCtrl: NavController,
        private storage:Storage,
        private file:File,
        private alertCtrl:AlertController,
        private formBuilder: FormBuilder) {

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
            this.studentDatasetRecordList= this.studentObject.studentWordDetailsArray[this.wordType].studentDatasetRecordList;

            this.storage.get('organizationDetails').then((val) => {
              var fileData:any = JSON.parse(val);
              this.organizationDetails = fileData.organizationDetails;
          
              this.dataSetService.getDataSetList(this.file,this.wordType).then(data=>{
                
                this.datasetList= data;
                console.log("dataset length:"+this.datasetList.length);

                var studentDatasetRecordService:StudentDatasetRecordService = new StudentDatasetRecordService();
           
                studentDatasetRecordService.removeDataSetForRecordList(this.datasetList,this.studentDatasetRecordList);
           
                this.addObjecttoSelectedDataset();

                this.controls = this.selectedDatasetList.map(c => new FormControl(true));
                this.studentDatasetRecordObjectGroup = this.formBuilder.group({
                  studentDatasetRecordObjectGroupList: new FormArray(this.controls, this.minSelectedCheckboxes(1))
              });

              }).catch(err=>{
  
                console.log("error:"+err);
    
              });
          
            });
          });
        });    

    }

    addObjecttoSelectedDataset()
    {
      this.selectedDatasetList=[];
      this.restrictedDatasetList=[];
      this.notConvertedcompletedDatasetList=[];
      for(let studentDatasetRecordObject of this.studentDatasetRecordList)
      {
        if(!studentDatasetRecordObject.assessmentMethodTestDone && studentDatasetRecordObject.sessionTestDone)
        {
          if(studentDatasetRecordObject.isConvertedAll)
            this.selectedDatasetList.push(studentDatasetRecordObject);
          else
            this.notConvertedcompletedDatasetList.push(studentDatasetRecordObject);
        }
        else{
          this.restrictedDatasetList.push(studentDatasetRecordObject);
        }
      }
    }

    minSelectedCheckboxes(min = 1)
    {
        const validator: ValidatorFn = (formArray: FormArray) => {
          const totalSelected = formArray.controls
            // get a list of checkbox values (boolean)
            .map(control => control.value)
            // total up the number of checked checkboxes
            .reduce((prev, next) => next ? prev + next : prev, 0);
      
          // if the total is not greater than the minimum, return the error message
          return totalSelected >= min ? null : { required: true };
        };
      
        return validator;
      }
    
      lockDatasetAssessment(){

        var subSelectedDatasetList:Array<StudentDataSetRecord> = this.studentDatasetRecordObjectGroup.value.studentDatasetRecordObjectGroupList
        .map((v, i) => v ? this.selectedDatasetList[i] : null)
        .filter(v => v !== null);
  
        if(subSelectedDatasetList ==null || subSelectedDatasetList.length<=0)
        {
            this.error="select one word at least.";
        }
        else{
            this.error="";
            console.log("len:"+subSelectedDatasetList.length + "  x:"+subSelectedDatasetList[0].datasetObject.datasetName);
            this.confirmLockDataset(subSelectedDatasetList);
        }

       
      }


      startPreAssessment(datasetObject:Dataset)
      {
          var studentDataSetRecordObject:StudentDataSetRecord = new StudentDataSetRecord();
          console.log("wordType:"+this.wordType);
          studentDataSetRecordObject.datasetObject=datasetObject;
          if(this.studentObject.studentWordDetailsArray[this.wordType].studentDatasetRecordList == null)
            this.studentObject.studentWordDetailsArray[this.wordType].studentDatasetRecordList = [];
          this.studentObject.studentWordDetailsArray[this.wordType].studentDatasetRecordList.push(studentDataSetRecordObject);

          var preAssessmentFireBaseService:PreAssessmentFireBaseService= new PreAssessmentFireBaseService(this.organizationDetails.organizationDetailsUID,this.wordType);
          console.log(" ts index:"+(this.studentObject.studentWordDetailsArray[this.wordType].studentDatasetRecordList.length-1));
          preAssessmentFireBaseService.addstudentDataSetRecordObjectFirebasase(this.studentObject,this.studentObject.studentWordDetailsArray[this.wordType].studentDatasetRecordList.length-1);
          this.completePreAssessmentTest(this.studentObject.studentWordDetailsArray[this.wordType].studentDatasetRecordList.length-1)
      }

      completePreAssessmentTest(index:number)
      {
        this.storage.set('studentObject',JSON.stringify({ studentObject: this.studentObject }) );
        this.storage.set('studentDataSetRecordIndex',JSON.stringify({ studentDataSetRecordIndex: index }) );
        this.navCtrl.push(AssessmentTest);
      }

      viewStudentDatasetRecordObject(studentDatasetRecordObject:StudentDataSetRecord)
      {
          const index: number = this.studentObject.studentWordDetailsArray[this.wordType].studentDatasetRecordList.indexOf(studentDatasetRecordObject);
         
          if(this.studentObject.studentWordDetailsArray[this.wordType].studentDatasetRecordList[index].sessionTestDone)
          {
            this.storage.set('studentObject',JSON.stringify({ studentObject: this.studentObject }) );
            this.storage.set('studentDataSetRecordIndex',JSON.stringify({ studentDataSetRecordIndex: index }) );
     
            this.navCtrl.push(ViewAssessmentTest);
          }
          else{
            this.completePreAssessmentTest(index);
          }
      }

      confirmLockDataset(subSelectedDatasetList:Array<StudentDataSetRecord>){

        let alert = this.alertCtrl.create({
          title: 'Lock Datasets',
          message: 'Do you want to lock selected datasets for session method tests ?',
          buttons: [
            {
              text: 'Cancel',
              role: 'cancel',
              handler: () => {

                console.log('Cancel clicked');
              }
            },
            {
              text: 'yes',
              handler: () => {
                this.makeLockDataset(subSelectedDatasetList);    
              }
            }
          ]
        });
        alert.present();
     

      }

      makeLockDataset(subSelectedDatasetList:Array<StudentDataSetRecord>){
        
        if(this.studentObject.studentWordDetailsArray[this.wordType].knwonArrayList==null)
            this.studentObject.studentWordDetailsArray[this.wordType].knwonArrayList=[];
        if(this.studentObject.studentWordDetailsArray[this.wordType].unKnownArrayList==null)
            this.studentObject.studentWordDetailsArray[this.wordType].unKnownArrayList=[];
        
        for(let obj of subSelectedDatasetList)
        {
          if(obj.knwonArrayList!=null)
            this.studentObject.studentWordDetailsArray[this.wordType].knwonArrayList = this.studentObject.studentWordDetailsArray[this.wordType].knwonArrayList.concat(obj.knwonArrayList);
          if(obj.unKnownArrayList!=null)
            this.studentObject.studentWordDetailsArray[this.wordType].unKnownArrayList = this.studentObject.studentWordDetailsArray[this.wordType].unKnownArrayList.concat(obj.unKnownArrayList);
           
          obj.assessmentMethodTestDone=true;
         const index: number = this.studentObject.studentWordDetailsArray[this.wordType].studentDatasetRecordList.indexOf(obj);
          console.log("index:"+index);
        }
        var preAssessmentFireBaseService:PreAssessmentFireBaseService= new PreAssessmentFireBaseService(this.organizationDetails.organizationDetailsUID,this.wordType);
        preAssessmentFireBaseService.updateLockDatasetFireBase(this.studentObject,subSelectedDatasetList);
        var studentFirebaseService:StudentFireBaseService = new StudentFireBaseService(this.organizationDetails.organizationDetailsUID,this.wordType);
        studentFirebaseService.updateKnownList(this.studentObject);
        studentFirebaseService.updateUnKnownList(this.studentObject);
        
        this.storage.set('studentObject',JSON.stringify({ studentObject: this.studentObject }) );
        this.constructorMethod();
        this.navCtrl.pop();
          
      }

}