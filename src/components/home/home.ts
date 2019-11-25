import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AddStudent } from '../AddStudent/AddStudent';
import { User } from '../../models/user';
import { ViewStudent } from '../viewStudent/viewStudent';
import { Storage } from '@ionic/storage';
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

  
  }
  

  goAddStudentPage()
  {
    //this.navCtrl.push(AddStudent);
  }
  goExistingStudentPage()
  {
    //this.navCtrl.push(ViewStudent);
  }

  
}
