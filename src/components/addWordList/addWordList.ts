import { Component } from "@angular/core";
import { WordData } from "../../models/wordData";
import { UUID } from "angular2-uuid";
import { File } from "@ionic-native/file";
import { NavParams, ViewController, ModalController } from "ionic-angular";
import { Storage } from "@ionic/storage";
import { OrganizationDetails } from "../../models/organizationDetails";
import { DataSetService } from "../../services/dataSetServices";
import { AddCategoryModal } from "./addCategoryModal/addCategoryModal";
@Component({
  selector: "page-addWordList",
  templateUrl: "addWordList.html"
})
export class AddWordList {
  wordText: String;
  wordCategory: String = "Select Category";
  error: String;
  organizationDetails: OrganizationDetails;
  fromModal: boolean = false;
  private wordData: WordData;
  dataSetService: DataSetService;
  private isWord: boolean = true;
  private wordType: number = 0;

  constructor(
    private file: File,
    private params: NavParams,
    private viewCtrl: ViewController,
    private storage: Storage,
    private modalCtrl: ModalController
  ) {
    // this.fromModal = params.get('fromModal');

    this.storage.get("organizationDetails").then(val => {
      var fileData: any = JSON.parse(val);
      this.organizationDetails = fileData.organizationDetails;
      this.dataSetService = new DataSetService();
    });
  }
  addNewWord() {
    try {
      if (
        this.wordCategory == null ||
        this.wordCategory.length == 0 ||
        this.wordCategory == "Select Category"
      ) {
        this.error = " Select Category to add the word.";
      } else {
        this.wordData = new WordData();
        console.log("word:" + this.wordText + "  cat:" + this.wordCategory);
        this.wordData.wordText = this.wordText;
        this.wordData.wordCategory = this.wordCategory;
      }
    } catch (e) {
      this.error = e;
    }
  }

  dismiss(wordData: WordData) {
    this.viewCtrl.dismiss(this.wordData);
  }

  selectCateory() {
    let profileModal = this.modalCtrl.create(
      AddCategoryModal,
      {
        wordType: this.wordType
      },
      {
        cssClass: "update-profile-modal"
      }
    );

    profileModal.present();

    profileModal.onDidDismiss(data => {
      var category: string = data.category;
      if (category != "" || category.length > 0) this.wordCategory = category;
    });
  }

  changeWordType() {
    if (this.isWord) this.wordType = 0;
    else this.wordType = 1;
    this.wordCategory = "Select Category";
  }
}
