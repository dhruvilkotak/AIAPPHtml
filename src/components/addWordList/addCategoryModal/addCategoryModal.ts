import { Component } from '@angular/core';
import { Storage } from '@ionic/storage';
import { AlertController, NavController, NavParams, ViewController } from 'ionic-angular';
import { OrganizationDetails } from '../../../models/organizationDetails';
import { User } from '../../../models/user';


@Component({
  selector: 'page-addCategoryModal',
  templateUrl: 'addCategoryModal.html'
})

export class AddCategoryModal {

    private userDetails:User = new User();
    private organizationDetails: OrganizationDetails = new OrganizationDetails ();
    private allData : Array<string> = ["category 1","category 2","category 3"];
    private categoriesList : Array<string> = ["category 1","category 2","category 3"];
    private searchTerm:string="";
    private newCategory:string = "";
    private error = "";
    private sectedCategoryWordData:string = "";
    private wordType:number = 0;
    constructor(private navCtrl: NavController,
        private alertCtrl: AlertController,
        private storage: Storage,
        private params:NavParams,
        private viewCtrl:ViewController) {

          this.wordType = params.get('wordType');

          this.storage.get('userDetails').then((val) => {
            var fileData:any = JSON.parse(val);
            this.userDetails = fileData.userDetails;
                
            
            this.storage.get('organizationDetails').then((val) => {
                var fileData:any = JSON.parse(val);
                this.organizationDetails = fileData.organizationDetails;
            });
        });
    
    };

  filterItems() {

    this.categoriesList = this.allData.filter((category) => {
      return category.toLowerCase().indexOf(this.searchTerm.toLowerCase()) > -1;
    });

  }
  addNewCategory() {

    if(this.allData.indexOf(this.newCategory) == -1 && this.newCategory != "Select Category")
    {
        try {
            this.allData.push(this.newCategory);
            this.filterItems();
            this.newCategory = '';
            this.error = '';
        }
        catch (e) {
          this.error = "" + e;
        }
    }
    
  }

  dismiss() {
    this.viewCtrl.dismiss({
        category:this.sectedCategoryWordData
    });
}

selectedCategory(categoryObject){
    this.sectedCategoryWordData = categoryObject;
    this.dismiss();
}
  removeCategory(categoryObject: string) {
    this.presentConfirm(categoryObject);
  }

  presentConfirm(categoryObject: string) {
    let alert = this.alertCtrl.create({
      title: 'Remove Category',
      message: 'Do you want to remove category ' + categoryObject + '?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'yes',
          handler: () => {
            this.filterItems();
            console.log('Removed ');
          }
        }
      ]
    });
    alert.present();
  }

}