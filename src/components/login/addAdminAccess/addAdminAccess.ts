import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import { UserFireBaseService } from '../../../firebaseServices/userFireBaseService';
import { User } from '../../../models/user';
import { Storage } from '@ionic/storage';
import { Student } from '../../../models/student';
import { OrganizationDetails } from '../../../models/organizationDetails';


@Component({
  selector: 'page-addAdminAccess',
  templateUrl: 'addAdminAccess.html'
})

export class AddAdminAccess {

  private allDatauserDetailsList: Array<User> = [];
  private searchTerm: string = '';
  private error: string = '';
  private userFireBaseService: UserFireBaseService = new UserFireBaseService();
  private userDetailsList:Array<User>=[];
  private userDetails:User = new User();
  private organizationDetails : OrganizationDetails = new OrganizationDetails();
  constructor(private navCtrl: NavController,
    private alertCtrl: AlertController,
    private storage:Storage) {

      this.storage.get('userDetails').then((val) => {
        var fileData:any = JSON.parse(val);
        this.userDetails = fileData.userDetails;

        this.storage.get('organizationDetails').then((val) => {
          var fileData:any = JSON.parse(val);
          this.organizationDetails = fileData.organizationDetails;

          this.userFireBaseService.getUserDetailsList(this.organizationDetails.organizationDetailsUID).then(data => {
            console.log("ion will enter"+this.allDatauserDetailsList.length + "  "+data.length);
            this.userDetailsList = data;
            this.allDatauserDetailsList = data;
            this.userFireBaseService.removeUserFromArray(this.allDatauserDetailsList,this.userDetails);
            console.log("ion will enter2"+this.allDatauserDetailsList.length + "  "+data.length);
          });
  
        });
        
      });
     

  };

  filterItems() {

    this.userDetailsList = this.allDatauserDetailsList.filter((userObject) => {
      return userObject.firstname.toLowerCase().indexOf(this.searchTerm.toLowerCase()) > -1 || 
      userObject.lastname.toLowerCase().indexOf(this.searchTerm.toLowerCase()) > -1 || 
      userObject.emailId.toLowerCase().indexOf(this.searchTerm.toLowerCase()) > -1 ||
      userObject.userRole.toLowerCase().indexOf(this.searchTerm.toLowerCase()) > -1 ;
    });
    console.log("ion filter enter"+this.allDatauserDetailsList.length );
  }
 
  removeUserDetails(userObject: User) {
    this.removeUserConfirm(userObject);
  }

  updateUserRole(userObject:User)
  {
    console.log("role:"+userObject.userRole);
    console.log("update will enter"+this.allDatauserDetailsList.length );
    this.updateUserConfirm(userObject);
    console.log("iipdaon will enter"+this.allDatauserDetailsList.length );
  }

  onSelectChange(selectedValue: any,index:number) {
    console.log('Selected', selectedValue, index , this.allDatauserDetailsList[index].userRole,this.allDatauserDetailsList.length);
    
    this.userDetailsList[index].userRole = selectedValue;
    console.log('Selected', selectedValue, index , this.allDatauserDetailsList[index].userRole,this.allDatauserDetailsList.length);
  //  this.filterItems();
  }
  updateUserConfirm(userObject: User) {
    let alert = this.alertCtrl.create({
      title: 'Update User Role',
      message: 'Do you want to update User ' + userObject.emailId + ' with user role of '+userObject.userRole+'?',
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
            userFireBaseService.updateUserDetails(userObject);
            console.log('roole:'+this.allDatauserDetailsList.length);
            this.userFireBaseService.updateUserDetailsArray(this.allDatauserDetailsList, userObject);
            console.log('roole2:'+this.allDatauserDetailsList.length);
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
            var userFireBaseService: UserFireBaseService = new UserFireBaseService();
            userFireBaseService.removeEmailId(userObject.emailId,this.organizationDetails.organizationDetailsUID);
            userFireBaseService.removeUserObject(userObject);
            this.userFireBaseService.removeUserFromArray(this.allDatauserDetailsList, userObject);
            
         //   this.filterItems();
            console.log('yes clicked');
          }
        }
      ]
    });
    alert.present();
  }

}