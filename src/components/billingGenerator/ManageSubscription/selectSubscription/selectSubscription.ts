import { Component } from "@angular/core";
import { NavController } from "ionic-angular";
import { User } from "../../../../models/user";
import { OrganizationDetails } from "../../../../models/organizationDetails";
import { Storage } from "@ionic/storage";

@Component({
  selector: "page-selectSubscription",
  templateUrl: "selectSubscription.html"
})
export class SelectSubscription {
  private amount: string = "";
  private userDetails: User;
  private organizationDetails: OrganizationDetails;
  private couponCode: string = "";
  constructor(public navCtrl: NavController, private storage: Storage) {
    this.storage.get("userDetails").then(val => {
      var fileData: any = JSON.parse(val);
      console.log("user:" + fileData);
      this.userDetails = fileData.userDetails;

      this.storage.get("organizationDetails").then(val => {
        var fileData: any = JSON.parse(val);

        this.organizationDetails = fileData.organizationDetails;
        console.log("org:" + fileData);
      });
    });
  }

  applyCoupon() {
    if (this.couponCode == "1995") {
      this.amount = "0.0";
    }
  }
  subscribe() {
    if (this.amount.length > 0) {
      var amountFloat: Number = parseFloat(this.amount);

      // var myStorage=this.storage;
      // var myNavCtrl = this.navCtrl;

      // this.userFireBaseService.registerUserDetails(userDetails,this.navCtrl).then(data=>{

      //   this.firstname="";
      //   this.lastname="";
      //   this.emailId="";
      //   this.password="";
      //   this.reTypePassword="";
      //   this.securityQuestion="";
      //   this.answer="";
      //   console.log("auth state changed user: null ");
      //  this.showForm=false;

      //     var refreshIntervalId=setInterval(function(){

      //         firebase.auth().currentUser.reload();
      //         console.log("verify email"+firebase.auth().currentUser.emailVerified);

      //         firebase.auth().onAuthStateChanged(function(user){

      //              console.log("auth state changed ");

      //             if(!user)
      //             {
      //               console.log("auth state changed user: null ");
      //             }
      //             else{
      //               console.log("auth state changed user: not null ");
      //               var userObj = firebase.auth().currentUser;
      //                console.log("firebase auth: "+(userObj ==null));

      //               if(userObj!=null)
      //               {
      //                 var emailSent = userObj.email;
      //                 var emailVerfied=userObj.emailVerified;
      //                 console.log("email verified: "+emailVerfied+"  email:"+emailSent);
      //                 if(emailVerfied)
      //                 {
      //                   userDetails.verifyEmail = true;
      //                   console.log("email verified: true");

      //                   var userFireBaseService:UserFireBaseService = new UserFireBaseService();
      //                   userFireBaseService.updateUserDetails(userDetails);
      //                   myStorage.set('userDetails',JSON.stringify({ userDetails: userDetails }) );

      //                   myNavCtrl.setRoot(HomePage).then(_=>{

      //                     clearInterval(refreshIntervalId);

      //                   });
      //                 }
      //               }
      //             }
      //           });

      //       }, 3000);

      // console.log("stop interval");

      // }).catch(err=>{
      // //  this.error=""+err;
      // });
    }
  }
}
