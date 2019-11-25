import { Component } from "@angular/core";
import { Storage } from "@ionic/storage";
import { NavController, NavParams, ViewController } from "ionic-angular";
import { Student } from "../../../models/student";

@Component({
    selector: 'page-methodRatioSelection',
    templateUrl: 'methodRatioSelection.html'
})


export class MethodRatioSelection {

    error: string = "Error Message";
    studentObject: Student = new Student();
    methodIndex: number = 0;

    ratio1: number = 1;
    oldRatio1: number = 1;
    minRatio1: number = 1;
    maxRatio1: number = 0;

    ratio2: number = 1;
    oldRatio2: number = 1;
    minRatio2: number = 1;
    maxRatio2: number = 0;
    canUpdateRatio: boolean = false;
    OTR: number = 0;
    methodTitle: String = "Method Title";
    organizationDetailsUID: string = "Org UID";
    wordType: number = 0;

    constructor(public navCtrl: NavController,
        private viewCtrl: ViewController,
        private params: NavParams,
        private storage: Storage) {

    }

    dismiss() {

    }

    updateRatio() {
        this.checkUpdateRatio();
        if (!this.canUpdateRatio) {
            this.error = " can not update the ratio.";
        }
        else {
        }
    }

    updateRatio1() {
        if (this.methodIndex == 1) {
            this.ratio1 = this.ratio2;
        }
        this.updateOTR();
    }

    updateOTR() {

    }

    checkUpdateRatio() {
        this.canUpdateRatio = true;
        if (this.maxRatio2 == 0) {
            this.canUpdateRatio = false;
        }
        else if (this.maxRatio1 == 0) {
            if (this.methodIndex == 2 || this.methodIndex == 3) {
                this.checkRatio2();
            }
            else {
                this.canUpdateRatio = false;
            }
        }
        else {

            if (this.methodIndex == 1) {
                this.ratio1 = this.ratio2;
            }
            if (this.methodIndex == 0 || this.methodIndex == 1) {
                this.checkRatio1();
            }
            this.checkRatio2();
        }
    }

    checkRatio1() {
        if (!(this.maxRatio1 > 0 && this.maxRatio1 >= this.ratio1 && this.ratio1 >= this.minRatio1))
            this.canUpdateRatio = false;
    }


    checkRatio2() {
        if (!(this.maxRatio2 > 0 && this.maxRatio2 >= this.ratio2 && this.ratio2 >= this.minRatio2))
            this.canUpdateRatio = false;
    }
}