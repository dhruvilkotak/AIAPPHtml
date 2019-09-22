import { Component, Injectable } from '@angular/core';
import { NavController, Platform, Events } from 'ionic-angular';
import { HomePage } from '../../components/home/home';
import { File } from '@ionic-native/file';
import { User } from '../../models/user';
import { AddUserDetails } from './addUserDetails/addUserDetails';
import { UserFireBaseService } from '../../firebaseServices/userFireBaseService';
import { Storage } from '@ionic/storage';
import { organizationRegister } from './OrganizationRegister/organizationRegister';
import { OrganizationFireBaseService } from '../../firebaseServices/organizationFireBaseService';
import { OrganizationDetails } from '../../models/organizationDetails';
import { SecurityCheckUp } from './forgetPassword/securityCheckUP/SecurityCheckUp';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})

@Injectable()
export class Login {
  public user: User = new User();
  public user2: User = new User();
  private emailID: string;
  private password: string;
  private error: string;
  private fileData: any;
  passwordType: Array<string> = Array(3).fill('password');
  passwordIcon: Array<string> = Array(3).fill('eye-off');
  userDetails:User = null;

  // private sessionDate:string=new Date("2019-01-17T05:16:12.940Z").toISOString();

  constructor(private navCtrl: NavController,
    private file: File,
    private platform: Platform,
    private storage: Storage,
    private events:Events) {
      this.storage.set('userDetails', JSON.stringify({ userDetails: null }));
      this.storage.set('organizationDetails',JSON.stringify({ organizationDetails: null }) );
      this.storage.clear();
      
  };

  login() {

    console.log(
      "UserName:" + this.emailID
    );
    console.log(
      "Password:" + this.password
    );


    var userFireBaseService: UserFireBaseService = new UserFireBaseService();
    userFireBaseService.loginUser(this.emailID, this.password).then(userDetails => {

      this.userDetails = userDetails;
      this.setOrganizationDetailsStorage();
      var organizationService : OrganizationFireBaseService = new OrganizationFireBaseService();
      organizationService.getOrganizationDetailswithOrganizationKey(this.userDetails.organizationUID).then(data=>{
        var organizationDetails:OrganizationDetails = data;
        if(organizationDetails != null)
        {
          this.storage.set('organizationDetails',JSON.stringify({ organizationDetails: organizationDetails }) ).then(data=>{
            this.storage.set('userDetails', JSON.stringify({ userDetails: userDetails })).then(data=>{
              this.events.publish('user:loggedin');
              this.navCtrl.setRoot(HomePage);
            }).catch(err=>{
      
            });
          }).catch(err=>{
            
          });
        }
        
            
      }).catch(err=>{
        
      });
      
    }).catch(err => {
      this.error = err;
    });

  }

  signUpFaculty() {
    this.navCtrl.push(AddUserDetails);
  }

  createOrganizationAccount() {
    this.navCtrl.push(organizationRegister);
  }

  forgetPassword() {
    this.navCtrl.push(SecurityCheckUp);
  }
  hideShowPassword(index: number) {
    this.passwordType[index] = this.passwordType[index] === 'text' ? 'password' : 'text';
    this.passwordIcon[index] = this.passwordIcon[index] === 'eye-off' ? 'eye' : 'eye-off';
  }


  setOrganizationDetailsStorage()
  {

    var organizationService : OrganizationFireBaseService = new OrganizationFireBaseService();
    organizationService.getOrganizationDetailswithOrganizationKey(this.userDetails.organizationUID).then(data=>{
      var organizationDetails:OrganizationDetails = data;
      if(organizationDetails != null)
      {
        this.storage.set('organizationDetails',JSON.stringify({ organizationDetails: organizationDetails }) );
      }
        
    }).catch(err=>{
      
    });
   
  }
}
