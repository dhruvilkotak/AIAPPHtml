import { Component } from "@angular/core";
import { File } from "@ionic-native/file";
import { Storage } from "@ionic/storage";
import { NavController, NavParams } from "ionic-angular";
import { OrganizationDetails } from "../../../models/organizationDetails";
import { User } from "../../../models/user";

@Component({
  selector: "page-addUserDetails",
  templateUrl: "addUserDetails.html"
})
export class AddUserDetails {
  private firstname: string = "First Name";
  private lastname: string = "Last Name";
  private emailId: string = "Email Id";
  private password: string = "Password";
  private reTypePassword: string = "Password";
  private error: String = "Error Message";
  private emailVerfied: boolean = false;
  private securityQuestion: string = "Security Question ?";
  private answer: string = "Security Answer";
  private emailSent: string = "Email Sent";
  private showForm: boolean = true;
  passwordType: Array<string> = Array(3).fill("password");
  passwordIcon: Array<string> = Array(3).fill("eye-off");
  private schoolcode: string = "123456";
  private schoolAddress: string = "School Address";
  private organizationDetails: OrganizationDetails = new OrganizationDetails();

  constructor(
    public navCtrl: NavController,
    private file: File,
    private navParams: NavParams,
    private storage: Storage
  ) {}

  addUserDetails() {
    if (this.password != this.reTypePassword) {
      this.error = "Password is not matching.";
      console.log("password not matching");
    } else if (this.organizationDetails == null) {
      this.error = "Enter correct school code. school code is not available.";
    } else {
      console.log("password matching");
      this.error = "";
      var userDetails: User = new User();
      userDetails.firstname = this.firstname;
      userDetails.lastname = this.lastname;
      userDetails.emailId = this.emailId;
      userDetails.password = this.password;
      userDetails.userRole = "faculty";
      userDetails.securityQuestion = this.securityQuestion;
      userDetails.answer = this.answer;
      var myStorage = this.storage;
      var myNavCtrl = this.navCtrl;

      this.firstname = "";
      this.lastname = "";
      this.emailId = "";
      this.password = "";
      this.reTypePassword = "";
      this.securityQuestion = "";
      this.answer = "";
      console.log("auth state changed user: null ");
      this.showForm = false;
    }
  }

  hideShowPassword(index: number) {
    this.passwordType[index] =
      this.passwordType[index] === "text" ? "password" : "text";
    this.passwordIcon[index] =
      this.passwordIcon[index] === "eye-off" ? "eye" : "eye-off";
  }

  getOrganizationDetails() {
    this.organizationDetails = null;
    this.schoolAddress = "";
    if (this.schoolcode.length == 6) {
      console.log("school code:" + this.schoolcode);

      if (this.organizationDetails != null) {
        console.log("org:" + this.organizationDetails.organizationDetailsUID);
        this.schoolAddress =
          this.organizationDetails.addressDetails.street1 +
          ", " +
          this.organizationDetails.addressDetails.street2 +
          ", " +
          this.organizationDetails.addressDetails.city +
          ", " +
          this.organizationDetails.addressDetails.zipcode +
          " " +
          this.organizationDetails.addressDetails.state;
      }
    }
  }
}
