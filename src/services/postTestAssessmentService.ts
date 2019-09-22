import { KnownUnknownWordData } from "../models/knownUnknownWordData";
import { PostTestWordData } from "../models/PostTestWordData";
import { Student } from "../models/student";

export class PostTestAssessmentService {


    organizationUID: string = "";
    wordType: number = 0;
    constructor(organizationUID: string, wordType: number) {
        this.organizationUID = organizationUID;
        this.wordType = wordType;
    }

    getPostTestWordDataArrayFromWordData(wordDataArray: Array<KnownUnknownWordData>) {
        var postTestWordDataArray: Array<PostTestWordData> = [];
        for (let wordObj of wordDataArray) {
            var postTestWordDataObject = new PostTestWordData();
            postTestWordDataObject.wordData = wordObj.wordData;
            postTestWordDataArray.push(postTestWordDataObject);
        }
        return postTestWordDataArray;
    }

    addPostTestWordDataRecordListObject(studentObject: Student, testIndex: number) {
    }

    updateKnownUnknownWordData(studentObject: Student, wordDataArray: Array<PostTestWordData>) {
        console.log("update counter:");
        for (let wordDataObj of wordDataArray) {
            this.incrementPostAssessmentCounter(studentObject, wordDataObj);
            for (let studentWordObj of studentObject.studentWordDetailsArray[this.wordType].newKnownUnknownArrayList) {
                if (wordDataObj.wordData.wordId == studentWordObj.wordData.wordId) {
                    studentWordObj.postAssessmentCounter++;
                }
            }
        }



    }

    incrementPostAssessmentCounter(studentObject: Student, wordDataObject: PostTestWordData) {
       
    }
}