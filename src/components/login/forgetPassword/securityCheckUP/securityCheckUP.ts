import { Component } from "@angular/core";
import { User } from "../../../../models/user";
import { AlertController, NavController } from "ionic-angular";

@Component({
  selector: "page-securityCheckUp",
  templateUrl: "securityCheckUp.html"
})
export class SecurityCheckUp {
  private emailId: string = "abc@gmail.com";
  private emailVerified: boolean = false;
  private question: string = "Question";
  private answer: string = "Answer";
  passwordType: Array<string> = Array(3).fill("password");
  passwordIcon: Array<string> = Array(3).fill("eye-off");
  userDetails: User = new User();
  error: string = "Error Message";
  constructor(
    private alertCtrl: AlertController,
    private navCtrl: NavController
  ) {}

  hideShowPassword(index: number) {
    this.passwordType[index] =
      this.passwordType[index] === "text" ? "password" : "text";
    this.passwordIcon[index] =
      this.passwordIcon[index] === "eye-off" ? "eye" : "eye-off";
  }

  verifyEmail() {}

  verifySecurity() {}
}
