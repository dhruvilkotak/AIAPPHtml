import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { User } from '../../../models/user';
import { AddEmailList } from '../../login/addEmail/addEmailList';
import { AddAdminAccess } from '../../login/addAdminAccess/addAdminAccess';

@Component({
  selector: 'page-adminHomePage',
  templateUrl: 'adminHomePage.html'
})
export class AdminHomePage {

  private userDetails:User=new User();

  constructor(public navCtrl: NavController,
    private navParams:NavParams,
    private storage:Storage) {

    this.storage.get('userDetails').then((val) => {
      var fileData:any = JSON.parse(val);
      this.userDetails = fileData.userDetails;
    });
   
  }
  

  addNewUserEmail()
  {
    console.log('Add student');
    this.navCtrl.push(AddEmailList);
  }
  updateRegisteredUser()
  {
    console.log('View student');
    this.navCtrl.push(AddAdminAccess);
  }
}
