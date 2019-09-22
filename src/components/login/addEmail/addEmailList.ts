import { Component } from '@angular/core';
import { Storage } from '@ionic/storage';
import { AlertController, NavController, ToastController } from 'ionic-angular';
import { OrganizationDetails } from '../../../models/organizationDetails';
import { User } from '../../../models/user';

@Component({
  selector: 'page-addEmailList',
  templateUrl: 'addEmailList.html'
})

export class AddEmailList {

  private newEmailId: string = '';
  private userEmailList: Array<string> = ["email1@gmail.com", "a@gmail.com"];
  private allData: Array<string> = ["email1@gmail.com", "a@gmail.com"];
  private searchTerm: string = '';
  private error: String = "Error Message";
  private userDetails: User = new User();
  private organizationDetails: OrganizationDetails = new OrganizationDetails();
  constructor(private navCtrl: NavController,
    private alertCtrl: AlertController,
    private storage: Storage,
    private toastController: ToastController) {


  };

  filterItems() {

    this.userEmailList = this.allData.filter((emailId) => {
      return emailId.toLowerCase().indexOf(this.searchTerm.toLowerCase()) > -1;
    });

  }
  addNewEmail() {

    try {
      this.allData.push(this.newEmailId);
      this.filterItems();
      //this.sendEmail(this.newEmailId,this.organizationDetails.schoolCode);

      this.newEmailId = '';
      this.error = '';

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
            this.filterItems();
            console.log('yes clicked');
          }
        }
      ]
    });
    alert.present();
  }

  sendEmailIdConfirm(emailId: string, schoolCode: string) {
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
            this.sendEmail(emailId, schoolCode);
          }
        }
      ]
    });
    alert.present();
  }

  sendEmail(emailId: string, schoolCode: string) {
  }



}