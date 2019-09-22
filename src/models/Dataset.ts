import { UUID } from "angular2-uuid";
import { WordData } from "./wordData";

export class Dataset {
    datasetName:String;
    wordList:Array<WordData>=[];
}