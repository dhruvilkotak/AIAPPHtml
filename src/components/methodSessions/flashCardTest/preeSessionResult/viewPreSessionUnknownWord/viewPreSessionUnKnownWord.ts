import { Component } from '@angular/core';
import { UUID } from 'angular2-uuid';
import { File } from '@ionic-native/file';
import { NavParams, ViewController } from 'ionic-angular';
import { WordData } from '../../../../../models/wordData';
@Component({
  selector: 'page-viewPreSessionUnKnownWord',
  templateUrl: 'viewPreSessionUnKnownWord.html'
})


export class ViewPreSessionUnKnownWord{
    

    private wordDataObj:WordData=new WordData();
    constructor(private file:File,
        private params:NavParams,
        private viewCtrl:ViewController) {
        
      
        
    }
    dismiss() {
        this.viewCtrl.dismiss();
    }
     
}