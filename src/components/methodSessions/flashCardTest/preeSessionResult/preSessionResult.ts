import { Component } from '@angular/core';
import { NavController, NavParams, ModalController } from 'ionic-angular';
import { Student } from "../../../../models/student";
import { FlashCardIntervetion } from '../../flashCardTest/flashCardIntervention';
import { IncrementalRehersalService } from '../../../../services/IncrementalRehersalService';
import { WordData } from '../../../../models/wordData';
import { MethodSession } from '../../../../models/methodIntervetionSession';
import { PreSessionResultTest } from '../../../../models/PreSessionAssessmentResultTest';
import { WordServices } from '../../../../services/wordServices';
import { File } from '@ionic-native/file';
import { MyMap } from '../../../../models/myMap';
import { Storage } from '@ionic/storage';
import { DIFlashCardSessionTest } from '../DIMethodSessionTest/DIFlashCardSessionTest';
import { TraditionalDrillPracticeService } from '../../../../services/TraditionalDrillPracticeService';
import { AddWordList } from '../../../addWordList/addWordList';
import { ViewPreSessionUnKnownWord } from './viewPreSessionUnknownWord/viewPreSessionUnKnownWord';
import { KnownUnknownWordData } from '../../../../models/knownUnknownWordData';
import { MethodRatioSelection } from '../../../studentDashBoard/methodRatioSelection/methodRatioSelection';
import { OrganizationDetails } from '../../../../models/organizationDetails';
import { MyMApServices } from '../../../../services/MyMapServices';
import { MethodStudentService } from '../../../../firebaseServices/methodStudentService';
import { StudentFireBaseService } from '../../../../firebaseServices/studentFireBaseService';

@Component({
    selector: 'page-preSessionResult',
    templateUrl: 'preSessionResult.html'
  })
export class PreSessionResult{
    private error:string="";
    private studentObject:Student=new Student();
    private sessionCounter:number;
    private methodIndex:number;
    private preSessionWordDataArray:Array<PreSessionResultTest>=[];
    private test1Map:MyMap;
    private test2Map:MyMap;
    private incrementalRehrsalService:IncrementalRehersalService= new IncrementalRehersalService();
    private wordServiceObj:WordServices =new WordServices();
    private tempUnknownList:Array<WordData>=[];
    private testWordDataList:Array<WordData>=[];
    private incrementalRehersalServiceObject:IncrementalRehersalService=new IncrementalRehersalService();
    private methodSessionObject:MethodSession=new MethodSession();
    //private remainUnknownWordArray:Array<WordData>=[];
    private dimethodStart:boolean;
    private ratio1:number=0;
    private ratio2:number=0;
    private oldUnknownWordData:Array<WordData>=[];


    private traditionalDrillPracticeService:TraditionalDrillPracticeService= new TraditionalDrillPracticeService();
    private organizationDetails: OrganizationDetails = new OrganizationDetails();
    private maxRatio2 : number = 0;
    private maxRatio1 : number = 0;
    private wordType:number = 0;

    constructor(private file:File ,
        public navCtrl: NavController,
        private navParams:NavParams,
        private storage:Storage,
        public modalCtrl: ModalController) {

       this.myConstructorMethod();
     }

    public ionViewWillEnter() {

        this.storage.get('wordType').then((val) => {
            var fileData:any = JSON.parse(val);
            this.wordType = fileData.wordType;

            this.storage.get('studentObject').then((val) => {
                var fileData:any = JSON.parse(val);
                this.studentObject = fileData.studentObject;
             
                this.storage.get('methodSessionObject').then((val) => {
                    var fileData:any = JSON.parse(val);
                    this.methodSessionObject = fileData.methodSessionObject;
    
                    this.goBackToView();
                });
                
            });
        });
        
    }

    myConstructorMethod(){

        try{

            this.oldUnknownWordData = [];
            
            this.storage.get('wordType').then((val) => {
                var fileData:any = JSON.parse(val);
                this.wordType = fileData.wordType;
                
                this.storage.get('organizationDetails').then((val) => {
                    var fileData:any = JSON.parse(val);
                    this.organizationDetails = fileData.organizationDetails;
                
                    this.storage.get('methodIndex').then((val) => {
                        var fileData:any = JSON.parse(val);
                        this.methodIndex = fileData.methodIndex;
        
                        this.storage.get('studentObject').then((val) => {
                            var fileData:any = JSON.parse(val);
                            this.studentObject = fileData.studentObject;
                            
                            this.storage.get('methodSessionObject').then((val) => {
                                var fileData:any = JSON.parse(val);
                                this.methodSessionObject = fileData.methodSessionObject;
                                
                                
                                this.storage.get('sessionCounter').then((val) => {
                                var fileData:any = JSON.parse(val);
                                this.sessionCounter = fileData.sessionCounter;
                                
                                this.ratio1=this.studentObject.studentWordDetailsArray[this.wordType].methodArray[this.methodIndex].ratio1;
                                this.ratio2=this.studentObject.studentWordDetailsArray[this.wordType].methodArray[this.methodIndex].ratio2;
                                
                                var i=0;
                                if(this.studentObject.studentWordDetailsArray[this.wordType].unKnownArrayList == null)
                                    this.studentObject.studentWordDetailsArray[this.wordType].unKnownArrayList = [] ;
                                
                                this.maxRatio1 = this.studentObject.studentWordDetailsArray[this.wordType].knwonArrayList.length;
                                if(this.sessionCounter == 0)
                                {
                                    this.maxRatio2 = this.studentObject.studentWordDetailsArray[this.wordType].unKnownArrayList.length;
                                }
                                else if(this.sessionCounter>=1)
                                {
                                    this.test1Map=this.methodSessionObject.retentionWordList;
                                    this.test2Map=this.methodSessionObject.controlItems;
                                    this.preSessionWordDataArray = [];
                                    this.updatePreSessionResultTest();
                                } 
                                this.refreshObjects(this.ratio1 , this.ratio2);
                                if(this.methodSessionObject.unknownWordList.length == 0 && this.preSessionWordDataArray.length > 0 )
                                {
                                    var studentFireBaseService = new StudentFireBaseService(this.organizationDetails.organizationDetailsUID,this.wordType);
                                    studentFireBaseService.maintainUnKnownKnownArray(this.studentObject);
                                    this.studentObject.studentWordDetailsArray[this.wordType].methodArray[this.methodIndex].sessionsArray.push(this.methodSessionObject);
                                    studentFireBaseService.addSessionToMethod(this.studentObject, this.methodIndex);
                                    this.goBackToView();
                                    this.navCtrl.pop().then(()=>{
                                        this.navCtrl.parent.navCtrl.pop()
                                        });    
                                }
        
        
                                });
                            });
                        });          
                    });
                });
            });
        }
        catch(err){
            console.log("err:"+err);    
        }
    }

    refreshObjects(ratio1:number , ratio2 : number){
        this.ratio1 = ratio1;
        this.ratio2 = ratio2;
        this.methodSessionObject.unknownWordList = [];
        this.oldUnknownWordData = [];
        console.log("session :"+this.sessionCounter);
        if(this.sessionCounter == 0)
        {
            this.balanceRatios(); // do everyTime {
                             
                // later
                this.addUnknownWordDataListToMethod(); 
                console.log("un length:", this.methodSessionObject.unknownWordList.length);
                var i:number=0
                var myMapServiceObject:MyMApServices= new MyMApServices();
                
                for(let uk2MapObj of this.methodSessionObject.unknownWordList)
                 {
                     if(i>this.ratio2) // i > 3
                         break;
                     myMapServiceObject.setObject( this.methodSessionObject.retentionWordList,uk2MapObj,false);
                     myMapServiceObject.setObject(this.methodSessionObject.controlItems,uk2MapObj,false);
                     i++;
                 }
        }
        else if(this.sessionCounter >= 1){
            
            i=0;
            for(let presetObj of this.preSessionWordDataArray)
            {
                  console.log("preset knonw:"+ presetObj.isKnownWord);
                    if(!presetObj.isKnownWord)
                     {
                         if(i<this.ratio2)
                              this.methodSessionObject.unknownWordList.push(presetObj.wordData);
                          else
                             this.oldUnknownWordData.push(presetObj.wordData); 
                        i++;
                     }   
                    else{
                        if(this.studentObject.studentWordDetailsArray[this.wordType].knownUnknownArrayList==null)
                            this.studentObject.studentWordDetailsArray[this.wordType].knownUnknownArrayList=[];
                        if(this.studentObject.studentWordDetailsArray[this.wordType].newKnownUnknownArrayList==null)
                            this.studentObject.studentWordDetailsArray[this.wordType].newKnownUnknownArrayList=[];
                       // this.wordServiceObj.removeWordFromArray(this.studentObject.knownUnknownArrayList,presetObj.wordData);
                        this.wordServiceObj.removeKnownUnKnownWordFromArray(this.studentObject.studentWordDetailsArray[this.wordType].newKnownUnknownArrayList,presetObj.wordData);
                        var knownUnknownWordDataObject : KnownUnknownWordData= new KnownUnknownWordData();
                        knownUnknownWordDataObject.wordData=presetObj.wordData;
                        knownUnknownWordDataObject.methodIndex=this.methodIndex;
                        knownUnknownWordDataObject.wordId=presetObj.wordData.wordId;
                        knownUnknownWordDataObject.methodName=this.studentObject.studentWordDetailsArray[this.wordType].methodArray[this.methodIndex].methodName;
                        knownUnknownWordDataObject.postAssessmentCounter=0;
                        this.studentObject.studentWordDetailsArray[this.wordType].newKnownUnknownArrayList.push(knownUnknownWordDataObject);
                      }
                   
                }
             console.log(" me un:"+this.methodSessionObject.unknownWordList.length);
             console.log(" stu un:"+this.studentObject.studentWordDetailsArray[this.wordType].unKnownArrayList.length);
             console.log(" old un:"+this.oldUnknownWordData.length);
            this.maxRatio2 = this.methodSessionObject.unknownWordList.length + this.studentObject.studentWordDetailsArray[this.wordType].unKnownArrayList.length + this.oldUnknownWordData.length;
            this.balanceRatios();
            var j=0;
            while(i<this.ratio2  && j<this.studentObject.studentWordDetailsArray[this.wordType].unKnownArrayList.length)
            {
                this.methodSessionObject.unknownWordList.push(this.studentObject.studentWordDetailsArray[this.wordType].unKnownArrayList[j++]);
                i++;
            }
        }
        this.addKnownWordDataListToMethod();
        console.log("r1:"+this.ratio1+"  r2:"+this.ratio2+"  kn.leng:"+this.methodSessionObject.knownWordList.length);
      
        this.goBackToView();
         
    }
    
    updatePreSessionResultTest(){
        this.preSessionWordDataArray=this.incrementalRehrsalService.compareAssessment(this.test1Map,this.test2Map,this.preSessionWordDataArray);
      
     }


    startSession()
    {
        
       
         this.getWordDataList();
       
         if(this.oldUnknownWordData!=null && this.oldUnknownWordData.length > 0 )
         {
             this.storage.set('oldUnknownWordData',JSON.stringify({ oldUnknownWordData: this.oldUnknownWordData }) );
            
         }
         else{
             this.storage.set('oldUnknownWordData',JSON.stringify({ oldUnknownWordData: null }) );
         }
         
         this.storage.set('studentObject',JSON.stringify({ studentObject: this.studentObject }) );
         this.storage.set('methodIndex',JSON.stringify({ methodIndex: this.methodIndex }) );
         this.storage.set('methodSessionObject',JSON.stringify({ methodSessionObject: this.methodSessionObject }) );
         this.storage.set('sessionCounter',JSON.stringify({ sessionCounter: this.sessionCounter }) );
         
        if(this.methodIndex==0 || this.methodIndex==2 || this.methodIndex ==3)
        {
            this.storage.set('wordDataList',JSON.stringify({ wordDataList: this.testWordDataList }) );
            this.navCtrl.push(FlashCardIntervetion);
        }
        else if(this.methodIndex==1)
        {
            this.navCtrl.push(DIFlashCardSessionTest);
        }

    }

  
    getWordDataList(){
        console.log("  get word list r1:"+this.ratio1 +"  r2:"+ this.ratio2);
        if(this.methodIndex==0)
        {
            this.testWordDataList =this.incrementalRehersalServiceObject.startSessionTest(this.methodSessionObject,this.ratio1,this.ratio2);

        }
        else if(this.methodIndex==1 && this.methodSessionObject.unknownWordList.length <= this.ratio2 )
        {
            this.dimethodStart=true;
        }
        else if(this.methodIndex==2)
        {
            this.testWordDataList= this.traditionalDrillPracticeService.getWorDataList(this.methodSessionObject,this.ratio2,this.ratio1);
        }
        else if(this.methodIndex ==3)
        {
            this.testWordDataList= this.traditionalDrillPracticeService.getWorDataList(this.methodSessionObject,this.ratio2,this.ratio1);
        }

    }

    goBackToView()
    {
      if(this.methodSessionObject!=null)
      {
        this.storage.set('methodSessionObject',JSON.stringify({ methodSessionObject: this.methodSessionObject }) );
      }
      if(this.studentObject!=null)
      {
        this.storage.set('studentObject',JSON.stringify({ studentObject: this.studentObject }) );
      } 
    }


    showModalWord(wordDataObj: WordData)
    {
        let profileModal = this.modalCtrl.create(ViewPreSessionUnKnownWord,{
            wordDataObject: wordDataObj 
        },{
            cssClass: 'update-profile-modal'
        });
       
        profileModal.present();
    }

    updateRatio(){

        let profileModal = this.modalCtrl.create(MethodRatioSelection,{
            methodIndex: this.methodIndex,
            studentObject: this.studentObject,
            organizationDetailsUID: this.organizationDetails.organizationDetailsUID,
            maxRatio2 : this.maxRatio2,
            wordType: this.wordType
           
        },{
            cssClass: 'update-profile-modal'
        });
        profileModal.present();
  
        profileModal.onDidDismiss(data => {
            if(data!=null){
                var updated:boolean = data.updated;
                console.log("updated r1:"+data.ratio1 +"  r2:"+data.ratio2);
                if(updated)
                    this.refreshObjects(data.ratio1, data.ratio2);
            }    
        });
    }


    startDirectFirstSession(methodIndex : number){
    
        var methodSessionObject = new MethodSession();
        var i:number=0
        var sessionCounter : number = this.studentObject.studentWordDetailsArray[this.wordType].methodArray[methodIndex].sessionsArray.length;
        var myMapServiceObject:MyMApServices= new MyMApServices();
    
        for(let uk2MapObj of methodSessionObject.unknownWordList)
         {
             if(i>3)
                 break;
             myMapServiceObject.setObject( methodSessionObject.retentionWordList,uk2MapObj,false);
             myMapServiceObject.setObject(methodSessionObject.controlItems,uk2MapObj,false);
             i++;
         }   
         if(methodSessionObject.unknownWordList.length >= this.ratio2)
         {
             this.storage.set('studentObject',JSON.stringify({ studentObject: this.studentObject }) );
             this.storage.set('methodIndex',JSON.stringify({ methodIndex: methodIndex }) );
             this.storage.set('methodSessionObject',JSON.stringify({ methodSessionObject: methodSessionObject }) );
             this.storage.set('sessionCounter',JSON.stringify({ sessionCounter: sessionCounter }) );
             this.navCtrl.push(PreSessionResult).then(()=>{
                     this.goBackToView();
             });   
         }
         else
         {
             this.error="can not start sessio sry.";
         }
       
    }
    
 
    addKnownWordDataListToMethod()
    {
        var j:number=0;
        if(this.methodSessionObject.knownWordList  == null)
        {
            this.methodSessionObject.knownWordList=[];
        }
        j=this.methodSessionObject.knownWordList.length;
        console.log(" j:"+j+"  ratio1:"+this.ratio1);
        while(j>this.ratio1 && this.methodSessionObject.knownWordList.length>0)
        {
            this.methodSessionObject.knownWordList.pop();
            j--;
        }   

        while(j<this.ratio1)
        {
            this.methodSessionObject.knownWordList.push(this.studentObject.studentWordDetailsArray[this.wordType].knwonArrayList[j++]);
        }
        this.methodSessionObject.knownWordList=this.incrementalRehersalServiceObject.shuffle(this.methodSessionObject.knownWordList);
        
    }

    addUnknownWordDataListToMethod(){
        var j=0;
          
        if(this.methodSessionObject.unknownWordList  == null)
        {
            this.methodSessionObject.unknownWordList=[];
        }

        while(j<this.ratio2)
        {
            this.methodSessionObject.unknownWordList.push(this.studentObject.studentWordDetailsArray[this.wordType].unKnownArrayList[j]);
            j++;
        }
    }


    balanceRatios()
    {
        console.log("balance  maxr1:"+this.maxRatio1+"  max r2:"+this.maxRatio2);
        if(this.methodIndex == 1)
        {
            var minMaxRatios:number = Math.min(this.maxRatio2 , this.maxRatio1);
            if(this.ratio1 > minMaxRatios)
            {
                this.ratio1 = minMaxRatios;
    
            }
            if( this.ratio2 > minMaxRatios){
                this.ratio2 = minMaxRatios;
            }
            if(this.ratio1 != this.ratio2)
            {
                this.ratio1 = Math.min(this.ratio1, this.ratio2);
                this.ratio2 = this.ratio1
            }
            
            this.updateRatio1();
            this.updateRatio2();
        
        }
        else{

            if(this.methodIndex == 0) {
                if(this.ratio1 > this.maxRatio1)
                {
                    this.ratio1 = this.maxRatio1;
                    this.updateRatio1();
                }   
            }

            if(this.ratio2 > this.maxRatio2)
            {
                this.ratio2 = this.maxRatio2;
                this.updateRatio2();
            }
        }
        
    }

    updateRatio2(){
     
       this.studentObject.studentWordDetailsArray[this.wordType].methodArray[this.methodIndex].ratio2 = this.ratio2;
        var methodStudentServiceObject: MethodStudentService = new MethodStudentService(this.organizationDetails.organizationDetailsUID,this.wordType);
        methodStudentServiceObject.updateMethodRatio2(this.studentObject,this.methodIndex);
       this.goBackToView();
    }
    
    updateRatio1(){
        
       this.studentObject.studentWordDetailsArray[this.wordType].methodArray[this.methodIndex].ratio1 = this.ratio1;
       var methodStudentServiceObject: MethodStudentService = new MethodStudentService(this.organizationDetails.organizationDetailsUID,this.wordType);
       methodStudentServiceObject.updateMethodRatio1(this.studentObject,this.methodIndex);
       this.goBackToView();
    }
}