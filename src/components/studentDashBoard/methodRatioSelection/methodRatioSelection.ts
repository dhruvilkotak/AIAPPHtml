import { Component } from "@angular/core";
import { ViewController, NavParams, NavController } from "ionic-angular";
import { Student } from "../../../models/student";
import { Storage } from "@ionic/storage";
import { PreSessionView } from "../../methodSessions/viewPreSessionData/preSessionData";
import { MethodStudentService } from "../../../firebaseServices/methodStudentService";

@Component({
  selector: 'page-methodRatioSelection',
  templateUrl: 'methodRatioSelection.html'
})


export class MethodRatioSelection{
    
    error:string="";
    studentObject:Student = new Student();
    methodIndex : number = -1;
    
    ratio1:number=1;
    oldRatio1:number =1;
    minRatio1:number=1;
    maxRatio1:number=0;
    
    ratio2:number=1;
    oldRatio2:number =1;
    minRatio2:number=1;
    maxRatio2:number=0;
    canUpdateRatio:boolean =false;
    OTR:number=0;
    methodTitle:String="";
    organizationDetailsUID:string = "";
    wordType:number=0;

    constructor(public navCtrl: NavController,
        private viewCtrl:ViewController,
        private params:NavParams,
        private storage:Storage) {
        this.studentObject=params.get('studentObject');
        this.methodIndex=params.get('methodIndex');
        this.organizationDetailsUID=params.get('organizationDetailsUID');
        this.wordType = params.get('wordType');

        this.maxRatio2 = params.get('maxRatio2');
        this.maxRatio1 = this.studentObject.studentWordDetailsArray[this.wordType].knwonArrayList.length;
        if(this.methodIndex ==1)
        {
            this.maxRatio1 = Math.min(this.maxRatio1, this.maxRatio2);
            this.maxRatio2 = this.maxRatio1;
           
        }
        console.log("max ratio1:"+this.maxRatio1);
        this.oldRatio1 = this.studentObject.studentWordDetailsArray[this.wordType].methodArray[this.methodIndex].ratio1;
        this.oldRatio2 = this.studentObject.studentWordDetailsArray[this.wordType].methodArray[this.methodIndex].ratio2;
        
        this.ratio1 = this.studentObject.studentWordDetailsArray[this.wordType].methodArray[this.methodIndex].ratio1;
        this.ratio2 = this.studentObject.studentWordDetailsArray[this.wordType].methodArray[this.methodIndex].ratio2;
        this.methodTitle=this.studentObject.studentWordDetailsArray[this.wordType].methodArray[this.methodIndex].methodName;
        this.checkUpdateRatio();
        this.updateOTR();
        if(this.methodIndex ==1)
        {
            this.OTR=this.studentObject.studentWordDetailsArray[this.wordType].methodArray[this.methodIndex].totalOppurtunitiesToRespond;
        }
    }

    dismiss() {
        this.ratio1 = this.oldRatio1;
        this.ratio2 = this.oldRatio2 ; 
        this.viewCtrl.dismiss({
            updated:false,
            ratio1 : this.ratio1,
            ratio2 : this.ratio2
        });
    }

    updateRatio(){
        this.checkUpdateRatio();
        if(!this.canUpdateRatio)
        {
            this.error = " can not update the ratio.";
        }
        else{

                
            if(((this.methodIndex!=2 && this.methodIndex!=3 && this.ratio1>0 && this.ratio1 <10)||( (this.methodIndex ==2 || this.methodIndex ==3) && this.ratio1>0 && this.ratio1<40)) && (this.ratio2>0 && this.ratio2<10 )  )
            {
                this.studentObject.studentWordDetailsArray[this.wordType].methodArray[this.methodIndex].ratio1=this.ratio1;
                this.studentObject.studentWordDetailsArray[this.wordType].methodArray[this.methodIndex].ratio2=this.ratio2;
                this.studentObject.studentWordDetailsArray[this.wordType].methodArray[this.methodIndex].totalOppurtunitiesToRespond=this.OTR;
                var methodStudentServiceObject: MethodStudentService = new MethodStudentService(this.organizationDetailsUID,this.wordType);
                methodStudentServiceObject.updateMethodRatio1(this.studentObject,this.methodIndex);
                methodStudentServiceObject.updateMethodRatio2(this.studentObject,this.methodIndex);
                methodStudentServiceObject.updateMethodOTR(this.studentObject,this.methodIndex);
                this.storage.set('studentObject',JSON.stringify({ studentObject: this.studentObject }) );
                this.storage.set('methodIndex',JSON.stringify({ methodIndex: this.methodIndex }) );
            //        this.navCtrl.push(PreSessionView);
                if(this.ratio1 != this.oldRatio1 || this.ratio2 != this.oldRatio2)
                {
                    this.viewCtrl.dismiss({
                        updated:true,
                        ratio1 : this.ratio1,
                        ratio2 : this.ratio2
                    });
                }
                else{
                    this.viewCtrl.dismiss({
                        updated:false,
                        ratio1 : this.ratio1,
                        ratio2 : this.ratio2
                    }); 
                }
            }
            else{
                if(this.methodIndex==2)
                    this.error =" 0 < Number Of Cycle < 40 and 0 < Number of Unknowns < 10";
                else
                    this.error =" 0 < Number Of Knowns < 10 and 0 < Number of Unknowns < 10";
            }
        }
    }

    updateRatio1(){
        if(this.methodIndex==1)
        {
            this.ratio1=this.ratio2;
           
        }
        this.updateOTR();
    }

    updateOTR(){
        console.log("r1:"+this.ratio1+" r2:"+this.ratio2);
        switch(this.methodIndex){
            case 0:
                console.log("r1:"+this.ratio1+" r2:"+this.ratio2);
                var t:number= +this.ratio1 + 3;
                this.OTR = ( this.ratio1 * (t) * this.ratio2 ) /2;
                console.log("r1:"+this.ratio1+" r2:"+this.ratio2+" otr:"+this.OTR+"  1:"+  (t)+" 2:"+this.ratio1 * (this.ratio1+3) * this.ratio2);
                break;
            case 1:
                if(this.studentObject.studentWordDetailsArray[this.wordType].methodArray[this.methodIndex].totalOppurtunitiesToRespond ==null || this.studentObject.studentWordDetailsArray[this.wordType].methodArray[this.methodIndex].totalOppurtunitiesToRespond==0)
                {
                  this.studentObject.studentWordDetailsArray[this.wordType].methodArray[this.methodIndex].totalOppurtunitiesToRespond = 120;
                    var methodStudentService: MethodStudentService = new MethodStudentService(this.organizationDetailsUID,this.wordType);
                    methodStudentService.updateMethodOTR(this.studentObject,this.methodIndex);
                    this.storage.set('studentObject', JSON.stringify({ studentObject: this.studentObject }));
                    this.OTR=this.studentObject.studentWordDetailsArray[this.wordType].methodArray[this.methodIndex].totalOppurtunitiesToRespond;
                }
                break;
            case 2:
            case 3:
                this.OTR = this.ratio1 * this.ratio2 ;
                break;
            
        }
    }

    checkUpdateRatio(){
        this.canUpdateRatio = true;
        if( this.maxRatio2 == 0 )
        {
            this.canUpdateRatio = false; 
        }
        else if(this.maxRatio1 == 0)
        {
            if(this.methodIndex == 2 || this.methodIndex ==3)
            {
                this.checkRatio2();
            }
            else{
                this.canUpdateRatio = false;
            }
        }
        else{
            
            if(this.methodIndex == 1)
            {
                this.ratio1 = this.ratio2;
            }
            if(this.methodIndex == 0 || this.methodIndex ==1)
            {
                this.checkRatio1();
            }
            this.checkRatio2();
        }
    }

    checkRatio1(){
        if(!(this.maxRatio1 > 0  && this.maxRatio1>= this.ratio1 && this.ratio1 >= this.minRatio1))
            this.canUpdateRatio = false;
    }
     
    
    checkRatio2(){
        if(!(this.maxRatio2 > 0  && this.maxRatio2>= this.ratio2 && this.ratio2 >= this.minRatio2))
            this.canUpdateRatio = false;
    }
}