import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Student } from "../../../../models/student";
import { IncrementalRehersalService } from '../../../../services/IncrementalRehersalService';
import { WordData } from '../../../../models/wordData';
import { MethodSession } from '../../../../models/methodIntervetionSession';
import { PreSessionResultTest } from '../../../../models/PreSessionAssessmentResultTest';
import { File } from '@ionic-native/file';
import { MyMap } from '../../../../models/myMap';
import { Storage } from '@ionic/storage';
@Component({
  selector: 'page-preSessionAssessmentView',
  templateUrl: 'preSessionAssessmentView.html'
})
export class PreSessionAssessmentView {

  private error: String  = "Error Message";
  private studentObject: Student = new Student();
  private sessionCounter: number =0;
  private methodIndex: number =0;
  private preSessionWordDataArray: Array<PreSessionResultTest> = [new PreSessionResultTest()];
  private test1Map: MyMap = new MyMap();
  private test2Map: MyMap = new MyMap;
  private incrementalRehrsalService: IncrementalRehersalService = new IncrementalRehersalService();
  private methodSessionObject: MethodSession = new MethodSession();
  private remainUnknownWordArray: Array<WordData> = [new WordData(),new WordData()];
  private ratio1: number = 0;
  private ratio2: number = 0;
  private wordType: number = 0;

  constructor(private file: File,
    public navCtrl: NavController,
    private storage: Storage) {

  }

  updatePreSessionResultTest() {
  
  }
}