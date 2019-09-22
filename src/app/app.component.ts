import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, AlertController, Events } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { HomePage } from '../components/home/home';
import { Login } from '../components/login/login'
import { ViewWordList } from '../components/viewWordList/viewWordList';
import { AddWordList } from '../components/addWordList/addWordList';
import { ScreenOrientation } from '@ionic-native/screen-orientation';
import { User } from '../models/user';
import { UpdateProfile } from '../components/login/userProfile/updateProfile/updateProfile';
import { AdminHomePage } from '../components/home/adminHomePage/adminHomePage';
import { OrganizationDetails } from '../models/organizationDetails';
import { Storage } from '@ionic/storage';
import { Student } from '../models/student';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = Login;

  pages: Array<{title: string, component: any}>;
  userDetails:User = null;
  organizationDetails: OrganizationDetails ;

  constructor(public platform: Platform, 
    public statusBar: StatusBar, 
    public splashScreen: SplashScreen,
    private screenOrientation: ScreenOrientation,
    private alertCtrl:AlertController,
    private storage:Storage) {

    this.initializeApp();
         
    this.pages = [
      { title: 'Home', component: HomePage },
      { title: 'Add Words/Math Facts', component: AddWordList },
      { title: 'View Words', component: ViewWordList },
      { title: 'User Profile  ', component: UpdateProfile },
      { title: 'Admin ', component: AdminHomePage },
      { title: 'Signout ', component: Login }
      ];
        
  }

  initializeApp() {
    
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      console.log("screen orientation:landscape");
    
    this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.LANDSCAPE);
           
    });
  }

  openPage(page) {
    
    if(page.component == Login){
      this.confirmSignOut();
    }
    else {
      this.nav.setRoot(page.component);      
    }
  }

  confirmSignOut(){
    let alert = this.alertCtrl.create({
      title: 'Sign Out',
      message: 'Do you really want to sign out ? ',
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
            this.nav.setRoot(Login); 
          }
        }
      ]
    });
    alert.present();
  }

  setDummyData() {

    var studentObject:Student = new Student();
    var organizationDetails:OrganizationDetails = new OrganizationDetails();
    this.storage.set('studentObject',JSON.stringify({ studentObject: studentObject }) );
    this.storage.set('organizationDetails',JSON.stringify({ studentObject: organizationDetails}) );
            
  }
}
