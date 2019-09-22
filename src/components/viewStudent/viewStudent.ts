import { Component} from '@angular/core';
import { NavController,AlertController  } from 'ionic-angular';
import { Student } from '../../models/student';
import { File } from '@ionic-native/file';
import { StudentdashBoard } from '../studentDashBoard/studentDashBoard';
import { StudentServices } from '../../services/studentAddRemoveServices';
import { Storage} from '@ionic/storage';
import { Platform } from 'ionic-angular';
import { SocialSharing } from '@ionic-native/social-sharing';
import { DocumentPicker } from '@ionic-native/document-picker';
import { StudentFireBaseService } from '../../firebaseServices/studentFireBaseService';
import { User } from '../../models/user';
import { StudentData } from '../../models/StudentData';
import { OrganizationDetails } from '../../models/organizationDetails';

@Component({
    selector: 'page-viewStudent',
    templateUrl: 'viewStudent.html'
  })
  
export class ViewStudent{

    private studentDetailsArray:Array<StudentData>=[];
    private allData : Array<StudentData>=[];
    private  studentServicesObject : StudentServices = new StudentServices();
    private studentFirebaseService:StudentFireBaseService;
    private searchTerm: string = '';
    private error:string='';
    private userDetails:User = new User();
    organizationDetails : OrganizationDetails = new OrganizationDetails();
    constructor(private navCtrl: NavController ,
      private file:File, 
      private alertCtrl:AlertController,
      private storage : Storage ,
      public plt: Platform,
      private socialSharing:SocialSharing,
      private docPicker: DocumentPicker) {

        this.constructorMethod(); 
    };

    filterItems(){
 
        this.studentDetailsArray = this.allData.filter((student) => {
            return student.firstName.toLowerCase().indexOf(this.searchTerm.toLowerCase()) > -1 || 
            student.lastName.toLowerCase().indexOf(this.searchTerm.toLowerCase()) > -1 || 
            student.studentId.toLowerCase().indexOf(this.searchTerm.toLowerCase()) > -1;
          });

    }

    ionViewDidLoad() {
      this.storage.set('studentObject',null);
   //   this.storage.clear();
    }
    public ionViewWillEnter() {
     
    //  this.constructorMethod();
      
    }

    constructorMethod()
    {
      this.storage.get('userDetails').then((val) => {
        var fileData:any = JSON.parse(val);
        this.userDetails = fileData.userDetails;
        
        this.storage.set('studentObject', null);
        this.storage.get('organizationDetails').then((val) => {
          var fileData:any = JSON.parse(val);
          this.organizationDetails = fileData.organizationDetails;
          console.log("studet:"+this.userDetails.firstname+"   org:"+this.organizationDetails.organizationDetailsUID);

          this.studentFirebaseService = new StudentFireBaseService(this.organizationDetails.organizationDetailsUID,0);
          this.studentFirebaseService.getStudentDataList(this.studentDetailsArray,this.organizationDetails.organizationDetailsUID,0).then(data=>{
            //  this.studentDetailsArray=data;
              this.allData=data;
              
            });
        });          
      }); 
    }


    removeStudent(studentObj:StudentData)
    {
      if(this.userDetails.userRole!="faculty"){
        this.error="";
        this.presentConfirm(studentObj);
      }
      else{
        this.error = " You are not Admin."
      }
    }
 
    viewStudentData(studentObj:StudentData)
    {
        this.studentFirebaseService.getStudentDataRecord(studentObj,this.organizationDetails.organizationDetailsUID,0).then(data=>{
          
          var studentDataObj:Student = data;
          this.storage.set('studentObject',JSON.stringify({ studentObject: studentDataObj }) );
          console.log("id:"+studentObj.studentId);
          this.navCtrl.push(StudentdashBoard);
        
        }).catch(err=>{
          
        });

        
    }

    presentConfirm(studentObj:StudentData) {
        let alert = this.alertCtrl.create({
          title: 'Remove Student',
          message: 'Do you want to remove Student '+studentObj.studentId +'?',
          buttons: [
            {
              text: 'Cancel',
              role: 'cancel',
              handler: () => {
                console.log('Cancel clicked');
              }
            },
            {
              text: 'yes',
              handler: () => {
                this.studentFirebaseService.removeStudent(studentObj);
                this.studentServicesObject.removeStudentFromArray(this.allData,studentObj);
                this.filterItems();   
                console.log('yes clicked');
              }
            }
          ]
        });
        alert.present();
      }
 
      exportStudentFile()
      {
      //  this.studentServicesObject.exportStudentFileFromArray(this.file,this.plt,this.socialSharing,this.organizationDetails.organizationDetailsUID);
      }

}