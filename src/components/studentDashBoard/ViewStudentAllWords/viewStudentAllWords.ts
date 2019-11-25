import { Component} from '@angular/core';
import { NavController,Platform, AlertController, ModalController, NavParams  } from 'ionic-angular';
import { File } from '@ionic-native/file';
import { WordData } from '../../../models/wordData';
import { Student } from '../../../models/student';
import { Storage } from '@ionic/storage';
import { AddWordList } from '../../addWordList/addWordList';
import { WordServices } from '../../../services/wordServices';
import { KnownUnknownWordData } from '../../../models/knownUnknownWordData';

@Component({
    selector: 'page-viewStudentAllWords',
    templateUrl: 'viewStudentAllWords.html'
})
export class ViewStudentAllWords{
    newLearnedWords:Array<KnownUnknownWordData> = [new KnownUnknownWordData()];
    unKnownWords:Array<WordData> = [new WordData(), new WordData()];
    knwonWords:Array<WordData> = [new WordData(), new WordData()];
    learningWords:WordData[][]=[[new WordData(), new WordData()],[new WordData(), new WordData()]];
    learningCategory:string[]=["a","dd","Dfd"];
    allData_newLearnedWords:Array<KnownUnknownWordData> = [new KnownUnknownWordData()];
    allData_unKnownWords:Array<WordData> = [new WordData(), new WordData()];
    allData_knwonWords:Array<WordData> = [new WordData(), new WordData()];
    allData_learningWords:WordData[][]=[[new WordData(), new WordData()],[new WordData(), new WordData()]];
    private studentObject:Student=new Student();
    private searchTerm: string = '';
    error:String='Error Message';
    private wordType:number=0;
    constructor(public navCtrl: NavController,
        private storage:Storage,
        public modalCtrl: ModalController,
        private file:File) {
    }  

    filterItems(){
 
        this.newLearnedWords = this.allData_newLearnedWords.filter((newKnownUnknownObject) => {
            return newKnownUnknownObject.wordData.wordText.toLowerCase().indexOf(this.searchTerm.toLowerCase()) > -1 || 
            newKnownUnknownObject.wordData.wordCategory.toLowerCase().indexOf(this.searchTerm.toLowerCase()) > -1;
          });
          
        this.unKnownWords = this.allData_unKnownWords.filter((wordObject) => {
            return wordObject.wordText.toLowerCase().indexOf(this.searchTerm.toLowerCase()) > -1 || 
            wordObject.wordCategory.toLowerCase().indexOf(this.searchTerm.toLowerCase()) > -1;
          });
          
        this.knwonWords = this.allData_knwonWords.filter((wordObject) => {
            return wordObject.wordText.toLowerCase().indexOf(this.searchTerm.toLowerCase()) > -1 || 
            wordObject.wordCategory.toLowerCase().indexOf(this.searchTerm.toLowerCase()) > -1;
          });
        
        this.learningWords = this.allData_learningWords.filter((wordArray) => {
            wordArray.filter((wordObject)=>{
                return wordObject.wordText.toLowerCase().indexOf(this.searchTerm.toLowerCase()) > -1 || 
                wordObject.wordCategory.toLowerCase().indexOf(this.searchTerm.toLowerCase()) > -1;
            });
            
          });

    }

    addUnknownWordToStudent(){
    //     let profileModal = this.modalCtrl.create(AddWordList, { fromModal: true });
    //    profileModal.onDidDismiss(wordData => {
    //      console.log("text:"+wordData.wordText);
    //      this.addWordToStudentToFile(wordData,this.studentObject);
    //    });
    //    profileModal.present();
    }

    addWordToStudentToFile(wordDataObj:WordData, studentObject:Student){
        var allData:Array<WordData>=[];
        var wordServiceObj:WordServices=new WordServices();
        allData=allData.concat(studentObject.studentWordDetailsArray[this.wordType].unKnownArrayList).concat(studentObject.studentWordDetailsArray[this.wordType].knownUnknownArrayList).concat(studentObject.studentWordDetailsArray[this.wordType].knwonArrayList);
        for(let methodObj of studentObject.studentWordDetailsArray[this.wordType].methodArray)
        {
            if(methodObj.sessionsArray.length>0)
            {
                allData.concat(methodObj.sessionsArray[methodObj.sessionsArray.length-1].unknownWordList);
            }
        }
        if(!wordServiceObj.checkWordExist(allData,wordDataObj)){
            studentObject.studentWordDetailsArray[this.wordType].unKnownArrayList.push(wordDataObj);
           // this.allData_unKnownWords.push(wordDataObj);
            this.filterItems();
            this.goBackToView();
            this.error="";
        }
        else{
            this.error= wordDataObj.wordText +" is already existed.";
        }
    }

    goBackToView()
    {
        this.storage.set('studentObject',JSON.stringify({ studentObject: this.studentObject }) );    
    }
   
}
