import { Component } from "@angular/core";
import { NavController, NavParams } from "ionic-angular";
import { User } from "../../models/user";
import { Storage } from "@ionic/storage";
import { OrganizationDetails } from "../../models/organizationDetails";
import { AddStudent } from "../manageStudentDetails/AddStudent/AddStudent";
import { ViewStudent } from "../manageStudentDetails/viewStudent/viewStudent";

@Component({
  selector: "page-home",
  templateUrl: "home.html"
})
export class HomePage {
  private userDetails: User = new User();
  organizationDetails: OrganizationDetails = new OrganizationDetails();
  constructor(
    public navCtrl: NavController,
    private navParams: NavParams,
    private storage: Storage
  ) {}

  goAddStudentPage() {
    this.navCtrl.push(AddStudent);
  }
  goExistingStudentPage() {
    this.navCtrl.push(ViewStudent);
  }
}
