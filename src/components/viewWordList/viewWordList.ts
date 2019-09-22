import { Component} from '@angular/core';
import { NavController,Platform, AlertController  } from 'ionic-angular';
import { WordData } from '../../models/wordData';
import { File } from '@ionic-native/file';
import { WordServices } from '../../services/wordServices';
import { SocialSharing } from '@ionic-native/social-sharing';
import { DocumentPicker } from '@ionic-native/document-picker';
import { WordDataFireBaseService } from '../../firebaseServices/WordDataFireBaseService';
import { DataSetService } from '../../services/dataSetServices';
import { Dataset } from '../../models/Dataset';
import { Storage } from '@ionic/storage';
import { OrganizationDetails } from '../../models/organizationDetails';

@Component({
    selector: 'page-viewWordList',
    templateUrl: 'viewWordList.html'
})
export class ViewWordList{
  
    datasetList:Array<Dataset>=[];
    mathDatasetList:Array<Dataset>=[];
  
    wordDataList:Array<WordData> = [];
    mathWordDataList:Array<WordData> = [];
    allData:Array<WordData> = [];
    mathAllData:Array<WordData> = [];
    private searchTerm: string = '';
    wordServiceObject:WordServices=new WordServices();
    wordDataFireBaseService:WordDataFireBaseService;
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

        
      this.storage.get('organizationDetails').then((val) => {
        var fileData:any = JSON.parse(val);
        this.organizationDetails = fileData.organizationDetails;
        this.wordDataFireBaseService = new WordDataFireBaseService(this.organizationDetails.organizationDetailsUID,0);

        this.datasetService.getDataSetList(file,0).then(data=>{
          this.datasetList=data;
          for(let datsetObj of this.datasetList)
          {
             this.wordDataList= this.wordDataList.concat(datsetObj.wordList);
          }
          this.allData = this.wordDataList;
          console.log("alldata:"+this.allData.length);
          this.datasetList=null;
        });

        this.datasetService.getDataSetList(file,1).then(data=>{
          this.mathDatasetList=data;
          for(let datsetObj of this.mathDatasetList)
          {
             this.mathWordDataList= this.mathWordDataList.concat(datsetObj.wordList);
          }
          this.mathAllData = this.mathWordDataList;
          this.mathDatasetList=null;
        });


      });
      
        
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
                this.wordDataFireBaseService.removeWordData(wordDataObj,this.wordType);
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
       
        var wordDataFireBaseService:WordDataFireBaseService = new WordDataFireBaseService(this.organizationDetails.organizationDetailsUID,this.wordType);
        
        wordDataFireBaseService.importWordDataFile(this.file,this.plt,this.docPicker,this.allData);
         this.filterItems();
       }
 
      changeWordType(){
        if(this.isWord)
          this.wordType = 0;
        else
          this.wordType = 1;
      }
}