import { Component } from "@angular/core";
import { Storage } from "@ionic/storage";
import { NavController } from "ionic-angular";

@Component({
  selector: 'page-organizationRegister',
  templateUrl: 'organizationRegister.html'
})

export class organizationRegister {

  private firstname: string = "FirstName1";
  private lastname: string = "LastName1";
  private emailId: string = "xyz@gmail.com ";
  private password: string = "123";
  private reTypePassword: string = "123";
  private error: String = "Error Message";
  private emailVerfied: boolean = false;
  private securityQuestion: string = "questions";
  private answer: string = "answer";
  private emailSent: string = "";
  private showForm: boolean = true;
  public isSchool: boolean = true;
  private schoolname: string = "schoolname1";
  private schoolcode: string = "123456";
  passwordType: Array<string> = Array(3).fill('password');
  passwordIcon: Array<string> = Array(3).fill('eye-off');
  private street1: string = "1234 ne 25th st";
  private street2: string = "F312";
  private zipcode: string = "98007";
  private city: string = "bellevue";
  private stateName: string = "WA";
  private contact: string = "1234567890";

  constructor(public navCtrl: NavController,
    private storage: Storage) {


  }


  continueRegistration() {

  }

  hideShowPassword(index: number) {
    this.passwordType[index] = this.passwordType[index] === 'text' ? 'password' : 'text';
    this.passwordIcon[index] = this.passwordIcon[index] === 'eye-off' ? 'eye' : 'eye-off';
  }


  public notify() {
    //    console.log("Toggled: "+ this.isSchool); 
  }


}