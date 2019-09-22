import { WordData } from "./wordData";
import { MethodInterventionWordData } from "./methodInterventionWordData";
import { MyMap } from "./myMap";

export class MethodSession{
    sessionIndex:number=0;//
    sessionDate:String=new Date().toISOString();//
    sessionCompletedTime:String = " 11/22/2019"; // completed seesions
    sessionWordDataList:Array<MethodInterventionWordData>=[new MethodInterventionWordData()];// stores each words known time, total asked time.
    knownWordList:Array<WordData>=[new WordData()];// shuffle known list
    unknownWordList:Array<WordData>=[new WordData()];//total remaining unknown items
    sessionUnknownList:Array<WordData>=[new WordData()];// unknown items for the session
    retentionWordList: MyMap =new MyMap();//previous session list
    controlItems:MyMap =new MyMap();//current unknownList
    totalOppurtunitiesToRespond:number=0;
    
}