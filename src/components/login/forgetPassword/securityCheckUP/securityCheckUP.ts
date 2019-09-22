import { Component } from "@angular/core";
import { UserFireBaseService } from "../../../../firebaseServices/userFireBaseService";
import { User } from "../../../../models/user";
import { AlertController, NavController } from "ionic-angular";

@Component({
  selector: 'page-securityCheckUp',
  templateUrl: 'securityCheckUp.html'
})

export class SecurityCheckUp {

  private emailId: string = "";
  private emailVerified: boolean = false;
  private question: string = "";
  private answer: string = "";
  passwordType: Array<string> = Array(3).fill('password');
  passwordIcon: Array<string> = Array(3).fill('eye-off');
  userFireBaseService: UserFireBaseService = new UserFireBaseService();
  userDetails: User = new User();
  error: string = "";
  constructor(private alertCtrl: AlertController,
    private navCtrl:NavController) {

  }

  hideShowPassword(index: number) {
    this.passwordType[index] = this.passwordType[index] === 'text' ? 'password' : 'text';
    this.passwordIcon[index] = this.passwordIcon[index] === 'eye-off' ? 'eye' : 'eye-off';
  }

  verifyEmail() {
    this.userFireBaseService.getUserDetailsWithEmailId(this.emailId).then(data => {
      this.userDetails = data;
      this.question = this.userDetails.securityQuestion;
      this.emailVerified = true;
      this.error = "Email is verified."
    }).catch(err => {

      this.emailVerified = false;
      this.error = "Email ID does not exist."
      console.log(""+err);

    });
  }

  verifySecurity() {
    if (this.emailVerified) {
      if (this.answer == this.userDetails.answer) {
        this.userFireBaseService.sendPasswordResetEmail(this.userDetails.emailId).then(data => {
          let alert = this.alertCtrl.create({
            title: 'Email sent',
            subTitle: data,
            buttons: [
              {
                text: 'ok',
                handler: () => {
                  this.error=""+data;
                  this.navCtrl.pop();
                }
              }
            ]
          });
          alert.present();
        }).catch(err => {

        });
      }
      else {
        this.error = " Answer Do not Match.";
      }
    }
    else {
      this.emailVerified = false;
      this.error = "Verify your email first."

    }
  }
}