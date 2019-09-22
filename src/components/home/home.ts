import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AddStudent } from '../AddStudent/AddStudent';
import { User } from '../../models/user';
import { ViewStudent } from '../viewStudent/viewStudent';
import { Storage } from '@ionic/storage';
import { OrganizationFireBaseService } from '../../firebaseServices/organizationFireBaseService';
import { OrganizationDetails } from '../../models/organizationDetails';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  private userDetails:User=new User();
  organizationDetails: OrganizationDetails = new OrganizationDetails();
  constructor(public navCtrl: NavController,
    private navParams:NavParams,
    private storage:Storage) {

    this.storage.get('userDetails').then((val) => {
      var fileData:any = JSON.parse(val);
      this.userDetails = fileData.userDetails;
      
      
    this.storage.get('organizationDetails').then((val) => {
      var fileData:any = JSON.parse(val);
      this.organizationDetails = fileData.organizationDetails;
      
    });

    });
   
  }
  

  goAddStudentPage()
  {
    this.navCtrl.push(AddStudent);
  }
  goExistingStudentPage()
  {
    this.navCtrl.push(ViewStudent);
  }

  
}
