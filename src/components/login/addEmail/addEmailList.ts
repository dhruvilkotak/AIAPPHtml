import { Component } from '@angular/core';
import { NavController, AlertController, ToastController } from 'ionic-angular';
import { UserFireBaseService } from '../../../firebaseServices/userFireBaseService';
import { User } from '../../../models/user';
import { Storage } from '@ionic/storage';
import { OrganizationDetails } from '../../../models/organizationDetails';
import * as firebase from 'firebase';

@Component({
  selector: 'page-addEmailList',
  templateUrl: 'addEmailList.html'
})

export class AddEmailList {

  private newEmailId: string = '';
  private userEmailList: Array<string> = [];
  private allData: Array<string> = [];
  private searchTerm: string = '';
  private error: String  = "Error Message";
  private userFireBaseService: UserFireBaseService = new UserFireBaseService();
  private userDetails:User = new User();
  private organizationDetails: OrganizationDetails = new OrganizationDetails ();
  constructor(private navCtrl: NavController,
    private alertCtrl: AlertController,
    private storage: Storage,
    private toastController: ToastController) {

      this.storage.get('userDetails').then((val) => {
        var fileData:any = JSON.parse(val);
        this.userDetails = fileData.userDetails;
        
        
      this.storage.get('organizationDetails').then((val) => {
        var fileData:any = JSON.parse(val);
        this.organizationDetails = fileData.organizationDetails;

          this.userFireBaseService.getEmailIdList(this.userDetails.emailId,this.organizationDetails.organizationDetailsUID).then(data => {
            console.log("ion will enter");
            this.userEmailList = data;
            this.allData = data;
            this.userFireBaseService.removeStringFromArray(this.allData,this.userDetails.emailId );
               
          });  
      
        });
      });
    
  };

  filterItems() {

    this.userEmailList = this.allData.filter((emailId) => {
      return emailId.toLowerCase().indexOf(this.searchTerm.toLowerCase()) > -1;
    });

  }
  addNewEmail() {

    try {
      this.userFireBaseService.addNewEmail(this.newEmailId,this.organizationDetails.organizationDetailsUID).then(data => {
        this.allData.push(this.newEmailId);
        this.filterItems();
        this.sendEmail(this.newEmailId,this.organizationDetails.schoolCode);


        this.newEmailId = '';
        this.error = '';

      }).catch(err => {
        this.error = err;
      });
    }
    catch (e) {
      this.error = "" + e;
      console.log(e);
    }
  }

  removeEmailId(emailId: string) {
    this.removeEmailIdConfirm(emailId);
  }


  removeEmailIdConfirm(emailId: string) {
    let alert = this.alertCtrl.create({
      title: 'Remove Email',
      message: 'Do you want to remove Email ' + emailId + '?',
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
            var userFireBaseService: UserFireBaseService = new UserFireBaseService();
            userFireBaseService.removeEmailId(emailId,this.organizationDetails.organizationDetailsUID);
            this.userFireBaseService.removeStringFromArray(this.allData, emailId);
            this.filterItems();
            console.log('yes clicked');
          }
        }
      ]
    });
    alert.present();
  }

  sendEmailIdConfirm(emailId: string,schoolCode:string) {
    let alert = this.alertCtrl.create({
      title: 'Send Invitation Email',
      message: 'Do you want to send Invitation Email to ' + emailId + '?',
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
            this.sendEmail(emailId,schoolCode);
          }
        }
      ]
    });
    alert.present();
  }

  sendEmail(emailId:string,schoolCode:string){
    var sendEmailInvitation = firebase.functions().httpsCallable('sendEmailInvitation')
    sendEmailInvitation({emailId: emailId,schoolCode:schoolCode}).then(result => {
      var msg = result.data
      this.presentToast();
      console.log(msg)
      console.log('Called successfully :)')
    }).catch(error => {
      console.log('Error :( in sending the requests')
    });
  }

  async presentToast() {
    const toast = await this.toastController.create({
      message: 'Email Invitation sent successfully !',
      duration: 2000
    });
    toast.present();
  }

}