import { Component } from '@angular/core';
import { Storage } from '@ionic/storage';
import { AlertController, NavController } from 'ionic-angular';
import { OrganizationDetails } from '../../../models/organizationDetails';
import { User } from '../../../models/user';


@Component({
  selector: 'page-addAdminAccess',
  templateUrl: 'addAdminAccess.html'
})

export class AddAdminAccess {

  private allDatauserDetailsList: Array<User> = [new User()];
  private searchTerm: string = '';
  private error: String = "Error Message";
  private userDetailsList: Array<User> = [new User()];
  private userDetails: User = new User();
  private organizationDetails: OrganizationDetails = new OrganizationDetails();
  constructor(private navCtrl: NavController,
    private alertCtrl: AlertController,
    private storage: Storage) {

  };

  filterItems() {

    this.userDetailsList = this.allDatauserDetailsList.filter((userObject) => {
      return userObject.firstname.toLowerCase().indexOf(this.searchTerm.toLowerCase()) > -1 ||
        userObject.lastname.toLowerCase().indexOf(this.searchTerm.toLowerCase()) > -1 ||
        userObject.emailId.toLowerCase().indexOf(this.searchTerm.toLowerCase()) > -1 ||
        userObject.userRole.toLowerCase().indexOf(this.searchTerm.toLowerCase()) > -1;
    });
    console.log("ion filter enter" + this.allDatauserDetailsList.length);
  }

  removeUserDetails(userObject: User) {
    this.removeUserConfirm(userObject);
  }

  updateUserRole(userObject: User) {
    console.log("role:" + userObject.userRole);
    console.log("update will enter" + this.allDatauserDetailsList.length);
    this.updateUserConfirm(userObject);
    console.log("iipdaon will enter" + this.allDatauserDetailsList.length);
  }

  onSelectChange(selectedValue: any, index: number) {
    console.log('Selected', selectedValue, index, this.allDatauserDetailsList[index].userRole, this.allDatauserDetailsList.length);

    this.userDetailsList[index].userRole = selectedValue;
    console.log('Selected', selectedValue, index, this.allDatauserDetailsList[index].userRole, this.allDatauserDetailsList.length);
    //  this.filterItems();
  }
  updateUserConfirm(userObject: User) {
    let alert = this.alertCtrl.create({
      title: 'Update User Role',
      message: 'Do you want to update User ' + userObject.emailId + ' with user role of ' + userObject.userRole + '?',
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
            //   this.filterItems();
            console.log('yes clicked');
          }
        }
      ]
    });
    alert.present();
  }

  removeUserConfirm(userObject: User) {
    let alert = this.alertCtrl.create({
      title: 'Remove User',
      message: 'Do you want to remove User ' + userObject.emailId + '?',
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
            //   this.filterItems();
            console.log('yes clicked');
          }
        }
      ]
    });
    alert.present();
  }

}