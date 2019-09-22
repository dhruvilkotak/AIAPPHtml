import { Component } from "@angular/core";
import { NavController, NavParams } from "ionic-angular";
import { File } from "@ionic-native/file";
import * as firebase from 'firebase';
import { Firebase } from "@ionic-native/firebase";
import { Storage } from "@ionic/storage";
import { User } from "../../../../models/user";
import { UserFireBaseService } from "../../../../firebaseServices/userFireBaseService";

@Component({
    selector: 'page-updateProfile',
    templateUrl: 'updateProfile.html'
  })

export class UpdateProfile{

  private firstname:string="";
  private lastname:string="";
  private emailId:string="";
  private password:string="";
  private reTypePassword:string="";
  private error:string="";
  private userRole:string="";
  private userFireBaseService:UserFireBaseService=new UserFireBaseService();
  
  private securityQuestion:string="";
  private answer:string="";
  private userDetails:User=new User();
  
  passwordType:Array< string > = Array(3).fill('password');
  passwordIcon:Array< string > = Array(3).fill('eye-off');  

    constructor(public navCtrl: NavController,
        private file:File,
        private navParams:NavParams,
        private storage : Storage) {
          
            this.storage.get('userDetails').then((val) => {
                var fileData:any = JSON.parse(val);
                this.userDetails = fileData.userDetails;

                this.firstname=this.userDetails.firstname;
                console.log("first name:"+this.firstname);
                this.lastname=this.userDetails.lastname;
                this.emailId=this.userDetails.emailId;
                this.password=this.userDetails.password;
                this.reTypePassword=this.userDetails.password;
                this.userRole=this.userDetails.userRole;
                this.securityQuestion=this.userDetails.securityQuestion;
                this.answer=this.userDetails.answer;


            });
             
      }

      
      updateUserDetails(){

      if(this.password != this.reTypePassword)
      {
        this.error = "Password is not matching.";
        console.log("password not matching");
      }
      else{
        console.log("password matching");
        var updatedUserDetails:User = new User();
        updatedUserDetails.firstname=this.firstname;
        updatedUserDetails.lastname = this.lastname;
        updatedUserDetails.emailId = this.emailId;
        updatedUserDetails.password = this.password;
        updatedUserDetails.userRole = this.userDetails.userRole;;
        updatedUserDetails.securityQuestion=this.securityQuestion;
        updatedUserDetails.answer=this.answer;
        updatedUserDetails.verifyEmail=this.userDetails.verifyEmail;
        updatedUserDetails.userUID=this.userDetails.userUID;
        updatedUserDetails.organizationUID=this.userDetails.organizationUID;
        
        this.storage.set('userDetails',JSON.stringify({ userDetails: updatedUserDetails }) );
        this.userFireBaseService.updateUserDetails(updatedUserDetails)
        this.error=" user details updated."
      }
    }

    hideShowPassword(index:number ) {
        this.passwordType[index] = this.passwordType[index] === 'text' ? 'password' : 'text';
        this.passwordIcon[index] = this.passwordIcon[index] === 'eye-off' ? 'eye' : 'eye-off';
    }

}