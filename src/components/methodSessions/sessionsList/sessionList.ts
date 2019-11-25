import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { File } from '@ionic-native/file';
import { Student } from '../../../models/student';
import { MethodSession } from '../../../models/methodIntervetionSession';
import { SessionSummary } from '../flashCardTest/sessionSummary/sessionSummary';
import { PreSessionAssessmentView } from '../preSessionAssessment/preSessionAssessmentView/preSessionAssessmentView';
@Component({
    selector: 'page-sessionList',
    templateUrl: 'sessionList.html'
  })
export class SessionList{

  private studentObject:Student=new Student();
  private methodIndex:number=0;
  private methodName:string="";
  private sessionArray:Array<MethodSession>=[new MethodSession()];
  private wordType:number=0;
  constructor(private file:File,
    public navCtrl: NavController,
    private navParams:NavParams,
    private storage:Storage) {

  }

  sessionSummary(methodSessionObject:MethodSession){
  
  }

  preSessionAssessment(methodSessionObject:MethodSession){
 
  }
}