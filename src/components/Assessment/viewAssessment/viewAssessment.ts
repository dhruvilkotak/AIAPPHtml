import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import { Student } from '../../../models/student';
import { AssessmentTestData } from '../../../models/AssessmentTestData';
import { WordData } from '../../../models/wordData';
import { ViewAssessmentWordObjects } from '../../../models/viewAssessmentWordObjects';
import { Storage } from '@ionic/storage';
import { OrganizationDetails } from '../../../models/organizationDetails';

@Component({
    selector: 'page-viewAssessment',
    templateUrl: 'viewAssessment.html'
})
export class ViewAssessmentTest {
    datasetName: String = "Dataset Name";
    private isenabled: boolean = true;
    private knownsTime: number = 0;
    private totalKnowns: number = 0;
    private totalUnKnowns: number = 0;
    studentObject: Student = new Student();
    intArray: Array<number> = [];
    private error: String = "Error Message";
    assessmentTestObjectArray: Array<AssessmentTestData> = [new AssessmentTestData(0)];
    assessmentTestDataObject: AssessmentTestData = new AssessmentTestData(0);
    assessmentWordDataArray: Array<ViewAssessmentWordObjects> = [new ViewAssessmentWordObjects()];
    private organizationDetails: OrganizationDetails = new OrganizationDetails();
    private studentDataSetRecordIndex: number = 0;
    wordType: number = 0;
    constructor(
        public navCtrl: NavController,
        private alertCtrl: AlertController,
        private storage: Storage) {

    }

    getAssessmentObject(wordData: WordData) {
        for (let obj of this.assessmentWordDataArray) {

            if (obj.wordData.wordId == wordData.wordId) {
                console.log("same : " + obj.wordData.wordText + " s:" + wordData.wordText);
                return obj;
            }
        }
        return null;
    }

    updateAssessmentObjectToArray(viewAssessmentWordObject: ViewAssessmentWordObjects) {
        var i: number = 0;
        if (this.assessmentWordDataArray == null)
            this.assessmentWordDataArray = [];
        for (let obj of this.assessmentWordDataArray) {
            if (obj.assessmentWordObjectId == viewAssessmentWordObject.assessmentWordObjectId) {
                this.assessmentWordDataArray[i] = viewAssessmentWordObject;
                return;
            }
            i++;
        }
        this.assessmentWordDataArray.push(viewAssessmentWordObject);
    }

    addToKnownList(wordDataObj: WordData) {
        this.knownConfirm(wordDataObj);

    }
    addToUnKnownList(wordDataObj: WordData) {
        this.unKnownConfirm(wordDataObj);


    }
    removeWordFromStudentAssessment(wordDataObj: WordData, wordType: String) {
      
    }

    saveToKnownUnknown() {
        var anyChanges: boolean = false;
        console.log("student view2:" + this.studentObject.studentData.studentUID);
        for (let obj of this.studentObject.studentWordDetailsArray[this.wordType].studentDatasetRecordList[this.studentDataSetRecordIndex].assessmentWordDataArray) {
            if (!obj.wordAdded) {
                anyChanges = true;
                //loginc
                if (obj.totalKnownTime >= this.knownsTime) {

                    obj.wordType = "Known";
                    obj.wordAdded = true;
                    if (this.studentObject.studentWordDetailsArray[this.wordType].studentDatasetRecordList[this.studentDataSetRecordIndex].knwonArrayList == null)
                        this.studentObject.studentWordDetailsArray[this.wordType].studentDatasetRecordList[this.studentDataSetRecordIndex].knwonArrayList = [];
                    this.studentObject.studentWordDetailsArray[this.wordType].studentDatasetRecordList[this.studentDataSetRecordIndex].knwonArrayList.push(obj.wordData);
                }
                else {
                    obj.wordType = "UnKnown";
                    obj.wordAdded = true;
                    if (this.studentObject.studentWordDetailsArray[this.wordType].studentDatasetRecordList[this.studentDataSetRecordIndex].unKnownArrayList == null)
                        this.studentObject.studentWordDetailsArray[this.wordType].studentDatasetRecordList[this.studentDataSetRecordIndex].unKnownArrayList = [];
                    this.studentObject.studentWordDetailsArray[this.wordType].studentDatasetRecordList[this.studentDataSetRecordIndex].unKnownArrayList.push(obj.wordData);
                }
                obj.wordAdded = true;
            }
        }
        this.assessmentWordDataArray = this.studentObject.studentWordDetailsArray[this.wordType].studentDatasetRecordList[this.studentDataSetRecordIndex].assessmentWordDataArray;
        //this.assessmentWordDataArray=[];
    }

    chekEnableDisable() {
        var counter: number = 0;
        var previBool: boolean = this.studentObject.studentWordDetailsArray[this.wordType].studentDatasetRecordList[this.studentDataSetRecordIndex].isConvertedAll;
        if (previBool) {
            this.isenabled = false
            return;
        }
        else {
            for (let assessmentwordObject of this.assessmentWordDataArray) {
                if (assessmentwordObject.wordAdded) {
                    counter++;
                }
            }
            if (counter == this.assessmentWordDataArray.length && counter > 0) {
                this.isenabled = false;
                this.studentObject.studentWordDetailsArray[this.wordType].studentDatasetRecordList[this.studentDataSetRecordIndex].isConvertedAll = true;
            }

        }

    }
    goBackToView(studentObject: Student) {
        
    }

    knownConfirm(wordDataObj: WordData) {
        let alert = this.alertCtrl.create({
            title: 'Known Word',
            message: 'Do you want to set as Known word ' + wordDataObj.wordText + '?',
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
                        if (this.studentObject.studentWordDetailsArray[this.wordType].studentDatasetRecordList[this.studentDataSetRecordIndex].knwonArrayList == null)
                            this.studentObject.studentWordDetailsArray[this.wordType].studentDatasetRecordList[this.studentDataSetRecordIndex].knwonArrayList = [];
                        this.studentObject.studentWordDetailsArray[this.wordType].studentDatasetRecordList[this.studentDataSetRecordIndex].knwonArrayList.push(wordDataObj);


                        this.removeWordFromStudentAssessment(wordDataObj, "Known");
                        this.goBackToView(this.studentObject);
                    }
                }
            ]
        });
        alert.present();
    }


    unKnownConfirm(wordDataObj: WordData) {
        let alert = this.alertCtrl.create({
            title: 'unKnown word',
            message: 'Do you want to set as unKnown word' + wordDataObj.wordText + '?',
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
                        if (this.studentObject.studentWordDetailsArray[this.wordType].studentDatasetRecordList[this.studentDataSetRecordIndex].unKnownArrayList == null)
                            this.studentObject.studentWordDetailsArray[this.wordType].studentDatasetRecordList[this.studentDataSetRecordIndex].unKnownArrayList = [];
                        this.studentObject.studentWordDetailsArray[this.wordType].studentDatasetRecordList[this.studentDataSetRecordIndex].unKnownArrayList.push(wordDataObj);
                        this.removeWordFromStudentAssessment(wordDataObj, "UnKnown");
                        //this.studentFireBaseService.updateUnKnownList(this.studentObject);
                        this.goBackToView(this.studentObject);
                        // alert.dismiss();  
                    }
                }
            ]
        });
        alert.present();
    }

    showKnownUnKnownWords() {
        this.totalKnowns = 0;
        this.totalUnKnowns = 0;
        console.log("size::" + this.assessmentWordDataArray.length);
        for (let assessmentwordObject of this.assessmentWordDataArray) {
            console.log("word obj::" + assessmentwordObject.wordAdded);
            if (assessmentwordObject.wordAdded != null && assessmentwordObject.wordAdded) {
                if (assessmentwordObject.wordType == "Known")
                    this.totalKnowns++;
                else
                    this.totalUnKnowns++;
            }
            else {
                if (assessmentwordObject.totalKnownTime >= this.knownsTime)
                    this.totalKnowns++;
                else
                    this.totalUnKnowns++;
            }
        }
    }
}