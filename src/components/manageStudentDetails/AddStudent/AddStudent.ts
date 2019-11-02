import { Component } from "@angular/core";
import { NavController } from "ionic-angular";
import { OrganizationDetails } from "../../../models/organizationDetails";
import { Student } from "../../../models/student";
import { HomePage } from "../../home/home";
import { StudentdashBoard } from "../../studentDashBoard/studentDashBoard";

@Component({
  selector: "page-addStudent",
  templateUrl: "addStudent.html"
})
export class AddStudent {
  private studentDetailsArray: Array<Student> = [];
  private firstname: string;
  private lastname: string;
  private studentid: string;
  private fileData: any;
  private error: String = "Error Message";
  private studentDetails: Student;
  private organizationDetails: OrganizationDetails = new OrganizationDetails();
  constructor(public navCtrl: NavController) {}
  addNewStudent() {
    try {
      this.studentDetails = new Student();
      this.studentDetails.studentData.firstName = this.firstname;
      this.studentDetails.studentData.lastName = this.lastname;
      this.studentDetails.studentData.studentId = this.studentid;

      this.firstname = "";
      this.lastname = "";
      this.studentid = "";
      this.navCtrl
        .setRoot(HomePage)
        .then(() => {
          this.navCtrl.push(StudentdashBoard);
        })
        .catch(err => {
          this.error = err;
        });
    } catch (e) {
      this.error = "" + e;
      console.log(e);
    }
  }
}
