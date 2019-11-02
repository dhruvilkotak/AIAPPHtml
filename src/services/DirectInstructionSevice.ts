import { WordData } from "../models/wordData";
import { MethodInterventionWordData } from "../models/methodInterventionWordData";

export class DirectInstructionServices {
  makeSessionList(
    knownList: Array<WordData>,
    unKnownList: Array<WordData>,
    ratio1: number,
    ratio2: number
  ) {
    var methodInterventionWordDataList: Array<MethodInterventionWordData> = [];
    var i: number = 0;
    var j: number = 0;
    while (i < ratio1 && j < ratio2) {
      var methodInterventionWordDataObj: MethodInterventionWordData = new MethodInterventionWordData();
      methodInterventionWordDataObj.wordData = knownList[i++];
      methodInterventionWordDataObj.isKnownWord = true;
      methodInterventionWordDataList.push(methodInterventionWordDataObj);

      // methodInterventionWordDataObj = new methodInterventionWordData();
      // methodInterventionWordDataObj.wordData=knownList[i++];
      // methodInterventionWordDataObj.isKnownWord=true;
      // methodInterventionWordDataList.push(methodInterventionWordDataObj)

      methodInterventionWordDataObj = new MethodInterventionWordData();
      methodInterventionWordDataObj.wordData = unKnownList[j++];
      methodInterventionWordDataObj.isKnownWord = false;
      methodInterventionWordDataList.push(methodInterventionWordDataObj);
    }
    return methodInterventionWordDataList;
  }

  shuffle(o) {
    for (
      var j, x, i = o.length;
      i;
      j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x
    );
    return o;
  }

  removeObjectFromArray(
    methodInetrventionWordDataArray: Array<MethodInterventionWordData>,
    index: number
  ) {
    var remove: boolean = false;
    if (index !== -1) {
      console.log("index:" + index);
      methodInetrventionWordDataArray.splice(index, 1);
      remove = true;
    }
    return remove;
  }
  addObjectToArray(
    methodInetrventionWordDataArray: Array<MethodInterventionWordData>,
    methodInterventionWordDataObj: MethodInterventionWordData,
    index: number
  ) {
    if (index <= methodInetrventionWordDataArray.length) {
      methodInetrventionWordDataArray.splice(
        index,
        0,
        methodInterventionWordDataObj
      );
    }
  }

  printmethodInetrventionWordDataArray(
    methodInetrventionWordDataArray: Array<MethodInterventionWordData>
  ) {
    for (let obj of methodInetrventionWordDataArray) {
      console.log(
        "word: " +
          obj.wordData.wordText +
          " isKown: " +
          obj.isKnownWord +
          " drillmode: " +
          obj.drillmode +
          " drillCounter: " +
          obj.drillmodeKnownCounter
      );
    }
  }
}
