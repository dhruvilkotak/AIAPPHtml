import { WordData } from "./wordData";
import { AssessmentTestData } from "./AssessmentTestData";
import { Method } from "./methodIntervetion";
import { ViewAssessmentWordObjects } from "./viewAssessmentWordObjects";
import { PostTestWordDataRecordList } from "./postTestWordDataRecordList";
import { KnownUnknownWordData } from "./knownUnknownWordData";
import { StudentDataSetRecord } from "./studentDataSetRecord";
export class StudentWordDetails {
  totalAssessment: number = 3;
  assessmentDataArrayObject: Array<AssessmentTestData> = [
    new AssessmentTestData(0),
    new AssessmentTestData(1),
    new AssessmentTestData(2)
  ];
  methodArray: Array<Method> = [
    new Method("Incremental Rehearsal", 0),
    new Method("Direct Instruction", 1),
    new Method("Traditional Drill & Practice", 2),
    new Method("Control Intervention", 3)
  ]; //store 3 methods
  knwonArrayList: Array<WordData> = []; // known array
  unKnownArrayList: Array<WordData> = []; // unknown
  knownUnknownArrayList: Array<WordData> = []; // unknown becomes known
  assessmentWordDataArray: Array<ViewAssessmentWordObjects> = []; //begining assessment objects
  convertToAssessmentWord: boolean = false;
  postTestWordDataRecordListArray: Array<PostTestWordDataRecordList> = [];
  newKnownUnknownArrayList: Array<KnownUnknownWordData> = [];
  studentDatasetRecordList: Array<StudentDataSetRecord> = [];
  studentLockDatasetRecordList: boolean = false;
  studentWordType: string = "";

  constructor(studentWordType: string) {
    this.studentWordType = studentWordType;
  }
}
