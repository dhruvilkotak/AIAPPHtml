import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, AlertController, Events } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { HomePage } from '../components/home/home';
import { Login } from '../components/login/login'
import { ViewWordList } from '../components/viewWordList/viewWordList';
import { AddWordList } from '../components/addWordList/addWordList';
import { ScreenOrientation } from '@ionic-native/screen-orientation';
import { File } from '@ionic-native/file';
import { Storage } from '@ionic/storage';
import { User } from '../models/user';
import { UpdateProfile } from '../components/login/userProfile/updateProfile/updateProfile';
import { AdminHomePage } from '../components/home/adminHomePage/adminHomePage';
import { OrganizationDetails } from '../models/organizationDetails';
import { Observable, Subject, Subscription, BehaviorSubject } from 'rxjs/Rx';
import { AddUserDetails } from '../components/login/addUserDetails/addUserDetails';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = AddUserDetails;

  pages: Array<{ title: string, component: any }>;
  userDetails: User = null;
  organizationDetails: OrganizationDetails;

  private timerSubscription: Subscription;
  private timer: Observable<number>;
  private _timeoutSeconds: number = 60*60; // 60 minutes
  private timeoutExpired: Subject<number> = new Subject<number>();
  private _count: number = 0;
  private resetOnTrigger: boolean = false;
  private counter = 60; // 60 seconds
  constructor(public platform: Platform,
    public statusBar: StatusBar,
    public splashScreen: SplashScreen,
    private screenOrientation: ScreenOrientation,
    private file: File,
    private storage: Storage,
    private alertCtrl: AlertController,
    private events: Events) {

    this.initializeApp();

    this.pages = [
      { title: 'Home', component: HomePage },
      { title: 'Add Words/Math Facts', component: AddWordList },
      { title: 'View Words', component: ViewWordList },
      { title: 'User Profile  ', component: UpdateProfile },
      { title: 'Signout ', component: Login }
    ];

    this.events.subscribe('user:loggedin', () => {
      this.startTimer();
      console.log("events");
      this.storage.get('userDetails').then((val) => {
        var fileData: any = JSON.parse(val);
        this.userDetails = fileData.userDetails;

        this.storage.get('organizationDetails').then((val) => {
          var fileData: any = JSON.parse(val);
          this.organizationDetails = fileData.organizationDetails;

          console.log("user logged:in:" + this.organizationDetails.organizationDetailsUID);
      
        });


        if (this.userDetails.userRole == "faculty") {
          this.pages = [
            { title: 'Home', component: HomePage },
            { title: 'Add Words/Math Facts', component: AddWordList },
            { title: 'View Words', component: ViewWordList },
            { title: 'User Profile  ', component: UpdateProfile },
            { title: 'Signout ', component: Login }
          ];
        }
        else {
          this.pages = [
            { title: 'Home', component: HomePage },
            { title: 'Add Words/Math Facts', component: AddWordList },
            { title: 'View Words', component: ViewWordList },
            { title: 'User Profile  ', component: UpdateProfile },
            { title: 'Admin ', component: AdminHomePage },
            { title: 'Signout ', component: Login }
          ];
        }
      });
    });

    this.timeoutExpired.subscribe(n => {
      console.log("timeoutExpired subject next.. " + n.toString());
      //this.nav.setRoot(Login);
      this.confirmTimeOut();
    });

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

    if (page.component == Login) {
      this.confirmSignOut();
    }
    else {
      this.nav.setRoot(page.component);
    }
  }

  confirmSignOut() {
    let alert = this.alertCtrl.create({
      title: 'Sign Out',
      message: 'Do you really want to sign out ? ',
      enableBackdropDismiss: false,
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


  confirmTimeOut() {
    this.counter=10;
    var intervalVar = setInterval(function () {
      this.counter--;
      alert.setMessage(`Do you want to stay logged in? Your session is about to expire in <strong style="color:blue">`+this.counter+`<\strong>.`);
      if(this.counter == 0)
      {
        alert.dismiss();
        this.nav.setRoot(Login);
        clearInterval(intervalVar);
      }
    }.bind(this),1000);

    let alert = this.alertCtrl.create({
      title: 'Session Expiring !',
      message: 'Your session is about to expire in . Do you want to stay logged in ?',
      enableBackdropDismiss: false,
      buttons: [
        {
          text: 'Yes',
          handler: () => {
            this.startTimer();
            clearInterval(intervalVar);
          }
        }
      ]
    });
    alert.present();
  }

  startTimer() {
    if (this.timerSubscription) {
      this.timerSubscription.unsubscribe();
    }

    this.timer = Observable.timer(this._timeoutSeconds * 1000);
    this.timerSubscription = this.timer.subscribe(n => {
      this.timerComplete(n);
    });
  }

  stopTimer() {
    this.timerSubscription.unsubscribe();
  }

  private timerComplete(n: number) {
    this.timeoutExpired.next(++this._count);

    if (this.resetOnTrigger) {
      this.startTimer();
    }
  }
}