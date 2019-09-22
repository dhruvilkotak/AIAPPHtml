import { Component } from '@angular/core';
import { DocumentPicker } from '@ionic-native/document-picker';
import { File } from '@ionic-native/file';
import { SocialSharing } from '@ionic-native/social-sharing';
import { Storage } from '@ionic/storage';
import { AlertController, NavController, Platform } from 'ionic-angular';
import { OrganizationDetails } from '../../models/organizationDetails';
import { StudentData } from '../../models/StudentData';
import { User } from '../../models/user';
import { StudentServices } from '../../services/studentAddRemoveServices';

@Component({
  selector: 'page-viewStudent',
  templateUrl: 'viewStudent.html'
})

export class ViewStudent {

  private studentDetailsArray: Array<StudentData> = [new StudentData()];
  private allData: Array<StudentData> = [new StudentData()];
  private studentServicesObject: StudentServices = new StudentServices();
  private searchTerm: string = '';
  private error: String = "Error Message";
  private userDetails: User = new User();
  organizationDetails: OrganizationDetails = new OrganizationDetails();
  constructor(private navCtrl: NavController,
    private file: File,
    private alertCtrl: AlertController,
    private storage: Storage,
    public plt: Platform,
    private socialSharing: SocialSharing,
    private docPicker: DocumentPicker) {

    this.constructorMethod();
  };

  filterItems() {

    this.studentDetailsArray = this.allData.filter((student) => {
      return student.firstName.toLowerCase().indexOf(this.searchTerm.toLowerCase()) > -1 ||
        student.lastName.toLowerCase().indexOf(this.searchTerm.toLowerCase()) > -1 ||
        student.studentId.toLowerCase().indexOf(this.searchTerm.toLowerCase()) > -1;
    });

  }

  ionViewDidLoad() {
    this.storage.set('studentObject', null);
    //   this.storage.clear();
  }
  public ionViewWillEnter() {

    //  this.constructorMethod();

  }

  constructorMethod() {
  }


  removeStudent(studentObj: StudentData) {
    if (this.userDetails.userRole != "faculty") {
      this.error = "";
      this.presentConfirm(studentObj);
    }
    else {
      this.error = " You are not Admin."
    }
  }

  viewStudentData(studentObj: StudentData) {


  }

  presentConfirm(studentObj: StudentData) {
    let alert = this.alertCtrl.create({
      title: 'Remove Student',
      message: 'Do you want to remove Student ' + studentObj.studentId + '?',
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
            this.studentServicesObject.removeStudentFromArray(this.allData, studentObj);
            this.filterItems();
            console.log('yes clicked');
          }
        }
      ]
    });
    alert.present();
  }

  exportStudentFile() {
    //  this.studentServicesObject.exportStudentFileFromArray(this.file,this.plt,this.socialSharing,this.organizationDetails.organizationDetailsUID);
  }

}