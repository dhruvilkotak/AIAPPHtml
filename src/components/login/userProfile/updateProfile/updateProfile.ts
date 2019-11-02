import { Component } from "@angular/core";
import { NavController, NavParams } from "ionic-angular";
import { File } from "@ionic-native/file";
import * as firebase from "firebase";
import { Firebase } from "@ionic-native/firebase";
import { Storage } from "@ionic/storage";
import { User } from "../../../../models/user";

@Component({
  selector: "page-updateProfile",
  templateUrl: "updateProfile.html"
})
export class UpdateProfile {
  private firstname: string = "firstname1";
  private lastname: string = "lastname1";
  private emailId: string = "xyz@gmail.com";
  private password: string = "123456";
  private reTypePassword: string = "123456";
  private error: String = "Error Message";
  private userRole: string = new User().userRole;

  private securityQuestion: string = "";
  private answer: string = "";
  private userDetails: User = new User();

  passwordType: Array<string> = Array(3).fill("password");
  passwordIcon: Array<string> = Array(3).fill("eye-off");

  constructor(
    public navCtrl: NavController,
    private file: File,
    private navParams: NavParams,
    private storage: Storage
  ) {}

  updateUserDetails() {
    if (this.password != this.reTypePassword) {
      this.error = "Password is not matching.";
      console.log("password not matching");
    } else {
      console.log("password matching");
      var updatedUserDetails: User = new User();
      updatedUserDetails.firstname = this.firstname;
      updatedUserDetails.lastname = this.lastname;
      updatedUserDetails.emailId = this.emailId;
      updatedUserDetails.password = this.password;
      updatedUserDetails.userRole = this.userDetails.userRole;
      updatedUserDetails.securityQuestion = this.securityQuestion;
      updatedUserDetails.answer = this.answer;
      updatedUserDetails.verifyEmail = this.userDetails.verifyEmail;
      updatedUserDetails.userUID = this.userDetails.userUID;
      updatedUserDetails.organizationUID = this.userDetails.organizationUID;
    }
  }

  hideShowPassword(index: number) {
    this.passwordType[index] =
      this.passwordType[index] === "text" ? "password" : "text";
    this.passwordIcon[index] =
      this.passwordIcon[index] === "eye-off" ? "eye" : "eye-off";
  }
}
