import { Dataset } from "./Dataset";
import { flatten } from "@angular/compiler";
import { AssessmentTestData } from "./AssessmentTestData";
import { ViewAssessmentWordObjects } from "./viewAssessmentWordObjects";
import { WordData } from "./wordData";

export class StudentDataSetRecord{
    datasetObject:Dataset;
    assessmentMethodTestDone:boolean = false; // this dataset is done with all 3 methods
    sessionTestDone:boolean = false;// all 3 test is completed or not
    assessmentDataArrayObject:Array<AssessmentTestData>=[new AssessmentTestData(0),new AssessmentTestData(1),new AssessmentTestData(2)];
    assessmentWordDataArray:Array<ViewAssessmentWordObjects>=[];//begining assessment objects
    knwonArrayList:Array<WordData>=[];// known array 
    unKnownArrayList:Array<WordData>=[];// unknown 
    isConvertedAll:boolean = false;

}