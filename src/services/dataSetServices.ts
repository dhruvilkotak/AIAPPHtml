
import { File } from "@ionic-native/File";
import { Dataset } from "../models/Dataset";
import { WordData } from "../models/wordData";
import { WordServices } from "./wordServices";

export class DataSetService{
  
    wordDetailsFilename:String ='dataSetDetails';
    file:File=new File();

    addDataSetListToFile(file:File):Promise<any>
    {
        return new Promise(function(resolve, reject) {
            var fileData:any;
            var dataSetDetails: Array<Dataset> = [];
            var error="";
            file.checkFile(file.dataDirectory, 'dataSetDetails').then(_ =>{
                console.log("file does  exist");
              
                file.readAsText(file.dataDirectory,'dataSetDetails').then(data=>{
                  console.log("read succ");
                  fileData=JSON.parse(data);
                  dataSetDetails=fileData.dataSetDetails;
                  resolve(dataSetDetails);
                  }).catch(err=>{
                    console.log("read unsecc Dataset array:"+dataSetDetails.length);
                    reject(dataSetDetails)
                
                  });
        
                }).catch(err=>{
                    console.log("file not exist Dataset array:"+dataSetDetails.length);
                    reject(dataSetDetails)
                });
                
        });
    }

    
    getDataSetList(file:File,wordType:number):Promise<any>
    {
        
        return new Promise(function(resolve, reject) {
            var fileData:any;
            var dataSetDetails: Array<Dataset> = [];
            var error="";
            var filename='';
            if(wordType == 0)
                filename = 'datasetDetails';
            else
                filename = 'mathDatasetDetails';

            file.checkFile(file.dataDirectory, filename).then(_ =>{
                console.log("file does  exist");
              
                file.readAsText(file.dataDirectory,filename).then(data=>{
                  console.log("read succ");
                  fileData=JSON.parse(data);
                  dataSetDetails=fileData.dataSetDetails;
                  console.log("read secc Dataset array:"+dataSetDetails.length);
            
                  resolve(dataSetDetails);
                  }).catch(err=>{
                    console.log("read unsecc Dataset array:"+dataSetDetails.length);
                    reject(dataSetDetails)
                
                  });
        
                }).catch(err=>{
                    console.log("file not exist Dataset array:"+dataSetDetails.length);
                    reject(dataSetDetails)
                });
                
        });
    }

    checkDataSetExist(dataSetDetails: Array<Dataset> ,DatasetObject:Dataset)
      {
        var exist : boolean = false;
        dataSetDetails.forEach(datasetObj=>{
          if(datasetObj.datasetName == DatasetObject.datasetName)
            exist=true;
        });
        return  exist;
      }

    addDataSettoFile(file:File,dataSetObj:Dataset,dataServiceObject:DataSetService,wordType:number):Promise<any>
    {
        return new Promise(function(resolve,reject ) {
            var fileData:any;
            var dataSetDetails: Array<Dataset> =[];
            var error:string ;
            dataServiceObject.getDataSetList(file,wordType).then(dataSetDetails=>{
                console.log("Dataset lencheck:"+dataSetDetails.length);
                     
                if(dataSetDetails.length>0)
                {
                    var exist= dataServiceObject.checkDataSetExist(dataSetDetails,dataSetObj)
                      console.log("Dataset exist: "+exist);
                      if(exist){
                      
                          error="Dataset already exist with : "+dataSetObj.datasetName;
                         resolve(error)
                      }
                      else{
                        
                        dataSetDetails.push(dataSetObj);
                        console.log("Number of Dataset added size:"+dataSetDetails.length)
                        
                        file.writeFile(file.dataDirectory,'dataSetDetails',JSON.stringify({ dataSetDetails: dataSetDetails }),{replace: true}).then(_=>{
                            console.log("write succ");
                            error=" Dataset added with id:"+dataSetObj.datasetName;
                            resolve(error)
                              }).catch(err=>{
                                console.log("write unsucc");
                                reject("write unsucc");
                              });
                      }
                     
                }
                else{
                    console.log("length not");
                    file.createFile(file.dataDirectory,'dataSetDetails',true).then( fileEntry=>{
                        console.log("file create");
                     
                        dataSetDetails.push(dataSetObj);  
                        
                        file.writeFile(file.dataDirectory,'dataSetDetails',JSON.stringify({ dataSetDetails: dataSetDetails }),{replace: true}).then(_=>{
                              console.log("file write succ");
                              error=" Dataset added with id:"+dataSetObj.datasetName;
                              console.log("size:"+dataSetDetails.length);
                              resolve(error)
                          }).catch(err=>{
                            console.log("file does not write");
                            reject("file does not write");
                          });
                    });
        
                }
                
            }).catch(err=>{
                console.log("Dataset get not workign "+dataSetDetails.length);
                file.createFile(file.dataDirectory,'dataSetDetails',true).then( fileEntry=>{
                    console.log("file create");
                    dataSetDetails.push(dataSetObj);  
                    file.writeFile(file.dataDirectory,'dataSetDetails',JSON.stringify({ dataSetDetails: dataSetDetails }),{replace: true}).then(_=>{
                          console.log("file write succ");
                          error=" Dataset added with id:"+dataSetObj.datasetName;
                          console.log("size:"+dataSetDetails.length);
                          resolve(error)
                      }).catch(err=>{
                        console.log("file does not write");
                        reject("file does not write");
                      });
                });
                   
            });
        });
               
    }


    addWordDatatoDatSetFile(file:File,wordDataObj:WordData,dataServiceObject:DataSetService,wordType:number):Promise<any>
    {
        var filename='';
        if(wordType == 0)
            filename = 'datasetDetails';
        else
            filename = 'mathDatasetDetails';
        return new Promise(function(resolve,reject ) {
            var fileData:any;
            var dataSetDetails: Array<Dataset> =[];
            var error:string ;
            dataServiceObject.getDataSetList(file,wordType).then(dataSetDetails=>{
                console.log("Dataset lencheck:"+dataSetDetails.length);
              
                var wordArray:Array<WordData>=[];
                wordArray.push(wordDataObj);
                dataServiceObject.addWordsToDataSet(wordArray,dataSetDetails);
                console.log("dataset Len after:"+dataSetDetails.length);
                file.writeFile(file.dataDirectory,filename,JSON.stringify({ dataSetDetails: dataSetDetails }),{replace: true}).then(_=>{
                }).catch(err=>{
                  reject("datasetDetails file does not write");
                });
                
            }).catch(err=>{
                console.log("Dataset get not workign "+dataSetDetails.length);
                file.createFile(file.dataDirectory,filename,true).then( fileEntry=>{
                    var wordArray:Array<WordData>=[];
                    wordArray.push(wordDataObj);
                    dataServiceObject.addWordsToDataSet(wordArray,dataSetDetails);
                    
                            file.writeFile(file.dataDirectory,filename,JSON.stringify({ dataSetDetails: dataSetDetails }),{replace: true}).then(_=>{
                                console.log("write succ");
                                error=" Dataset added with id:"+wordDataObj.wordId;
                                resolve(error)
                                  }).catch(err=>{
                                    console.log("write unsucc");
                                    reject("write unsucc");
                                  });
                });                   
            });
        });
               
    }



    removeDataSetFromFile(file:File,dataSetDetails: Array<Dataset>):Promise<any>
    {

        return new Promise(function(resolve,reject ) {
            file.writeFile(file.dataDirectory,'dataSetDetails',JSON.stringify({ dataSetDetails: dataSetDetails }),{replace: true}).then(_=>{
                resolve("size:"+dataSetDetails.length);
            }).catch(err=>{
              reject("file does not write");
            });
        });
               
    }

    removeDataSetFromArray(dataSetDetails: Array<Dataset> , datasetObj:Dataset )
    {
        var remove:boolean=false;
        const index: number = dataSetDetails.indexOf(datasetObj);
       console.log("index:"+index)
        if (index !== -1) {
            console.log("index:"+index);
            dataSetDetails.splice(index, 1);
            remove=true;
            return remove;
        } 
        for(let obj of dataSetDetails )
        {
            if(obj.datasetName==datasetObj.datasetName)
            {
                const index: number = dataSetDetails.indexOf(obj);
                if (index !== -1) {
                    console.log("index:"+index);
                    dataSetDetails.splice(index, 1);
                    remove=true;
                    return remove;
                } 
            }
        }
        return remove;
    }

    addWordsToDataSet(wordDataList:Array<WordData> , datasetList:Array<Dataset> )
    {
        for(let wordObj of wordDataList)
        {
            var added:boolean = false;
            for(let datasetObj of datasetList)
            {
                if(wordObj.wordCategory == datasetObj.datasetName)
                {
                    datasetObj.wordList.push(wordObj);
                    added=true;
                    break;
                }
            }
            if(!added)
            {
                var newDatasetObj:Dataset = new Dataset(); 
                console.log("new dataset:"+wordObj.wordCategory);
                newDatasetObj.datasetName=wordObj.wordCategory;
                newDatasetObj.wordList.push(wordObj);
                datasetList.push(newDatasetObj);

            }
        }
    }

    removeWordDataFromFile(wordDataObj:WordData,file:File,dataServiceObject:DataSetService,wordType:number){

        
        return new Promise(function(resolve,reject ) {
            var fileData:any;
            var dataSetDetails: Array<Dataset> =[];
            var error:string ;
            dataServiceObject.getDataSetList(file,wordType).then(dataSetDetails=>{
              
                var wordArray:Array<WordData>=[];
                wordArray.push(wordDataObj);

                dataServiceObject.removeWordsFromDataSet(wordArray,dataSetDetails);        
                var filename='';
                if(wordType == 0)
                    filename = 'datasetDetails';
                else
                    filename = 'mathDatasetDetails';
                file.writeFile(file.dataDirectory,filename,JSON.stringify({ dataSetDetails: dataSetDetails }),{replace: true}).then(_=>{
                }).catch(err=>{
                  reject("datasetDetails file does not write");
                });
                
            }).catch(err=>{
                reject("data is not exist");
            });
        });
     
    }

    removeWordsFromDataSet(wordDataList:Array<WordData>,datasetList:Array<Dataset>){

        var wordServiceObject : WordServices = new WordServices();
        for(let wordObj of wordDataList)
        {
            var removed:boolean = false;
            for(let datasetObj of datasetList)
            {
                if(wordObj.wordCategory == datasetObj.datasetName)
                {
                    //datasetObj.wordList.push(wordObj);
                    wordServiceObject.removeWordFromArray(datasetObj.wordList,wordObj);
                    removed=true;
                    if(datasetObj.wordList.length == 0)
                    {
                        this.removeDataSetFromArray(datasetList,datasetObj);
                    }
                    break;
                }
            }
        }
    }

  
}