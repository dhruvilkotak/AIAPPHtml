import { Component } from '@angular/core';
import { File } from '@ionic-native/file';
import { Storage } from '@ionic/storage';
import { NavController, NavParams, ViewController } from 'ionic-angular';
import { MethodInterventionWordData } from '../../../../models/methodInterventionWordData';
import { OrganizationDetails } from '../../../../models/organizationDetails';
import { Student } from '../../../../models/student';
import { WordData } from '../../../../models/wordData';
@Component({
  selector: 'page-sessionSummary',
  templateUrl: 'sessionSummary.html'
})


export class SessionSummary {
  private studentObject: Student = new Student();
  private methodIndex: number = 0;
  private methodName: string = "Method Name";
  private totalWordsResponded: number = 1;
  private error: String = "Error Message";
  private sessionDate: String = "" + new Date();
  private sessionCounter: number = 0;
  private TestTitle: String = "Test Title";
  private sessionWordList: Array<MethodInterventionWordData> = [new MethodInterventionWordData()];
  private completionTime = "1:23:2";
  private organizationDetails: OrganizationDetails = new OrganizationDetails();
  private oldUnknownWordData: Array<WordData> = [new WordData()];
  //private studentObject:Student;
  methodInetrventionWordDataArray: Array<MethodInterventionWordData> = [new MethodInterventionWordData()];
  private wordType: number = 0;


  constructor(private file: File,
    public navCtrl: NavController,
    private navParams: NavParams,
    private viewCtrl: ViewController,
    private storage: Storage) {

  }

  continue() {
    this.updateAllObjects();

  }

  moveUnknownWordDataBack() {

  }
  updateAllObjects() {

  }
  goBackToView() {
    this.navCtrl.pop();
  }


}