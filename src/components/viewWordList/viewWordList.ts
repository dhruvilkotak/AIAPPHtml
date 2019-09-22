import { Component} from '@angular/core';
import { NavController,Platform, AlertController  } from 'ionic-angular';
import { WordData } from '../../models/wordData';
import { File } from '@ionic-native/file';
import { WordServices } from '../../services/wordServices';
import { SocialSharing } from '@ionic-native/social-sharing';
import { DocumentPicker } from '@ionic-native/document-picker';
import { DataSetService } from '../../services/dataSetServices';
import { Dataset } from '../../models/Dataset';
import { Storage } from '@ionic/storage';
import { OrganizationDetails } from '../../models/organizationDetails';

@Component({
    selector: 'page-viewWordList',
    templateUrl: 'viewWordList.html'
})
export class ViewWordList{
  
    datasetList:Array<Dataset>=[new Dataset()];
    mathDatasetList:Array<Dataset>=[new Dataset()];
  
    wordDataList:Array<WordData> = [new WordData()];
    mathWordDataList:Array<WordData> = [new WordData()];
    allData:Array<WordData> = [new WordData()];
    mathAllData:Array<WordData> = [new WordData()];
    private searchTerm: string = '';
    wordServiceObject:WordServices=new WordServices();
    datasetService:DataSetService = new DataSetService();
    error:String='';
    organizationDetails: OrganizationDetails =new OrganizationDetails() ;
    private isWord:boolean = true;
    private wordType:number = 0;
  
    constructor(private navCtrl: NavController ,
      private file:File , 
      private alertCtrl: AlertController,
      public plt: Platform,
      private socialSharing:SocialSharing,
      private docPicker: DocumentPicker,
      private storage:Storage) {
    };

    filterItems(){
 
        this.wordDataList = this.allData.filter((wordObject) => {
            return wordObject.wordText.toLowerCase().indexOf(this.searchTerm.toLowerCase()) > -1 || 
            wordObject.wordCategory.toLowerCase().indexOf(this.searchTerm.toLowerCase()) > -1;
          });
        
        this.mathWordDataList = this.mathAllData.filter((wordObject) => {
            return wordObject.wordText.toLowerCase().indexOf(this.searchTerm.toLowerCase()) > -1 || 
            wordObject.wordCategory.toLowerCase().indexOf(this.searchTerm.toLowerCase()) > -1;
          });
        
    }

    removeWord(wordObj:WordData)
    {
        this.presentConfirm(wordObj);
    }
 
    presentConfirm(wordDataObj:WordData) {
        let alert = this.alertCtrl.create({
          title: 'Remove Student',
          message: 'Do you want to remove word '+wordDataObj.wordText +'?',
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
                this.datasetService.removeWordDataFromFile(wordDataObj,this.file,this.datasetService,this.wordType);
                if(this.wordType == 0)
                  this.wordServiceObject.removeWordFromArray(this.allData,wordDataObj);
                else
                  this.wordServiceObject.removeWordFromArray(this.mathAllData,wordDataObj);
                this.filterItems();
                //this.wordDataFireBaseService.r
                console.log('yes clicked');
              }
            }
          ]
        });
        alert.present();
      }

      exportWordsFile(){
        this.wordServiceObject.exportWordFileFromArray(this.file,this.plt,this.socialSharing,this.allData,'WordDetails.csv').then(data=>{
          this.wordServiceObject.exportWordFileFromArray(this.file,this.plt,this.socialSharing,this.mathAllData,'MathDetails.csv');
        });
        

      }

      importWordsFile(){
       
       }
 
      changeWordType(){
        if(this.isWord)
          this.wordType = 0;
        else
          this.wordType = 1;
      }
}