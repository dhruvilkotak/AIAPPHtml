import { WordData } from "./wordData";

export class MethodInterventionWordData{
    //ir method 
    wordData:WordData = new WordData();
     isKnownWord:boolean = true;
     totalAskedTime:number=0;
     knownTime:number=0;
     //di method
     drillmode:boolean=false;
     drillmodeKnownCounter:number=0;
}