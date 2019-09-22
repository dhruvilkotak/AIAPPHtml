import { Component } from "@angular/core";
import { NavController, NavParams } from "ionic-angular";
import * as firebase from 'firebase';
import { Firebase } from "@ionic-native/firebase";
import { Storage } from "@ionic/storage";
import { UserFireBaseService } from "../../../firebaseServices/userFireBaseService";
import { User } from "../../../models/user";
import { HomePage } from "../../home/home";
import { OrganizationDetails } from "../../../models/organizationDetails";
import { OrganizationFireBaseService } from "../../../firebaseServices/organizationFireBaseService";

@Component({
    selector: 'page-organizationRegister',
    templateUrl: 'organizationRegister.html'
  })

export class organizationRegister{

  private firstname:string="";
  private lastname:string="";
  private emailId:string="";
  private password:string="";
  private reTypePassword:string="";
  private error:string="";
  private emailVerfied:boolean= false; 
  private securityQuestion:string="";
  private answer:string="";
  private emailSent:string="";
  private showForm:boolean=true;
  public isSchool:boolean = true;
  private schoolname:string="";
  private schoolcode:string="";
  passwordType:Array< string > = Array(3).fill('password');
  passwordIcon:Array< string > = Array(3).fill('eye-off');  
  private street1:string="";
  private street2:string="";
  private zipcode:string="";
  private city:string="";
  private stateName:string="";
  private contact:string="";
  private userFireBaseService:UserFireBaseService=new UserFireBaseService();
  
  constructor(public navCtrl: NavController,
        private storage : Storage) {
          
          this.storage.set('userDetails',JSON.stringify({ userDetails: null }) );
          this.storage.set('organizationDetails',JSON.stringify({ organizationDetails: null }) );
       
      }

      
      continueRegistration(){

        this.storage.set('userDetails',JSON.stringify({ userDetails: null }) );
        this.storage.set('organizationDetails',JSON.stringify({ organizationDetails: null }) );
         
      if(this.password != this.reTypePassword)
      {
        this.error = "Password is not matching.";
        console.log("password not matching");
      }
      else if(this.schoolcode.length != 6 && this.isSchool)
      {
        this.error = "school code is not valid";
      }
      else{


        console.log("password matching");
        this.error="";

        var organizationDetails:OrganizationDetails = new OrganizationDetails();
        organizationDetails.isSchool = this.isSchool;
        organizationDetails.organizationContactNumber = this.contact;
        if(this.isSchool)
        {
          organizationDetails.schoolName = this.schoolname;
          organizationDetails.schoolCode = this.schoolcode;
        }
        else{
          organizationDetails.schoolName="";
          organizationDetails.schoolCode="";
        }
          
        
        
        organizationDetails.addressDetails.street1 = this.street1 ;
        organizationDetails.addressDetails.street2 = this.street2 ;
        organizationDetails.addressDetails.city = this.city;
        organizationDetails.addressDetails.state = this.stateName;
        organizationDetails.addressDetails.zipcode = this.zipcode;


        var userDetails = new User();
        userDetails.firstname=this.firstname;
        userDetails.lastname = this.lastname;
        userDetails.emailId = this.emailId;
        userDetails.password = this.password;
        userDetails.userRole = "OrganizationAdmin";
        userDetails.securityQuestion=this.securityQuestion;
        userDetails.answer=this.answer;
        
      var myStorage=this.storage;
      var myNavCtrl = this.navCtrl;

   

      var organizationFireBaseService: OrganizationFireBaseService = new OrganizationFireBaseService();
      organizationFireBaseService.registerOrganizationDetails(organizationDetails,userDetails).then(data=>{

        var newuserDetails:User = data;
        this.firstname="";
        this.lastname="";
        this.emailId="";
        this.password="";
        this.reTypePassword="";
        this.securityQuestion="";
        this.answer="";
        console.log("auth state changed user: null ");
       this.showForm=false;

          var refreshIntervalId=setInterval(function(){ 
            
              firebase.auth().currentUser.reload();
              console.log("verify email"+firebase.auth().currentUser.emailVerified);
              
              firebase.auth().onAuthStateChanged(function(user){

                   console.log("auth state changed ");
                    
                  if(!user)
                  {
                    console.log("auth state changed user: null ");
                  }
                  else{
                    console.log("auth state changed user: not null ");
                    var userObj = firebase.auth().currentUser;
                     console.log("firebase auth: "+(userObj ==null));
                    
                    if(userObj!=null)
                    {
                      var emailSent = userObj.email;
                      var emailVerfied=userObj.emailVerified;
                      console.log("email verified: "+emailVerfied+"  email:"+emailSent);
                      if(emailVerfied)
                      {
                        userDetails.verifyEmail = true;
                        console.log("email verified: true");
                        userDetails.organizationUID = newuserDetails.organizationUID;
                        organizationDetails.organizationDetailsUID = userDetails.organizationUID;
                        var userFireBaseService:UserFireBaseService = new UserFireBaseService();
                        userFireBaseService.updateUserDetails(userDetails);  
                        myStorage.set('userDetails',JSON.stringify({ userDetails: userDetails }) );
                        myStorage.set('organizationDetails',JSON.stringify({ organizationDetails: organizationDetails }) );
                        myNavCtrl.setRoot(HomePage).then(_=>{

                          clearInterval(refreshIntervalId);

                        });
                      }
                    }
                  }
                });
                          
            }, 3000);
          
  
        
      console.log("stop interval");

      }).catch(err=>{
        this.error=""+err;
      });


      }
    }
   
    hideShowPassword(index:number ) {
      this.passwordType[index] = this.passwordType[index] === 'text' ? 'password' : 'text';
      this.passwordIcon[index] = this.passwordIcon[index] === 'eye-off' ? 'eye' : 'eye-off';
  }


  public notify() {
    console.log("Toggled: "+ this.isSchool); 
  }


}