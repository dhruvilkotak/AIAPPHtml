import { Component } from "@angular/core";
import { File } from "@ionic-native/file";
import { Storage } from "@ionic/storage";
import { NavController, NavParams } from "ionic-angular";
import { KnownUnknownWordData } from "../../../models/knownUnknownWordData";
import { OrganizationDetails } from "../../../models/organizationDetails";
import { PostTestWordData } from "../../../models/PostTestWordData";
import { PostTestWordDataRecordList } from "../../../models/postTestWordDataRecordList";
import { Student } from "../../../models/student";


@Component({
    selector: 'page-viewPostAssessmentList',
    templateUrl: 'viewPostAssessmentList.html'
})
export class ViewPostAssessmentList {

    studentObject: Student = new Student();
    subTestCompleted: number = 0;
    testIndex: number = 0;
    postTestWordDataArray: Array<PostTestWordData> = [new PostTestWordData()];
    totalWordLength: number = 0;
    private wordDataArray: Array<KnownUnknownWordData> = [new KnownUnknownWordData()];
    error = "Error Message";
    numbers: Array<number> = [1, 23, 3];
    postTestWordDataRecordListObject: PostTestWordDataRecordList = new PostTestWordDataRecordList();
    organizationDetails: OrganizationDetails = new OrganizationDetails();
    wordType: number = 0;
    constructor(public navCtrl: NavController,
        private navParams: NavParams,
        private storage: Storage,
        private file: File) {
        this.constructorMethod();
    }

    public ionViewWillEnter() {
        this.constructorMethod();
    }

    constructorMethod() {


    }
    startAssessmentTest(index: number) {


    }
}