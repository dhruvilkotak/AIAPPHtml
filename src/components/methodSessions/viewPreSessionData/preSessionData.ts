import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Student } from "../../../models/student";
import { IncrementalRehersalService } from '../../../services/IncrementalRehersalService';
import { WordData } from '../../../models/wordData';
import { MethodSession } from '../../../models/methodIntervetionSession';
import { PreSessionFlashCard } from '../flashCardTest/preSessionFlashCardTest/preSessionFlashCard';
import { File } from '@ionic-native/file';
import { MyMap } from '../../../models/myMap';
import { MyMApServices } from '../../../services/MyMapServices';
import { Storage } from '@ionic/storage';
import { SessionList } from '../sessionsList/sessionList';
import { TraditionalDrillPracticeService } from '../../../services/TraditionalDrillPracticeService';
import { LineChart } from '../../charts/lineCharts/lineCharts';


@Component({
    selector: 'page-preSessionData',
    templateUrl: 'preSessionData.html'
  })
export class PreSessionView{
    private studentObject:Student=new Student();
    private methodIndex:number=0;
    private methodName:string="";
    private totalSessions:number=0;
    private sessionCounter : number=0;
    private error:string="";
    private incrementalRehersalServiceObject:IncrementalRehersalService=new IncrementalRehersalService();
    private traditionalDrillPracticeService:TraditionalDrillPracticeService= new TraditionalDrillPracticeService();
    //session details
    private wordDataList:Array<WordData>=[];
    private knownWordDataList:Array<WordData>=[];
    private unKnownWordDataList:Array<WordData>=[];
    private ratio1:number=0;
    private ratio2:number=0;
    private myMapServiceObject:MyMApServices= new MyMApServices();
    private methodSessionObject:MethodSession =new MethodSession() ;
    private previousUnknownArray:Array<WordData>=[];
    private wordType:number=0;

    constructor(private file:File,
        public navCtrl: NavController,
        private navParams:NavParams,
        private storage:Storage) {

            this.storage.get('wordType').then((val) => {
                var fileData:any = JSON.parse(val);
                this.wordType = fileData.wordType;
            
                storage.get('studentObject').then((val) => {
                    var fileData:any = JSON.parse(val);
                    this.studentObject = fileData.studentObject;
                    this.storage.get('methodIndex').then((val) => {
                        var fileData:any = JSON.parse(val);
                        this.methodIndex = fileData.methodIndex;
                       
                        if(this.studentObject.studentWordDetailsArray[this.wordType].methodArray[this.methodIndex].sessionsArray == null)
                            this.studentObject.studentWordDetailsArray[this.wordType].methodArray[this.methodIndex].sessionsArray=[];
                       
                        this.totalSessions=this.studentObject.studentWordDetailsArray[this.wordType].methodArray[this.methodIndex].sessionsArray.length; 
                        this.methodName =  this.studentObject.studentWordDetailsArray[this.wordType].methodArray[this.methodIndex].methodName ;
                        this.ratio1=this.studentObject.studentWordDetailsArray[this.wordType].methodArray[this.methodIndex].ratio1;
                        this.ratio2=this.studentObject.studentWordDetailsArray[this.wordType].methodArray[this.methodIndex].ratio2;
                    });
                });
            });
    }

    public ionViewWillEnter() {
        console.log("ionviewwill");
        this.storage.get('studentObject').then((val) => {
            var fileData:any = JSON.parse(val);
            this.studentObject = fileData.studentObject;
            this.storage.get('methodIndex').then((val) => {
                var fileData:any = JSON.parse(val);
                this.methodIndex = fileData.methodIndex;
                console.log("ioview method index:"+this.methodIndex);
            if(this.studentObject.studentWordDetailsArray[this.wordType].methodArray[this.methodIndex].sessionsArray == null)
                this.studentObject.studentWordDetailsArray[this.wordType].methodArray[this.methodIndex].sessionsArray=[];
           
            this.totalSessions=this.studentObject.studentWordDetailsArray[this.wordType].methodArray[this.methodIndex].sessionsArray.length; 
            this.previousUnknownArray=[];
            if(this.totalSessions<=0)
                {
                    var j:number=0;
                    while(j<this.ratio2)
                    {
                            this.previousUnknownArray.push(this.studentObject.studentWordDetailsArray[this.wordType].unKnownArrayList[j]);
                        j++;
                    }  
               }
               else{
                    this.previousUnknownArray=this.studentObject.studentWordDetailsArray[this.wordType].methodArray[this.methodIndex].sessionsArray[this.totalSessions-1].unknownWordList;
               }
            });
              
        });
   
    }



    startNextSession()
    {
            this.methodSessionObject= new MethodSession();
            this.knownWordDataList=this.studentObject.studentWordDetailsArray[this.wordType].knwonArrayList;
            this.sessionCounter=this.totalSessions;
            //set method session attribute
            this.methodSessionObject.sessionIndex=this.totalSessions;
            var uk1Map:MyMap;
            if(this.sessionCounter>=1)
            {
                    uk1Map=this.setuk1MapValues(this.studentObject.studentWordDetailsArray[this.wordType].methodArray[this.methodIndex].sessionsArray[this.sessionCounter-1].controlItems,this.previousUnknownArray);
                   
                   console.log("uk1Mapsize:"+(uk1Map==null)+"  s:"+(uk1Map.values));
                   // var n:number=this.studentObject.methodArray[this.methodIndex].ratio2;
                    console.log("n:"+n+" size:"+this.methodSessionObject.retentionWordList.keys.length);
                    if(this.methodSessionObject.retentionWordList.keys.length>0)
                        this.myMapServiceObject.clearMyMap(this.methodSessionObject.retentionWordList);
                    if(this.methodSessionObject.controlItems.keys.length>0)
                        this.myMapServiceObject.clearMyMap(this.methodSessionObject.controlItems);
                    
                    var n:number = uk1Map.keys.length;    
                    if(uk1Map !=null && uk1Map.keys.length > 0)
                    {
                        //copying previous control items to rention items....
            
                        for(let uk2MapObj of uk1Map.keys)
                        { 
                            if(n<=0)
                                break;
                            console.log("copying to ret:"+this.myMapServiceObject.getValue(uk1Map, uk2MapObj));
                            this.myMapServiceObject.setObject(this.methodSessionObject.retentionWordList, uk2MapObj,this.myMapServiceObject.getValue(uk1Map, uk2MapObj));    
                            n--;
                        }
                            
                    }
                    console.log("n:"+n+" size:"+this.methodSessionObject.retentionWordList.keys.length);
                 
                    if(uk1Map!=null)
                        this.doAssessmentTest(this.studentObject,this.methodIndex,this.sessionCounter);
                   
                }
      
        
    }

    doAssessmentTest(studentObject:Student , methodIndex:number, sessionCounter:number){
        //test uk1 set its boolean
        if(Array.from(this.methodSessionObject.retentionWordList.keys).length > 0)
        {
            this.error  = "";
            this.storage.set('studentObject',JSON.stringify({ studentObject: this.studentObject }) );
            this.storage.set('methodIndex',JSON.stringify({ methodIndex: this.methodIndex }) );
            this.storage.set('sessionCounter',JSON.stringify({ sessionCounter: this.sessionCounter }) );
            this.storage.set('methodSessionObject',JSON.stringify({ methodSessionObject: this.methodSessionObject }) );
            
            this.navCtrl.push(PreSessionFlashCard).then(()=>{
                this.goBackToView();
            });
        }
        else{
            this.error = " Can not start the session."
        }
        
    }

    goBackToView()
    {
        if(this.studentObject!=null)
        {
         //   this.studentServiceObject.updateStudentToFile(this.file,this.studentObject,this.studentServiceObject);
            this.storage.set('studentObject',JSON.stringify({ studentObject: this.studentObject }) );
        }        
    }

    sessionSummaries()
    {
        this.storage.set('studentObject',JSON.stringify({ studentObject: this.studentObject }) );
        this.storage.set('methodIndex',JSON.stringify({ methodIndex: this.methodIndex }) );
        this.navCtrl.push(SessionList);
    }
    viewGraphData()
    {
        this.storage.set('studentObject',JSON.stringify({ studentObject: this.studentObject }) );
        this.storage.set('methodIndex',JSON.stringify({ methodIndex: this.methodIndex }) );
        this.navCtrl.push(LineChart);
    }
    
    setuk1MapValues(controlItem:MyMap, previousUnknownArray:Array<WordData>){
        var returnMap:MyMap = new MyMap();
        console.log("control11:")
        this.myMapServiceObject.printMyMap(controlItem);
        
            for(let wordObj of previousUnknownArray)
            {
                if(this.myMapServiceObject.has(controlItem,wordObj))
                {
                    this.myMapServiceObject.setObject(returnMap, wordObj,this.myMapServiceObject.getValue(controlItem, wordObj));    
                    
                }
                else{
                    this.myMapServiceObject.setObject(returnMap, wordObj,false);   
                }
            }
        return returnMap;
    }
}