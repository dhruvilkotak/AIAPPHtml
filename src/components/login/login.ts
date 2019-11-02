import { Component, Injectable } from "@angular/core";
import { NavController, Platform, Events } from "ionic-angular";
import { HomePage } from "../../components/home/home";
import { File } from "@ionic-native/file";
import { User } from "../../models/user";
import { AddUserDetails } from "./addUserDetails/addUserDetails";
import { Storage } from "@ionic/storage";
import { organizationRegister } from "./OrganizationRegister/organizationRegister";
import { OrganizationDetails } from "../../models/organizationDetails";
import { SecurityCheckUp } from "./forgetPassword/securityCheckUP/SecurityCheckUp";

@Component({
  selector: "page-login",
  templateUrl: "login.html"
})
@Injectable()
export class Login {
  public user: User = new User();
  public user2: User = new User();
  private emailID: string = "xyz@gmail.com";
  private password: string = "password";
  private error: String = "Error Message";
  private fileData: any;
  passwordType: Array<string> = Array(3).fill("password");
  passwordIcon: Array<string> = Array(3).fill("eye-off");
  userDetails: User = new User();

  // private sessionDate:string=new Date("2019-01-17T05:16:12.940Z").toISOString();

  constructor(
    private navCtrl: NavController,
    private file: File,
    private platform: Platform,
    private storage: Storage,
    private events: Events
  ) {}

  login() {
    console.log("UserName:" + this.emailID);
    console.log("Password:" + this.password);
  }

  signUpFaculty() {}

  createOrganizationAccount() {}

  forgetPassword() {}
  hideShowPassword(index: number) {
    this.passwordType[index] =
      this.passwordType[index] === "text" ? "password" : "text";
    this.passwordIcon[index] =
      this.passwordIcon[index] === "eye-off" ? "eye" : "eye-off";
  }

  setOrganizationDetailsStorage() {}
}
