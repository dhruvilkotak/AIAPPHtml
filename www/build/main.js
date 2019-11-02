webpackJsonp([0],{

/***/ 109:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return WordServices; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__ionic_native_File__ = __webpack_require__(575);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__models_wordData__ = __webpack_require__(25);


var WordServices = /** @class */ (function () {
    function WordServices() {
        this.wordDetailsFilename = 'wordDetails';
        this.file = new __WEBPACK_IMPORTED_MODULE_0__ionic_native_File__["a" /* File */]();
    }
    WordServices.prototype.getWordList = function (file) {
        return new Promise(function (resolve, reject) {
            var fileData;
            var wordDetailsArray = [];
            var error = "";
            file.checkFile(file.dataDirectory, 'WordDetails').then(function (_) {
                console.log("file does  exist");
                file.readAsText(file.dataDirectory, 'WordDetails').then(function (data) {
                    console.log("read succ");
                    fileData = JSON.parse(data);
                    wordDetailsArray = fileData.wordDetailsArray;
                    resolve(wordDetailsArray);
                }).catch(function (err) {
                    console.log("read unsecc WordData array:" + wordDetailsArray.length);
                    reject(wordDetailsArray);
                });
            }).catch(function (err) {
                console.log("file not exist WordData array:" + wordDetailsArray.length);
                reject(wordDetailsArray);
            });
        });
    };
    WordServices.prototype.checkWordExist = function (wordDetailsArray, wordObject) {
        for (var _i = 0, wordDetailsArray_1 = wordDetailsArray; _i < wordDetailsArray_1.length; _i++) {
            var wordObj = wordDetailsArray_1[_i];
            if (wordObj.wordText === wordObject.wordText) {
                console.log("true");
                return true;
            }
        }
        return false;
    };
    WordServices.prototype.addWordtoFile = function (file, wordDataObj, wordServiceObject) {
        return new Promise(function (resolve, reject) {
            var fileData;
            var wordDetailsArray = [];
            var error;
            wordServiceObject.getWordList(file).then(function (wordDetailsArray) {
                console.log("WordData lencheck:" + wordDetailsArray.length);
                if (wordDetailsArray.length > 0) {
                    var exist = wordServiceObject.checkWordExist(wordDetailsArray, wordDataObj);
                    console.log("WordData exist: " + exist);
                    if (exist) {
                        error = "WordData already exist with : " + wordDataObj.wordText;
                        resolve(error);
                    }
                    else {
                        wordDetailsArray.push(wordDataObj);
                        console.log("Number of WordData added size:" + wordDetailsArray.length);
                        file.writeFile(file.dataDirectory, 'WordDetails', JSON.stringify({ wordDetailsArray: wordDetailsArray }), { replace: true }).then(function (_) {
                            console.log("write succ");
                            error = " WordData added:" + wordDataObj.wordText;
                            resolve(error);
                        }).catch(function (err) {
                            console.log("write unsucc");
                            reject("write unsucc");
                        });
                    }
                }
                else {
                    console.log("length not");
                    file.createFile(file.dataDirectory, 'WordDetails', true).then(function (fileEntry) {
                        console.log("file create");
                        wordDetailsArray.push(wordDataObj);
                        file.writeFile(file.dataDirectory, 'WordDetails', JSON.stringify({ wordDetailsArray: wordDetailsArray }), { replace: true }).then(function (_) {
                            console.log("file write succ");
                            error = " WordData added :" + wordDataObj.wordText;
                            console.log("size:" + wordDetailsArray.length);
                            resolve(error);
                        }).catch(function (err) {
                            console.log("file does not write");
                            reject("file does not write");
                        });
                    });
                }
            }).catch(function (err) {
                console.log("WordData get not workign " + wordDetailsArray.length);
                file.createFile(file.dataDirectory, 'WordDetails', true).then(function (fileEntry) {
                    console.log("file create");
                    wordDetailsArray.push(wordDataObj);
                    file.writeFile(file.dataDirectory, 'WordDetails', JSON.stringify({ wordDetailsArray: wordDetailsArray }), { replace: true }).then(function (_) {
                        console.log("file write succ");
                        error = " WordData added:" + wordDataObj.wordText;
                        console.log("size:" + wordDetailsArray.length);
                        resolve(error);
                    }).catch(function (err) {
                        console.log("file does not write");
                        reject("file does not write");
                    });
                });
            });
        });
    };
    WordServices.prototype.removeWordFromFile = function (file, wordDetailsArray) {
        return new Promise(function (resolve, reject) {
            file.writeFile(file.dataDirectory, 'WordDetails', JSON.stringify({ wordDetailsArray: wordDetailsArray }), { replace: true }).then(function (_) {
                console.log("file write succ");
                console.log("size:" + wordDetailsArray.length);
                resolve("size:" + wordDetailsArray.length);
            }).catch(function (err) {
                console.log("file does not write");
                reject("file does not write");
            });
        });
    };
    WordServices.prototype.removeWordFromArray = function (wordDetailsArray, wordObj) {
        var remove = false;
        var index = wordDetailsArray.indexOf(wordObj);
        if (index !== -1) {
            console.log("index:" + index);
            wordDetailsArray.splice(index, 1);
            remove = true;
            return remove;
        }
        for (var _i = 0, wordDetailsArray_2 = wordDetailsArray; _i < wordDetailsArray_2.length; _i++) {
            var obj = wordDetailsArray_2[_i];
            if (obj.wordId == wordObj.wordId) {
                var index_1 = wordDetailsArray.indexOf(obj);
                if (index_1 !== -1) {
                    console.log("index:" + index_1);
                    wordDetailsArray.splice(index_1, 1);
                    remove = true;
                    return remove;
                }
            }
        }
        return remove;
    };
    WordServices.prototype.removeKnownUnKnownWordFromArray = function (wordDetailsArray, wordObj) {
        var remove = false;
        for (var _i = 0, wordDetailsArray_3 = wordDetailsArray; _i < wordDetailsArray_3.length; _i++) {
            var obj = wordDetailsArray_3[_i];
            if (obj.wordData.wordId == wordObj.wordId) {
                var index = wordDetailsArray.indexOf(obj);
                if (index !== -1) {
                    console.log("index:" + index);
                    wordDetailsArray.splice(index, 1);
                    remove = true;
                    return remove;
                }
            }
        }
        return remove;
    };
    WordServices.prototype.removeArrayFromArray = function (wordArray, subWordArray) {
        for (var _i = 0, subWordArray_1 = subWordArray; _i < subWordArray_1.length; _i++) {
            var subWordObj = subWordArray_1[_i];
            for (var _a = 0, wordArray_1 = wordArray; _a < wordArray_1.length; _a++) {
                var obj = wordArray_1[_a];
                if (obj.wordId == subWordObj.wordId) {
                    var index = wordArray.indexOf(obj);
                    if (index !== -1) {
                        console.log("index:" + index);
                        wordArray.splice(index, 1);
                        console.log("removing " + obj.wordText + " " + subWordObj.wordText);
                    }
                }
            }
        }
    };
    WordServices.prototype.exportWordFile = function (file, plt, socialSharing, wordServiceObject) {
        var fileData;
        var wordDetailsArray = [];
        var dir = file.tempDirectory;
        var fileName = "WordDetails.csv"; // please set your fileName;
        var blob = ""; // please set your data;
        wordServiceObject.getWordList(file).then(function (data) {
            var wordDataList = data;
            var allDataArray = [];
            var wordObjArray = ["word Id", "Word Text", "Word Category"];
            var line = wordObjArray.join(",");
            //allDataArray.push("data:text/csv;charset=utf-8,"+line)
            allDataArray.push(line);
            for (var _i = 0, wordDataList_1 = wordDataList; _i < wordDataList_1.length; _i++) {
                var wordObj = wordDataList_1[_i];
                var wordObjArray_1 = [wordObj.wordId, wordObj.wordText, wordObj.wordCategory];
                line = wordObjArray_1.join(',');
                allDataArray.push(line);
            }
            var csvContent = allDataArray.join('\r');
            if (plt.is('ios')) {
                // This will only print when on iOS
                file.writeFile(file.tempDirectory, 'WordDetails.csv', csvContent + "", { replace: true }).then(function (value) {
                    console.log("file write succ" + value.nativeURL);
                    socialSharing.share(null, null, null, value.nativeURL);
                }).catch(function (err) {
                    console.log("file does not write");
                    //reject("file does not write");
                });
                console.log('I am an iOS device!');
            }
        }).catch(function (err) { return console.log("erer:" + err); });
    };
    WordServices.prototype.importWordFile = function (file, plt, docPicker, wordServiceObject, wordDetailsArray) {
        return new Promise(function (resolve, reject) {
            if (plt.is('ios')) {
                docPicker.getFile('all').then(function (uri) {
                    var path = uri.substr(0, uri.lastIndexOf('/') + 1);
                    var filename = uri.substring(uri.lastIndexOf('/') + 1);
                    console.log("url:" + uri);
                    console.log("path:" + path);
                    console.log("filename:" + filename);
                    file.readAsText(path, filename).then(function (result) {
                        console.log("result:" + result);
                        var allLines = result.split('\r');
                        console.log("res:" + result.split('\r').length + "  resl:" + result.split('\r'));
                        console.log("alllines:" + allLines.length + "  0:" + allLines[0]);
                        //allLines.splice(0, 1);
                        var c1 = 1;
                        while (c1 < allLines.length) {
                            //var lineObj=allLines[c1];
                            var wordArray = allLines[c1].split(",");
                            console.log("wordArray:" + wordArray);
                            if (wordArray.length > 1) {
                                var wordObj = new __WEBPACK_IMPORTED_MODULE_1__models_wordData__["a" /* WordData */]();
                                console.log("uuid1:" + wordObj.wordId);
                                if (wordArray[0] != null && wordArray[0].replace(/\s/g, "").toLowerCase.length > 3) {
                                    console.log("wordArray[0]:(" + wordArray[0] + ")");
                                    wordObj.wordId = wordArray[0];
                                }
                                console.log("uuid2:" + wordObj.wordId);
                                wordObj.wordText = wordArray[1];
                                wordObj.wordCategory = wordArray[2];
                                console.log("wordData:" + wordObj.wordId + " " + wordObj.wordText + "  " + wordObj.wordCategory);
                                var exist = wordServiceObject.checkWordExist(wordDetailsArray, wordObj);
                                console.log("WordData exist: " + exist);
                                if (exist) {
                                    var error = "WordData already exist with : " + wordObj.wordText;
                                    console.log("" + error);
                                }
                                else {
                                    wordDetailsArray.push(wordObj);
                                }
                            }
                            c1++;
                        }
                        file.writeFile(file.dataDirectory, 'WordDetails', JSON.stringify({ wordDetailsArray: wordDetailsArray }), { replace: true }).then(function (_) {
                            console.log("write succ" + wordDetailsArray.length);
                            resolve(wordDetailsArray);
                            console.log("result:" + result);
                        }).catch(function (err) {
                            console.log("write unsucc");
                            reject("write prob:");
                        });
                    }).catch(function (err) {
                        reject("file read prb:" + err);
                    });
                }).catch(function (e) {
                    console.log(e);
                    reject("file uri prob:" + e);
                });
            }
        });
    };
    WordServices.prototype.removeAllWords = function (file, wordServiceObject) {
        return new Promise(function (resolve, reject) {
            file.removeFile(file.dataDirectory, 'WordDetails').then(function (data) {
                resolve("removed");
            }).catch(function (err) {
                reject(err);
            });
        });
    };
    WordServices.prototype.exportWordFileFromArray = function (file, plt, socialSharing, wordDataList, filename) {
        return new Promise(function (resolve, reject) {
            var allDataArray = [];
            var wordObjArray = ["word Id", "Word Text", "Word Category"];
            var line = wordObjArray.join(",");
            //allDataArray.push("data:text/csv;charset=utf-8,"+line)
            allDataArray.push(line);
            console.log("filename:" + filename);
            for (var _i = 0, wordDataList_2 = wordDataList; _i < wordDataList_2.length; _i++) {
                var wordObj = wordDataList_2[_i];
                var wordObjArray_2 = [wordObj.wordId, wordObj.wordText, wordObj.wordCategory];
                line = wordObjArray_2.join(',');
                allDataArray.push(line);
            }
            var csvContent = allDataArray.join('\r');
            console.log("csv content:" + csvContent);
            if (plt.is('ios')) {
                // This will only print when on iOS
                file.writeFile(file.tempDirectory, filename, csvContent + "", { replace: true }).then(function (value) {
                    console.log("file write succ" + value.nativeURL);
                    socialSharing.share(null, null, null, value.nativeURL).then(function (data) {
                        resolve();
                    }).catch(function (err) {
                        resolve();
                    });
                }).catch(function (err) {
                    resolve();
                    console.log("file does not write");
                    //reject("file does not write");
                });
                console.log('I am an iOS device!');
            }
        });
    };
    return WordServices;
}());

//# sourceMappingURL=wordServices.js.map

/***/ }),

/***/ 110:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MethodInterventionWordData; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__wordData__ = __webpack_require__(25);

var MethodInterventionWordData = /** @class */ (function () {
    function MethodInterventionWordData() {
        //ir method 
        this.wordData = new __WEBPACK_IMPORTED_MODULE_0__wordData__["a" /* WordData */]();
        this.isKnownWord = true;
        this.totalAskedTime = 0;
        this.knownTime = 0;
        //di method
        this.drillmode = false;
        this.drillmodeKnownCounter = 0;
    }
    return MethodInterventionWordData;
}());

//# sourceMappingURL=methodInterventionWordData.js.map

/***/ }),

/***/ 123:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MyMap; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__wordData__ = __webpack_require__(25);

var MyMap = /** @class */ (function () {
    function MyMap() {
        this.keys = [new __WEBPACK_IMPORTED_MODULE_0__wordData__["a" /* WordData */](), new __WEBPACK_IMPORTED_MODULE_0__wordData__["a" /* WordData */]()];
        this.values = [true, false];
    }
    return MyMap;
}());

//# sourceMappingURL=myMap.js.map

/***/ }),

/***/ 1363:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return StudentServices; });
var StudentServices = /** @class */ (function () {
    function StudentServices() {
    }
    StudentServices.prototype.getStudentList = function (file) {
        return new Promise(function (resolve, reject) {
            var fileData;
            var studentDetailsArray = [];
            var error = "";
            file.checkFile(file.dataDirectory, 'studentDetails').then(function (_) {
                console.log("file does  exist");
                file.readAsText(file.dataDirectory, 'studentDetails').then(function (data) {
                    console.log("read succ");
                    if (data != null) {
                        try {
                            fileData = JSON.parse(data);
                            studentDetailsArray = fileData.studentDetailsArray;
                            resolve(studentDetailsArray);
                        }
                        catch (e) {
                            reject(studentDetailsArray);
                        }
                    }
                    else {
                        reject(studentDetailsArray);
                    }
                }).catch(function (err) {
                    console.log("read unsecc student array:" + studentDetailsArray.length);
                    reject(studentDetailsArray);
                });
            }).catch(function (err) {
                console.log("file not exist student array:" + studentDetailsArray.length);
                reject(studentDetailsArray);
            });
        });
    };
    // checkStudentExist(studentDetailsArray: Array<Student> ,studentObject:Student )
    //   {
    //     var exist : boolean = false;
    //     studentDetailsArray.forEach(studentObj=>{
    //       console.log("stude:"+studentObj.stud.studentId+ " s: "+studentObject.studentId);
    //       if(studentObj.studentId == studentObject.studentId)
    //         exist=true;
    //     });
    //     return  exist;
    //   }
    // addStudenttoFile(file:File,studentObj:Student ,studentServiceObject:StudentServices):Promise<any>
    // {
    //     return new Promise(function(resolve,reject ) {
    //         var fileData:any;
    //         var studentDetailsArray: Array<Student> =[];
    //         var error:string ;
    //         studentObj.methodArray.push(new Method("Incremental Rehearsal",0));
    //         studentObj.methodArray.push(new Method("Direct Instruction",1));
    //         studentObj.methodArray.push(new Method("Traditional Drill & Practice",2));
    //         studentServiceObject.getStudentList(file).then(studentDetailsArray=>{
    //             console.log("student lencheck:"+studentDetailsArray.length);
    //             if(studentDetailsArray.length>0)
    //             {
    //                 var exist= studentServiceObject.checkStudentExist(studentDetailsArray,studentObj)
    //                   console.log("student exist: "+exist);
    //                   if(exist){
    //                       error="student already exist with id : "+studentObj.studentId;
    //                      resolve(error)
    //                   }
    //                   else{
    //                     studentDetailsArray.push(studentObj);
    //                     console.log("Number of student added size:"+studentDetailsArray.length)
    //                     file.writeFile(file.dataDirectory,'studentDetails',JSON.stringify({ studentDetailsArray: studentDetailsArray }),{replace: true}).then(_=>{
    //                         console.log("write succ");
    //                         error=" student added with id:"+studentObj.studentId;
    //                         resolve(error)
    //                           }).catch(err=>{
    //                             console.log("write unsucc");
    //                             reject("write unsucc");
    //                           });
    //                   }
    //             }
    //             else{
    //                 console.log("length not");
    //                 file.createFile(file.dataDirectory,'studentDetails',true).then( fileEntry=>{
    //                     console.log("file create");
    //                     studentDetailsArray.push(studentObj);  
    //                     file.writeFile(file.dataDirectory,'studentDetails',JSON.stringify({ studentDetailsArray: studentDetailsArray }),{replace: true}).then(_=>{
    //                           console.log("file write succ");
    //                           error=" student added with id:"+studentObj.studentId;
    //                           console.log("size:"+studentDetailsArray.length);
    //                           resolve(error)
    //                       }).catch(err=>{
    //                         console.log("file does not write");
    //                         reject("file does not write");
    //                       });
    //                 });
    //             }
    //         }).catch(err=>{
    //             console.log("student get not workign "+studentDetailsArray.length);
    //             file.createFile(file.dataDirectory,'studentDetails',true).then( fileEntry=>{
    //                 console.log("file create");
    //                 studentDetailsArray.push(studentObj);  
    //                 file.writeFile(file.dataDirectory,'studentDetails',JSON.stringify({ studentDetailsArray: studentDetailsArray }),{replace: true}).then(_=>{
    //                       console.log("file write succ");
    //                       error=" student added with id:"+studentObj.studentId;
    //                       console.log("size:"+studentDetailsArray.length);
    //                       resolve(error)
    //                   }).catch(err=>{
    //                     console.log("file does not write");
    //                     reject("file does not write");
    //                   });
    //             });
    //         });
    //     });
    // }
    // removeStudentFromFile(file:File,studentDetailsArray: Array<Student>):Promise<any>
    // {
    //     return new Promise(function(resolve,reject ) {
    //         file.writeFile(file.dataDirectory,'studentDetails',JSON.stringify({ studentDetailsArray: studentDetailsArray }),{replace: true}).then(_=>{
    //             console.log("file write succ");
    //             console.log("size:"+studentDetailsArray.length);
    //             resolve("student removed:"+studentDetailsArray.length);
    //         }).catch(err=>{
    //           console.log("file does not write");
    //           reject("file does not write");
    //         });
    //     });
    // }
    StudentServices.prototype.removeStudentFromArray = function (studentDetailsArray, studentObj) {
        var remove = false;
        var index = studentDetailsArray.indexOf(studentObj);
        if (index !== -1) {
            studentDetailsArray.splice(index, 1);
            console.log("index:" + index + "  length:+" + studentDetailsArray.length);
            remove = true;
        }
        return remove;
    };
    StudentServices.prototype.updateStudentToArrayExist = function (studentDetailsArray, studentObject) {
        studentDetailsArray.forEach(function (student, i) { if (student.studentData.studentId == studentObject.studentData.studentId)
            studentDetailsArray[i] = studentObject; });
    };
    StudentServices.prototype.exportStudentFile = function (file, plt, socialSharing) {
        //new Blob(["Lorem ipsum sit"], {type: "text/plain"});   
        var dir = file.tempDirectory;
        var fileName = "studentDetails.txt"; // please set your fileName;
        var blob = ""; // please set your data;
        console.log("temp:" + file.tempDirectory + "  cloud" + file.syncedDataDirectory + " data:" + file.dataDirectory + " doc" + file.documentsDirectory);
        file.checkFile(file.dataDirectory, 'studentDetails').then(function (_) {
            console.log("file does  exist");
            file.readAsText(file.dataDirectory, 'studentDetails').then(function (data) {
                console.log("read succ" + data);
                if (data != null) {
                    if (plt.is('ios')) {
                        // This will only print when on iOS
                        file.writeFile(file.tempDirectory, 'studentDetails.txt', data + "", { replace: true }).then(function (value) {
                            console.log("file write succ" + value.nativeURL);
                            socialSharing.share(null, null, null, value.nativeURL);
                        }).catch(function (err) {
                            console.log("file does not write");
                            //reject("file does not write");
                        });
                        console.log('I am an iOS device!');
                    }
                }
            });
        });
    };
    // exportStudentFileFromArray(file:File ,plt:Platform,socialSharing:SocialSharing,organizationDetailsUID:string)
    // {
    //   let dir = file.tempDirectory;
    //   let fileName = "studentDetails.txt"; // please set your fileName;
    //   let blob = ""; // please set your data;
    //   if (plt.is('ios')) {
    //       // This will only print when on iOS
    //       console.log('I am an iOS device!');
    //       var studentFireBaseService:StudentFireBaseService=new StudentFireBaseService(organizationDetailsUID,0);
    //       var studentDetailsArray:Array<Student> =  [];    
    //       studentFireBaseService.getStudentDataList(studentDetailsArray,organizationDetailsUID,0).then(data=>{
    //         file.writeFile(file.tempDirectory,'studentDetails.txt',JSON.stringify({ studentDetailsArray: studentDetailsArray }),{replace: true}).then(value=>{
    //           console.log("file write succ"+value.nativeURL);
    //           socialSharing.share(null,null,null,value.nativeURL);
    //       }).catch(err=>{
    //         console.log("file does not write");
    //         //reject("file does not write");
    //       });
    //       }).catch(err=>{
    //     });
    //     }
    //   }
    StudentServices.prototype.importStudentFile = function (file, plt, docPicker, studentServicesObject, StudentDetailsArray) {
        return new Promise(function (resolve, reject) {
            var _this = this;
            var fileData;
            var studentDetailsArray = [];
            var error = "";
            if (plt.is('ios')) {
                docPicker.getFile('all').then(function (uri) {
                    var path = uri.substr(0, uri.lastIndexOf('/') + 1);
                    var filename = uri.substring(uri.lastIndexOf('/') + 1);
                    console.log("url:" + uri);
                    console.log("path:" + path);
                    console.log("filename:" + filename);
                    file.readAsText(path, filename).then(function (data1) {
                        console.log("data:" + data1);
                        if (data1 != null) {
                            try {
                                fileData = JSON.parse(data1);
                                var studentFileArray = [];
                                console.log("filedata:" + fileData);
                                studentFileArray = fileData.studentDetailsArray;
                                console.log("fileArray:" + studentFileArray + "  len:" + studentFileArray.length);
                                studentServicesObject.getStudentList(file).then(function (data) {
                                    studentDetailsArray = data;
                                    console.log("studentDetArray:" + studentDetailsArray + " len:" + studentDetailsArray.length);
                                    for (var _i = 0, studentFileArray_1 = studentFileArray; _i < studentFileArray_1.length; _i++) {
                                        var studentFileObj = studentFileArray_1[_i];
                                        console.log("exist" + exist);
                                        var exist = _this.checkStudentExist(studentDetailsArray, studentFileObj);
                                        if (!exist) {
                                            studentDetailsArray.push(studentFileObj);
                                            console.log("pushing");
                                        }
                                    }
                                    file.writeFile(file.dataDirectory, 'studentDetails', JSON.stringify({ studentDetailsArray: studentDetailsArray }), { replace: true }).then(function (_) {
                                        console.log("write succ");
                                        resolve(studentDetailsArray);
                                    }).catch(function (err) {
                                        console.log("write unsucc");
                                        resolve(studentDetailsArray);
                                    });
                                }).catch(function (err) {
                                    file.writeFile(file.dataDirectory, 'studentDetails', JSON.stringify({ studentDetailsArray: studentFileArray }), { replace: true }).then(function (_) {
                                        console.log("write succ");
                                        resolve(studentFileArray);
                                    }).catch(function (err) {
                                        console.log("write unsucc");
                                        resolve(studentFileArray);
                                    });
                                });
                            }
                            catch (e) {
                                reject(studentDetailsArray);
                            }
                        }
                        else {
                            reject(studentDetailsArray);
                        }
                    }).catch(function (err) {
                        reject([]);
                    });
                }).catch(function (e) {
                    console.log(e);
                    reject([]);
                });
            }
        });
    };
    return StudentServices;
}());

//# sourceMappingURL=studentAddRemoveServices.js.map

/***/ }),

/***/ 1364:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AddAdminAccess; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ionic_storage__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__models_organizationDetails__ = __webpack_require__(35);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__models_user__ = __webpack_require__(77);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var AddAdminAccess = /** @class */ (function () {
    function AddAdminAccess(navCtrl, alertCtrl, storage) {
        this.navCtrl = navCtrl;
        this.alertCtrl = alertCtrl;
        this.storage = storage;
        this.allDatauserDetailsList = [new __WEBPACK_IMPORTED_MODULE_4__models_user__["a" /* User */]()];
        this.searchTerm = '';
        this.error = "Error Message";
        this.userDetailsList = [new __WEBPACK_IMPORTED_MODULE_4__models_user__["a" /* User */]()];
        this.userDetails = new __WEBPACK_IMPORTED_MODULE_4__models_user__["a" /* User */]();
        this.organizationDetails = new __WEBPACK_IMPORTED_MODULE_3__models_organizationDetails__["a" /* OrganizationDetails */]();
    }
    ;
    AddAdminAccess.prototype.filterItems = function () {
        var _this = this;
        this.userDetailsList = this.allDatauserDetailsList.filter(function (userObject) {
            return userObject.firstname.toLowerCase().indexOf(_this.searchTerm.toLowerCase()) > -1 ||
                userObject.lastname.toLowerCase().indexOf(_this.searchTerm.toLowerCase()) > -1 ||
                userObject.emailId.toLowerCase().indexOf(_this.searchTerm.toLowerCase()) > -1 ||
                userObject.userRole.toLowerCase().indexOf(_this.searchTerm.toLowerCase()) > -1;
        });
        console.log("ion filter enter" + this.allDatauserDetailsList.length);
    };
    AddAdminAccess.prototype.removeUserDetails = function (userObject) {
        this.removeUserConfirm(userObject);
    };
    AddAdminAccess.prototype.updateUserRole = function (userObject) {
        console.log("role:" + userObject.userRole);
        console.log("update will enter" + this.allDatauserDetailsList.length);
        this.updateUserConfirm(userObject);
        console.log("iipdaon will enter" + this.allDatauserDetailsList.length);
    };
    AddAdminAccess.prototype.onSelectChange = function (selectedValue, index) {
        console.log('Selected', selectedValue, index, this.allDatauserDetailsList[index].userRole, this.allDatauserDetailsList.length);
        this.userDetailsList[index].userRole = selectedValue;
        console.log('Selected', selectedValue, index, this.allDatauserDetailsList[index].userRole, this.allDatauserDetailsList.length);
        //  this.filterItems();
    };
    AddAdminAccess.prototype.updateUserConfirm = function (userObject) {
        var alert = this.alertCtrl.create({
            title: 'Update User Role',
            message: 'Do you want to update User ' + userObject.emailId + ' with user role of ' + userObject.userRole + '?',
            buttons: [
                {
                    text: 'Cancel',
                    role: 'cancel',
                    handler: function () {
                        console.log('Cancel clicked');
                    }
                },
                {
                    text: 'yes',
                    handler: function () {
                        //   this.filterItems();
                        console.log('yes clicked');
                    }
                }
            ]
        });
        alert.present();
    };
    AddAdminAccess.prototype.removeUserConfirm = function (userObject) {
        var alert = this.alertCtrl.create({
            title: 'Remove User',
            message: 'Do you want to remove User ' + userObject.emailId + '?',
            buttons: [
                {
                    text: 'Cancel',
                    role: 'cancel',
                    handler: function () {
                        console.log('Cancel clicked');
                    }
                },
                {
                    text: 'yes',
                    handler: function () {
                        //   this.filterItems();
                        console.log('yes clicked');
                    }
                }
            ]
        });
        alert.present();
    };
    AddAdminAccess = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-addAdminAccess',template:/*ion-inline-start:"C:\mystuff\master\AcademicInvertionAPP\backup\htmlDemos\backup\1\AIAPPv4.0\src\components\login\addAdminAccess\addAdminAccess.html"*/'<ion-header>\n\n  <ion-navbar>\n\n    <button ion-button menuToggle>\n\n      <ion-icon name="menu"></ion-icon>\n\n    </button>\n\n    <ion-title>Update User Role </ion-title>\n\n  </ion-navbar>\n\n</ion-header>\n\n\n\n<ion-content padding>\n\n  <ion-grid style="height: 10%">\n\n    <ion-row justify-content-center align-items-center style="height: 100%">\n\n      <h3> View User Email : </h3>\n\n    </ion-row>\n\n  </ion-grid>\n\n\n\n\n\n  <div *ngIf="error" class="error-message">{{error}}</div>\n\n\n\n  <ion-content padding="\'true\'" scroll="false" class="has-header">\n\n    <ion-card>\n\n\n\n      <ion-searchbar [(ngModel)]="searchTerm" (ionInput)="filterItems()"></ion-searchbar>\n\n      <ion-item>\n\n\n\n        <ion-row class="ion-title" style="background-color: silver;">\n\n          <ion-col>Email ID</ion-col>\n\n          <ion-col></ion-col>\n\n\n\n        </ion-row>\n\n        <ion-item *ngFor="let userObject of userDetailsList;let i=index">\n\n          <ion-row>\n\n            <ion-col>{{userObject.emailId}}</ion-col>\n\n\n\n            <ion-col>\n\n              <ion-item>\n\n                <ion-select  required  (ionChange)="onSelectChange($event,i)">\n\n                  <ion-option value="faculty" [selected]="userObject.userRole == \'faculty\'" >faculty</ion-option>\n\n                  <ion-option value="OrganizationAdmin" [selected]="userObject.userRole == \'OrganizationAdmin\'" >admin</ion-option>\n\n                </ion-select>\n\n    \n\n              </ion-item>\n\n            </ion-col>\n\n            \n\n            <ion-col>\n\n              <ion-item (click)="updateUserRole(userObject)" style="color: blue">\n\n\n\n                Update User Role\n\n              </ion-item>\n\n            </ion-col>\n\n\n\n            <ion-col>\n\n              <ion-item (click)="removeUserDetails(userObject)" style="color: blue">\n\n\n\n                Remove User \n\n              </ion-item>\n\n            </ion-col>\n\n          </ion-row>\n\n        </ion-item>\n\n      </ion-item>\n\n\n\n    </ion-card>\n\n  </ion-content>\n\n</ion-content>\n\n'/*ion-inline-end:"C:\mystuff\master\AcademicInvertionAPP\backup\htmlDemos\backup\1\AIAPPv4.0\src\components\login\addAdminAccess\addAdminAccess.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["h" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["a" /* AlertController */],
            __WEBPACK_IMPORTED_MODULE_1__ionic_storage__["b" /* Storage */]])
    ], AddAdminAccess);
    return AddAdminAccess;
}());

//# sourceMappingURL=addAdminAccess.js.map

/***/ }),

/***/ 1365:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AddEmailList; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ionic_storage__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__models_organizationDetails__ = __webpack_require__(35);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__models_user__ = __webpack_require__(77);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var AddEmailList = /** @class */ (function () {
    function AddEmailList(navCtrl, alertCtrl, storage, toastController) {
        this.navCtrl = navCtrl;
        this.alertCtrl = alertCtrl;
        this.storage = storage;
        this.toastController = toastController;
        this.newEmailId = '';
        this.userEmailList = ["email1@gmail.com", "a@gmail.com"];
        this.allData = ["email1@gmail.com", "a@gmail.com"];
        this.searchTerm = '';
        this.error = "Error Message";
        this.userDetails = new __WEBPACK_IMPORTED_MODULE_4__models_user__["a" /* User */]();
        this.organizationDetails = new __WEBPACK_IMPORTED_MODULE_3__models_organizationDetails__["a" /* OrganizationDetails */]();
    }
    ;
    AddEmailList.prototype.filterItems = function () {
        var _this = this;
        this.userEmailList = this.allData.filter(function (emailId) {
            return emailId.toLowerCase().indexOf(_this.searchTerm.toLowerCase()) > -1;
        });
    };
    AddEmailList.prototype.addNewEmail = function () {
        try {
            this.allData.push(this.newEmailId);
            this.filterItems();
            //this.sendEmail(this.newEmailId,this.organizationDetails.schoolCode);
            this.newEmailId = '';
            this.error = '';
        }
        catch (e) {
            this.error = "" + e;
            console.log(e);
        }
    };
    AddEmailList.prototype.removeEmailId = function (emailId) {
        this.removeEmailIdConfirm(emailId);
    };
    AddEmailList.prototype.removeEmailIdConfirm = function (emailId) {
        var _this = this;
        var alert = this.alertCtrl.create({
            title: 'Remove Email',
            message: 'Do you want to remove Email ' + emailId + '?',
            buttons: [
                {
                    text: 'Cancel',
                    role: 'cancel',
                    handler: function () {
                        console.log('Cancel clicked');
                    }
                },
                {
                    text: 'yes',
                    handler: function () {
                        _this.filterItems();
                        console.log('yes clicked');
                    }
                }
            ]
        });
        alert.present();
    };
    AddEmailList.prototype.sendEmailIdConfirm = function (emailId, schoolCode) {
        var _this = this;
        var alert = this.alertCtrl.create({
            title: 'Send Invitation Email',
            message: 'Do you want to send Invitation Email to ' + emailId + '?',
            buttons: [
                {
                    text: 'Cancel',
                    role: 'cancel',
                    handler: function () {
                        console.log('Cancel clicked');
                    }
                },
                {
                    text: 'yes',
                    handler: function () {
                        _this.sendEmail(emailId, schoolCode);
                    }
                }
            ]
        });
        alert.present();
    };
    AddEmailList.prototype.sendEmail = function (emailId, schoolCode) {
    };
    AddEmailList = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-addEmailList',template:/*ion-inline-start:"C:\mystuff\master\AcademicInvertionAPP\backup\htmlDemos\backup\1\AIAPPv4.0\src\components\login\addEmail\addEmailList.html"*/'<ion-header>\n\n  <ion-navbar>\n\n    <button ion-button menuToggle>\n\n      <ion-icon name="menu"></ion-icon>\n\n    </button>\n\n    <ion-title>User Email List</ion-title>\n\n  </ion-navbar>\n\n  </ion-header>\n\n  \n\n  <ion-content padding>\n\n  <ion-grid style="height: 10%">\n\n    <ion-row justify-content-center align-items-center style="height: 100%">\n\n      <h3 > View User Email : </h3>\n\n    </ion-row>\n\n  </ion-grid>\n\n  \n\n  \n\n  <div *ngIf="error" class="error-message">{{error}}</div>\n\n\n\n  <ion-content padding="\'true\'" scroll="false" class="has-header">\n\n      <ion-card>\n\n        \n\n          <form class="list" #newStudentForm="ngForm" (ngSubmit)="addNewEmail()">\n\n              <ion-row>\n\n                  <ion-col>\n\n                    <ion-list inset>\n\n              \n\n                      <ion-item>\n\n                        <ion-label text-wrap >Email ID : </ion-label>\n\n                        <ion-input name="newEmailId" required [(ngModel)]="newEmailId" type="email"></ion-input>\n\n                      </ion-item>\n\n                        \n\n                        <ion-grid style="height: 100%">\n\n                            <ion-row justify-content-center align-items-center style="height: 100%">\n\n                                  <button ion-button class="submit-btn" full type="submit" [disabled]="!newStudentForm.form.valid">Add Email \n\n                                  </button>\n\n                            </ion-row>\n\n                        </ion-grid>\n\n        \n\n                  </ion-list>\n\n              </ion-col>\n\n              </ion-row>\n\n            </form>\n\n  \n\n        <ion-searchbar [(ngModel)]="searchTerm" (ionInput)="filterItems()"></ion-searchbar>\n\n          <ion-item  >\n\n\n\n              <ion-row class="ion-title" style="background-color: silver;">\n\n                  <ion-col >Email ID</ion-col>\n\n                  <ion-col ></ion-col>\n\n                  <ion-col ></ion-col>\n\n                  \n\n                </ion-row>\n\n                <ion-item *ngFor="let emailIdObj of userEmailList">\n\n                    <ion-row  >\n\n                        <ion-col >{{emailIdObj}}</ion-col>\n\n                        <ion-col >\n\n                          <ion-item (click)="sendEmailIdConfirm(emailIdObj,organizationDetails.schoolCode)"  style="color: blue">\n\n                              Send Invitation Email\n\n                          </ion-item>\n\n                        </ion-col>\n\n\n\n                        <ion-col >\n\n                          <ion-item (click)="removeEmailId(emailIdObj)"  style="color: blue">\n\n                              Remove Email\n\n                          </ion-item>\n\n                        </ion-col>\n\n                    \n\n                    </ion-row>\n\n                  </ion-item>\n\n          </ion-item>\n\n        \n\n      </ion-card>\n\n    </ion-content>\n\n  </ion-content>\n\n  '/*ion-inline-end:"C:\mystuff\master\AcademicInvertionAPP\backup\htmlDemos\backup\1\AIAPPv4.0\src\components\login\addEmail\addEmailList.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["h" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["a" /* AlertController */],
            __WEBPACK_IMPORTED_MODULE_1__ionic_storage__["b" /* Storage */],
            __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["k" /* ToastController */]])
    ], AddEmailList);
    return AddEmailList;
}());

//# sourceMappingURL=addEmailList.js.map

/***/ }),

/***/ 1366:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SecurityCheckUp; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__models_user__ = __webpack_require__(77);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(10);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var SecurityCheckUp = /** @class */ (function () {
    function SecurityCheckUp(alertCtrl, navCtrl) {
        this.alertCtrl = alertCtrl;
        this.navCtrl = navCtrl;
        this.emailId = "abc@gmail.com";
        this.emailVerified = false;
        this.question = "Question";
        this.answer = "Answer";
        this.passwordType = Array(3).fill('password');
        this.passwordIcon = Array(3).fill('eye-off');
        this.userDetails = new __WEBPACK_IMPORTED_MODULE_1__models_user__["a" /* User */]();
        this.error = "Error Message";
    }
    SecurityCheckUp.prototype.hideShowPassword = function (index) {
        this.passwordType[index] = this.passwordType[index] === 'text' ? 'password' : 'text';
        this.passwordIcon[index] = this.passwordIcon[index] === 'eye-off' ? 'eye' : 'eye-off';
    };
    SecurityCheckUp.prototype.verifyEmail = function () {
    };
    SecurityCheckUp.prototype.verifySecurity = function () {
    };
    SecurityCheckUp = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-securityCheckUp',template:/*ion-inline-start:"C:\mystuff\master\AcademicInvertionAPP\backup\htmlDemos\backup\1\AIAPPv4.0\src\components\login\forgetPassword\securityCheckUP\securityCheckUp.html"*/'<ion-header>\n\n  <ion-navbar>\n\n    <ion-title>\n\n      Forget Password\n\n    </ion-title>\n\n  </ion-navbar>\n\n</ion-header>\n\n<ion-content padding center text-center>\n\n  <ion-card>\n\n    <div *ngIf="error" class="alert alert-danger">{{error}}</div>\n\n\n\n    <form #loginForm="ngForm" (ngSubmit)="verifyEmail()" autocomplete="off">\n\n      <ion-row>\n\n        <ion-col>\n\n          <ion-list inset>\n\n            <ion-item>\n\n              <ion-input placeholder="Email ID" name="emailId" type="email" required [(ngModel)]="emailId"></ion-input>\n\n            </ion-item>\n\n\n\n          </ion-list>\n\n\n\n        </ion-col>\n\n      </ion-row>\n\n      <ion-row>\n\n        <ion-col>\n\n\n\n          <button ion-button class="submit-btn" full type="submit" [disabled]="!loginForm.form.valid">Verify Email\n\n          </button>\n\n        </ion-col>\n\n      </ion-row>\n\n    </form>\n\n\n\n    <form *ngIf="emailVerified" #securityQuestion="ngForm" (ngSubmit)="verifySecurity()" autocomplete="off">\n\n      <ion-row>\n\n        <ion-col>\n\n          <ion-list inset>\n\n\n\n            <ion-item>\n\n              <ion-label text-wrap>\n\n                {{question}}\n\n              </ion-label>\n\n            </ion-item>\n\n\n\n            <ion-item>\n\n              <ion-input placeholder="Answer " name="answer" [type]="passwordType[0]" required [(ngModel)]="answer"></ion-input>\n\n              <ion-icon item-end [name]="passwordIcon[0]" class="passwordIcon" (click)=\'hideShowPassword(0)\'></ion-icon>\n\n\n\n            </ion-item>\n\n\n\n          </ion-list>\n\n\n\n        </ion-col>\n\n      </ion-row>\n\n      <ion-row>\n\n        <ion-col>\n\n\n\n          <button ion-button class="submit-btn" full type="submit" [disabled]="!securityQuestion.form.valid">Verify\n\n            Email\n\n          </button>\n\n        </ion-col>\n\n      </ion-row>\n\n    </form>\n\n\n\n\n\n\n\n  </ion-card>\n\n</ion-content>\n\n'/*ion-inline-end:"C:\mystuff\master\AcademicInvertionAPP\backup\htmlDemos\backup\1\AIAPPv4.0\src\components\login\forgetPassword\securityCheckUP\securityCheckUp.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["a" /* AlertController */],
            __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["h" /* NavController */]])
    ], SecurityCheckUp);
    return SecurityCheckUp;
}());

//# sourceMappingURL=SecurityCheckUp.js.map

/***/ }),

/***/ 1367:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return organizationRegister; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ionic_storage__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__validation_passwordValidator__ = __webpack_require__(643);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var organizationRegister = /** @class */ (function () {
    function organizationRegister(navCtrl, storage) {
        this.navCtrl = navCtrl;
        this.storage = storage;
        this.firstname = "FirstName1";
        this.lastname = "LastName1";
        this.emailId = "xyz@gmail.com ";
        this.password = "123";
        this.reTypePassword = "123";
        this.error = "Error Message";
        this.emailVerfied = false;
        this.securityQuestion = "questions";
        this.answer = "answer";
        this.emailSent = "";
        this.showForm = true;
        this.isSchool = true;
        this.schoolname = "schoolname1";
        this.schoolcode = "123456";
        this.passwordType = Array(3).fill('password');
        this.passwordIcon = Array(3).fill('eye-off');
        this.street1 = "1234 ne 25th st";
        this.street2 = "F312";
        this.zipcode = "98007";
        this.city = "bellevue";
        this.stateName = "WA";
        this.contact = "1234567890";
        this.passwordErrors = [];
    }
    organizationRegister.prototype.continueRegistration = function () {
    };
    organizationRegister.prototype.hideShowPassword = function (index) {
        this.passwordType[index] = this.passwordType[index] === 'text' ? 'password' : 'text';
        this.passwordIcon[index] = this.passwordIcon[index] === 'eye-off' ? 'eye' : 'eye-off';
    };
    organizationRegister.prototype.notify = function () {
        //    console.log("Toggled: "+ this.isSchool); 
    };
    organizationRegister.prototype.analyze = function (password) {
        this.passwordErrors = __WEBPACK_IMPORTED_MODULE_3__validation_passwordValidator__["a" /* PasswordValidator */].passwordCheck(this.password);
    };
    organizationRegister = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-organizationRegister',template:/*ion-inline-start:"C:\mystuff\master\AcademicInvertionAPP\backup\htmlDemos\backup\1\AIAPPv4.0\src\components\login\OrganizationRegister\organizationRegister.html"*/'<ion-header>\n\n  <ion-navbar>\n\n    <button ion-button menuToggle>\n\n      <ion-icon name="menu"></ion-icon>\n\n    </button>\n\n    <ion-title>Add User</ion-title>\n\n  </ion-navbar>\n\n</ion-header>\n\n\n\n<ion-content padding>\n\n  <ion-grid style="height: 10%">\n\n    <ion-row justify-content-center align-items-center style="height: 100%">\n\n      <h3> Register</h3>\n\n    </ion-row>\n\n  </ion-grid>\n\n\n\n\n\n\n\n\n\n  <div *ngIf="error" class="error-message">{{error}}</div>\n\n  <ion-content padding="\'true\'" scroll="false" class="has-header">\n\n\n\n    <ion-card *ngIf="showForm">\n\n\n\n      <form class="list" #newStudentForm="ngForm" (ngSubmit)="continueRegistration()">\n\n        <ion-row>\n\n          <ion-col>\n\n            <ion-list inset>\n\n\n\n              <ion-item>\n\n                <ion-label text-wrap>Uses for : </ion-label>\n\n                <ion-label text-wrap *ngIf="isSchool">School</ion-label>\n\n                <ion-label text-wrap *ngIf="!isSchool">Personel</ion-label>\n\n                <ion-toggle [(ngModel)]="isSchool" (ionChange)="notify()" [ngModelOptions]="{standalone: true}">\n\n                </ion-toggle>\n\n\n\n              </ion-item>\n\n\n\n              <ion-item *ngIf="isSchool">\n\n                <ion-label text-wrap>School Name : </ion-label>\n\n                <ion-input name="schoolname" required [(ngModel)]="schoolname" type="text"></ion-input>\n\n              </ion-item>\n\n              <ion-item *ngIf="isSchool">\n\n                <ion-label text-wrap>School Code (6 digits) : </ion-label>\n\n                <ion-input name="schoolcode" required [(ngModel)]="schoolcode" type="text" maxlength="6" ></ion-input>\n\n              </ion-item>\n\n\n\n              <ion-item>\n\n                <ion-label text-wrap>First Name : </ion-label>\n\n                <ion-input name="firstname" required [(ngModel)]="firstname" type="text"></ion-input>\n\n              </ion-item>\n\n              <ion-item>\n\n                <ion-label text-wrap>Last Name : </ion-label>\n\n                <ion-input name="lastname" required [(ngModel)]="lastname" type="text"></ion-input>\n\n              </ion-item>\n\n\n\n              <ion-item>\n\n                <ion-label text-wrap>Address</ion-label>\n\n              </ion-item>\n\n              <ion-item>\n\n                <ion-label text-wrap>Address line 1 : </ion-label>\n\n                <ion-input name="street1" required [(ngModel)]="street1" type="text"></ion-input>\n\n              </ion-item>\n\n              <ion-item>\n\n                <ion-label text-wrap>Address line 2 : </ion-label>\n\n                <ion-input name="street2" [(ngModel)]="street2" type="text"></ion-input>\n\n              </ion-item>\n\n\n\n              <ion-item>\n\n                <ion-label text-wrap>Zip-Code : </ion-label>\n\n                <ion-input name="zipcode" required [(ngModel)]="zipcode" type="text" maxlength="6"></ion-input>\n\n              </ion-item>\n\n              <ion-item>\n\n                <ion-label text-wrap>City : </ion-label>\n\n                <ion-input name="city" required [(ngModel)]="city" type="text"></ion-input>\n\n              </ion-item>\n\n\n\n              <ion-item>\n\n                <ion-label text-wrap>State : </ion-label>\n\n                <ion-input name="stateName" required [(ngModel)]="stateName" type="text"></ion-input>\n\n              </ion-item>\n\n\n\n              <ion-item>\n\n\n\n                <ion-label text-wrap>Contact : </ion-label>\n\n\n\n                <ion-input name="contact" required [(ngModel)]="contact" type="text" maxlength="10"></ion-input>\n\n              </ion-item>\n\n              <ion-item>\n\n\n\n                <ion-label text-wrap>Email ID : </ion-label>\n\n\n\n                <ion-input name="emailId" required [(ngModel)]="emailId" type="email"></ion-input>\n\n\n\n              </ion-item>\n\n\n\n\n\n\n\n\n\n              <ion-item>\n\n                <ion-label text-wrap>Password :</ion-label>\n\n\n\n                <ion-input passwordValidator name="password" id="password" [type]="passwordType[0]"\n\n                  [(ngModel)]="password" #passwordModel="ngModel" ></ion-input>\n\n\n\n                <ion-icon item-end [name]="passwordIcon[0]" class="passwordIcon" (click)=\'hideShowPassword(0)\'>\n\n                </ion-icon>\n\n              </ion-item>\n\n              <div *ngIf=\'passwordModel.errors\'>\n\n                <ion-item *ngFor="let errMsg of passwordModel.errors.passwordValidator">\n\n                  <div class="error-message">\n\n                    <ion-icon name="information-circle">{{ errMsg }}</ion-icon>\n\n                  </div>\n\n                </ion-item>\n\n              </div>\n\n              <ion-item>\n\n                <ion-label text-wrap>Re-type Password : </ion-label>\n\n\n\n                <ion-input name="reTypePassword" [type]="passwordType[1]" required [(ngModel)]="reTypePassword">\n\n                </ion-input>\n\n                <ion-icon item-end [name]="passwordIcon[1]" class="passwordIcon" (click)=\'hideShowPassword(1)\'>\n\n                </ion-icon>\n\n\n\n              </ion-item>\n\n              <div *ngIf=\'password != reTypePassword\'>\n\n                  <ion-item>\n\n                    <div class="error-message">\n\n                      <ion-icon name="information-circle"> Re-type Password is not matching the Password.</ion-icon>\n\n                    </div>\n\n                  </ion-item>\n\n                </div>\n\n              <ion-item>\n\n                <ion-label text-wrap>Security Question : </ion-label>\n\n                <ion-input name="securityQuestion" required [(ngModel)]="securityQuestion" type="text"></ion-input>\n\n              </ion-item>\n\n\n\n              <ion-item>\n\n                <ion-label text-wrap>Answer : </ion-label>\n\n\n\n                <ion-input name="answer" [type]="passwordType[2]" required [(ngModel)]="answer"></ion-input>\n\n                <ion-icon item-end [name]="passwordIcon[2]" class="passwordIcon" (click)=\'hideShowPassword(2)\'>\n\n                </ion-icon>\n\n\n\n              </ion-item>\n\n\n\n              <ion-grid style="height: 100%">\n\n                <ion-row justify-content-center align-items-center style="height: 100%">\n\n                  <button ion-button class="submit-btn" full type="submit"\n\n                    [disabled]="(!newStudentForm.form.valid) || (password != reTypePassword)">Continue Registration\n\n                  </button>\n\n                </ion-row>\n\n              </ion-grid>\n\n            </ion-list>\n\n          </ion-col>\n\n        </ion-row>\n\n      </form>\n\n    </ion-card>\n\n\n\n    <ion-card *ngIf="!showForm">\n\n      <ion-item>\n\n        <ion-label text-wrap *ngIf="!emailVerfied"> Check your Email and verify it by clicking the link provided in\n\n          Email. </ion-label>\n\n      </ion-item>\n\n    </ion-card>\n\n  </ion-content>\n\n</ion-content>'/*ion-inline-end:"C:\mystuff\master\AcademicInvertionAPP\backup\htmlDemos\backup\1\AIAPPv4.0\src\components\login\OrganizationRegister\organizationRegister.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["h" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1__ionic_storage__["b" /* Storage */]])
    ], organizationRegister);
    return organizationRegister;
}());

//# sourceMappingURL=organizationRegister.js.map

/***/ }),

/***/ 1368:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DIFlashCardSessionTest; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ionic_native_file__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_text_to_speech__ = __webpack_require__(118);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_storage__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_ionic_angular__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__models_methodInterventionWordData__ = __webpack_require__(110);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__models_methodIntervetionSession__ = __webpack_require__(98);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__models_organizationDetails__ = __webpack_require__(35);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__models_student__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__models_wordData__ = __webpack_require__(25);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__services_DirectInstructionSevice__ = __webpack_require__(1369);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__services_flashcardService__ = __webpack_require__(149);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__services_wordServices__ = __webpack_require__(109);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};













var DIFlashCardSessionTest = /** @class */ (function () {
    function DIFlashCardSessionTest(file, navCtrl, navParams, viewCtrl, storage, tts) {
        this.file = file;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.viewCtrl = viewCtrl;
        this.storage = storage;
        this.tts = tts;
        this.studentObject = new __WEBPACK_IMPORTED_MODULE_8__models_student__["a" /* Student */]();
        this.methodIndex = 0;
        this.wordDataObject = new __WEBPACK_IMPORTED_MODULE_9__models_wordData__["a" /* WordData */]();
        this.wordDataArray = [new __WEBPACK_IMPORTED_MODULE_9__models_wordData__["a" /* WordData */]()];
        this.sessionCounter = 0;
        this.TestTitle = "Test Title";
        this.currentCardNumber = 0;
        this.totalCardNumber = 0;
        this.testIndex = 0;
        this.testFlag = 0; // testType="assessment" :0 ; "IncrementRehrsal" :1
        //private studentObject:Student;
        this.methodInetrventionWordDataArray = [new __WEBPACK_IMPORTED_MODULE_5__models_methodInterventionWordData__["a" /* MethodInterventionWordData */]()];
        this.methodInterventionWordDataObj = new __WEBPACK_IMPORTED_MODULE_5__models_methodInterventionWordData__["a" /* MethodInterventionWordData */]();
        this.methodSessionObject = new __WEBPACK_IMPORTED_MODULE_6__models_methodIntervetionSession__["a" /* MethodSession */]();
        this.DIServiceObject = new __WEBPACK_IMPORTED_MODULE_10__services_DirectInstructionSevice__["a" /* DirectInstructionServices */]();
        this.ratio1 = 0;
        this.ratio2 = 0;
        this.startDate = new Date();
        this.endDate = new Date();
        this.wordServiceObj = new __WEBPACK_IMPORTED_MODULE_12__services_wordServices__["a" /* WordServices */]();
        this.organizationDetails = new __WEBPACK_IMPORTED_MODULE_7__models_organizationDetails__["a" /* OrganizationDetails */]();
        this.wordType = 0;
        this.showAnswer = false;
        this.flashcardService = new __WEBPACK_IMPORTED_MODULE_11__services_flashcardService__["a" /* FlashcardService */]();
        this.number1 = "123";
        this.number2 = "23";
        this.operation = "+";
        this.result = [];
    }
    DIFlashCardSessionTest.prototype.ionViewDidLoad = function () {
        console.log("onviewdidload");
    };
    DIFlashCardSessionTest.prototype.greenCircleClick = function () {
        // this.methodInterventionWordDataObj= this.getMethodSessionWordDataObject(this.wordDataObject);
        this.showAnswer = false;
        if (this.methodInterventionWordDataObj != null) {
            this.methodInterventionWordDataObj.knownTime++;
            this.methodInterventionWordDataObj.totalAskedTime++;
        }
        this.updateMethodSessionWordDataObject(this.methodInterventionWordDataObj, true);
        if (this.currentCardNumber + 1 <= this.totalCardNumber) {
            this.methodInterventionWordDataObj = this.methodInetrventionWordDataArray[0];
            this.wordDataObject = this.methodInterventionWordDataObj.wordData;
            this.convertTextToMath(this.wordDataObject.wordText);
            this.currentCardNumber++;
        }
        else {
            console.log("else:green");
            this.updateAllObjects();
            //    this.goBackToView();
        }
    };
    DIFlashCardSessionTest.prototype.redCircleClick = function () {
        this.showAnswer = false;
        if (this.methodInterventionWordDataObj != null) {
            this.methodInterventionWordDataObj.totalAskedTime++;
        }
        this.updateMethodSessionWordDataObject(this.methodInterventionWordDataObj, false);
        if (this.currentCardNumber + 1 <= this.totalCardNumber) {
            this.methodInterventionWordDataObj = this.methodInetrventionWordDataArray[0];
            this.wordDataObject = this.methodInterventionWordDataObj.wordData;
            this.convertTextToMath(this.wordDataObject.wordText);
            this.currentCardNumber++;
        }
        else {
            console.log("else:red");
            this.updateAllObjects();
        }
    };
    DIFlashCardSessionTest.prototype.updateAllObjects = function () {
    };
    DIFlashCardSessionTest.prototype.goBackToView = function () {
        //this.navCtrl.pop();
    };
    DIFlashCardSessionTest.prototype.getMethodSessionWordDataObject = function (wordDataObject) {
        for (var _i = 0, _a = this.methodInetrventionWordDataArray; _i < _a.length; _i++) {
            var obj = _a[_i];
            if (obj.wordData.wordId == wordDataObject.wordId) {
                return obj;
            }
        }
        return null;
    };
    DIFlashCardSessionTest.prototype.updateMethodSessionWordDataObject = function (methodInterventionWordDataObj, KnownThisTime) {
        //   this.DIServiceObject.printmethodInetrventionWordDataArray(this.methodInetrventionWordDataArray);
        if (methodInterventionWordDataObj.isKnownWord) {
            this.DIServiceObject.removeObjectFromArray(this.methodInetrventionWordDataArray, 0);
            this.methodInetrventionWordDataArray.push(methodInterventionWordDataObj);
        }
        else {
            if (KnownThisTime) {
                console.log("known word");
                if (!methodInterventionWordDataObj.drillmode) {
                    console.log("unKnown item:yes  drill:not mode adding last:");
                    this.DIServiceObject.removeObjectFromArray(this.methodInetrventionWordDataArray, 0);
                    this.methodInetrventionWordDataArray.push(methodInterventionWordDataObj);
                }
                else {
                    //put it after ratio2 steps , now put it after 2 steps
                    methodInterventionWordDataObj.drillmodeKnownCounter++;
                    this.DIServiceObject.removeObjectFromArray(this.methodInetrventionWordDataArray, 0);
                    if (methodInterventionWordDataObj.drillmodeKnownCounter < 3) {
                        console.log("unKnown item:yes   drill mode:yes adding 3rd index: drill mode known time counter:" + methodInterventionWordDataObj.drillmodeKnownCounter);
                        this.DIServiceObject.addObjectToArray(this.methodInetrventionWordDataArray, methodInterventionWordDataObj, this.ratio2 - 1);
                    }
                    else {
                        console.log("unKnown item:yes   drill mode:yes adding last index:");
                        methodInterventionWordDataObj.drillmode = false;
                        methodInterventionWordDataObj.drillmodeKnownCounter = 0;
                        this.methodInetrventionWordDataArray.push(methodInterventionWordDataObj);
                    }
                }
            }
            else {
                if (!methodInterventionWordDataObj.drillmode) {
                    methodInterventionWordDataObj.drillmode = true;
                }
                console.log("unKnown item:yes   drill mode making:yes adding 3rd index:");
                methodInterventionWordDataObj.drillmodeKnownCounter = 0;
                this.DIServiceObject.removeObjectFromArray(this.methodInetrventionWordDataArray, 0);
                this.DIServiceObject.addObjectToArray(this.methodInetrventionWordDataArray, methodInterventionWordDataObj, this.ratio2 - 1);
            }
        }
    };
    DIFlashCardSessionTest.prototype.textToSpeechWordData = function (text) {
        this.flashcardService.textToSpeechWordData(text, this.tts, this.showAnswer);
    };
    DIFlashCardSessionTest.prototype.getAnswer = function (equation) {
        return this.flashcardService.getAnswer(equation);
    };
    DIFlashCardSessionTest.prototype.flipCard = function () {
        this.showAnswer = !this.showAnswer;
    };
    DIFlashCardSessionTest.prototype.convertTextToMath = function (mathString) {
        var convertTextToMathResult = this.flashcardService.convertTextToMath(mathString);
        this.result = convertTextToMathResult.result;
        this.operation = convertTextToMathResult.operation;
        this.number1 = convertTextToMathResult.number1;
        this.number2 = convertTextToMathResult.number2;
    };
    DIFlashCardSessionTest = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-flashcard',template:/*ion-inline-start:"C:\mystuff\master\AcademicInvertionAPP\backup\htmlDemos\backup\1\AIAPPv4.0\src\htmlpages\flashcard\flashcard.html"*/'<ion-header>\n\n  <ion-navbar>\n\n    <!-- <ion-title>{{TestTitle}} : {{currentCardNumber}}/{{totalCardNumber}}</ion-title> -->\n\n  </ion-navbar>\n\n</ion-header>\n\n\n\n<ion-content padding>\n\n  <ion-grid style="height: 50%;padding-top: 10%;" *ngIf="result.length != 2">\n\n    <ion-row justify-content-center align-items-center style="height: 100%">\n\n      <h3 style="font-size: 150px;"> {{wordDataObject.wordText}} </h3>\n\n    </ion-row>\n\n  </ion-grid>\n\n\n\n  <ion-grid style="height: 50%;padding-top: 10%;width:40%;" *ngIf="result.length == 2">\n\n    <ion-row justify-content-center align-items-center style="float: right">\n\n      <ion-col></ion-col>\n\n      <ion-col>\n\n        <h3 style="font-size: 80px;"> {{number1}} </h3>\n\n      </ion-col>\n\n    </ion-row>\n\n    <ion-row justify-content-center align-items-center style="float: right">\n\n      <ion-col>\n\n        <h3 style="font-size: 80px;"> {{operation}} </h3>\n\n      </ion-col>\n\n      <ion-col>\n\n        <h3 style="font-size: 80px;"> {{number2}} </h3>\n\n      </ion-col>\n\n    </ion-row>\n\n    <ion-row style="float: right">\n\n      <div class="horizontal-black-line"></div>\n\n    </ion-row>\n\n    <ion-row *ngIf="showAnswer" justify-content-center align-items-center style="float: right">\n\n      <ion-col></ion-col>\n\n      <ion-col>\n\n        <h3 style="font-size: 80px;"> {{getAnswer(wordDataObject.wordText)}} </h3>\n\n      </ion-col>\n\n    </ion-row>\n\n  </ion-grid>\n\n</ion-content>\n\n\n\n<ion-content padding>\n\n  <ion-grid style="padding-top: 40%;">\n\n    <ion-row justify-content-center align-items-center style="height: 100%">\n\n      <ion-col class="center-col-item" style="max-width: 30%;">\n\n        <div class="img-circular-green" (click)="greenCircleClick()">\n\n        </div>\n\n      </ion-col>\n\n      <ion-col class="center-col-item" style="max-width: 30%;">\n\n        <div class="img-circular-red" (click)="redCircleClick()">\n\n        </div>\n\n      </ion-col>\n\n    </ion-row>\n\n  </ion-grid>\n\n\n\n  <ion-grid style="height: 10%;padding-top: 10%;">\n\n    <ion-row justify-content-center align-items-right style="height: 100%">\n\n      <ion-icon name="volume-up" style="height: 20%;top: 20%;right: 20%;position: absolute;font-size: xx-large;"\n\n        (click)="textToSpeechWordData(wordDataObject.wordText)"></ion-icon>\n\n    </ion-row>\n\n  </ion-grid>\n\n\n\n  <ion-grid style="height: 10%;padding-top: 10%;" *ngIf="wordType == 1">\n\n    <ion-row justify-content-center align-items-right style="height: 100%">\n\n      <ion-icon name="sync" style="height: 20%;top: 20%;left: 20%;position: absolute;font-size: xx-large;"\n\n        (click)="flipCard()"></ion-icon>\n\n    </ion-row>\n\n  </ion-grid>\n\n</ion-content>'/*ion-inline-end:"C:\mystuff\master\AcademicInvertionAPP\backup\htmlDemos\backup\1\AIAPPv4.0\src\htmlpages\flashcard\flashcard.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__ionic_native_file__["a" /* File */],
            __WEBPACK_IMPORTED_MODULE_4_ionic_angular__["h" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_4_ionic_angular__["i" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_4_ionic_angular__["l" /* ViewController */],
            __WEBPACK_IMPORTED_MODULE_3__ionic_storage__["b" /* Storage */],
            __WEBPACK_IMPORTED_MODULE_2__ionic_native_text_to_speech__["a" /* TextToSpeech */]])
    ], DIFlashCardSessionTest);
    return DIFlashCardSessionTest;
}());

//# sourceMappingURL=DIFlashCardSessionTest.js.map

/***/ }),

/***/ 1369:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DirectInstructionServices; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__models_methodInterventionWordData__ = __webpack_require__(110);

var DirectInstructionServices = /** @class */ (function () {
    function DirectInstructionServices() {
    }
    DirectInstructionServices.prototype.makeSessionList = function (knownList, unKnownList, ratio1, ratio2) {
        var methodInterventionWordDataList = [];
        var i = 0;
        var j = 0;
        while (i < ratio1 && j < ratio2) {
            var methodInterventionWordDataObj = new __WEBPACK_IMPORTED_MODULE_0__models_methodInterventionWordData__["a" /* MethodInterventionWordData */]();
            methodInterventionWordDataObj.wordData = knownList[i++];
            methodInterventionWordDataObj.isKnownWord = true;
            methodInterventionWordDataList.push(methodInterventionWordDataObj);
            // methodInterventionWordDataObj = new methodInterventionWordData();
            // methodInterventionWordDataObj.wordData=knownList[i++];
            // methodInterventionWordDataObj.isKnownWord=true;
            // methodInterventionWordDataList.push(methodInterventionWordDataObj)
            methodInterventionWordDataObj = new __WEBPACK_IMPORTED_MODULE_0__models_methodInterventionWordData__["a" /* MethodInterventionWordData */]();
            methodInterventionWordDataObj.wordData = unKnownList[j++];
            methodInterventionWordDataObj.isKnownWord = false;
            methodInterventionWordDataList.push(methodInterventionWordDataObj);
        }
        return methodInterventionWordDataList;
    };
    DirectInstructionServices.prototype.shuffle = function (o) {
        for (var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x)
            ;
        return o;
    };
    DirectInstructionServices.prototype.removeObjectFromArray = function (methodInetrventionWordDataArray, index) {
        var remove = false;
        if (index !== -1) {
            console.log("index:" + index);
            methodInetrventionWordDataArray.splice(index, 1);
            remove = true;
        }
        return remove;
    };
    DirectInstructionServices.prototype.addObjectToArray = function (methodInetrventionWordDataArray, methodInterventionWordDataObj, index) {
        if (index <= methodInetrventionWordDataArray.length) {
            methodInetrventionWordDataArray.splice(index, 0, methodInterventionWordDataObj);
        }
    };
    DirectInstructionServices.prototype.printmethodInetrventionWordDataArray = function (methodInetrventionWordDataArray) {
        for (var _i = 0, methodInetrventionWordDataArray_1 = methodInetrventionWordDataArray; _i < methodInetrventionWordDataArray_1.length; _i++) {
            var obj = methodInetrventionWordDataArray_1[_i];
            console.log("word: " + obj.wordData.wordText + " isKown: " + obj.isKnownWord + " drillmode: " + obj.drillmode + " drillCounter: " + obj.drillmodeKnownCounter);
        }
    };
    return DirectInstructionServices;
}());

//# sourceMappingURL=DirectInstructionSevice.js.map

/***/ }),

/***/ 1370:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return FlashCardIntervetion; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ionic_native_file__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__models_wordData__ = __webpack_require__(25);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__models_student__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__models_methodInterventionWordData__ = __webpack_require__(110);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__models_methodIntervetionSession__ = __webpack_require__(98);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__ionic_storage__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__services_wordServices__ = __webpack_require__(109);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__ionic_native_text_to_speech__ = __webpack_require__(118);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__models_organizationDetails__ = __webpack_require__(35);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__services_flashcardService__ = __webpack_require__(149);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};












var FlashCardIntervetion = /** @class */ (function () {
    function FlashCardIntervetion(file, navCtrl, navParams, viewCtrl, storage, tts) {
        this.file = file;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.viewCtrl = viewCtrl;
        this.storage = storage;
        this.tts = tts;
        this.studentObject = new __WEBPACK_IMPORTED_MODULE_4__models_student__["a" /* Student */]();
        this.methodIndex = 0;
        this.wordDataObject = new __WEBPACK_IMPORTED_MODULE_3__models_wordData__["a" /* WordData */]();
        this.wordDataArray = [new __WEBPACK_IMPORTED_MODULE_3__models_wordData__["a" /* WordData */]()];
        this.sessionCounter = 0;
        this.TestTitle = "Test Title";
        this.currentCardNumber = 0;
        this.totalCardNumber = 0;
        this.testIndex = 0;
        this.testFlag = 0; // testType="assessment" :0 ; "IncrementRehrsal" :1
        //private studentObject:Student;
        this.methodInetrventionWordDataArray = [new __WEBPACK_IMPORTED_MODULE_5__models_methodInterventionWordData__["a" /* MethodInterventionWordData */]()];
        this.methodInterventionWordDataObj = new __WEBPACK_IMPORTED_MODULE_5__models_methodInterventionWordData__["a" /* MethodInterventionWordData */]();
        this.methodSessionObject = new __WEBPACK_IMPORTED_MODULE_6__models_methodIntervetionSession__["a" /* MethodSession */]();
        this.startDate = new Date();
        this.endDate = new Date();
        this.wordServiceObj = new __WEBPACK_IMPORTED_MODULE_8__services_wordServices__["a" /* WordServices */]();
        this.wordType = 0;
        this.organizationDetails = new __WEBPACK_IMPORTED_MODULE_10__models_organizationDetails__["a" /* OrganizationDetails */]();
        this.showAnswer = false;
        this.flashcardService = new __WEBPACK_IMPORTED_MODULE_11__services_flashcardService__["a" /* FlashcardService */]();
        this.number1 = "123";
        this.number2 = "1";
        this.operation = "+";
        this.result = [];
    }
    FlashCardIntervetion.prototype.ionViewDidLoad = function () {
        console.log("onviewdidload");
    };
    FlashCardIntervetion.prototype.greenCircleClick = function () {
        this.showAnswer = false;
        this.methodInterventionWordDataObj = this.getMethodSessionWordDataObject(this.wordDataObject);
        if (this.methodInterventionWordDataObj != null) {
            this.methodInterventionWordDataObj.knownTime++;
            this.methodInterventionWordDataObj.totalAskedTime++;
        }
        this.updateMethodSessionWordDataObject(this.methodInterventionWordDataObj);
        if (this.currentCardNumber + 1 <= this.wordDataArray.length) {
            this.wordDataObject = this.wordDataArray[this.currentCardNumber];
            this.convertTextToMath(this.wordDataObject.wordText);
            this.currentCardNumber++;
        }
        else {
            console.log("else:green");
            this.updateAllObjects();
            //    this.goBackToView();
        }
    };
    FlashCardIntervetion.prototype.redCircleClick = function () {
        this.showAnswer = false;
        this.methodInterventionWordDataObj = this.getMethodSessionWordDataObject(this.wordDataObject);
        if (this.methodInterventionWordDataObj != null) {
            this.methodInterventionWordDataObj.totalAskedTime++;
        }
        this.updateMethodSessionWordDataObject(this.methodInterventionWordDataObj);
        if (this.currentCardNumber + 1 <= this.wordDataArray.length) {
            this.wordDataObject = this.wordDataArray[this.currentCardNumber];
            this.convertTextToMath(this.wordDataObject.wordText);
            this.currentCardNumber++;
        }
        else {
            console.log("else:red");
            this.updateAllObjects();
            //     this.goBackToView();
        }
    };
    FlashCardIntervetion.prototype.updateAllObjects = function () {
    };
    FlashCardIntervetion.prototype.goBackToView = function () {
        //this.navCtrl.pop();
    };
    FlashCardIntervetion.prototype.getMethodSessionWordDataObject = function (wordDataObject) {
        for (var _i = 0, _a = this.methodInetrventionWordDataArray; _i < _a.length; _i++) {
            var obj = _a[_i];
            if (obj.wordData.wordId == wordDataObject.wordId) {
                return obj;
            }
        }
        return null;
    };
    FlashCardIntervetion.prototype.updateMethodSessionWordDataObject = function (methodInterventionWordDataObj) {
        for (var _i = 0, _a = this.methodInetrventionWordDataArray; _i < _a.length; _i++) {
            var obj = _a[_i];
            if (obj.wordData.wordId == methodInterventionWordDataObj.wordData.wordId) {
                this.methodInetrventionWordDataArray[this.methodInetrventionWordDataArray.indexOf(obj)] = methodInterventionWordDataObj;
            }
        }
        return null;
    };
    FlashCardIntervetion.prototype.textToSpeechWordData = function (text) {
        this.flashcardService.textToSpeechWordData(text, this.tts, this.showAnswer);
    };
    FlashCardIntervetion.prototype.getAnswer = function (equation) {
        return this.flashcardService.getAnswer(equation);
    };
    FlashCardIntervetion.prototype.flipCard = function () {
        this.showAnswer = !this.showAnswer;
    };
    FlashCardIntervetion.prototype.convertTextToMath = function (mathString) {
        var convertTextToMathResult = this.flashcardService.convertTextToMath(mathString);
        this.result = convertTextToMathResult.result;
        this.operation = convertTextToMathResult.operation;
        this.number1 = convertTextToMathResult.number1;
        this.number2 = convertTextToMathResult.number2;
    };
    FlashCardIntervetion = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-flashcard',template:/*ion-inline-start:"C:\mystuff\master\AcademicInvertionAPP\backup\htmlDemos\backup\1\AIAPPv4.0\src\htmlpages\flashcard\flashcard.html"*/'<ion-header>\n\n  <ion-navbar>\n\n    <!-- <ion-title>{{TestTitle}} : {{currentCardNumber}}/{{totalCardNumber}}</ion-title> -->\n\n  </ion-navbar>\n\n</ion-header>\n\n\n\n<ion-content padding>\n\n  <ion-grid style="height: 50%;padding-top: 10%;" *ngIf="result.length != 2">\n\n    <ion-row justify-content-center align-items-center style="height: 100%">\n\n      <h3 style="font-size: 150px;"> {{wordDataObject.wordText}} </h3>\n\n    </ion-row>\n\n  </ion-grid>\n\n\n\n  <ion-grid style="height: 50%;padding-top: 10%;width:40%;" *ngIf="result.length == 2">\n\n    <ion-row justify-content-center align-items-center style="float: right">\n\n      <ion-col></ion-col>\n\n      <ion-col>\n\n        <h3 style="font-size: 80px;"> {{number1}} </h3>\n\n      </ion-col>\n\n    </ion-row>\n\n    <ion-row justify-content-center align-items-center style="float: right">\n\n      <ion-col>\n\n        <h3 style="font-size: 80px;"> {{operation}} </h3>\n\n      </ion-col>\n\n      <ion-col>\n\n        <h3 style="font-size: 80px;"> {{number2}} </h3>\n\n      </ion-col>\n\n    </ion-row>\n\n    <ion-row style="float: right">\n\n      <div class="horizontal-black-line"></div>\n\n    </ion-row>\n\n    <ion-row *ngIf="showAnswer" justify-content-center align-items-center style="float: right">\n\n      <ion-col></ion-col>\n\n      <ion-col>\n\n        <h3 style="font-size: 80px;"> {{getAnswer(wordDataObject.wordText)}} </h3>\n\n      </ion-col>\n\n    </ion-row>\n\n  </ion-grid>\n\n</ion-content>\n\n\n\n<ion-content padding>\n\n  <ion-grid style="padding-top: 40%;">\n\n    <ion-row justify-content-center align-items-center style="height: 100%">\n\n      <ion-col class="center-col-item" style="max-width: 30%;">\n\n        <div class="img-circular-green" (click)="greenCircleClick()">\n\n        </div>\n\n      </ion-col>\n\n      <ion-col class="center-col-item" style="max-width: 30%;">\n\n        <div class="img-circular-red" (click)="redCircleClick()">\n\n        </div>\n\n      </ion-col>\n\n    </ion-row>\n\n  </ion-grid>\n\n\n\n  <ion-grid style="height: 10%;padding-top: 10%;">\n\n    <ion-row justify-content-center align-items-right style="height: 100%">\n\n      <ion-icon name="volume-up" style="height: 20%;top: 20%;right: 20%;position: absolute;font-size: xx-large;"\n\n        (click)="textToSpeechWordData(wordDataObject.wordText)"></ion-icon>\n\n    </ion-row>\n\n  </ion-grid>\n\n\n\n  <ion-grid style="height: 10%;padding-top: 10%;" *ngIf="wordType == 1">\n\n    <ion-row justify-content-center align-items-right style="height: 100%">\n\n      <ion-icon name="sync" style="height: 20%;top: 20%;left: 20%;position: absolute;font-size: xx-large;"\n\n        (click)="flipCard()"></ion-icon>\n\n    </ion-row>\n\n  </ion-grid>\n\n</ion-content>'/*ion-inline-end:"C:\mystuff\master\AcademicInvertionAPP\backup\htmlDemos\backup\1\AIAPPv4.0\src\htmlpages\flashcard\flashcard.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__ionic_native_file__["a" /* File */],
            __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["h" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["i" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["l" /* ViewController */],
            __WEBPACK_IMPORTED_MODULE_7__ionic_storage__["b" /* Storage */],
            __WEBPACK_IMPORTED_MODULE_9__ionic_native_text_to_speech__["a" /* TextToSpeech */]])
    ], FlashCardIntervetion);
    return FlashCardIntervetion;
}());

//# sourceMappingURL=flashCardIntervention.js.map

/***/ }),

/***/ 1371:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PreSessionResult; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ionic_native_file__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_storage__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ionic_angular__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__models_knownUnknownWordData__ = __webpack_require__(216);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__models_methodIntervetionSession__ = __webpack_require__(98);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__models_myMap__ = __webpack_require__(123);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__models_organizationDetails__ = __webpack_require__(35);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__models_student__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__models_wordData__ = __webpack_require__(25);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__services_IncrementalRehersalService__ = __webpack_require__(195);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__services_MyMapServices__ = __webpack_require__(196);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__services_TraditionalDrillPracticeService__ = __webpack_require__(645);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__services_wordServices__ = __webpack_require__(109);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__studentDashBoard_methodRatioSelection_methodRatioSelection__ = __webpack_require__(646);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__viewPreSessionUnknownWord_viewPreSessionUnKnownWord__ = __webpack_require__(647);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
















var PreSessionResult = /** @class */ (function () {
    function PreSessionResult(file, navCtrl, navParams, storage, modalCtrl) {
        this.file = file;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.storage = storage;
        this.modalCtrl = modalCtrl;
        this.error = "Error Message";
        this.studentObject = new __WEBPACK_IMPORTED_MODULE_8__models_student__["a" /* Student */]();
        this.sessionCounter = 0;
        this.methodIndex = 0;
        this.preSessionWordDataArray = [];
        this.test1Map = new __WEBPACK_IMPORTED_MODULE_6__models_myMap__["a" /* MyMap */]();
        this.test2Map = new __WEBPACK_IMPORTED_MODULE_6__models_myMap__["a" /* MyMap */]();
        this.incrementalRehrsalService = new __WEBPACK_IMPORTED_MODULE_10__services_IncrementalRehersalService__["a" /* IncrementalRehersalService */]();
        this.wordServiceObj = new __WEBPACK_IMPORTED_MODULE_13__services_wordServices__["a" /* WordServices */]();
        this.tempUnknownList = [new __WEBPACK_IMPORTED_MODULE_9__models_wordData__["a" /* WordData */]()];
        this.testWordDataList = [new __WEBPACK_IMPORTED_MODULE_9__models_wordData__["a" /* WordData */]()];
        this.incrementalRehersalServiceObject = new __WEBPACK_IMPORTED_MODULE_10__services_IncrementalRehersalService__["a" /* IncrementalRehersalService */]();
        this.methodSessionObject = new __WEBPACK_IMPORTED_MODULE_5__models_methodIntervetionSession__["a" /* MethodSession */]();
        //private remainUnknownWordArray:Array<WordData>=[];
        this.dimethodStart = true;
        this.ratio1 = 0;
        this.ratio2 = 0;
        this.oldUnknownWordData = [];
        this.traditionalDrillPracticeService = new __WEBPACK_IMPORTED_MODULE_12__services_TraditionalDrillPracticeService__["a" /* TraditionalDrillPracticeService */]();
        this.organizationDetails = new __WEBPACK_IMPORTED_MODULE_7__models_organizationDetails__["a" /* OrganizationDetails */]();
        this.maxRatio2 = 0;
        this.maxRatio1 = 0;
        this.wordType = 0;
        this.myConstructorMethod();
    }
    PreSessionResult.prototype.ionViewWillEnter = function () {
    };
    PreSessionResult.prototype.myConstructorMethod = function () {
    };
    PreSessionResult.prototype.refreshObjects = function (ratio1, ratio2) {
        this.ratio1 = ratio1;
        this.ratio2 = ratio2;
        this.methodSessionObject.unknownWordList = [];
        this.oldUnknownWordData = [];
        console.log("session :" + this.sessionCounter);
        if (this.sessionCounter == 0) {
            this.balanceRatios(); // do everyTime {
            // later
            this.addUnknownWordDataListToMethod();
            console.log("un length:", this.methodSessionObject.unknownWordList.length);
            var i = 0;
            var myMapServiceObject = new __WEBPACK_IMPORTED_MODULE_11__services_MyMapServices__["a" /* MyMApServices */]();
            for (var _i = 0, _a = this.methodSessionObject.unknownWordList; _i < _a.length; _i++) {
                var uk2MapObj = _a[_i];
                if (i > this.ratio2)
                    break;
                myMapServiceObject.setObject(this.methodSessionObject.retentionWordList, uk2MapObj, false);
                myMapServiceObject.setObject(this.methodSessionObject.controlItems, uk2MapObj, false);
                i++;
            }
        }
        else if (this.sessionCounter >= 1) {
            i = 0;
            for (var _b = 0, _c = this.preSessionWordDataArray; _b < _c.length; _b++) {
                var presetObj = _c[_b];
                console.log("preset knonw:" + presetObj.isKnownWord);
                if (!presetObj.isKnownWord) {
                    if (i < this.ratio2)
                        this.methodSessionObject.unknownWordList.push(presetObj.wordData);
                    else
                        this.oldUnknownWordData.push(presetObj.wordData);
                    i++;
                }
                else {
                    if (this.studentObject.studentWordDetailsArray[this.wordType].knownUnknownArrayList == null)
                        this.studentObject.studentWordDetailsArray[this.wordType].knownUnknownArrayList = [];
                    if (this.studentObject.studentWordDetailsArray[this.wordType].newKnownUnknownArrayList == null)
                        this.studentObject.studentWordDetailsArray[this.wordType].newKnownUnknownArrayList = [];
                    // this.wordServiceObj.removeWordFromArray(this.studentObject.knownUnknownArrayList,presetObj.wordData);
                    this.wordServiceObj.removeKnownUnKnownWordFromArray(this.studentObject.studentWordDetailsArray[this.wordType].newKnownUnknownArrayList, presetObj.wordData);
                    var knownUnknownWordDataObject = new __WEBPACK_IMPORTED_MODULE_4__models_knownUnknownWordData__["a" /* KnownUnknownWordData */]();
                    knownUnknownWordDataObject.wordData = presetObj.wordData;
                    knownUnknownWordDataObject.methodIndex = this.methodIndex;
                    knownUnknownWordDataObject.wordId = presetObj.wordData.wordId;
                    knownUnknownWordDataObject.methodName = this.studentObject.studentWordDetailsArray[this.wordType].methodArray[this.methodIndex].methodName;
                    knownUnknownWordDataObject.postAssessmentCounter = 0;
                    this.studentObject.studentWordDetailsArray[this.wordType].newKnownUnknownArrayList.push(knownUnknownWordDataObject);
                }
            }
            console.log(" me un:" + this.methodSessionObject.unknownWordList.length);
            console.log(" stu un:" + this.studentObject.studentWordDetailsArray[this.wordType].unKnownArrayList.length);
            console.log(" old un:" + this.oldUnknownWordData.length);
            this.maxRatio2 = this.methodSessionObject.unknownWordList.length + this.studentObject.studentWordDetailsArray[this.wordType].unKnownArrayList.length + this.oldUnknownWordData.length;
            this.balanceRatios();
            var j = 0;
            while (i < this.ratio2 && j < this.studentObject.studentWordDetailsArray[this.wordType].unKnownArrayList.length) {
                this.methodSessionObject.unknownWordList.push(this.studentObject.studentWordDetailsArray[this.wordType].unKnownArrayList[j++]);
                i++;
            }
        }
        this.addKnownWordDataListToMethod();
        console.log("r1:" + this.ratio1 + "  r2:" + this.ratio2 + "  kn.leng:" + this.methodSessionObject.knownWordList.length);
        this.goBackToView();
    };
    PreSessionResult.prototype.updatePreSessionResultTest = function () {
        this.preSessionWordDataArray = this.incrementalRehrsalService.compareAssessment(this.test1Map, this.test2Map, this.preSessionWordDataArray);
    };
    PreSessionResult.prototype.startSession = function () {
    };
    PreSessionResult.prototype.getWordDataList = function () {
        console.log("  get word list r1:" + this.ratio1 + "  r2:" + this.ratio2);
        if (this.methodIndex == 0) {
            this.testWordDataList = this.incrementalRehersalServiceObject.startSessionTest(this.methodSessionObject, this.ratio1, this.ratio2);
        }
        else if (this.methodIndex == 1 && this.methodSessionObject.unknownWordList.length <= this.ratio2) {
            this.dimethodStart = true;
        }
        else if (this.methodIndex == 2) {
            this.testWordDataList = this.traditionalDrillPracticeService.getWorDataList(this.methodSessionObject, this.ratio2, this.ratio1);
        }
        else if (this.methodIndex == 3) {
            this.testWordDataList = this.traditionalDrillPracticeService.getWorDataList(this.methodSessionObject, this.ratio2, this.ratio1);
        }
    };
    PreSessionResult.prototype.goBackToView = function () {
        if (this.methodSessionObject != null) {
            this.storage.set('methodSessionObject', JSON.stringify({ methodSessionObject: this.methodSessionObject }));
        }
        if (this.studentObject != null) {
            this.storage.set('studentObject', JSON.stringify({ studentObject: this.studentObject }));
        }
    };
    PreSessionResult.prototype.showModalWord = function (wordDataObj) {
        var profileModal = this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_15__viewPreSessionUnknownWord_viewPreSessionUnKnownWord__["a" /* ViewPreSessionUnKnownWord */], {
            wordDataObject: wordDataObj
        }, {
            cssClass: 'update-profile-modal'
        });
        profileModal.present();
    };
    PreSessionResult.prototype.updateRatio = function () {
        var _this = this;
        var profileModal = this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_14__studentDashBoard_methodRatioSelection_methodRatioSelection__["a" /* MethodRatioSelection */], {
            methodIndex: this.methodIndex,
            studentObject: this.studentObject,
            organizationDetailsUID: this.organizationDetails.organizationDetailsUID,
            maxRatio2: this.maxRatio2,
            wordType: this.wordType
        }, {
            cssClass: 'update-profile-modal'
        });
        profileModal.present();
        profileModal.onDidDismiss(function (data) {
            if (data != null) {
                var updated = data.updated;
                console.log("updated r1:" + data.ratio1 + "  r2:" + data.ratio2);
                if (updated)
                    _this.refreshObjects(data.ratio1, data.ratio2);
            }
        });
    };
    PreSessionResult.prototype.startDirectFirstSession = function (methodIndex) {
    };
    PreSessionResult.prototype.addKnownWordDataListToMethod = function () {
    };
    PreSessionResult.prototype.addUnknownWordDataListToMethod = function () {
        var j = 0;
        if (this.methodSessionObject.unknownWordList == null) {
            this.methodSessionObject.unknownWordList = [];
        }
        while (j < this.ratio2) {
            this.methodSessionObject.unknownWordList.push(this.studentObject.studentWordDetailsArray[this.wordType].unKnownArrayList[j]);
            j++;
        }
    };
    PreSessionResult.prototype.balanceRatios = function () {
        console.log("balance  maxr1:" + this.maxRatio1 + "  max r2:" + this.maxRatio2);
        if (this.methodIndex == 1) {
            var minMaxRatios = Math.min(this.maxRatio2, this.maxRatio1);
            if (this.ratio1 > minMaxRatios) {
                this.ratio1 = minMaxRatios;
            }
            if (this.ratio2 > minMaxRatios) {
                this.ratio2 = minMaxRatios;
            }
            if (this.ratio1 != this.ratio2) {
                this.ratio1 = Math.min(this.ratio1, this.ratio2);
                this.ratio2 = this.ratio1;
            }
            this.updateRatio1();
            this.updateRatio2();
        }
        else {
            if (this.methodIndex == 0) {
                if (this.ratio1 > this.maxRatio1) {
                    this.ratio1 = this.maxRatio1;
                    this.updateRatio1();
                }
            }
            if (this.ratio2 > this.maxRatio2) {
                this.ratio2 = this.maxRatio2;
                this.updateRatio2();
            }
        }
    };
    PreSessionResult.prototype.updateRatio2 = function () {
    };
    PreSessionResult.prototype.updateRatio1 = function () {
    };
    PreSessionResult = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-preSessionResult',template:/*ion-inline-start:"C:\mystuff\master\AcademicInvertionAPP\backup\htmlDemos\backup\1\AIAPPv4.0\src\components\methodSessions\flashCardTest\preeSessionResult\preSessionResult.html"*/'<ion-header>\n\n    <ion-navbar>\n\n        <button ion-button menuToggle>\n\n            <ion-icon name="menu"></ion-icon>\n\n        </button>\n\n        <ion-title>Pre-Session Results : Session {{sessionCounter}}</ion-title>\n\n    </ion-navbar>\n\n</ion-header>\n\n\n\n<ion-content padding="\'true\'" scroll="false" class="has-header">\n\n    <ion-grid style="height: 20%">\n\n        <ion-row justify-content-center align-items-center style="height: 100%">\n\n            <h3> {{studentObject.studentData.firstName}} {{studentObject.studentData.lastName}} </h3>\n\n        </ion-row>\n\n    </ion-grid>\n\n\n\n    <div *ngIf="error" class="error-message">{{error}}</div>\n\n    <ion-content padding="\'true\'" scroll="false" class="has-header">\n\n        <ion-card align-items-center>\n\n\n\n            <ion-item *ngIf="sessionCounter > 0 " align-items-center>\n\n                <ion-row class="ion-title" style="background-color: silver;">\n\n                    <ion-col>Words</ion-col>\n\n                    <ion-col *ngIf="sessionCounter > 1 "> Previous Test Result </ion-col>\n\n                    <ion-col>Current Test result</ion-col>\n\n                    <ion-col *ngIf="sessionCounter > 1 ">Notes:</ion-col>\n\n                </ion-row>\n\n\n\n                <ion-item *ngFor="let preSessionWordDataObj of preSessionWordDataArray">\n\n                    <ion-row>\n\n                        <ion-col>{{preSessionWordDataObj.wordData.wordText}}</ion-col>\n\n                        <ion-col *ngIf="sessionCounter > 1 && preSessionWordDataObj.test1Known">Correct</ion-col>\n\n                        <ion-col *ngIf="sessionCounter > 1 && !preSessionWordDataObj.test1Known">Incorrect</ion-col>\n\n                        <ion-col *ngIf="preSessionWordDataObj.test2Known">Correct</ion-col>\n\n                        <ion-col *ngIf="!preSessionWordDataObj.test2Known">Incorrect</ion-col>\n\n                        <ion-col *ngIf="sessionCounter > 1 ">{{preSessionWordDataObj.notes}}</ion-col>\n\n                    </ion-row>\n\n                </ion-item>\n\n\n\n            </ion-item>\n\n\n\n            <ion-item justify-content-center align-items-center>\n\n                <ion-row class="col col-center text-center">\n\n                    <ion-col class="ion-title" style="background-color: silver;" align-items-center col-2>Unknown\n\n                    </ion-col>\n\n                    <ion-col *ngFor="let wordDataObj of methodSessionObject.unknownWordList">\n\n                        <ion-col align-items-center (click)="showModalWord(wordDataObj)"> {{wordDataObj.wordText}}\n\n                        </ion-col>\n\n                    </ion-col>\n\n                </ion-row>\n\n                <br>\n\n                <ion-row *ngIf="methodIndex < 2 " class="col col-center text-center">\n\n                    <ion-col class="ion-title" style="background-color: silver;" align-items-center col-2>Known Words\n\n                    </ion-col>\n\n                    <ion-col *ngFor="let wordDataObj of methodSessionObject.knownWordList">\n\n                        <ion-col align-items-center> {{wordDataObj.wordText}}</ion-col>\n\n                    </ion-col>\n\n                </ion-row>\n\n\n\n            </ion-item>\n\n\n\n        </ion-card>\n\n\n\n        <div class="ion-content">\n\n            <ion-grid style="height: 100%">\n\n                <ion-row justify-content-center align-items-center style="height: 100%">\n\n\n\n                    <ion-item>\n\n                        <button ion-button class="submit-btn" full (click)="updateRatio()" *ngIf="wordType == 0">Update\n\n                            WordList </button>\n\n                        <button ion-button class="submit-btn" full (click)="updateRatio()" *ngIf="wordType != 0">Update\n\n                            Math Facts </button>\n\n                    </ion-item>\n\n\n\n                    <ion-item *ngIf="ratio2 > 0 && ratio1 > 0">\n\n                        <button ion-button class="submit-btn" full (click)="startSession()">Start Session </button>\n\n\n\n                    </ion-item>\n\n                </ion-row>\n\n            </ion-grid>\n\n        </div>\n\n    </ion-content>\n\n</ion-content>'/*ion-inline-end:"C:\mystuff\master\AcademicInvertionAPP\backup\htmlDemos\backup\1\AIAPPv4.0\src\components\methodSessions\flashCardTest\preeSessionResult\preSessionResult.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__ionic_native_file__["a" /* File */],
            __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["h" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["i" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_2__ionic_storage__["b" /* Storage */],
            __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["f" /* ModalController */]])
    ], PreSessionResult);
    return PreSessionResult;
}());

//# sourceMappingURL=preSessionResult.js.map

/***/ }),

/***/ 1372:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PreSessionFlashCard; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ionic_native_file__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__models_wordData__ = __webpack_require__(25);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__models_student__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__models_methodIntervetionSession__ = __webpack_require__(98);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__models_myMap__ = __webpack_require__(123);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__services_MyMapServices__ = __webpack_require__(196);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__ionic_storage__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__services_arrayService__ = __webpack_require__(197);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__ionic_native_text_to_speech__ = __webpack_require__(118);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__services_flashcardService__ = __webpack_require__(149);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};












var PreSessionFlashCard = /** @class */ (function () {
    function PreSessionFlashCard(file, navCtrl, navParams, viewCtrl, storage, tts) {
        this.file = file;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.viewCtrl = viewCtrl;
        this.storage = storage;
        this.tts = tts;
        this.studentObject = new __WEBPACK_IMPORTED_MODULE_4__models_student__["a" /* Student */]();
        this.wordDataObject = new __WEBPACK_IMPORTED_MODULE_3__models_wordData__["a" /* WordData */]();
        this.wordDataArray = [];
        this.TestTitle = "";
        this.currentCardNumber = 0;
        this.totalCardNumber = 0;
        this.testIndex = 0;
        this.sessionControlItems = new __WEBPACK_IMPORTED_MODULE_6__models_myMap__["a" /* MyMap */]();
        this.methodSessionObject = new __WEBPACK_IMPORTED_MODULE_5__models_methodIntervetionSession__["a" /* MethodSession */]();
        this.myMapServiceObject = new __WEBPACK_IMPORTED_MODULE_7__services_MyMapServices__["a" /* MyMApServices */]();
        this.arrayService = new __WEBPACK_IMPORTED_MODULE_9__services_arrayService__["a" /* ArrayService */]();
        this.wordType = 0;
        this.showAnswer = false;
        this.flashcardService = new __WEBPACK_IMPORTED_MODULE_11__services_flashcardService__["a" /* FlashcardService */]();
        this.number1 = "";
        this.number2 = "";
        this.operation = "";
        this.result = [];
    }
    PreSessionFlashCard.prototype.greenCircleClick = function () {
        this.showAnswer = false;
        this.myMapServiceObject.setObject(this.sessionControlItems, this.wordDataObject, true);
        if (this.currentCardNumber + 1 <= this.wordDataArray.length) {
            this.wordDataObject = this.wordDataArray[this.currentCardNumber];
            this.convertTextToMath(this.wordDataObject.wordText);
            this.currentCardNumber++;
        }
        else {
            console.log("else:green");
            this.goBackToView();
            this.gotopreSessionResult();
        }
    };
    PreSessionFlashCard.prototype.redCircleClick = function () {
        this.showAnswer = false;
        this.myMapServiceObject.setObject(this.sessionControlItems, this.wordDataObject, false);
        if (this.currentCardNumber + 1 <= this.wordDataArray.length) {
            this.wordDataObject = this.wordDataArray[this.currentCardNumber];
            this.convertTextToMath(this.wordDataObject.wordText);
            this.currentCardNumber++;
        }
        else {
            console.log("else:red");
            this.gotopreSessionResult();
        }
    };
    PreSessionFlashCard.prototype.gotopreSessionResult = function () {
    };
    PreSessionFlashCard.prototype.goBackToView = function () {
    };
    PreSessionFlashCard.prototype.textToSpeechWordData = function (text) {
        this.flashcardService.textToSpeechWordData(text, this.tts, this.showAnswer);
    };
    PreSessionFlashCard.prototype.getAnswer = function (equation) {
        return this.flashcardService.getAnswer(equation);
    };
    PreSessionFlashCard.prototype.flipCard = function () {
        this.showAnswer = !this.showAnswer;
    };
    PreSessionFlashCard.prototype.convertTextToMath = function (mathString) {
        var convertTextToMathResult = this.flashcardService.convertTextToMath(mathString);
        this.result = convertTextToMathResult.result;
        this.operation = convertTextToMathResult.operation;
        this.number1 = convertTextToMathResult.number1;
        this.number2 = convertTextToMathResult.number2;
    };
    PreSessionFlashCard = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-blueflashcard',template:/*ion-inline-start:"C:\mystuff\master\AcademicInvertionAPP\backup\htmlDemos\backup\1\AIAPPv4.0\src\htmlpages\blueflashcard\blueflashcard.html"*/'<ion-header>\n\n  <ion-navbar>\n\n    <!-- <ion-title>{{TestTitle}} : {{currentCardNumber}}/{{totalCardNumber}}</ion-title> -->\n\n  </ion-navbar>\n\n</ion-header>\n\n\n\n<ion-content padding>\n\n  <ion-grid style="height: 50%;padding-top: 10%;" *ngIf="result.length != 2">\n\n    <ion-row justify-content-center align-items-center style="height: 100%">\n\n      <h3 style="font-size: 150px;"> {{wordDataObject.wordText}} </h3>\n\n    </ion-row>\n\n  </ion-grid>\n\n\n\n  <ion-grid style="height: 50%;padding-top: 10%;width:40%;" *ngIf="result.length == 2">\n\n    <ion-row justify-content-center align-items-center style="float: right">\n\n      <ion-col></ion-col>\n\n      <ion-col>\n\n        <h3 style="font-size: 80px;"> {{number1}} </h3>\n\n      </ion-col>\n\n    </ion-row>\n\n    <ion-row justify-content-center align-items-center style="float: right">\n\n      <ion-col>\n\n        <h3 style="font-size: 80px;"> {{operation}} </h3>\n\n      </ion-col>\n\n      <ion-col>\n\n        <h3 style="font-size: 80px;"> {{number2}} </h3>\n\n      </ion-col>\n\n    </ion-row>\n\n    <ion-row style="float: right">\n\n      <div class="horizontal-black-line"></div>\n\n    </ion-row>\n\n    <ion-row *ngIf="showAnswer" justify-content-center align-items-center style="float: right">\n\n      <ion-col></ion-col>\n\n      <ion-col>\n\n        <h3 style="font-size: 80px;"> {{getAnswer(wordDataObject.wordText)}} </h3>\n\n      </ion-col>\n\n    </ion-row>\n\n  </ion-grid>\n\n</ion-content>\n\n\n\n<ion-content padding>\n\n  <ion-grid style="padding-top: 40%;">\n\n    <ion-row justify-content-center align-items-center style="height: 100%">\n\n      <ion-col class="center-col-item" style="max-width: 30%;">\n\n        <div class="img-circular-blue" (click)="greenCircleClick()">\n\n          <div class="horizontal-line"></div>\n\n        </div>\n\n      </ion-col>\n\n      <ion-col class="center-col-item" style="max-width: 30%;">\n\n        <div class="img-circular-blue" (click)="redCircleClick()">\n\n          <div class="verticle-line"></div>\n\n        </div>\n\n      </ion-col>\n\n    </ion-row>\n\n  </ion-grid>\n\n\n\n  <ion-grid style="height: 10%;padding-top: 10%;">\n\n    <ion-row justify-content-center align-items-right style="height: 100%">\n\n      <ion-icon name="volume-up" style="height: 20%;top: 20%;right: 20%;position: absolute;font-size: xx-large;"\n\n        (click)="textToSpeechWordData(wordDataObject.wordText)"></ion-icon>\n\n    </ion-row>\n\n  </ion-grid>\n\n\n\n  <ion-grid style="height: 10%;padding-top: 10%;" *ngIf="wordType == 1">\n\n    <ion-row justify-content-center align-items-right style="height: 100%">\n\n      <ion-icon name="sync" style="height: 20%;top: 20%;left: 20%;position: absolute;font-size: xx-large;"\n\n        (click)="flipCard()"></ion-icon>\n\n    </ion-row>\n\n  </ion-grid>\n\n</ion-content>'/*ion-inline-end:"C:\mystuff\master\AcademicInvertionAPP\backup\htmlDemos\backup\1\AIAPPv4.0\src\htmlpages\blueflashcard\blueflashcard.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__ionic_native_file__["a" /* File */],
            __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["h" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["i" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["l" /* ViewController */],
            __WEBPACK_IMPORTED_MODULE_8__ionic_storage__["b" /* Storage */],
            __WEBPACK_IMPORTED_MODULE_10__ionic_native_text_to_speech__["a" /* TextToSpeech */]])
    ], PreSessionFlashCard);
    return PreSessionFlashCard;
}());

//# sourceMappingURL=preSessionFlashCard.js.map

/***/ }),

/***/ 1373:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SessionSummary; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ionic_native_file__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_storage__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ionic_angular__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__models_methodInterventionWordData__ = __webpack_require__(110);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__models_organizationDetails__ = __webpack_require__(35);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__models_student__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__models_wordData__ = __webpack_require__(25);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};








var SessionSummary = /** @class */ (function () {
    function SessionSummary(file, navCtrl, navParams, viewCtrl, storage) {
        this.file = file;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.viewCtrl = viewCtrl;
        this.storage = storage;
        this.studentObject = new __WEBPACK_IMPORTED_MODULE_6__models_student__["a" /* Student */]();
        this.methodIndex = 0;
        this.methodName = "Method Name";
        this.totalWordsResponded = 1;
        this.error = "Error Message";
        this.sessionDate = "" + new Date();
        this.sessionCounter = 0;
        this.TestTitle = "Test Title";
        this.sessionWordList = [new __WEBPACK_IMPORTED_MODULE_4__models_methodInterventionWordData__["a" /* MethodInterventionWordData */]()];
        this.completionTime = "1:23:2";
        this.organizationDetails = new __WEBPACK_IMPORTED_MODULE_5__models_organizationDetails__["a" /* OrganizationDetails */]();
        this.oldUnknownWordData = [new __WEBPACK_IMPORTED_MODULE_7__models_wordData__["a" /* WordData */]()];
        //private studentObject:Student;
        this.methodInetrventionWordDataArray = [new __WEBPACK_IMPORTED_MODULE_4__models_methodInterventionWordData__["a" /* MethodInterventionWordData */]()];
        this.wordType = 0;
    }
    SessionSummary.prototype.continue = function () {
        this.updateAllObjects();
    };
    SessionSummary.prototype.moveUnknownWordDataBack = function () {
    };
    SessionSummary.prototype.updateAllObjects = function () {
    };
    SessionSummary.prototype.goBackToView = function () {
        this.navCtrl.pop();
    };
    SessionSummary = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-sessionSummary',template:/*ion-inline-start:"C:\mystuff\master\AcademicInvertionAPP\backup\htmlDemos\backup\1\AIAPPv4.0\src\components\methodSessions\flashCardTest\sessionSummary\sessionSummary.html"*/'<ion-header>\n\n  <ion-navbar>\n\n    <button ion-button menuToggle>\n\n      <ion-icon name="menu"></ion-icon>\n\n    </button>\n\n    <ion-title>Session {{sessionCounter}} Summary</ion-title>\n\n  </ion-navbar>\n\n</ion-header>\n\n\n\n<div *ngIf="error" class="error-message">{{error}}</div>\n\n<ion-content padding="\'true\'" scroll="false" class="has-header">\n\n  <ion-card>\n\n\n\n    <ion-row justify-content-center align-items-center style="height: 100%">\n\n      <ion-col>\n\n        <button ion-button class="submit-btn" full (click)="continue()">Continue</button>\n\n      </ion-col>\n\n\n\n    </ion-row>\n\n\n\n    <ion-row justify-content-center align-items-center style="height: 100%">\n\n      <ion-col class="ion-title" style="font-weight: bold;"> Student Name: </ion-col>\n\n      <ion-col>\n\n        <h3> {{studentObject.studentData.firstName}} {{studentObject.studentData.lastName}} </h3>\n\n      </ion-col>\n\n\n\n      <ion-col class="ion-title" style="font-weight: bold;"> Date : </ion-col>\n\n      <ion-col>\n\n        <ion-item>\n\n          <ion-datetime displayFormat="MMM DD, YYYY HH:mm" [(ngModel)]="sessionDate"></ion-datetime>\n\n        </ion-item>\n\n\n\n      </ion-col>\n\n\n\n    </ion-row>\n\n\n\n    <ion-row justify-content-center align-items-center style="height: 100%">\n\n      <ion-col class="ion-title" style="font-weight: bold;"> Set : </ion-col>\n\n      <ion-col>{{studentObject.studentWordDetailsArray[this.wordType].studentWordType}} </ion-col>\n\n\n\n      <ion-col class="ion-title" style="font-weight: bold;"> Completion Time : </ion-col>\n\n      <ion-col> {{completionTime}} ( hh : mm : ss ) </ion-col>\n\n\n\n    </ion-row>\n\n\n\n    <ion-row justify-content-center align-items-center style="height: 100%">\n\n      <ion-col class="ion-title" style="font-weight: bold;"> Method : </ion-col>\n\n      <ion-col>\n\n        <h3> {{methodName}} </h3>\n\n      </ion-col>\n\n\n\n      <ion-col class="ion-title" style="font-weight: bold;"> Total Opportunities to Respond : </ion-col>\n\n      <ion-col> {{totalWordsResponded}} </ion-col>\n\n\n\n    </ion-row>\n\n\n\n    <ion-item>\n\n      <ion-row class="ion-title" style="background-color: silver;">\n\n        <ion-col>Word Text</ion-col>\n\n        <ion-col> Is Known Word</ion-col>\n\n        <ion-col> Correct Time </ion-col>\n\n        <ion-col> Total Times Asked</ion-col>\n\n\n\n      </ion-row>\n\n      <ion-item *ngFor="let sessionWordObj of sessionWordList">\n\n        <ion-row>\n\n          <ion-col>{{sessionWordObj.wordData.wordText}}</ion-col>\n\n          <ion-col>\n\n            <ion-item *ngIf="sessionWordObj.isKnownWord">\n\n              Known Word\n\n            </ion-item>\n\n            <ion-item *ngIf="!sessionWordObj.isKnownWord">\n\n              Unknown Word\n\n            </ion-item>\n\n          </ion-col>\n\n          <ion-col>{{sessionWordObj.knownTime}} </ion-col>\n\n          <ion-col>{{sessionWordObj.totalAskedTime}} </ion-col>\n\n\n\n        </ion-row>\n\n      </ion-item>\n\n    </ion-item>\n\n\n\n\n\n  </ion-card>\n\n\n\n\n\n</ion-content>'/*ion-inline-end:"C:\mystuff\master\AcademicInvertionAPP\backup\htmlDemos\backup\1\AIAPPv4.0\src\components\methodSessions\flashCardTest\sessionSummary\sessionSummary.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__ionic_native_file__["a" /* File */],
            __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["h" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["i" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["l" /* ViewController */],
            __WEBPACK_IMPORTED_MODULE_2__ionic_storage__["b" /* Storage */]])
    ], SessionSummary);
    return SessionSummary;
}());

//# sourceMappingURL=sessionSummary.js.map

/***/ }),

/***/ 1374:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PreSessionAssessmentView; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__models_student__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__services_IncrementalRehersalService__ = __webpack_require__(195);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__models_wordData__ = __webpack_require__(25);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__models_methodIntervetionSession__ = __webpack_require__(98);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__models_PreSessionAssessmentResultTest__ = __webpack_require__(579);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__ionic_native_file__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__models_myMap__ = __webpack_require__(123);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__ionic_storage__ = __webpack_require__(12);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};










var PreSessionAssessmentView = /** @class */ (function () {
    function PreSessionAssessmentView(file, navCtrl, storage) {
        this.file = file;
        this.navCtrl = navCtrl;
        this.storage = storage;
        this.error = "Error Message";
        this.studentObject = new __WEBPACK_IMPORTED_MODULE_2__models_student__["a" /* Student */]();
        this.sessionCounter = 0;
        this.methodIndex = 0;
        this.preSessionWordDataArray = [new __WEBPACK_IMPORTED_MODULE_6__models_PreSessionAssessmentResultTest__["a" /* PreSessionResultTest */]()];
        this.test1Map = new __WEBPACK_IMPORTED_MODULE_8__models_myMap__["a" /* MyMap */]();
        this.test2Map = new __WEBPACK_IMPORTED_MODULE_8__models_myMap__["a" /* MyMap */];
        this.incrementalRehrsalService = new __WEBPACK_IMPORTED_MODULE_3__services_IncrementalRehersalService__["a" /* IncrementalRehersalService */]();
        this.methodSessionObject = new __WEBPACK_IMPORTED_MODULE_5__models_methodIntervetionSession__["a" /* MethodSession */]();
        this.remainUnknownWordArray = [new __WEBPACK_IMPORTED_MODULE_4__models_wordData__["a" /* WordData */](), new __WEBPACK_IMPORTED_MODULE_4__models_wordData__["a" /* WordData */]()];
        this.ratio1 = 0;
        this.ratio2 = 0;
        this.wordType = 0;
    }
    PreSessionAssessmentView.prototype.updatePreSessionResultTest = function () {
    };
    PreSessionAssessmentView = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-preSessionAssessmentView',template:/*ion-inline-start:"C:\mystuff\master\AcademicInvertionAPP\backup\htmlDemos\backup\1\AIAPPv4.0\src\components\methodSessions\preSessionAssessment\preSessionAssessmentView\preSessionAssessmentView.html"*/'<ion-header>\n\n  <ion-navbar>\n\n    <button ion-button menuToggle>\n\n      <ion-icon name="menu"></ion-icon>\n\n    </button>\n\n    <ion-title>Pre-Session View : Session {{sessionCounter+1}}</ion-title>\n\n  </ion-navbar>\n\n</ion-header>\n\n\n\n<ion-content padding="\'true\'" scroll="false" class="has-header">\n\n  <ion-grid style="height: 20%">\n\n    <ion-row justify-content-center align-items-center style="height: 100%">\n\n      <h3> {{studentObject.studentData.firstName}} {{studentObject.studentData.lastName}} </h3>\n\n    </ion-row>\n\n  </ion-grid>\n\n\n\n  <div *ngIf="error" class="error-message">{{error}}</div>\n\n  <ion-content padding="\'true\'" scroll="false" class="has-header">\n\n    <ion-card align-items-center>\n\n\n\n      <ion-item *ngIf="sessionCounter > 0 " align-items-center>\n\n        <ion-row class="ion-title" style="background-color: silver;">\n\n          <ion-col>Words</ion-col>\n\n          <ion-col *ngIf="sessionCounter > 1 "> Previous Test Result </ion-col>\n\n          <ion-col>Current Test result</ion-col>\n\n          <ion-col *ngIf="sessionCounter > 1 ">Notes:</ion-col>\n\n        </ion-row>\n\n\n\n        <ion-item *ngFor="let preSessionWordDataObj of preSessionWordDataArray">\n\n          <ion-row>\n\n            <ion-col>{{preSessionWordDataObj.wordData.wordText}}</ion-col>\n\n            <ion-col *ngIf="sessionCounter > 1 && preSessionWordDataObj.test1Known">Correct</ion-col>\n\n            <ion-col *ngIf="sessionCounter > 1 && !preSessionWordDataObj.test1Known">Incorrect</ion-col>\n\n            <ion-col *ngIf="preSessionWordDataObj.test2Known">Correct</ion-col>\n\n            <ion-col *ngIf="!preSessionWordDataObj.test2Known">Incorrect</ion-col>\n\n            <ion-col *ngIf="sessionCounter > 1 ">{{preSessionWordDataObj.notes}}</ion-col>\n\n          </ion-row>\n\n        </ion-item>\n\n\n\n      </ion-item>\n\n\n\n      <ion-item justify-content-center align-items-center>\n\n        <ion-row class="col col-center text-center">\n\n          <ion-col class="ion-title" style="background-color: silver;" align-items-center col-2>Unknown Words </ion-col>\n\n          <ion-col *ngFor="let wordDataObj of remainUnknownWordArray">\n\n            <ion-col align-items-center> {{wordDataObj.wordText}}</ion-col>\n\n          </ion-col>\n\n        </ion-row>\n\n        <br>\n\n        <ion-row *ngIf="methodIndex < 2 " class="col col-center text-center">\n\n          <ion-col class="ion-title" style="background-color: silver;" align-items-center col-2>Known Words </ion-col>\n\n          <ion-col *ngFor="let wordDataObj of methodSessionObject.knownWordList">\n\n            <ion-col align-items-center> {{wordDataObj.wordText}}</ion-col>\n\n          </ion-col>\n\n        </ion-row>\n\n\n\n      </ion-item>\n\n\n\n    </ion-card>\n\n\n\n\n\n  </ion-content>\n\n</ion-content>'/*ion-inline-end:"C:\mystuff\master\AcademicInvertionAPP\backup\htmlDemos\backup\1\AIAPPv4.0\src\components\methodSessions\preSessionAssessment\preSessionAssessmentView\preSessionAssessmentView.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_7__ionic_native_file__["a" /* File */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_9__ionic_storage__["b" /* Storage */]])
    ], PreSessionAssessmentView);
    return PreSessionAssessmentView;
}());

//# sourceMappingURL=preSessionAssessmentView.js.map

/***/ }),

/***/ 1375:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SessionList; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_storage__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_file__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__models_student__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__models_methodIntervetionSession__ = __webpack_require__(98);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var SessionList = /** @class */ (function () {
    function SessionList(file, navCtrl, navParams, storage) {
        this.file = file;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.storage = storage;
        this.studentObject = new __WEBPACK_IMPORTED_MODULE_4__models_student__["a" /* Student */]();
        this.methodIndex = 0;
        this.methodName = "";
        this.sessionArray = [new __WEBPACK_IMPORTED_MODULE_5__models_methodIntervetionSession__["a" /* MethodSession */]()];
        this.wordType = 0;
    }
    SessionList.prototype.sessionSummary = function (methodSessionObject) {
    };
    SessionList.prototype.preSessionAssessment = function (methodSessionObject) {
    };
    SessionList = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-sessionList',template:/*ion-inline-start:"C:\mystuff\master\AcademicInvertionAPP\backup\htmlDemos\backup\1\AIAPPv4.0\src\components\methodSessions\sessionsList\sessionList.html"*/'<ion-header>\n\n    <ion-navbar>\n\n      <!-- <button ion-button menuToggle>\n\n        <ion-icon name="menu"></ion-icon>\n\n      </button> -->\n\n      <ion-title>Session Summaries</ion-title>\n\n    </ion-navbar>\n\n    </ion-header>\n\n    \n\n    <ion-content padding="\'true\'" scroll="false" class="has-header" >\n\n        <ion-grid style="height: 20%">\n\n                <ion-row justify-content-center align-items-center style="height: 100%">\n\n                        <h3> {{studentObject.studentData.firstName}}  {{studentObject.studentData.lastName}}  </h3>\n\n                </ion-row>\n\n              </ion-grid>\n\n\n\n    <div *ngIf="error" class="error-message">{{error}}</div>\n\n    <ion-content padding="\'true\'" scroll="false" class="has-header">\n\n        <ion-card>\n\n        \n\n        <br>\n\n            \n\n            <ion-row justify-content-center align-items-center style="height: 100%">\n\n                <ion-col class="ion-title"  style="font-weight: bold;background-color: silver;">  Method : </ion-col>\n\n                <ion-col> <h3 > {{methodName}} </h3> </ion-col>\n\n                        \n\n            </ion-row>\n\n<br><br>\n\n            <ion-item  >\n\n                <ion-row class="ion-title" style="background-color: silver;">\n\n                    <ion-col >Session </ion-col>\n\n                    <ion-col >Date</ion-col>\n\n                    <ion-col></ion-col>\n\n                    <ion-col></ion-col>\n\n                  </ion-row>\n\n                  <ion-item *ngFor="let sessionObj of sessionArray">\n\n                      <ion-row  >\n\n                          <ion-col>\n\n                              Session {{sessionObj.sessionIndex+1}}\n\n                          </ion-col>\n\n                          <ion-col>\n\n                              <ion-item>\n\n                                    <ion-datetime displayFormat="MMM DD, YYYY HH:mm" [(ngModel)]="sessionObj.sessionDate"></ion-datetime>\n\n                              </ion-item>\n\n                                \n\n                              <!-- {{sessionObj.sessionDate}} -->\n\n                          </ion-col>\n\n                          <ion-col>\n\n                            <ion-item (click)="sessionSummary(sessionObj)"  style="color: blue">\n\n                                Session Summaries\n\n                            </ion-item>\n\n                          </ion-col>\n\n                          <ion-col >\n\n                            <ion-item (click)="preSessionAssessment(sessionObj)"  style="color: blue">\n\n                                Session Assessment List\n\n                            </ion-item>\n\n                          </ion-col>\n\n                      </ion-row>\n\n                    </ion-item>\n\n            </ion-item>\n\n\n\n            \n\n          \n\n            \n\n        </ion-card>\n\n\n\n        </ion-content>\n\n      </ion-content>\n\n       \n\n'/*ion-inline-end:"C:\mystuff\master\AcademicInvertionAPP\backup\htmlDemos\backup\1\AIAPPv4.0\src\components\methodSessions\sessionsList\sessionList.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_3__ionic_native_file__["a" /* File */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_2__ionic_storage__["b" /* Storage */]])
    ], SessionList);
    return SessionList;
}());

//# sourceMappingURL=sessionList.js.map

/***/ }),

/***/ 1376:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PreSessionView; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__models_student__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__services_IncrementalRehersalService__ = __webpack_require__(195);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__models_wordData__ = __webpack_require__(25);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__models_methodIntervetionSession__ = __webpack_require__(98);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__ionic_native_file__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__models_myMap__ = __webpack_require__(123);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__services_MyMapServices__ = __webpack_require__(196);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__ionic_storage__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__services_TraditionalDrillPracticeService__ = __webpack_require__(645);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};











var PreSessionView = /** @class */ (function () {
    function PreSessionView(file, navCtrl, navParams, storage) {
        this.file = file;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.storage = storage;
        this.studentObject = new __WEBPACK_IMPORTED_MODULE_2__models_student__["a" /* Student */]();
        this.methodIndex = 0;
        this.methodName = "";
        this.totalSessions = 0;
        this.sessionCounter = 0;
        this.error = "Error Message";
        this.incrementalRehersalServiceObject = new __WEBPACK_IMPORTED_MODULE_3__services_IncrementalRehersalService__["a" /* IncrementalRehersalService */]();
        this.traditionalDrillPracticeService = new __WEBPACK_IMPORTED_MODULE_10__services_TraditionalDrillPracticeService__["a" /* TraditionalDrillPracticeService */]();
        //session details
        this.wordDataList = [new __WEBPACK_IMPORTED_MODULE_4__models_wordData__["a" /* WordData */](), new __WEBPACK_IMPORTED_MODULE_4__models_wordData__["a" /* WordData */]()];
        this.knownWordDataList = [new __WEBPACK_IMPORTED_MODULE_4__models_wordData__["a" /* WordData */](), new __WEBPACK_IMPORTED_MODULE_4__models_wordData__["a" /* WordData */]()];
        this.unKnownWordDataList = [new __WEBPACK_IMPORTED_MODULE_4__models_wordData__["a" /* WordData */](), new __WEBPACK_IMPORTED_MODULE_4__models_wordData__["a" /* WordData */]()];
        this.ratio1 = 0;
        this.ratio2 = 0;
        this.myMapServiceObject = new __WEBPACK_IMPORTED_MODULE_8__services_MyMapServices__["a" /* MyMApServices */]();
        this.methodSessionObject = new __WEBPACK_IMPORTED_MODULE_5__models_methodIntervetionSession__["a" /* MethodSession */]();
        this.previousUnknownArray = [new __WEBPACK_IMPORTED_MODULE_4__models_wordData__["a" /* WordData */](), new __WEBPACK_IMPORTED_MODULE_4__models_wordData__["a" /* WordData */]()];
        this.wordType = 0;
    }
    PreSessionView.prototype.ionViewWillEnter = function () {
        console.log("ionviewwill");
    };
    PreSessionView.prototype.startNextSession = function () {
    };
    PreSessionView.prototype.doAssessmentTest = function (studentObject, methodIndex, sessionCounter) {
    };
    PreSessionView.prototype.goBackToView = function () {
    };
    PreSessionView.prototype.sessionSummaries = function () {
    };
    PreSessionView.prototype.viewGraphData = function () {
    };
    PreSessionView.prototype.setuk1MapValues = function (controlItem, previousUnknownArray) {
        var returnMap = new __WEBPACK_IMPORTED_MODULE_7__models_myMap__["a" /* MyMap */]();
        console.log("control11:");
        this.myMapServiceObject.printMyMap(controlItem);
        for (var _i = 0, previousUnknownArray_1 = previousUnknownArray; _i < previousUnknownArray_1.length; _i++) {
            var wordObj = previousUnknownArray_1[_i];
            if (this.myMapServiceObject.has(controlItem, wordObj)) {
                this.myMapServiceObject.setObject(returnMap, wordObj, this.myMapServiceObject.getValue(controlItem, wordObj));
            }
            else {
                this.myMapServiceObject.setObject(returnMap, wordObj, false);
            }
        }
        return returnMap;
    };
    PreSessionView = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-preSessionData',template:/*ion-inline-start:"C:\mystuff\master\AcademicInvertionAPP\backup\htmlDemos\backup\1\AIAPPv4.0\src\components\methodSessions\viewPreSessionData\preSessionData.html"*/'<ion-header>\n\n    <ion-navbar>\n\n      <button ion-button menuToggle>\n\n        <ion-icon name="menu"></ion-icon>\n\n      </button>\n\n      <ion-title>Session Details</ion-title>\n\n    </ion-navbar>\n\n    </ion-header>\n\n    \n\n    <ion-content padding="\'true\'" scroll="false" class="has-header" >\n\n        <ion-grid style="height: 20%">\n\n                <ion-row justify-content-center align-items-center style="height: 100%">\n\n                        <h3> {{studentObject.studentData.firstName}}  {{studentObject.studentData.lastName}}  </h3>\n\n                </ion-row>\n\n              </ion-grid>\n\n\n\n   \n\n    \n\n    <div *ngIf="error" class="error-message">{{error}}</div>\n\n    <ion-content padding="\'true\'" scroll="false" class="has-header" >\n\n        <ion-card>\n\n        \n\n            <ion-item  >\n\n                <ion-row  >\n\n                    <ion-col class="ion-title"  style="font-weight: bold;">Data Set : </ion-col>\n\n                    <ion-col >{{studentObject.studentWordDetailsArray[this.wordType].studentWordType}}</ion-col>\n\n                  </ion-row>\n\n            </ion-item>\n\n            <ion-item  >\n\n                <ion-row >\n\n                    <ion-col class="ion-title"  style="font-weight: bold;">Method : </ion-col>\n\n                    <ion-col >{{methodName}}</ion-col>\n\n                  </ion-row>\n\n            </ion-item>\n\n            <ion-item  >\n\n                <ion-row  >\n\n                    <ion-col class="ion-title"  style="font-weight: bold;">Pre Assessment Test : </ion-col>\n\n                    <ion-col >{{studentObject.studentWordDetailsArray[wordType].assessmentDataArrayObject.length}} / {{studentObject.studentWordDetailsArray[wordType].totalAssessment}} </ion-col>\n\n                  </ion-row>\n\n            </ion-item>\n\n            <ion-item  >\n\n                <ion-row >\n\n                    <ion-col class="ion-title"  style="font-weight: bold;">Intervention Sessions Completed: </ion-col>\n\n                    <ion-col >{{totalSessions}}</ion-col>\n\n                  </ion-row>\n\n            </ion-item>\n\n                    <ion-item justify-content-center align-items-center >\n\n                <ion-row class="col col-center text-center">\n\n                    <ion-col class="ion-title" style="background-color: silver;" align-items-center col-2>Unknown Words </ion-col>\n\n                    <ion-col *ngFor="let wordDataObj of previousUnknownArray"> \n\n                       <ion-col align-items-center> {{wordDataObj.wordText}}</ion-col>\n\n                    </ion-col>\n\n                </ion-row>\n\n            </ion-item>\n\n        </ion-card>\n\n\n\n        <div class="ion-content" *ngIf="!beginAssessmentDone "  style=" padding-top: 5%">\n\n            <ion-grid style="height: 100%">\n\n              <ion-row justify-content-center align-items-center style="height: 100%">\n\n                      <button ion-button class="submit-btn" full (click)="startNextSession()">Begin Next Session</button>\n\n                </ion-row>\n\n\n\n                <ion-row justify-content-center align-items-center style="height: 100%">\n\n                    <ion-col>\n\n                        <button ion-button class="submit-btn" full (click)="sessionSummaries()">Session Summaries</button>\n\n                    </ion-col>\n\n                    <ion-col>\n\n                        <button ion-button class="submit-btn" full (click)="viewGraphData()">Graph Data</button>\n\n                    </ion-col>\n\n              </ion-row>\n\n            </ion-grid>\n\n          </div>\n\n      </ion-content>\n\n</ion-content>'/*ion-inline-end:"C:\mystuff\master\AcademicInvertionAPP\backup\htmlDemos\backup\1\AIAPPv4.0\src\components\methodSessions\viewPreSessionData\preSessionData.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_6__ionic_native_file__["a" /* File */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_9__ionic_storage__["b" /* Storage */]])
    ], PreSessionView);
    return PreSessionView;
}());

//# sourceMappingURL=preSessionData.js.map

/***/ }),

/***/ 1377:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PostAssessmentDashBoard; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ionic_storage__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__models_student__ = __webpack_require__(26);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var PostAssessmentDashBoard = /** @class */ (function () {
    function PostAssessmentDashBoard(navCtrl, storage, navParams) {
        this.navCtrl = navCtrl;
        this.storage = storage;
        this.navParams = navParams;
        this.error = "Error Message";
        this.studentObject = new __WEBPACK_IMPORTED_MODULE_3__models_student__["a" /* Student */]();
        this.lastPostAssessment = 0;
        this.wordType = 0;
    }
    PostAssessmentDashBoard.prototype.ionViewWillEnter = function () {
    };
    PostAssessmentDashBoard.prototype.startNewPostAssessment = function () {
    };
    PostAssessmentDashBoard.prototype.viewPostAssessmentList = function () {
    };
    PostAssessmentDashBoard = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-PostAssessmentDashBoard',template:/*ion-inline-start:"C:\mystuff\master\AcademicInvertionAPP\backup\htmlDemos\backup\1\AIAPPv4.0\src\components\PostAssessment\postAssessmentDashBoard\PostAssessmentDashBoard.html"*/'<ion-header>\n\n    <ion-navbar>\n\n      <button ion-button menuToggle>\n\n        <ion-icon name="menu"></ion-icon>\n\n      </button>\n\n      <ion-title>Post Assessment</ion-title>\n\n    </ion-navbar>\n\n  </ion-header>\n\n  \n\n      <ion-content padding>\n\n          <ion-grid style="height: 10%">\n\n                  <ion-row justify-content-center align-items-center style="height: 100%">\n\n                          <h3> {{studentObject.studentData.firstName}}  {{studentObject.studentData.lastName}} </h3>\n\n                  </ion-row>\n\n                </ion-grid>\n\n     </ion-content>\n\n    <ion-content has-header="true" padding="true"  ng-controller="AppCtrl as ctrl" >\n\n     \n\n      <div class="ion-content" style=" padding-top: 25%">\n\n        <div *ngIf="error" class="error-message">{{error}}</div>\n\n           \n\n         <div class="row row-center">\n\n              <div class="col col-center">\n\n                <button ion-button (click)="startNewPostAssessment()" block> Start New Post Assessment </button>\n\n              </div>\n\n            </div>\n\n            \n\n            <div class="row row-center">\n\n              <div class="col col-center">\n\n                <button ion-button (click)="viewPostAssessmentList()" block>View Post Assessment List</button>\n\n              </div>\n\n            </div>\n\n            \n\n      </div>\n\n      </ion-content>\n\n  '/*ion-inline-end:"C:\mystuff\master\AcademicInvertionAPP\backup\htmlDemos\backup\1\AIAPPv4.0\src\components\PostAssessment\postAssessmentDashBoard\PostAssessmentDashBoard.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["h" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1__ionic_storage__["b" /* Storage */],
            __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["i" /* NavParams */]])
    ], PostAssessmentDashBoard);
    return PostAssessmentDashBoard;
}());

//# sourceMappingURL=postAssessmentDashBoard.js.map

/***/ }),

/***/ 1378:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PostAssessmentFlashCard; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ionic_native_file__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__models_wordData__ = __webpack_require__(25);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__models_student__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__services_arrayService__ = __webpack_require__(197);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_ionic_angular__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__models_PostTestWordData__ = __webpack_require__(316);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__models_postTestWordDataRecordList__ = __webpack_require__(317);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__services_postTestAssessmentService__ = __webpack_require__(1379);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__ionic_storage__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__ionic_native_text_to_speech__ = __webpack_require__(118);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__models_organizationDetails__ = __webpack_require__(35);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__services_flashcardService__ = __webpack_require__(149);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};













var PostAssessmentFlashCard = /** @class */ (function () {
    function PostAssessmentFlashCard(file, navCtrl, navParams, viewCtrl, storage, tts) {
        this.file = file;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.viewCtrl = viewCtrl;
        this.storage = storage;
        this.tts = tts;
        this.postTestWordDataObject = new __WEBPACK_IMPORTED_MODULE_6__models_PostTestWordData__["a" /* PostTestWordData */]();
        this.wordDataObject = new __WEBPACK_IMPORTED_MODULE_2__models_wordData__["a" /* WordData */]();
        this.wordDataArray = [new __WEBPACK_IMPORTED_MODULE_6__models_PostTestWordData__["a" /* PostTestWordData */]()];
        this.TestTitle = "";
        this.currentCardNumber = 0;
        this.totalCardNumber = 0;
        this.studentObject = new __WEBPACK_IMPORTED_MODULE_3__models_student__["a" /* Student */]();
        this.testIndex = 0;
        this.arrayServiceObj = new __WEBPACK_IMPORTED_MODULE_4__services_arrayService__["a" /* ArrayService */]();
        this.subTestIndex = 0;
        this.postTestWordDataRecordListObject = new __WEBPACK_IMPORTED_MODULE_7__models_postTestWordDataRecordList__["a" /* PostTestWordDataRecordList */]();
        this.totalKnownCounter = 0;
        this.organizationDetails = new __WEBPACK_IMPORTED_MODULE_11__models_organizationDetails__["a" /* OrganizationDetails */]();
        this.wordType = 0;
        this.showAnswer = false;
        this.flashcardService = new __WEBPACK_IMPORTED_MODULE_12__services_flashcardService__["a" /* FlashcardService */]();
        this.number1 = "123";
        this.number2 = "1";
        this.operation = "+";
        this.result = [];
    }
    PostAssessmentFlashCard.prototype.ionViewDidLoad = function () {
        console.log("onviewdidload");
    };
    PostAssessmentFlashCard.prototype.greenCircleClick = function () {
        this.showAnswer = false;
        this.totalKnownCounter++;
        if (this.postTestWordDataObject.isKnown == null)
            this.postTestWordDataObject.isKnown = [];
        this.postTestWordDataObject.isKnown.push(true);
        if (this.postTestWordDataObject.totalKnownWord == null)
            this.postTestWordDataObject.totalKnownWord = 0;
        this.postTestWordDataObject.totalKnownWord++;
        if (this.currentCardNumber < this.wordDataArray.length) {
            this.postTestWordDataObject = this.wordDataArray[this.currentCardNumber];
            this.wordDataObject = this.postTestWordDataObject.wordData;
            this.convertTextToMath(this.postTestWordDataObject.wordData.wordText);
            this.currentCardNumber++;
        }
        else {
            console.log("else:green");
            this.goBackToView();
        }
    };
    PostAssessmentFlashCard.prototype.redCircleClick = function () {
        this.showAnswer = false;
        if (this.postTestWordDataObject.isKnown == null)
            this.postTestWordDataObject.isKnown = [];
        this.postTestWordDataObject.isKnown.push(false);
        if (this.currentCardNumber < this.wordDataArray.length) {
            this.postTestWordDataObject = this.wordDataArray[this.currentCardNumber];
            this.wordDataObject = this.postTestWordDataObject.wordData;
            this.convertTextToMath(this.postTestWordDataObject.wordData.wordText);
            this.currentCardNumber++;
        }
        else {
            console.log("else:green");
            this.goBackToView();
        }
    };
    PostAssessmentFlashCard.prototype.goBackToView = function () {
        if (this.studentObject.studentWordDetailsArray[this.wordType].postTestWordDataRecordListArray == null)
            this.studentObject.studentWordDetailsArray[this.wordType].postTestWordDataRecordListArray = [];
        this.postTestWordDataRecordListObject.postTestWordDataArray = this.wordDataArray;
        if (this.postTestWordDataRecordListObject.knownCounterArray == null) {
            this.postTestWordDataRecordListObject.knownCounterArray = [];
        }
        else {
            this.postTestWordDataRecordListObject.knownCounterArray[this.subTestIndex] = this.totalKnownCounter;
        }
        if (this.postTestWordDataRecordListObject.subTestCompleted == null)
            this.postTestWordDataRecordListObject.subTestCompleted = 0;
        this.postTestWordDataRecordListObject.subTestCompleted++;
        if (this.subTestIndex > 0) {
            if (this.postTestWordDataRecordListObject.consistancyPercentageArray == null) {
                this.postTestWordDataRecordListObject.consistancyPercentageArray = [];
            }
            this.postTestWordDataRecordListObject.consistancyPercentageArray[this.subTestIndex] =
                this.postTestWordDataRecordListObject.knownCounterArray[this.subTestIndex] -
                    this.postTestWordDataRecordListObject.knownCounterArray[this.subTestIndex - 1];
        }
        var postTestAssessmentService = new __WEBPACK_IMPORTED_MODULE_8__services_postTestAssessmentService__["a" /* PostTestAssessmentService */](this.organizationDetails.organizationDetailsUID, this.wordType);
        if (this.testIndex < this.studentObject.studentWordDetailsArray[this.wordType].postTestWordDataRecordListArray.length)
            this.studentObject.studentWordDetailsArray[this.wordType].postTestWordDataRecordListArray[this.testIndex] = this.postTestWordDataRecordListObject;
        else
            this.studentObject.studentWordDetailsArray[this.wordType].postTestWordDataRecordListArray.push(this.postTestWordDataRecordListObject);
        postTestAssessmentService.addPostTestWordDataRecordListObject(this.studentObject, this.testIndex);
        if (this.subTestIndex == 2)
            postTestAssessmentService.updateKnownUnknownWordData(this.studentObject, this.wordDataArray);
        if (__WEBPACK_IMPORTED_MODULE_3__models_student__["a" /* Student */] != null) {
            //console.log("studentName:"+studentObject.firstName+" "+studentObject.lastName+" ass len:"+studentObject.assessmentDataArrayObject.length);
            this.storage.set('studentObject', JSON.stringify({ studentObject: this.studentObject }));
        }
        this.navCtrl.pop();
    };
    PostAssessmentFlashCard.prototype.textToSpeechWordData = function (text) {
        this.flashcardService.textToSpeechWordData(text, this.tts, this.showAnswer);
    };
    PostAssessmentFlashCard.prototype.getAnswer = function (equation) {
        return this.flashcardService.getAnswer(equation);
    };
    PostAssessmentFlashCard.prototype.flipCard = function () {
        this.showAnswer = !this.showAnswer;
    };
    PostAssessmentFlashCard.prototype.convertTextToMath = function (mathString) {
        var convertTextToMathResult = this.flashcardService.convertTextToMath(mathString);
        this.result = convertTextToMathResult.result;
        this.operation = convertTextToMathResult.operation;
        this.number1 = convertTextToMathResult.number1;
        this.number2 = convertTextToMathResult.number2;
    };
    PostAssessmentFlashCard = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-blueflashcard',template:/*ion-inline-start:"C:\mystuff\master\AcademicInvertionAPP\backup\htmlDemos\backup\1\AIAPPv4.0\src\htmlpages\blueflashcard\blueflashcard.html"*/'<ion-header>\n\n  <ion-navbar>\n\n    <!-- <ion-title>{{TestTitle}} : {{currentCardNumber}}/{{totalCardNumber}}</ion-title> -->\n\n  </ion-navbar>\n\n</ion-header>\n\n\n\n<ion-content padding>\n\n  <ion-grid style="height: 50%;padding-top: 10%;" *ngIf="result.length != 2">\n\n    <ion-row justify-content-center align-items-center style="height: 100%">\n\n      <h3 style="font-size: 150px;"> {{wordDataObject.wordText}} </h3>\n\n    </ion-row>\n\n  </ion-grid>\n\n\n\n  <ion-grid style="height: 50%;padding-top: 10%;width:40%;" *ngIf="result.length == 2">\n\n    <ion-row justify-content-center align-items-center style="float: right">\n\n      <ion-col></ion-col>\n\n      <ion-col>\n\n        <h3 style="font-size: 80px;"> {{number1}} </h3>\n\n      </ion-col>\n\n    </ion-row>\n\n    <ion-row justify-content-center align-items-center style="float: right">\n\n      <ion-col>\n\n        <h3 style="font-size: 80px;"> {{operation}} </h3>\n\n      </ion-col>\n\n      <ion-col>\n\n        <h3 style="font-size: 80px;"> {{number2}} </h3>\n\n      </ion-col>\n\n    </ion-row>\n\n    <ion-row style="float: right">\n\n      <div class="horizontal-black-line"></div>\n\n    </ion-row>\n\n    <ion-row *ngIf="showAnswer" justify-content-center align-items-center style="float: right">\n\n      <ion-col></ion-col>\n\n      <ion-col>\n\n        <h3 style="font-size: 80px;"> {{getAnswer(wordDataObject.wordText)}} </h3>\n\n      </ion-col>\n\n    </ion-row>\n\n  </ion-grid>\n\n</ion-content>\n\n\n\n<ion-content padding>\n\n  <ion-grid style="padding-top: 40%;">\n\n    <ion-row justify-content-center align-items-center style="height: 100%">\n\n      <ion-col class="center-col-item" style="max-width: 30%;">\n\n        <div class="img-circular-blue" (click)="greenCircleClick()">\n\n          <div class="horizontal-line"></div>\n\n        </div>\n\n      </ion-col>\n\n      <ion-col class="center-col-item" style="max-width: 30%;">\n\n        <div class="img-circular-blue" (click)="redCircleClick()">\n\n          <div class="verticle-line"></div>\n\n        </div>\n\n      </ion-col>\n\n    </ion-row>\n\n  </ion-grid>\n\n\n\n  <ion-grid style="height: 10%;padding-top: 10%;">\n\n    <ion-row justify-content-center align-items-right style="height: 100%">\n\n      <ion-icon name="volume-up" style="height: 20%;top: 20%;right: 20%;position: absolute;font-size: xx-large;"\n\n        (click)="textToSpeechWordData(wordDataObject.wordText)"></ion-icon>\n\n    </ion-row>\n\n  </ion-grid>\n\n\n\n  <ion-grid style="height: 10%;padding-top: 10%;" *ngIf="wordType == 1">\n\n    <ion-row justify-content-center align-items-right style="height: 100%">\n\n      <ion-icon name="sync" style="height: 20%;top: 20%;left: 20%;position: absolute;font-size: xx-large;"\n\n        (click)="flipCard()"></ion-icon>\n\n    </ion-row>\n\n  </ion-grid>\n\n</ion-content>'/*ion-inline-end:"C:\mystuff\master\AcademicInvertionAPP\backup\htmlDemos\backup\1\AIAPPv4.0\src\htmlpages\blueflashcard\blueflashcard.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__ionic_native_file__["a" /* File */],
            __WEBPACK_IMPORTED_MODULE_5_ionic_angular__["h" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_5_ionic_angular__["i" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_5_ionic_angular__["l" /* ViewController */],
            __WEBPACK_IMPORTED_MODULE_9__ionic_storage__["b" /* Storage */],
            __WEBPACK_IMPORTED_MODULE_10__ionic_native_text_to_speech__["a" /* TextToSpeech */]])
    ], PostAssessmentFlashCard);
    return PostAssessmentFlashCard;
}());

//# sourceMappingURL=postAssessmentFlashCard.js.map

/***/ }),

/***/ 1379:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PostTestAssessmentService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__models_PostTestWordData__ = __webpack_require__(316);

var PostTestAssessmentService = /** @class */ (function () {
    function PostTestAssessmentService(organizationUID, wordType) {
        this.organizationUID = "";
        this.wordType = 0;
        this.organizationUID = organizationUID;
        this.wordType = wordType;
    }
    PostTestAssessmentService.prototype.getPostTestWordDataArrayFromWordData = function (wordDataArray) {
        var postTestWordDataArray = [];
        for (var _i = 0, wordDataArray_1 = wordDataArray; _i < wordDataArray_1.length; _i++) {
            var wordObj = wordDataArray_1[_i];
            var postTestWordDataObject = new __WEBPACK_IMPORTED_MODULE_0__models_PostTestWordData__["a" /* PostTestWordData */]();
            postTestWordDataObject.wordData = wordObj.wordData;
            postTestWordDataArray.push(postTestWordDataObject);
        }
        return postTestWordDataArray;
    };
    PostTestAssessmentService.prototype.addPostTestWordDataRecordListObject = function (studentObject, testIndex) {
    };
    PostTestAssessmentService.prototype.updateKnownUnknownWordData = function (studentObject, wordDataArray) {
        console.log("update counter:");
        for (var _i = 0, wordDataArray_2 = wordDataArray; _i < wordDataArray_2.length; _i++) {
            var wordDataObj = wordDataArray_2[_i];
            this.incrementPostAssessmentCounter(studentObject, wordDataObj);
            for (var _a = 0, _b = studentObject.studentWordDetailsArray[this.wordType].newKnownUnknownArrayList; _a < _b.length; _a++) {
                var studentWordObj = _b[_a];
                if (wordDataObj.wordData.wordId == studentWordObj.wordData.wordId) {
                    studentWordObj.postAssessmentCounter++;
                }
            }
        }
    };
    PostTestAssessmentService.prototype.incrementPostAssessmentCounter = function (studentObject, wordDataObject) {
    };
    return PostTestAssessmentService;
}());

//# sourceMappingURL=postTestAssessmentService.js.map

/***/ }),

/***/ 1380:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return StartNewPostAssessment; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_forms__ = __webpack_require__(53);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_storage__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ionic_angular__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__models_knownUnknownWordData__ = __webpack_require__(216);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__models_student__ = __webpack_require__(26);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var StartNewPostAssessment = /** @class */ (function () {
    function StartNewPostAssessment(navCtrl, navParams, storage, formBuilder) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.storage = storage;
        this.formBuilder = formBuilder;
        this.studentObject = new __WEBPACK_IMPORTED_MODULE_5__models_student__["a" /* Student */]();
        this.error = "Error Message";
        this.newLearnedWords = [new __WEBPACK_IMPORTED_MODULE_4__models_knownUnknownWordData__["a" /* KnownUnknownWordData */]()];
        this.allData_newLearnedWords = [new __WEBPACK_IMPORTED_MODULE_4__models_knownUnknownWordData__["a" /* KnownUnknownWordData */]()];
        this.searchTerm = '';
        this.selectAll = true;
        this.wordType = 0;
        this.controls = this.allData_newLearnedWords.map(function (c) { return new __WEBPACK_IMPORTED_MODULE_1__angular_forms__["c" /* FormControl */](false); });
        this.myGroup = this.formBuilder.group({
            wordObjectsList: new __WEBPACK_IMPORTED_MODULE_1__angular_forms__["a" /* FormArray */](this.controls, this.minSelectedCheckboxes(0))
        });
    }
    ;
    StartNewPostAssessment.prototype.ionViewWillEnter = function () {
    };
    StartNewPostAssessment.prototype.filterItems = function () {
        var _this = this;
        this.newLearnedWords = this.allData_newLearnedWords.filter(function (newKnownUnknownObject) {
            return newKnownUnknownObject.wordData.wordText.toLowerCase().indexOf(_this.searchTerm.toLowerCase()) > -1 ||
                newKnownUnknownObject.wordData.wordCategory.toLowerCase().indexOf(_this.searchTerm.toLowerCase()) > -1;
        });
    };
    StartNewPostAssessment.prototype.startNewPostAssessmentTest = function () {
    };
    StartNewPostAssessment.prototype.minSelectedCheckboxes = function (min) {
        if (min === void 0) { min = 1; }
        var validator = function (formArray) {
            var totalSelected = formArray.controls
                .map(function (control) { return control.value; })
                .reduce(function (prev, next) { return next ? prev + next : prev; }, 0);
            // if the total is not greater than the minimum, return the error message
            return totalSelected >= min ? null : { required: true };
        };
        return validator;
    };
    StartNewPostAssessment.prototype.updateSelectAll = function () {
        var _this = this;
        this.controls = this.allData_newLearnedWords.map(function (c) { return new __WEBPACK_IMPORTED_MODULE_1__angular_forms__["c" /* FormControl */](_this.selectAll); });
        this.myGroup = this.formBuilder.group({
            wordObjectsList: new __WEBPACK_IMPORTED_MODULE_1__angular_forms__["a" /* FormArray */](this.controls, this.minSelectedCheckboxes(1))
        });
        console.log("checked all :" + this.selectAll);
    };
    StartNewPostAssessment = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-startNewPostAssessment',template:/*ion-inline-start:"C:\mystuff\master\AcademicInvertionAPP\backup\htmlDemos\backup\1\AIAPPv4.0\src\components\PostAssessment\startNewPostAssessment\startNewPostAssessment.html"*/'<ion-header>\n\n    <ion-navbar>\n\n      <button ion-button menuToggle>\n\n        <ion-icon name="menu"></ion-icon>\n\n      </button>\n\n      <ion-title>Start Post Assessment Test</ion-title>\n\n    </ion-navbar>\n\n    </ion-header>\n\n    \n\n    <ion-content padding>\n\n    <ion-grid style="height: 10%">\n\n      <ion-row justify-content-center align-items-center style="height: 100%">\n\n        <h3 > {{studentObject.studentData.firstName}}  {{studentObject.studentData.lastName}}  </h3>\n\n      </ion-row>\n\n    </ion-grid>\n\n    \n\n    \n\n    <div *ngIf="error" class="error-message">{{error}}</div>\n\n    <ion-content padding="\'true\'" scroll="false" class="has-header">\n\n        <ion-card>\n\n                <ion-searchbar [(ngModel)]="searchTerm" (ionInput)="filterItems()"></ion-searchbar>\n\n                    <ion-grid style="height: 100%">\n\n                        <ion-row justify-content-center align-items-center style="height: 100%">\n\n                                <button ion-button class="submit-btn" full type="submit" (click)="startNewPostAssessmentTest()" >Start Post Assessment Test </button>\n\n                        </ion-row>\n\n                    </ion-grid>\n\n\n\n                <ion-item  >\n\n                    <ion-row class="ion-title" style="background-color: silver;" justify-content-center align-items-center>\n\n                        <ion-col >Word Text</ion-col>\n\n                        <ion-col>Test </ion-col>\n\n                        <ion-col >Word Category</ion-col>\n\n                        <ion-col >Post Test Completed</ion-col>\n\n                        <ion-col style="background-color: white;">\n\n                        <ion-item justify-content-center align-items-center>\n\n                            <ion-checkbox  checked="true"  [(ngModel)]="selectAll"  (ionChange)="updateSelectAll()"></ion-checkbox>\n\n                            \n\n                        </ion-item>\n\n                            \n\n                        </ion-col>\n\n                    </ion-row>\n\n                    <form [formGroup]="myGroup" (ngSubmit)="startNewPostAssessmentTest()">\n\n                        <ion-item formArrayName="wordObjectsList" *ngFor="let wordObjects of newLearnedWords; let i = index">\n\n                            <ion-row  justify-content-center align-items-center>\n\n                                <ion-col >{{wordObjects.wordData.wordText}}</ion-col>\n\n                                <ion-col >{{wordObjects.methodName}}</ion-col>\n\n                                \n\n                                <ion-col >{{wordObjects.wordData.wordCategory}}</ion-col>\n\n                                <ion-col >{{wordObjects.postAssessmentCounter}}</ion-col>\n\n                                <ion-col justify-content-center align-items-center>\n\n                                        <ion-item>\n\n                                                <ion-checkbox  checked="true"   [formControlName]="i" ></ion-checkbox>\n\n                                        </ion-item>\n\n                                </ion-col>\n\n                            </ion-row>\n\n                        </ion-item>\n\n                    </form>\n\n                </ion-item>\n\n            \n\n        </ion-card>\n\n      </ion-content>\n\n    </ion-content>\n\n    '/*ion-inline-end:"C:\mystuff\master\AcademicInvertionAPP\backup\htmlDemos\backup\1\AIAPPv4.0\src\components\PostAssessment\startNewPostAssessment\startNewPostAssessment.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_3_ionic_angular__["h" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["i" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_2__ionic_storage__["b" /* Storage */],
            __WEBPACK_IMPORTED_MODULE_1__angular_forms__["b" /* FormBuilder */]])
    ], StartNewPostAssessment);
    return StartNewPostAssessment;
}());

//# sourceMappingURL=startNewPostAssessment.js.map

/***/ }),

/***/ 1381:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ViewPostAssessmentRecordList; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ionic_storage__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__models_student__ = __webpack_require__(26);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var ViewPostAssessmentRecordList = /** @class */ (function () {
    function ViewPostAssessmentRecordList(navCtrl, navParams, storage) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.storage = storage;
        this.studentObject = new __WEBPACK_IMPORTED_MODULE_3__models_student__["a" /* Student */]();
        this.postTestWordDataRecordListArray = [];
        this.wordType = 0;
    }
    ViewPostAssessmentRecordList.prototype.viewPostTestAssessment = function (index) {
    };
    ViewPostAssessmentRecordList = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-viewPostAssessmentRecordList',template:/*ion-inline-start:"C:\mystuff\master\AcademicInvertionAPP\backup\htmlDemos\backup\1\AIAPPv4.0\src\components\PostAssessment\viewPostAssessment\viewPostAssessmentRecordList.html"*/'<ion-header>\n\n        <ion-navbar>\n\n          <button ion-button menuToggle>\n\n            <ion-icon name="menu"></ion-icon>\n\n          </button>\n\n          <ion-title>Post Test Assessment List</ion-title>\n\n        </ion-navbar>\n\n      </ion-header>\n\n      \n\n      <ion-content padding>\n\n            <ion-grid style="height: 10%">\n\n                    <ion-row justify-content-center align-items-center style="height: 100%">\n\n                            <h3> {{studentObject.studentData.firstName}}  {{studentObject.studentData.lastName}}  </h3>\n\n                    </ion-row>\n\n                  </ion-grid>\n\n       </ion-content>\n\n      \n\n    \n\n       <div *ngIf="error" class="error-message">{{error}}</div>\n\n         \n\n       <ion-content padding="\'true\'" scroll="false" class="has-header">\n\n           <ion-card style="margin-top: 8%;">\n\n               <!-- <ion-searchbar [(ngModel)]="searchTerm" (ionInput)="filterItems()"></ion-searchbar> -->\n\n               \n\n               <ion-item  >\n\n                   <ion-row class="ion-title" style="background-color: silver;">\n\n                       <ion-col >Post Assessment Test Index</ion-col>\n\n                       <ion-col >Test Status</ion-col>\n\n\n\n                     </ion-row>\n\n                     <ion-item *ngFor="let postTestWordDataObject of postTestWordDataRecordListArray; let i = index">\n\n                         <ion-row  >\n\n                             <ion-col style="color: blue" (click)="viewPostTestAssessment(i)" >Post Test {{i+1}}</ion-col>\n\n                             <ion-col *ngIf="postTestWordDataObject.subTestCompleted < postTestWordDataObject.maxTest">\n\n                                <ion-col>\n\n                                  Incomplete\n\n                                </ion-col>\n\n                             </ion-col>\n\n                             \n\n                             <ion-col *ngIf="postTestWordDataObject.subTestCompleted == postTestWordDataObject.maxTest">\n\n                                <ion-col>\n\n                                  Completed\n\n                                </ion-col>\n\n                             </ion-col>                             \n\n                         </ion-row>\n\n                       </ion-item>\n\n               </ion-item>\n\n             \n\n           </ion-card>\n\n         </ion-content>\n\n       '/*ion-inline-end:"C:\mystuff\master\AcademicInvertionAPP\backup\htmlDemos\backup\1\AIAPPv4.0\src\components\PostAssessment\viewPostAssessment\viewPostAssessmentRecordList.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["h" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["i" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_1__ionic_storage__["b" /* Storage */]])
    ], ViewPostAssessmentRecordList);
    return ViewPostAssessmentRecordList;
}());

//# sourceMappingURL=viewPostAssessmentRecordList.js.map

/***/ }),

/***/ 1382:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ViewPostAssessmentList; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ionic_native_file__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_storage__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ionic_angular__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__models_knownUnknownWordData__ = __webpack_require__(216);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__models_organizationDetails__ = __webpack_require__(35);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__models_PostTestWordData__ = __webpack_require__(316);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__models_postTestWordDataRecordList__ = __webpack_require__(317);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__models_student__ = __webpack_require__(26);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};









var ViewPostAssessmentList = /** @class */ (function () {
    function ViewPostAssessmentList(navCtrl, navParams, storage, file) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.storage = storage;
        this.file = file;
        this.studentObject = new __WEBPACK_IMPORTED_MODULE_8__models_student__["a" /* Student */]();
        this.subTestCompleted = 0;
        this.testIndex = 0;
        this.postTestWordDataArray = [new __WEBPACK_IMPORTED_MODULE_6__models_PostTestWordData__["a" /* PostTestWordData */]()];
        this.totalWordLength = 0;
        this.wordDataArray = [new __WEBPACK_IMPORTED_MODULE_4__models_knownUnknownWordData__["a" /* KnownUnknownWordData */]()];
        this.error = "Error Message";
        this.numbers = [1, 23, 3];
        this.postTestWordDataRecordListObject = new __WEBPACK_IMPORTED_MODULE_7__models_postTestWordDataRecordList__["a" /* PostTestWordDataRecordList */]();
        this.organizationDetails = new __WEBPACK_IMPORTED_MODULE_5__models_organizationDetails__["a" /* OrganizationDetails */]();
        this.wordType = 0;
        this.constructorMethod();
    }
    ViewPostAssessmentList.prototype.ionViewWillEnter = function () {
        this.constructorMethod();
    };
    ViewPostAssessmentList.prototype.constructorMethod = function () {
    };
    ViewPostAssessmentList.prototype.startAssessmentTest = function (index) {
    };
    ViewPostAssessmentList = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-viewPostAssessmentList',template:/*ion-inline-start:"C:\mystuff\master\AcademicInvertionAPP\backup\htmlDemos\backup\1\AIAPPv4.0\src\components\PostAssessment\viewPostAssessmentList\viewPostAssessmentList.html"*/'<ion-header>\n\n        <ion-navbar>\n\n          <button ion-button menuToggle>\n\n            <ion-icon name="menu"></ion-icon>\n\n          </button>\n\n          <ion-title>Post Test Assessment </ion-title>\n\n        </ion-navbar>\n\n      </ion-header>\n\n      \n\n      <ion-content padding>\n\n            <ion-grid style="height: 20%">\n\n                    <ion-row justify-content-center align-items-center style="height: 100%">\n\n                            <h3> {{studentObject.studentData.firstName}}  {{studentObject.studentData.lastName}}  </h3>\n\n                    </ion-row>\n\n                  </ion-grid>\n\n       </ion-content>\n\n      \n\n    \n\n    \n\n       <ion-content padding="\'true\'" >\n\n           <ion-card style="margin-top: 8%;">\n\n               <!-- <ion-searchbar [(ngModel)]="searchTerm" (ionInput)="filterItems()"></ion-searchbar> -->\n\n               <div *ngIf="error" class="error-message">{{error}}</div>\n\n               \n\n               <ion-item  >\n\n                   <ion-row class="ion-title" style="background-color: silver;">\n\n                       <ion-col >Post Assessment Test</ion-col>\n\n                       <ion-col >Test Status</ion-col>\n\n                       <ion-col >Total Words</ion-col>\n\n                       <ion-col >Known Words</ion-col>\n\n                       <ion-col>Unknown Words</ion-col>\n\n                       <ion-col>Consistancy percentage</ion-col>\n\n                       \n\n                     </ion-row>\n\n                     <ion-item *ngFor="let i of numbers">\n\n                         <ion-row  >\n\n                             <ion-col style="color: blue" (click)="startAssessmentTest(i)" >Test {{i+1}}</ion-col>\n\n                                <ion-col *ngIf="i < subTestCompleted">\n\n                                  Completed\n\n                                </ion-col>\n\n                                <ion-col *ngIf="i < subTestCompleted">\n\n                                  {{postTestWordDataArray.length}}\n\n                                </ion-col>  \n\n                                <ion-col *ngIf="i < subTestCompleted">\n\n                                  {{postTestWordDataRecordListObject.knownCounterArray[i]}}\n\n                                </ion-col>\n\n                                <ion-col *ngIf="i < subTestCompleted">\n\n                                  {{postTestWordDataArray.length-postTestWordDataRecordListObject.knownCounterArray[i]}}\n\n                                </ion-col>\n\n                                <ion-col *ngIf="i < subTestCompleted">\n\n                                  {{postTestWordDataRecordListObject.consistancyPercentageArray[i]}}\n\n                                </ion-col>\n\n                             \n\n                             \n\n                             <ion-col *ngIf="i >= subTestCompleted">\n\n                                  Incomplete\n\n                                </ion-col>\n\n                                <ion-col  *ngIf="i >= subTestCompleted">\n\n                                  {{postTestWordDataArray.length}}\n\n                                </ion-col>  \n\n                                <ion-col *ngIf="i >= subTestCompleted">\n\n                                  0\n\n                                </ion-col>\n\n                                <ion-col *ngIf="i >= subTestCompleted">\n\n                                  0\n\n                                </ion-col>\n\n                                <ion-col *ngIf="i >= subTestCompleted">\n\n                                  {{postTestWordDataRecordListObject.consistancyPercentageArray[i]}}\n\n                                </ion-col>\n\n                             \n\n                             \n\n                         </ion-row>\n\n                       </ion-item>\n\n               </ion-item>\n\n             \n\n           </ion-card>\n\n         </ion-content>\n\n       '/*ion-inline-end:"C:\mystuff\master\AcademicInvertionAPP\backup\htmlDemos\backup\1\AIAPPv4.0\src\components\PostAssessment\viewPostAssessmentList\viewPostAssessmentList.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_3_ionic_angular__["h" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["i" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_2__ionic_storage__["b" /* Storage */],
            __WEBPACK_IMPORTED_MODULE_1__ionic_native_file__["a" /* File */]])
    ], ViewPostAssessmentList);
    return ViewPostAssessmentList;
}());

//# sourceMappingURL=ViewPostAssessmentList.js.map

/***/ }),

/***/ 1383:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ViewSubPostTestAssessmentRecord; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ionic_storage__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__models_postTestWordDataRecordList__ = __webpack_require__(317);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__models_student__ = __webpack_require__(26);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var ViewSubPostTestAssessmentRecord = /** @class */ (function () {
    function ViewSubPostTestAssessmentRecord(navCtrl, storage, navParams) {
        this.navCtrl = navCtrl;
        this.storage = storage;
        this.navParams = navParams;
        this.error = "Error Message";
        this.studentObject = new __WEBPACK_IMPORTED_MODULE_4__models_student__["a" /* Student */]();
        this.postTestWordDataRecordListObject = new __WEBPACK_IMPORTED_MODULE_3__models_postTestWordDataRecordList__["a" /* PostTestWordDataRecordList */]();
        this.wordType = 0;
        this.numbers = [1, 2, 3];
        this.testIndex = 0;
        this.totalKnowns = 0;
        this.totalUnKnowns = 0;
    }
    ViewSubPostTestAssessmentRecord.prototype.countKnownWords = function () {
        for (var _i = 0, _a = this.postTestWordDataRecordListObject.postTestWordDataArray; _i < _a.length; _i++) {
            var postTestWordDataObj = _a[_i];
            if (postTestWordDataObj.totalKnownWord >= Math.round(0.67 * this.numbers.length)) {
                this.totalKnowns++;
            }
            else {
                this.totalUnKnowns++;
            }
        }
    };
    ViewSubPostTestAssessmentRecord = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-viewSubPostTestAssessmentRecord',template:/*ion-inline-start:"C:\mystuff\master\AcademicInvertionAPP\backup\htmlDemos\backup\1\AIAPPv4.0\src\components\PostAssessment\viewSubPostTestAssessmentRecord\viewSubPostTestAssessmentRecord.html"*/'<ion-header>\n\n  <ion-navbar>\n\n    <button ion-button menuToggle>\n\n      <ion-icon name="menu"></ion-icon>\n\n    </button>\n\n    <ion-title>View Post Assessment Test List</ion-title>\n\n  </ion-navbar>\n\n</ion-header>\n\n\n\n\n\n\n\n<ion-content padding="\'true\'" scroll="false" class="has-header">\n\n  <ion-grid style="height: 20%">\n\n    <ion-row justify-content-center align-items-center style="height: 100%">\n\n      <h3> {{studentObject.studentData.firstName}} {{studentObject.studentData.lastName}} </h3>\n\n    </ion-row>\n\n  </ion-grid>\n\n  <ion-card>\n\n    <!-- <ion-searchbar [(ngModel)]="searchTerm" (ionInput)="filterItems()"></ion-searchbar> -->\n\n\n\n    <div *ngIf="error" class="error-message">error:{{error}}</div>\n\n\n\n    <ion-item>\n\n\n\n      <ion-row>\n\n        <ion-col>Total Test </ion-col>\n\n\n\n        <ion-col> {{postTestWordDataRecordListObject.postTestWordDataArray.length}}</ion-col>\n\n\n\n      </ion-row>\n\n      <br>\n\n      <ion-row>\n\n        <ion-col>Number of Knowns / Unknowns</ion-col>\n\n        <ion-col>{{totalKnowns}}/{{totalUnKnowns}}</ion-col>\n\n\n\n      </ion-row>\n\n\n\n      <ion-row class="ion-title" style="background-color: silver;">\n\n        <ion-col>Words</ion-col>\n\n        <ion-col *ngFor="let i of numbers">\n\n          <ion-col>Test {{i+1}}</ion-col>\n\n        </ion-col>\n\n        <ion-col>Total Knowns</ion-col>\n\n      </ion-row>\n\n\n\n      <ion-item *ngFor="let postTestWordDataObject of postTestWordDataRecordListObject.postTestWordDataArray">\n\n        <ion-row>\n\n          <ion-col>{{postTestWordDataObject.wordData.wordText}}</ion-col>\n\n          <ion-col *ngFor="let j of numbers">\n\n            <ion-col *ngIf="postTestWordDataObject.isKnown && postTestWordDataObject.isKnown[j]">known</ion-col>\n\n            <ion-col *ngIf="postTestWordDataObject.isKnown && !postTestWordDataObject.isKnown[j]">Unknown</ion-col>\n\n          </ion-col>\n\n          <ion-col>{{postTestWordDataObject.totalKnownWord}} </ion-col>\n\n\n\n        </ion-row>\n\n      </ion-item>\n\n    </ion-item>\n\n\n\n  </ion-card>\n\n</ion-content>'/*ion-inline-end:"C:\mystuff\master\AcademicInvertionAPP\backup\htmlDemos\backup\1\AIAPPv4.0\src\components\PostAssessment\viewSubPostTestAssessmentRecord\viewSubPostTestAssessmentRecord.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["h" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1__ionic_storage__["b" /* Storage */],
            __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["i" /* NavParams */]])
    ], ViewSubPostTestAssessmentRecord);
    return ViewSubPostTestAssessmentRecord;
}());

//# sourceMappingURL=viewSubPostTestAssessmentRecord.js.map

/***/ }),

/***/ 1384:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ViewStudentAllWords; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_file__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__models_wordData__ = __webpack_require__(25);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__models_student__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ionic_storage__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__services_wordServices__ = __webpack_require__(109);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__models_knownUnknownWordData__ = __webpack_require__(216);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};








var ViewStudentAllWords = /** @class */ (function () {
    function ViewStudentAllWords(navCtrl, storage, modalCtrl, file) {
        this.navCtrl = navCtrl;
        this.storage = storage;
        this.modalCtrl = modalCtrl;
        this.file = file;
        this.newLearnedWords = [new __WEBPACK_IMPORTED_MODULE_7__models_knownUnknownWordData__["a" /* KnownUnknownWordData */]()];
        this.unKnownWords = [new __WEBPACK_IMPORTED_MODULE_3__models_wordData__["a" /* WordData */](), new __WEBPACK_IMPORTED_MODULE_3__models_wordData__["a" /* WordData */]()];
        this.knwonWords = [new __WEBPACK_IMPORTED_MODULE_3__models_wordData__["a" /* WordData */](), new __WEBPACK_IMPORTED_MODULE_3__models_wordData__["a" /* WordData */]()];
        this.learningWords = [[new __WEBPACK_IMPORTED_MODULE_3__models_wordData__["a" /* WordData */](), new __WEBPACK_IMPORTED_MODULE_3__models_wordData__["a" /* WordData */]()], [new __WEBPACK_IMPORTED_MODULE_3__models_wordData__["a" /* WordData */](), new __WEBPACK_IMPORTED_MODULE_3__models_wordData__["a" /* WordData */]()]];
        this.learningCategory = ["a", "dd", "Dfd"];
        this.allData_newLearnedWords = [new __WEBPACK_IMPORTED_MODULE_7__models_knownUnknownWordData__["a" /* KnownUnknownWordData */]()];
        this.allData_unKnownWords = [new __WEBPACK_IMPORTED_MODULE_3__models_wordData__["a" /* WordData */](), new __WEBPACK_IMPORTED_MODULE_3__models_wordData__["a" /* WordData */]()];
        this.allData_knwonWords = [new __WEBPACK_IMPORTED_MODULE_3__models_wordData__["a" /* WordData */](), new __WEBPACK_IMPORTED_MODULE_3__models_wordData__["a" /* WordData */]()];
        this.allData_learningWords = [[new __WEBPACK_IMPORTED_MODULE_3__models_wordData__["a" /* WordData */](), new __WEBPACK_IMPORTED_MODULE_3__models_wordData__["a" /* WordData */]()], [new __WEBPACK_IMPORTED_MODULE_3__models_wordData__["a" /* WordData */](), new __WEBPACK_IMPORTED_MODULE_3__models_wordData__["a" /* WordData */]()]];
        this.studentObject = new __WEBPACK_IMPORTED_MODULE_4__models_student__["a" /* Student */]();
        this.searchTerm = '';
        this.error = 'Error Message';
        this.wordType = 0;
    }
    ViewStudentAllWords.prototype.filterItems = function () {
        var _this = this;
        this.newLearnedWords = this.allData_newLearnedWords.filter(function (newKnownUnknownObject) {
            return newKnownUnknownObject.wordData.wordText.toLowerCase().indexOf(_this.searchTerm.toLowerCase()) > -1 ||
                newKnownUnknownObject.wordData.wordCategory.toLowerCase().indexOf(_this.searchTerm.toLowerCase()) > -1;
        });
        this.unKnownWords = this.allData_unKnownWords.filter(function (wordObject) {
            return wordObject.wordText.toLowerCase().indexOf(_this.searchTerm.toLowerCase()) > -1 ||
                wordObject.wordCategory.toLowerCase().indexOf(_this.searchTerm.toLowerCase()) > -1;
        });
        this.knwonWords = this.allData_knwonWords.filter(function (wordObject) {
            return wordObject.wordText.toLowerCase().indexOf(_this.searchTerm.toLowerCase()) > -1 ||
                wordObject.wordCategory.toLowerCase().indexOf(_this.searchTerm.toLowerCase()) > -1;
        });
        this.learningWords = this.allData_learningWords.filter(function (wordArray) {
            wordArray.filter(function (wordObject) {
                return wordObject.wordText.toLowerCase().indexOf(_this.searchTerm.toLowerCase()) > -1 ||
                    wordObject.wordCategory.toLowerCase().indexOf(_this.searchTerm.toLowerCase()) > -1;
            });
        });
    };
    ViewStudentAllWords.prototype.addUnknownWordToStudent = function () {
        //     let profileModal = this.modalCtrl.create(AddWordList, { fromModal: true });
        //    profileModal.onDidDismiss(wordData => {
        //      console.log("text:"+wordData.wordText);
        //      this.addWordToStudentToFile(wordData,this.studentObject);
        //    });
        //    profileModal.present();
    };
    ViewStudentAllWords.prototype.addWordToStudentToFile = function (wordDataObj, studentObject) {
        var allData = [];
        var wordServiceObj = new __WEBPACK_IMPORTED_MODULE_6__services_wordServices__["a" /* WordServices */]();
        allData = allData.concat(studentObject.studentWordDetailsArray[this.wordType].unKnownArrayList).concat(studentObject.studentWordDetailsArray[this.wordType].knownUnknownArrayList).concat(studentObject.studentWordDetailsArray[this.wordType].knwonArrayList);
        for (var _i = 0, _a = studentObject.studentWordDetailsArray[this.wordType].methodArray; _i < _a.length; _i++) {
            var methodObj = _a[_i];
            if (methodObj.sessionsArray.length > 0) {
                allData.concat(methodObj.sessionsArray[methodObj.sessionsArray.length - 1].unknownWordList);
            }
        }
        if (!wordServiceObj.checkWordExist(allData, wordDataObj)) {
            studentObject.studentWordDetailsArray[this.wordType].unKnownArrayList.push(wordDataObj);
            // this.allData_unKnownWords.push(wordDataObj);
            this.filterItems();
            this.goBackToView();
            this.error = "";
        }
        else {
            this.error = wordDataObj.wordText + " is already existed.";
        }
    };
    ViewStudentAllWords.prototype.goBackToView = function () {
        this.storage.set('studentObject', JSON.stringify({ studentObject: this.studentObject }));
    };
    ViewStudentAllWords = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-viewStudentAllWords',template:/*ion-inline-start:"C:\mystuff\master\AcademicInvertionAPP\backup\htmlDemos\backup\1\AIAPPv4.0\src\components\studentDashBoard\ViewStudentAllWords\viewStudentAllWords.html"*/'<ion-header>\n\n    <ion-navbar>\n\n      <button ion-button menuToggle>\n\n        <ion-icon name="menu"></ion-icon>\n\n      </button>\n\n      <ion-title>View Words</ion-title>\n\n    </ion-navbar>\n\n    </ion-header>\n\n    \n\n    <ion-content padding>\n\n    <ion-grid style="height: 10%">\n\n      <ion-row justify-content-center align-items-center style="height: 100%">\n\n        <h3 > {{studentObject.studentData.firstName}}  {{studentObject.studentData.lastName}}  </h3>\n\n      </ion-row>\n\n    </ion-grid>\n\n    \n\n    \n\n    <div *ngIf="error" class="error-message">{{error}}</div>\n\n    <ion-content padding="\'true\'" scroll="false" class="has-header">\n\n        <ion-card>\n\n            <ion-searchbar [(ngModel)]="searchTerm" (ionInput)="filterItems()"></ion-searchbar>\n\n            <ion-grid style="height: 100%">\n\n                <ion-row justify-content-center align-items-center style="height: 100%">\n\n                        <button ion-button class="submit-btn" full type="submit" (click)="addUnknownWordToStudent()" >Add Unknown Word </button>\n\n                  </ion-row>\n\n              </ion-grid>\n\n\n\n              <ion-item  >\n\n               \n\n                \n\n                <ion-item *ngFor="let wordArray of learningWords;let i=index">\n\n                    <ion-row class="ion-title" style="background-color: silver;">\n\n                      <ion-col >Learning Word - {{learningCategory[i]}}</ion-col>\n\n                      <ion-col >Word Category</ion-col>\n\n                      Total words - {{wordArray.length}} &nbsp;&nbsp;\n\n                    </ion-row>\n\n                    <ion-item *ngFor="let wordObjects of wordArray">\n\n                      <ion-row *ngIf="wordObjects" >\n\n                          <ion-col  >{{wordObjects.wordText}}</ion-col>\n\n                          <ion-col  >{{wordObjects.wordCategory}}</ion-col>\n\n                      \n\n                      </ion-row>\n\n                    </ion-item>\n\n                </ion-item>\n\n            </ion-item>\n\n\n\n            <ion-item  >\n\n                <ion-row class="ion-title" style="background-color: silver;">\n\n                    <ion-col >Unknown Word</ion-col>\n\n                    <ion-col >Word Category</ion-col>\n\n                    Total words - {{unKnownWords.length}} &nbsp;&nbsp;\n\n                </ion-row>\n\n                \n\n                <ion-item *ngFor="let wordObjects of unKnownWords">\n\n                      <ion-row *ngIf="wordObjects" >\n\n                          <ion-col  >{{wordObjects.wordText}}</ion-col>\n\n                          <ion-col  >{{wordObjects.wordCategory}}</ion-col>\n\n                      \n\n                      </ion-row>\n\n                    </ion-item>\n\n            </ion-item>\n\n\n\n            <ion-item  >\n\n                <ion-row class="ion-title" style="background-color: silver;">\n\n                    <ion-col >New Learned Word</ion-col>\n\n                    <ion-col >Word Category</ion-col>\n\n                    Total words - {{newLearnedWords.length}} &nbsp;&nbsp;\n\n                </ion-row>\n\n                \n\n                <ion-item *ngFor="let wordObjects of newLearnedWords">\n\n                      <ion-row  >\n\n                          <ion-col >{{wordObjects.wordData.wordText}}</ion-col>\n\n                          <ion-col >{{wordObjects.wordData.wordCategory}}</ion-col>\n\n                         \n\n                      </ion-row>\n\n                    </ion-item>\n\n            </ion-item>\n\n\n\n            <ion-item  >\n\n                <ion-row class="ion-title" style="background-color: silver;">\n\n                    <ion-col >Known Word</ion-col>\n\n                    <ion-col >Word Category</ion-col>\n\n                    Total words - {{knwonWords.length}} &nbsp;&nbsp;\n\n                </ion-row>\n\n                \n\n                <ion-item *ngFor="let wordObjects of knwonWords">\n\n                      <ion-row  >\n\n                          <ion-col  >{{wordObjects.wordText}}</ion-col>\n\n                          <ion-col  >{{wordObjects.wordCategory}}</ion-col>\n\n                      \n\n                      </ion-row>\n\n                    </ion-item>\n\n                </ion-item>\n\n        </ion-card>\n\n      </ion-content>\n\n    </ion-content>\n\n    '/*ion-inline-end:"C:\mystuff\master\AcademicInvertionAPP\backup\htmlDemos\backup\1\AIAPPv4.0\src\components\studentDashBoard\ViewStudentAllWords\viewStudentAllWords.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_5__ionic_storage__["b" /* Storage */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* ModalController */],
            __WEBPACK_IMPORTED_MODULE_2__ionic_native_file__["a" /* File */]])
    ], ViewStudentAllWords);
    return ViewStudentAllWords;
}());

//# sourceMappingURL=viewStudentAllWords.js.map

/***/ }),

/***/ 1385:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return GlobalVariables; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var GlobalVariables = /** @class */ (function () {
    function GlobalVariables() {
        this.studentDetailsFileName = 'studentDetails';
        this.wordDetailsFileName = 'wordDetails';
    }
    GlobalVariables = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
        __metadata("design:paramtypes", [])
    ], GlobalVariables);
    return GlobalVariables;
}());

//# sourceMappingURL=globalVariables.js.map

/***/ }),

/***/ 1386:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ListPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(10);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var ListPage = /** @class */ (function () {
    function ListPage(navCtrl, navParams) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        // If we navigated to this page, we will have an item available as a nav param
        this.selectedItem = navParams.get('item');
        // Let's populate this page with some filler content for funzies
        this.icons = ['flask', 'wifi', 'beer', 'football', 'basketball', 'paper-plane',
            'american-football', 'boat', 'bluetooth', 'build'];
        this.items = [];
        for (var i = 1; i < 11; i++) {
            this.items.push({
                title: 'Item ' + i,
                note: 'This is item #' + i,
                icon: this.icons[Math.floor(Math.random() * this.icons.length)]
            });
        }
    }
    ListPage_1 = ListPage;
    ListPage.prototype.itemTapped = function (event, item) {
        // That's right, we're pushing to ourselves!
        this.navCtrl.push(ListPage_1, {
            item: item
        });
    };
    ListPage = ListPage_1 = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-list',template:/*ion-inline-start:"C:\mystuff\master\AcademicInvertionAPP\backup\htmlDemos\backup\1\AIAPPv4.0\src\pages\list\list.html"*/'<ion-header>\n\n  <ion-navbar>\n\n    <button ion-button menuToggle>\n\n      <ion-icon name="menu"></ion-icon>\n\n    </button>\n\n    <ion-title>List</ion-title>\n\n  </ion-navbar>\n\n</ion-header>\n\n\n\n<ion-content>\n\n  <ion-list>\n\n    <button ion-item *ngFor="let item of items" (click)="itemTapped($event, item)">\n\n      <ion-icon [name]="item.icon" item-start></ion-icon>\n\n      {{item.title}}\n\n      <div class="item-note" item-end>\n\n        {{item.note}}\n\n      </div>\n\n    </button>\n\n  </ion-list>\n\n  <div *ngIf="selectedItem" padding>\n\n    You navigated here from <b>{{selectedItem.title}}</b>\n\n  </div>\n\n</ion-content>\n\n'/*ion-inline-end:"C:\mystuff\master\AcademicInvertionAPP\backup\htmlDemos\backup\1\AIAPPv4.0\src\pages\list\list.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavParams */]])
    ], ListPage);
    return ListPage;
    var ListPage_1;
}());

//# sourceMappingURL=list.js.map

/***/ }),

/***/ 1387:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DataProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_common_http__ = __webpack_require__(649);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


/*
  Generated class for the DataProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
var DataProvider = /** @class */ (function () {
    function DataProvider(http) {
        this.http = http;
        console.log('Hello DataProvider Provider');
    }
    DataProvider = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["Injectable"])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_0__angular_common_http__["a" /* HttpClient */]])
    ], DataProvider);
    return DataProvider;
}());

//# sourceMappingURL=data.js.map

/***/ }),

/***/ 1388:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return FirebaseProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_common_http__ = __webpack_require__(649);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


/*
  Generated class for the FirebaseProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
var FirebaseProvider = /** @class */ (function () {
    function FirebaseProvider(http) {
        this.http = http;
        console.log('Hello FirebaseProvider Provider');
    }
    FirebaseProvider = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["Injectable"])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_0__angular_common_http__["a" /* HttpClient */]])
    ], FirebaseProvider);
    return FirebaseProvider;
}());

//# sourceMappingURL=firebase.js.map

/***/ }),

/***/ 1389:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MyApp; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__ = __webpack_require__(351);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__ = __webpack_require__(350);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__components_home_home__ = __webpack_require__(315);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__components_login_login__ = __webpack_require__(642);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__components_viewWordList_viewWordList__ = __webpack_require__(648);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__components_addWordList_addWordList__ = __webpack_require__(573);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__ionic_native_screen_orientation__ = __webpack_require__(349);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__ionic_native_file__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__ionic_storage__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__components_login_userProfile_updateProfile_updateProfile__ = __webpack_require__(644);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__components_home_adminHomePage_adminHomePage__ = __webpack_require__(637);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13_rxjs_Rx__ = __webpack_require__(1390);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13_rxjs_Rx___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_13_rxjs_Rx__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__components_login_addUserDetails_addUserDetails__ = __webpack_require__(641);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};















var MyApp = /** @class */ (function () {
    function MyApp(platform, statusBar, splashScreen, screenOrientation, file, storage, alertCtrl, events) {
        var _this = this;
        this.platform = platform;
        this.statusBar = statusBar;
        this.splashScreen = splashScreen;
        this.screenOrientation = screenOrientation;
        this.file = file;
        this.storage = storage;
        this.alertCtrl = alertCtrl;
        this.events = events;
        this.rootPage = __WEBPACK_IMPORTED_MODULE_14__components_login_addUserDetails_addUserDetails__["a" /* AddUserDetails */];
        this.userDetails = null;
        this._timeoutSeconds = 60 * 60; // 60 minutes
        this.timeoutExpired = new __WEBPACK_IMPORTED_MODULE_13_rxjs_Rx__["Subject"]();
        this._count = 0;
        this.resetOnTrigger = false;
        this.counter = 60; // 60 seconds
        this.initializeApp();
        this.pages = [
            { title: 'Home', component: __WEBPACK_IMPORTED_MODULE_4__components_home_home__["a" /* HomePage */] },
            { title: 'Add Words/Math Facts', component: __WEBPACK_IMPORTED_MODULE_7__components_addWordList_addWordList__["a" /* AddWordList */] },
            { title: 'View Words', component: __WEBPACK_IMPORTED_MODULE_6__components_viewWordList_viewWordList__["a" /* ViewWordList */] },
            { title: 'User Profile  ', component: __WEBPACK_IMPORTED_MODULE_11__components_login_userProfile_updateProfile_updateProfile__["a" /* UpdateProfile */] },
            { title: 'Signout ', component: __WEBPACK_IMPORTED_MODULE_5__components_login_login__["a" /* Login */] }
        ];
        this.events.subscribe('user:loggedin', function () {
            _this.startTimer();
            console.log("events");
            _this.storage.get('userDetails').then(function (val) {
                var fileData = JSON.parse(val);
                _this.userDetails = fileData.userDetails;
                _this.storage.get('organizationDetails').then(function (val) {
                    var fileData = JSON.parse(val);
                    _this.organizationDetails = fileData.organizationDetails;
                    console.log("user logged:in:" + _this.organizationDetails.organizationDetailsUID);
                });
                if (_this.userDetails.userRole == "faculty") {
                    _this.pages = [
                        { title: 'Home', component: __WEBPACK_IMPORTED_MODULE_4__components_home_home__["a" /* HomePage */] },
                        { title: 'Add Words/Math Facts', component: __WEBPACK_IMPORTED_MODULE_7__components_addWordList_addWordList__["a" /* AddWordList */] },
                        { title: 'View Words', component: __WEBPACK_IMPORTED_MODULE_6__components_viewWordList_viewWordList__["a" /* ViewWordList */] },
                        { title: 'User Profile  ', component: __WEBPACK_IMPORTED_MODULE_11__components_login_userProfile_updateProfile_updateProfile__["a" /* UpdateProfile */] },
                        { title: 'Signout ', component: __WEBPACK_IMPORTED_MODULE_5__components_login_login__["a" /* Login */] }
                    ];
                }
                else {
                    _this.pages = [
                        { title: 'Home', component: __WEBPACK_IMPORTED_MODULE_4__components_home_home__["a" /* HomePage */] },
                        { title: 'Add Words/Math Facts', component: __WEBPACK_IMPORTED_MODULE_7__components_addWordList_addWordList__["a" /* AddWordList */] },
                        { title: 'View Words', component: __WEBPACK_IMPORTED_MODULE_6__components_viewWordList_viewWordList__["a" /* ViewWordList */] },
                        { title: 'User Profile  ', component: __WEBPACK_IMPORTED_MODULE_11__components_login_userProfile_updateProfile_updateProfile__["a" /* UpdateProfile */] },
                        { title: 'Admin ', component: __WEBPACK_IMPORTED_MODULE_12__components_home_adminHomePage_adminHomePage__["a" /* AdminHomePage */] },
                        { title: 'Signout ', component: __WEBPACK_IMPORTED_MODULE_5__components_login_login__["a" /* Login */] }
                    ];
                }
            });
        });
        this.timeoutExpired.subscribe(function (n) {
            console.log("timeoutExpired subject next.. " + n.toString());
            //this.nav.setRoot(Login);
            _this.confirmTimeOut();
        });
    }
    MyApp.prototype.initializeApp = function () {
        var _this = this;
        this.platform.ready().then(function () {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            _this.statusBar.styleDefault();
            _this.splashScreen.hide();
            console.log("screen orientation:landscape");
            _this.screenOrientation.lock(_this.screenOrientation.ORIENTATIONS.LANDSCAPE);
        });
    };
    MyApp.prototype.openPage = function (page) {
        if (page.component == __WEBPACK_IMPORTED_MODULE_5__components_login_login__["a" /* Login */]) {
            this.confirmSignOut();
        }
        else {
            this.nav.setRoot(page.component);
        }
    };
    MyApp.prototype.confirmSignOut = function () {
        var _this = this;
        var alert = this.alertCtrl.create({
            title: 'Sign Out',
            message: 'Do you really want to sign out ? ',
            enableBackdropDismiss: false,
            buttons: [
                {
                    text: 'Cancel',
                    role: 'cancel',
                    handler: function () {
                        console.log('Cancel clicked');
                    }
                },
                {
                    text: 'yes',
                    handler: function () {
                        _this.nav.setRoot(__WEBPACK_IMPORTED_MODULE_5__components_login_login__["a" /* Login */]);
                    }
                }
            ]
        });
        alert.present();
    };
    MyApp.prototype.confirmTimeOut = function () {
        var _this = this;
        this.counter = 10;
        var intervalVar = setInterval(function () {
            this.counter--;
            alert.setMessage("Do you want to stay logged in? Your session is about to expire in <strong style=\"color:blue\">" + this.counter + "<strong>.");
            if (this.counter == 0) {
                alert.dismiss();
                this.nav.setRoot(__WEBPACK_IMPORTED_MODULE_5__components_login_login__["a" /* Login */]);
                clearInterval(intervalVar);
            }
        }.bind(this), 1000);
        var alert = this.alertCtrl.create({
            title: 'Session Expiring !',
            message: 'Your session is about to expire in . Do you want to stay logged in ?',
            enableBackdropDismiss: false,
            buttons: [
                {
                    text: 'Yes',
                    handler: function () {
                        _this.startTimer();
                        clearInterval(intervalVar);
                    }
                }
            ]
        });
        alert.present();
    };
    MyApp.prototype.startTimer = function () {
        var _this = this;
        if (this.timerSubscription) {
            this.timerSubscription.unsubscribe();
        }
        this.timer = __WEBPACK_IMPORTED_MODULE_13_rxjs_Rx__["Observable"].timer(this._timeoutSeconds * 1000);
        this.timerSubscription = this.timer.subscribe(function (n) {
            _this.timerComplete(n);
        });
    };
    MyApp.prototype.stopTimer = function () {
        this.timerSubscription.unsubscribe();
    };
    MyApp.prototype.timerComplete = function (n) {
        this.timeoutExpired.next(++this._count);
        if (this.resetOnTrigger) {
            this.startTimer();
        }
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* Nav */]),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* Nav */])
    ], MyApp.prototype, "nav", void 0);
    MyApp = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({template:/*ion-inline-start:"C:\mystuff\master\AcademicInvertionAPP\backup\htmlDemos\backup\1\AIAPPv4.0\src\app\app.html"*/'<ion-menu [content]="content">\n\n  <ion-header>\n\n    <ion-toolbar>\n\n      <ion-title>Menu</ion-title>\n\n    </ion-toolbar>\n\n  </ion-header>\n\n\n\n  <ion-content>\n\n    <ion-list>\n\n      <button menuClose ion-item *ngFor="let p of pages" (click)="openPage(p)">\n\n        {{p.title}}\n\n      </button>\n\n    </ion-list>\n\n  </ion-content>\n\n\n\n</ion-menu>\n\n\n\n<!-- Disable swipe-to-go-back because it\'s poor UX to combine STGB with side menus -->\n\n<ion-nav [root]="rootPage" #content swipeBackEnabled="false"></ion-nav>'/*ion-inline-end:"C:\mystuff\master\AcademicInvertionAPP\backup\htmlDemos\backup\1\AIAPPv4.0\src\app\app.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* Platform */],
            __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__["a" /* StatusBar */],
            __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__["a" /* SplashScreen */],
            __WEBPACK_IMPORTED_MODULE_8__ionic_native_screen_orientation__["a" /* ScreenOrientation */],
            __WEBPACK_IMPORTED_MODULE_9__ionic_native_file__["a" /* File */],
            __WEBPACK_IMPORTED_MODULE_10__ionic_storage__["b" /* Storage */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* Events */]])
    ], MyApp);
    return MyApp;
}());

//# sourceMappingURL=app.component.js.map

/***/ }),

/***/ 149:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return FlashcardService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_mathjs__ = __webpack_require__(935);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_mathjs___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_mathjs__);

var FlashcardService = /** @class */ (function () {
    function FlashcardService() {
    }
    FlashcardService.prototype.textToSpeechWordData = function (text, tts, showAnswer) {
        console.log("text:" + text);
        var speaktext = text.replace('/', '÷').replace('-', ' minus ');
        if (showAnswer)
            speaktext = speaktext + " = " + this.getAnswer(text);
        tts.speak(speaktext + "")
            .then(function () { return console.log('Success'); })
            .catch(function (reason) { return console.log(reason); });
    };
    FlashcardService.prototype.getAnswer = function (equation) {
        return __WEBPACK_IMPORTED_MODULE_0_mathjs___default.a.eval(equation.replace('x', '*').replace('X', '*'));
    };
    FlashcardService.prototype.convertTextToMath = function (mathString) {
        var operation = "";
        var number1 = "";
        var number2 = "";
        var separators = [' ', '\\\+', '-', '\\\(', '\\\)', '\\*', '/', ':', '\\\?', 'x', 'X'];
        var result = mathString.split(new RegExp(separators.join('|'), 'g'));
        if (result.length == 2) {
            operation = mathString.charAt(result[0].length);
            if (operation == '*' || operation == 'x')
                operation = 'X';
            else if (operation == '/')
                operation = '÷';
            number1 = result[0];
            number2 = result[1];
        }
        return { result: result, operation: operation, number1: number1, number2: number2 };
    };
    return FlashcardService;
}());

//# sourceMappingURL=flashcardService.js.map

/***/ }),

/***/ 193:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Dataset; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__wordData__ = __webpack_require__(25);

var Dataset = /** @class */ (function () {
    function Dataset() {
        this.datasetName = "Dataset name";
        this.wordList = [new __WEBPACK_IMPORTED_MODULE_0__wordData__["a" /* WordData */]()];
    }
    return Dataset;
}());

//# sourceMappingURL=Dataset.js.map

/***/ }),

/***/ 194:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AssessmentTestData; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__wordData__ = __webpack_require__(25);

var AssessmentTestData = /** @class */ (function () {
    function AssessmentTestData(testIndex) {
        this.testIndex = 0;
        this.testStatus = false;
        this.totalWordList = 0;
        this.knownWordList = [new __WEBPACK_IMPORTED_MODULE_0__wordData__["a" /* WordData */]()];
        this.unknownWordList = [new __WEBPACK_IMPORTED_MODULE_0__wordData__["a" /* WordData */]()];
        this.consistancyPercentage = 0;
        this.testIndex = testIndex;
    }
    return AssessmentTestData;
}());

//# sourceMappingURL=AssessmentTestData.js.map

/***/ }),

/***/ 195:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return IncrementalRehersalService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__models_PreSessionAssessmentResultTest__ = __webpack_require__(579);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__models_myMap__ = __webpack_require__(123);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__MyMapServices__ = __webpack_require__(196);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__models_methodInterventionWordData__ = __webpack_require__(110);




var IncrementalRehersalService = /** @class */ (function () {
    function IncrementalRehersalService() {
        // private ratio1:number=7;
        // private ratio2:number=4;
        this.myMapServiceObject = new __WEBPACK_IMPORTED_MODULE_2__MyMapServices__["a" /* MyMApServices */]();
    }
    IncrementalRehersalService.prototype.startSessionTest = function (methodSessionObject, ratio1, ratio2) {
        if (ratio1 == null)
            ratio1 = 7;
        if (ratio2 == null)
            ratio2 = 4;
        var knownWordList = methodSessionObject.knownWordList;
        var unknownWordList = methodSessionObject.unknownWordList;
        if (methodSessionObject.sessionWordDataList == null)
            methodSessionObject.sessionWordDataList = [];
        var methodInetrventionWordDataArray = methodSessionObject.sessionWordDataList;
        var testWordArray = [];
        var counter = 0;
        var k = 0;
        //   knownWordList=this.shuffle(knownWordList);
        //temp unknown list
        var ukMap = new __WEBPACK_IMPORTED_MODULE_1__models_myMap__["a" /* MyMap */]();
        console.log("known Array:");
        this.printList(knownWordList);
        console.log("unknown Array:");
        this.printList(unknownWordList);
        if (ratio2 > unknownWordList.length || ratio1 > knownWordList.length)
            return;
        for (var _i = 0, unknownWordList_1 = unknownWordList; _i < unknownWordList_1.length; _i++) {
            var unknownWordObj = unknownWordList_1[_i];
            if (ratio2 <= 0) {
                break;
            }
            console.log("set:" + (k + 1));
            console.log("taking unknown:" + unknownWordObj.wordText);
            //   methodSessionObject.sessionUnknownList.push(unknownWordObj);
            var i = 0;
            while (i < ratio1) {
                console.log("uu :" + unknownWordObj.wordText);
                testWordArray.push(unknownWordObj);
                this.updateWordDataToMethodIntevention(unknownWordObj, methodInetrventionWordDataArray, false);
                counter++;
                var j = 0;
                var wordObjIterator = Array.from(ukMap.keys);
                wordObjIterator.reverse();
                for (var _a = 0, wordObjIterator_1 = wordObjIterator; _a < wordObjIterator_1.length; _a++) {
                    var wordItem = wordObjIterator_1[_a];
                    if (j <= i && j < ratio1) {
                        console.log("uk :" + wordItem.wordText);
                        testWordArray.push(wordItem);
                        this.updateWordDataToMethodIntevention(wordItem, methodInetrventionWordDataArray, false);
                        counter++;
                        j++;
                    }
                    else {
                        break;
                    }
                }
                while (j <= i && j < ratio1) {
                    console.log("kk :" + knownWordList[j].wordText);
                    testWordArray.push(knownWordList[j]);
                    this.updateWordDataToMethodIntevention(knownWordList[j], methodInetrventionWordDataArray, true);
                    counter++;
                    j++;
                }
                console.log("counter:" + counter);
                i++;
            }
            console.log("Removing " + unknownWordObj.wordText + " from and putting in known as K" + unknownWordObj.wordText);
            this.myMapServiceObject.setObject(ukMap, unknownWordObj, true);
            ratio2--;
            k++;
        }
        console.log("temp list:");
        this.printList(testWordArray);
        //  methodSessionObject.controlItems=ukMap;    
        methodSessionObject.sessionWordDataList = methodInetrventionWordDataArray;
        return testWordArray;
    };
    IncrementalRehersalService.prototype.shuffle = function (o) {
        for (var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x)
            ;
        return o;
    };
    IncrementalRehersalService.prototype.printList = function (wordList) {
        for (var _i = 0, wordList_1 = wordList; _i < wordList_1.length; _i++) {
            var wordDataObj = wordList_1[_i];
            console.log(" " + wordDataObj.wordText);
        }
    };
    IncrementalRehersalService.prototype.compareAssessment = function (uk1Map, uk2Map, preSessionWordDataArray) {
        //retrun known array list
        var tempUkList = [];
        var truekwy = [];
        for (var _i = 0, _a = uk1Map.keys; _i < _a.length; _i++) {
            var wordDatauk1Obj = _a[_i];
            if (!this.myMapServiceObject.has(uk2Map, wordDatauk1Obj)) {
                tempUkList.push(wordDatauk1Obj);
                var preSessionWordDataObj = new __WEBPACK_IMPORTED_MODULE_0__models_PreSessionAssessmentResultTest__["a" /* PreSessionResultTest */]();
                preSessionWordDataObj.wordData = wordDatauk1Obj;
                preSessionWordDataObj.isKnownWord = false;
                preSessionWordDataObj.test1Known = this.myMapServiceObject.getValue(uk1Map, wordDatauk1Obj);
                preSessionWordDataObj.test2Known = false;
                preSessionWordDataObj.notes = "keeping in Unknown list";
                preSessionWordDataArray.push(preSessionWordDataObj);
            }
            else {
                if (this.myMapServiceObject.getValue(uk1Map, wordDatauk1Obj) == this.myMapServiceObject.getValue(uk2Map, wordDatauk1Obj)) {
                    if (!this.myMapServiceObject.getValue(uk1Map, wordDatauk1Obj)) {
                        tempUkList.push(wordDatauk1Obj);
                        var preSessionWordDataObj_1 = new __WEBPACK_IMPORTED_MODULE_0__models_PreSessionAssessmentResultTest__["a" /* PreSessionResultTest */]();
                        preSessionWordDataObj_1.wordData = wordDatauk1Obj;
                        preSessionWordDataObj_1.isKnownWord = false;
                        preSessionWordDataObj_1.test1Known = false;
                        preSessionWordDataObj_1.test2Known = false;
                        preSessionWordDataObj_1.notes = "Keeping in Unknown list";
                        preSessionWordDataArray.push(preSessionWordDataObj_1);
                    }
                    else {
                        var preSessionWordDataObj_2 = new __WEBPACK_IMPORTED_MODULE_0__models_PreSessionAssessmentResultTest__["a" /* PreSessionResultTest */]();
                        preSessionWordDataObj_2.wordData = wordDatauk1Obj;
                        preSessionWordDataObj_2.isKnownWord = true;
                        preSessionWordDataObj_2.test1Known = true;
                        preSessionWordDataObj_2.test2Known = true;
                        preSessionWordDataObj_2.notes = "Removing from unknown list";
                        preSessionWordDataArray.push(preSessionWordDataObj_2);
                        truekwy.push(wordDatauk1Obj);
                    }
                }
                else {
                    tempUkList.push(wordDatauk1Obj);
                    var preSessionWordDataObj_3 = new __WEBPACK_IMPORTED_MODULE_0__models_PreSessionAssessmentResultTest__["a" /* PreSessionResultTest */]();
                    preSessionWordDataObj_3.wordData = wordDatauk1Obj;
                    preSessionWordDataObj_3.isKnownWord = false;
                    preSessionWordDataObj_3.test1Known = this.myMapServiceObject.getValue(uk1Map, wordDatauk1Obj);
                    preSessionWordDataObj_3.test2Known = this.myMapServiceObject.getValue(uk2Map, wordDatauk1Obj);
                    preSessionWordDataObj_3.notes = "Keeping in Unknown list";
                    preSessionWordDataArray.push(preSessionWordDataObj_3);
                }
            }
        }
        for (var _b = 0, _c = uk2Map.keys; _b < _c.length; _b++) {
            var wordDatauk2Obj = _c[_b];
            if (!this.myMapServiceObject.has(uk1Map, wordDatauk2Obj)) {
                //index =-1 element not exist
                console.log("index:" + tempUkList.indexOf(wordDatauk2Obj));
                if (tempUkList.indexOf(wordDatauk2Obj) < 0) {
                    var preSessionWordDataObj_4 = new __WEBPACK_IMPORTED_MODULE_0__models_PreSessionAssessmentResultTest__["a" /* PreSessionResultTest */]();
                    preSessionWordDataObj_4.wordData = wordDatauk2Obj;
                    preSessionWordDataObj_4.isKnownWord = false;
                    preSessionWordDataObj_4.test1Known = false;
                    preSessionWordDataObj_4.test2Known = this.myMapServiceObject.getValue(uk2Map, wordDatauk2Obj);
                    preSessionWordDataObj_4.notes = "Keeping in Unknown list";
                    preSessionWordDataArray.push(preSessionWordDataObj_4);
                    tempUkList.push(wordDatauk2Obj);
                }
            }
        }
        return preSessionWordDataArray;
    };
    IncrementalRehersalService.prototype.removeWordDataItem = function (originalList, tempList) {
        for (var _i = 0, tempList_1 = tempList; _i < tempList_1.length; _i++) {
            var wordDataObj = tempList_1[_i];
            var index = originalList.indexOf(wordDataObj);
            if (index !== -1) {
                console.log("index:" + index);
                originalList.splice(index, 1);
            }
        }
    };
    IncrementalRehersalService.prototype.addWordDataItem = function (originalList, tempList) {
        for (var _i = 0, tempList_2 = tempList; _i < tempList_2.length; _i++) {
            var wordDataObj = tempList_2[_i];
            originalList.push(wordDataObj);
        }
    };
    IncrementalRehersalService.prototype.getMethodSessionWordDataObject = function (wordDataObject, methodInetrventionWordDataArray) {
        for (var _i = 0, methodInetrventionWordDataArray_1 = methodInetrventionWordDataArray; _i < methodInetrventionWordDataArray_1.length; _i++) {
            var obj = methodInetrventionWordDataArray_1[_i];
            if (obj.wordData.wordId == wordDataObject.wordId) {
                return obj;
            }
        }
        return null;
    };
    IncrementalRehersalService.prototype.updateWordDataToMethodIntevention = function (wordDataObject, methodInetrventionWordDataArray, isKnown) {
        var methodInterventionWordDataObj = this.getMethodSessionWordDataObject(wordDataObject, methodInetrventionWordDataArray);
        if (methodInterventionWordDataObj == null) {
            methodInterventionWordDataObj = new __WEBPACK_IMPORTED_MODULE_3__models_methodInterventionWordData__["a" /* MethodInterventionWordData */]();
            methodInterventionWordDataObj.wordData = wordDataObject;
            methodInterventionWordDataObj.isKnownWord = isKnown;
            methodInetrventionWordDataArray.push(methodInterventionWordDataObj);
        }
    };
    return IncrementalRehersalService;
}());

//# sourceMappingURL=IncrementalRehersalService.js.map

/***/ }),

/***/ 196:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MyMApServices; });
var MyMApServices = /** @class */ (function () {
    function MyMApServices() {
    }
    MyMApServices.prototype.removeObject = function (myMapObj, key) {
        for (var _i = 0, _a = myMapObj.keys; _i < _a.length; _i++) {
            var obj = _a[_i];
            if (obj.wordId == key.wordId) {
                var index = myMapObj.keys.indexOf(obj);
                if (index !== -1) {
                    console.log("index:" + index);
                    myMapObj.keys.splice(index, 1);
                    myMapObj.values.splice(index, 1);
                    return;
                }
            }
        }
        return;
    };
    MyMApServices.prototype.setObject = function (myMapObj, key, value) {
        for (var _i = 0, _a = myMapObj.keys; _i < _a.length; _i++) {
            var obj = _a[_i];
            if (obj.wordId == key.wordId) {
                var index = myMapObj.keys.indexOf(obj);
                myMapObj.values[index] = value;
                return;
            }
        }
        console.log("push key:" + key.wordText + " val:" + value);
        myMapObj.keys.push(key);
        myMapObj.values.push(value);
        return;
    };
    MyMApServices.prototype.getValue = function (myMapObj, key) {
        var valueTemp;
        for (var _i = 0, _a = myMapObj.keys; _i < _a.length; _i++) {
            var obj = _a[_i];
            if (obj.wordId == key.wordId) {
                var index = myMapObj.keys.indexOf(obj);
                valueTemp = myMapObj.values[index];
                //return myMapObj.values[index] 
                break;
            }
        }
        return valueTemp;
    };
    MyMApServices.prototype.clearMyMap = function (myMapObj) {
        myMapObj.keys = [];
        myMapObj.values = [];
    };
    MyMApServices.prototype.size = function (myMapObj) {
        return myMapObj.keys.length || 0;
    };
    MyMApServices.prototype.getKeys = function (myMapObj) {
        return myMapObj.keys;
    };
    MyMApServices.prototype.getValues = function (myMapObj) {
        return myMapObj.values;
    };
    MyMApServices.prototype.has = function (myMapObj, key) {
        for (var _i = 0, _a = myMapObj.keys; _i < _a.length; _i++) {
            var obj = _a[_i];
            if (obj.wordId == key.wordId) {
                return true;
            }
        }
        return false;
    };
    MyMApServices.prototype.printMyMap = function (myMapObj) {
        var i = 0;
        while (i < myMapObj.keys.length) {
            console.log("key:" + myMapObj.keys[i].wordText + " value:" + myMapObj.values[i]);
            i++;
        }
        return;
    };
    return MyMApServices;
}());

//# sourceMappingURL=MyMapServices.js.map

/***/ }),

/***/ 197:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ArrayService; });
var ArrayService = /** @class */ (function () {
    function ArrayService() {
    }
    ArrayService.prototype.shuffle = function (o) {
        for (var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x)
            ;
        return o;
    };
    return ArrayService;
}());

//# sourceMappingURL=arrayService.js.map

/***/ }),

/***/ 216:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return KnownUnknownWordData; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__wordData__ = __webpack_require__(25);

var KnownUnknownWordData = /** @class */ (function () {
    function KnownUnknownWordData() {
        this.wordData = new __WEBPACK_IMPORTED_MODULE_0__wordData__["a" /* WordData */]();
        this.postAssessmentCounter = 0;
        this.methodIndex = 0;
        this.methodName = "";
    }
    return KnownUnknownWordData;
}());

//# sourceMappingURL=knownUnknownWordData.js.map

/***/ }),

/***/ 25:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return WordData; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_angular2_uuid__ = __webpack_require__(574);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_angular2_uuid___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_angular2_uuid__);

var WordData = /** @class */ (function () {
    function WordData() {
        this.wordId = " word Id";
        this.wordText = " word text";
        this.wordCategory = "word category";
        this.wordId = __WEBPACK_IMPORTED_MODULE_0_angular2_uuid__["UUID"].UUID();
    }
    return WordData;
}());

//# sourceMappingURL=wordData.js.map

/***/ }),

/***/ 26:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Student; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__StudentWordDetails__ = __webpack_require__(928);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__StudentData__ = __webpack_require__(577);


var Student = /** @class */ (function () {
    function Student() {
        this.studentData = new __WEBPACK_IMPORTED_MODULE_1__StudentData__["a" /* StudentData */]();
        this.studentWordDetailsArray = [new __WEBPACK_IMPORTED_MODULE_0__StudentWordDetails__["a" /* StudentWordDetails */]("word"), new __WEBPACK_IMPORTED_MODULE_0__StudentWordDetails__["a" /* StudentWordDetails */]("math")];
    }
    return Student;
}());

//# sourceMappingURL=student.js.map

/***/ }),

/***/ 292:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DataSetService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__ionic_native_File__ = __webpack_require__(575);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__models_Dataset__ = __webpack_require__(193);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__wordServices__ = __webpack_require__(109);



var DataSetService = /** @class */ (function () {
    function DataSetService() {
        this.wordDetailsFilename = 'dataSetDetails';
        this.file = new __WEBPACK_IMPORTED_MODULE_0__ionic_native_File__["a" /* File */]();
    }
    DataSetService.prototype.addDataSetListToFile = function (file) {
        return new Promise(function (resolve, reject) {
            var fileData;
            var dataSetDetails = [];
            var error = "";
            file.checkFile(file.dataDirectory, 'dataSetDetails').then(function (_) {
                console.log("file does  exist");
                file.readAsText(file.dataDirectory, 'dataSetDetails').then(function (data) {
                    console.log("read succ");
                    fileData = JSON.parse(data);
                    dataSetDetails = fileData.dataSetDetails;
                    resolve(dataSetDetails);
                }).catch(function (err) {
                    console.log("read unsecc Dataset array:" + dataSetDetails.length);
                    reject(dataSetDetails);
                });
            }).catch(function (err) {
                console.log("file not exist Dataset array:" + dataSetDetails.length);
                reject(dataSetDetails);
            });
        });
    };
    DataSetService.prototype.getDataSetList = function (file, wordType) {
        return new Promise(function (resolve, reject) {
            var fileData;
            var dataSetDetails = [];
            var error = "";
            var filename = '';
            if (wordType == 0)
                filename = 'datasetDetails';
            else
                filename = 'mathDatasetDetails';
            file.checkFile(file.dataDirectory, filename).then(function (_) {
                console.log("file does  exist");
                file.readAsText(file.dataDirectory, filename).then(function (data) {
                    console.log("read succ");
                    fileData = JSON.parse(data);
                    dataSetDetails = fileData.dataSetDetails;
                    console.log("read secc Dataset array:" + dataSetDetails.length);
                    resolve(dataSetDetails);
                }).catch(function (err) {
                    console.log("read unsecc Dataset array:" + dataSetDetails.length);
                    reject(dataSetDetails);
                });
            }).catch(function (err) {
                console.log("file not exist Dataset array:" + dataSetDetails.length);
                reject(dataSetDetails);
            });
        });
    };
    DataSetService.prototype.checkDataSetExist = function (dataSetDetails, DatasetObject) {
        var exist = false;
        dataSetDetails.forEach(function (datasetObj) {
            if (datasetObj.datasetName == DatasetObject.datasetName)
                exist = true;
        });
        return exist;
    };
    DataSetService.prototype.addDataSettoFile = function (file, dataSetObj, dataServiceObject, wordType) {
        return new Promise(function (resolve, reject) {
            var fileData;
            var dataSetDetails = [];
            var error;
            dataServiceObject.getDataSetList(file, wordType).then(function (dataSetDetails) {
                console.log("Dataset lencheck:" + dataSetDetails.length);
                if (dataSetDetails.length > 0) {
                    var exist = dataServiceObject.checkDataSetExist(dataSetDetails, dataSetObj);
                    console.log("Dataset exist: " + exist);
                    if (exist) {
                        error = "Dataset already exist with : " + dataSetObj.datasetName;
                        resolve(error);
                    }
                    else {
                        dataSetDetails.push(dataSetObj);
                        console.log("Number of Dataset added size:" + dataSetDetails.length);
                        file.writeFile(file.dataDirectory, 'dataSetDetails', JSON.stringify({ dataSetDetails: dataSetDetails }), { replace: true }).then(function (_) {
                            console.log("write succ");
                            error = " Dataset added with id:" + dataSetObj.datasetName;
                            resolve(error);
                        }).catch(function (err) {
                            console.log("write unsucc");
                            reject("write unsucc");
                        });
                    }
                }
                else {
                    console.log("length not");
                    file.createFile(file.dataDirectory, 'dataSetDetails', true).then(function (fileEntry) {
                        console.log("file create");
                        dataSetDetails.push(dataSetObj);
                        file.writeFile(file.dataDirectory, 'dataSetDetails', JSON.stringify({ dataSetDetails: dataSetDetails }), { replace: true }).then(function (_) {
                            console.log("file write succ");
                            error = " Dataset added with id:" + dataSetObj.datasetName;
                            console.log("size:" + dataSetDetails.length);
                            resolve(error);
                        }).catch(function (err) {
                            console.log("file does not write");
                            reject("file does not write");
                        });
                    });
                }
            }).catch(function (err) {
                console.log("Dataset get not workign " + dataSetDetails.length);
                file.createFile(file.dataDirectory, 'dataSetDetails', true).then(function (fileEntry) {
                    console.log("file create");
                    dataSetDetails.push(dataSetObj);
                    file.writeFile(file.dataDirectory, 'dataSetDetails', JSON.stringify({ dataSetDetails: dataSetDetails }), { replace: true }).then(function (_) {
                        console.log("file write succ");
                        error = " Dataset added with id:" + dataSetObj.datasetName;
                        console.log("size:" + dataSetDetails.length);
                        resolve(error);
                    }).catch(function (err) {
                        console.log("file does not write");
                        reject("file does not write");
                    });
                });
            });
        });
    };
    DataSetService.prototype.addWordDatatoDatSetFile = function (file, wordDataObj, dataServiceObject, wordType) {
        var filename = '';
        if (wordType == 0)
            filename = 'datasetDetails';
        else
            filename = 'mathDatasetDetails';
        return new Promise(function (resolve, reject) {
            var fileData;
            var dataSetDetails = [];
            var error;
            dataServiceObject.getDataSetList(file, wordType).then(function (dataSetDetails) {
                console.log("Dataset lencheck:" + dataSetDetails.length);
                var wordArray = [];
                wordArray.push(wordDataObj);
                dataServiceObject.addWordsToDataSet(wordArray, dataSetDetails);
                console.log("dataset Len after:" + dataSetDetails.length);
                file.writeFile(file.dataDirectory, filename, JSON.stringify({ dataSetDetails: dataSetDetails }), { replace: true }).then(function (_) {
                }).catch(function (err) {
                    reject("datasetDetails file does not write");
                });
            }).catch(function (err) {
                console.log("Dataset get not workign " + dataSetDetails.length);
                file.createFile(file.dataDirectory, filename, true).then(function (fileEntry) {
                    var wordArray = [];
                    wordArray.push(wordDataObj);
                    dataServiceObject.addWordsToDataSet(wordArray, dataSetDetails);
                    file.writeFile(file.dataDirectory, filename, JSON.stringify({ dataSetDetails: dataSetDetails }), { replace: true }).then(function (_) {
                        console.log("write succ");
                        error = " Dataset added with id:" + wordDataObj.wordId;
                        resolve(error);
                    }).catch(function (err) {
                        console.log("write unsucc");
                        reject("write unsucc");
                    });
                });
            });
        });
    };
    DataSetService.prototype.removeDataSetFromFile = function (file, dataSetDetails) {
        return new Promise(function (resolve, reject) {
            file.writeFile(file.dataDirectory, 'dataSetDetails', JSON.stringify({ dataSetDetails: dataSetDetails }), { replace: true }).then(function (_) {
                resolve("size:" + dataSetDetails.length);
            }).catch(function (err) {
                reject("file does not write");
            });
        });
    };
    DataSetService.prototype.removeDataSetFromArray = function (dataSetDetails, datasetObj) {
        var remove = false;
        var index = dataSetDetails.indexOf(datasetObj);
        console.log("index:" + index);
        if (index !== -1) {
            console.log("index:" + index);
            dataSetDetails.splice(index, 1);
            remove = true;
            return remove;
        }
        for (var _i = 0, dataSetDetails_1 = dataSetDetails; _i < dataSetDetails_1.length; _i++) {
            var obj = dataSetDetails_1[_i];
            if (obj.datasetName == datasetObj.datasetName) {
                var index_1 = dataSetDetails.indexOf(obj);
                if (index_1 !== -1) {
                    console.log("index:" + index_1);
                    dataSetDetails.splice(index_1, 1);
                    remove = true;
                    return remove;
                }
            }
        }
        return remove;
    };
    DataSetService.prototype.addWordsToDataSet = function (wordDataList, datasetList) {
        for (var _i = 0, wordDataList_1 = wordDataList; _i < wordDataList_1.length; _i++) {
            var wordObj = wordDataList_1[_i];
            var added = false;
            for (var _a = 0, datasetList_1 = datasetList; _a < datasetList_1.length; _a++) {
                var datasetObj = datasetList_1[_a];
                if (wordObj.wordCategory == datasetObj.datasetName) {
                    datasetObj.wordList.push(wordObj);
                    added = true;
                    break;
                }
            }
            if (!added) {
                var newDatasetObj = new __WEBPACK_IMPORTED_MODULE_1__models_Dataset__["a" /* Dataset */]();
                console.log("new dataset:" + wordObj.wordCategory);
                newDatasetObj.datasetName = wordObj.wordCategory;
                newDatasetObj.wordList.push(wordObj);
                datasetList.push(newDatasetObj);
            }
        }
    };
    DataSetService.prototype.removeWordDataFromFile = function (wordDataObj, file, dataServiceObject, wordType) {
        return new Promise(function (resolve, reject) {
            var fileData;
            var dataSetDetails = [];
            var error;
            dataServiceObject.getDataSetList(file, wordType).then(function (dataSetDetails) {
                var wordArray = [];
                wordArray.push(wordDataObj);
                dataServiceObject.removeWordsFromDataSet(wordArray, dataSetDetails);
                var filename = '';
                if (wordType == 0)
                    filename = 'datasetDetails';
                else
                    filename = 'mathDatasetDetails';
                file.writeFile(file.dataDirectory, filename, JSON.stringify({ dataSetDetails: dataSetDetails }), { replace: true }).then(function (_) {
                }).catch(function (err) {
                    reject("datasetDetails file does not write");
                });
            }).catch(function (err) {
                reject("data is not exist");
            });
        });
    };
    DataSetService.prototype.removeWordsFromDataSet = function (wordDataList, datasetList) {
        var wordServiceObject = new __WEBPACK_IMPORTED_MODULE_2__wordServices__["a" /* WordServices */]();
        for (var _i = 0, wordDataList_2 = wordDataList; _i < wordDataList_2.length; _i++) {
            var wordObj = wordDataList_2[_i];
            var removed = false;
            for (var _a = 0, datasetList_2 = datasetList; _a < datasetList_2.length; _a++) {
                var datasetObj = datasetList_2[_a];
                if (wordObj.wordCategory == datasetObj.datasetName) {
                    //datasetObj.wordList.push(wordObj);
                    wordServiceObject.removeWordFromArray(datasetObj.wordList, wordObj);
                    removed = true;
                    if (datasetObj.wordList.length == 0) {
                        this.removeDataSetFromArray(datasetList, datasetObj);
                    }
                    break;
                }
            }
        }
    };
    return DataSetService;
}());

//# sourceMappingURL=dataSetServices.js.map

/***/ }),

/***/ 315:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HomePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__models_user__ = __webpack_require__(77);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_storage__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__models_organizationDetails__ = __webpack_require__(35);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__manageStudentDetails_AddStudent_AddStudent__ = __webpack_require__(638);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__manageStudentDetails_viewStudent_viewStudent__ = __webpack_require__(640);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







var HomePage = /** @class */ (function () {
    function HomePage(navCtrl, navParams, storage) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.storage = storage;
        this.userDetails = new __WEBPACK_IMPORTED_MODULE_2__models_user__["a" /* User */]();
        this.organizationDetails = new __WEBPACK_IMPORTED_MODULE_4__models_organizationDetails__["a" /* OrganizationDetails */]();
    }
    HomePage.prototype.goAddStudentPage = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_5__manageStudentDetails_AddStudent_AddStudent__["a" /* AddStudent */]);
    };
    HomePage.prototype.goExistingStudentPage = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_6__manageStudentDetails_viewStudent_viewStudent__["a" /* ViewStudent */]);
    };
    HomePage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-home',template:/*ion-inline-start:"C:\mystuff\master\AcademicInvertionAPP\backup\htmlDemos\backup\1\AIAPPv4.0\src\components\home\home.html"*/'<ion-header>\n\n  <ion-navbar>\n\n    <button ion-button menuToggle>\n\n      <ion-icon name="menu"></ion-icon>\n\n    </button>\n\n    <ion-title *ngIf="organizationDetails.isSchool" >{{organizationDetails.schoolName}} - Home</ion-title>\n\n    <ion-title *ngIf="! organizationDetails.isSchool"> Home</ion-title>\n\n  </ion-navbar>\n\n</ion-header>\n\n\n\n<ion-content padding>\n\n  <h3> Welcome : {{userDetails.firstname}} {{userDetails.lastname}}  ,</h3>\n\n\n\n\n\n  <ion-content has-header="true" padding="true"  ng-controller="AppCtrl as ctrl" >\n\n   \n\n    <div class="ion-content" style=" padding-top: 25%">\n\n        <div class="row row-center">\n\n            <div class="col col-center">\n\n              <button ion-button (click)="goAddStudentPage()" block> Add New Student </button>\n\n            </div>\n\n          </div>\n\n          \n\n          <div class="row row-center">\n\n            <div class="col col-center">\n\n              <button ion-button (click)="goExistingStudentPage()" block>Existing Student</button>\n\n            </div>\n\n          </div>\n\n          \n\n    </div>\n\n    </ion-content>\n\n</ion-content>\n\n'/*ion-inline-end:"C:\mystuff\master\AcademicInvertionAPP\backup\htmlDemos\backup\1\AIAPPv4.0\src\components\home\home.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_3__ionic_storage__["b" /* Storage */]])
    ], HomePage);
    return HomePage;
}());

//# sourceMappingURL=home.js.map

/***/ }),

/***/ 316:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PostTestWordData; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__wordData__ = __webpack_require__(25);

var PostTestWordData = /** @class */ (function () {
    function PostTestWordData() {
        this.wordData = new __WEBPACK_IMPORTED_MODULE_0__wordData__["a" /* WordData */]();
        this.isKnown = [true, false];
        this.totalKnownWord = 0;
    }
    return PostTestWordData;
}());

//# sourceMappingURL=PostTestWordData.js.map

/***/ }),

/***/ 317:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PostTestWordDataRecordList; });
var PostTestWordDataRecordList = /** @class */ (function () {
    function PostTestWordDataRecordList() {
        this.postTestWordDataArray = [];
        this.subTestCompleted = 0;
        this.maxTest = 3;
        this.knownCounterArray = [0, 0, 0];
        this.consistancyPercentageArray = [0, 0, 0];
    }
    return PostTestWordDataRecordList;
}());

//# sourceMappingURL=postTestWordDataRecordList.js.map

/***/ }),

/***/ 342:
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = 342;

/***/ }),

/***/ 35:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return OrganizationDetails; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__addressFormat__ = __webpack_require__(926);

var OrganizationDetails = /** @class */ (function () {
    function OrganizationDetails() {
        this.organizationDetailsUID = "Organization UID";
        this.isSchool = true;
        this.schoolName = "school name";
        this.schoolCode = "school code";
        this.addressDetails = new __WEBPACK_IMPORTED_MODULE_0__addressFormat__["a" /* AddressFormat */]();
        this.organizationContactNumber = "contact number";
    }
    return OrganizationDetails;
}());

//# sourceMappingURL=organizationDetails.js.map

/***/ }),

/***/ 405:
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = 405;

/***/ }),

/***/ 572:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AddCategoryModal; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ionic_storage__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__models_organizationDetails__ = __webpack_require__(35);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__models_user__ = __webpack_require__(77);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var AddCategoryModal = /** @class */ (function () {
    function AddCategoryModal(navCtrl, alertCtrl, storage, params, viewCtrl) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.alertCtrl = alertCtrl;
        this.storage = storage;
        this.params = params;
        this.viewCtrl = viewCtrl;
        this.userDetails = new __WEBPACK_IMPORTED_MODULE_4__models_user__["a" /* User */]();
        this.organizationDetails = new __WEBPACK_IMPORTED_MODULE_3__models_organizationDetails__["a" /* OrganizationDetails */]();
        this.allData = ["category 1", "category 2", "category 3"];
        this.categoriesList = ["category 1", "category 2", "category 3"];
        this.searchTerm = "";
        this.newCategory = "";
        this.error = "Error Message";
        this.sectedCategoryWordData = "";
        this.wordType = 0;
        this.wordType = params.get('wordType');
        this.storage.get('userDetails').then(function (val) {
            var fileData = JSON.parse(val);
            _this.userDetails = fileData.userDetails;
            _this.storage.get('organizationDetails').then(function (val) {
                var fileData = JSON.parse(val);
                _this.organizationDetails = fileData.organizationDetails;
            });
        });
    }
    ;
    AddCategoryModal.prototype.filterItems = function () {
        var _this = this;
        this.categoriesList = this.allData.filter(function (category) {
            return category.toLowerCase().indexOf(_this.searchTerm.toLowerCase()) > -1;
        });
    };
    AddCategoryModal.prototype.addNewCategory = function () {
        if (this.allData.indexOf(this.newCategory) == -1 && this.newCategory != "Select Category") {
            try {
                this.allData.push(this.newCategory);
                this.filterItems();
                this.newCategory = '';
                this.error = '';
            }
            catch (e) {
                this.error = "" + e;
            }
        }
    };
    AddCategoryModal.prototype.dismiss = function () {
        this.viewCtrl.dismiss({
            category: this.sectedCategoryWordData
        });
    };
    AddCategoryModal.prototype.selectedCategory = function (categoryObject) {
        this.sectedCategoryWordData = categoryObject;
        this.dismiss();
    };
    AddCategoryModal.prototype.removeCategory = function (categoryObject) {
        this.presentConfirm(categoryObject);
    };
    AddCategoryModal.prototype.presentConfirm = function (categoryObject) {
        var _this = this;
        var alert = this.alertCtrl.create({
            title: 'Remove Category',
            message: 'Do you want to remove category ' + categoryObject + '?',
            buttons: [
                {
                    text: 'Cancel',
                    role: 'cancel',
                    handler: function () {
                        console.log('Cancel clicked');
                    }
                },
                {
                    text: 'yes',
                    handler: function () {
                        _this.filterItems();
                        console.log('Removed ');
                    }
                }
            ]
        });
        alert.present();
    };
    AddCategoryModal = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-addCategoryModal',template:/*ion-inline-start:"C:\mystuff\master\AcademicInvertionAPP\backup\htmlDemos\backup\1\AIAPPv4.0\src\components\addWordList\addCategoryModal\addCategoryModal.html"*/'<ion-header>\n\n    <ion-navbar>\n\n      <button ion-button menuToggle>\n\n        <ion-icon name="menu"></ion-icon>\n\n      </button>\n\n      <ion-title>Select Category</ion-title>\n\n    </ion-navbar>\n\n    </ion-header>\n\n    \n\n    <ion-content padding>\n\n\n\n    <ion-content padding="\'true\'" scroll="false" class="has-header">\n\n        <ion-card>\n\n          \n\n            <form class="list" #categoryForm="ngForm" (ngSubmit)="addNewCategory()">\n\n                <ion-row>\n\n                    <ion-col>\n\n                      <ion-list inset>\n\n                \n\n                        <ion-item>\n\n                          <ion-label text-wrap >Enter Category : </ion-label>\n\n                          <ion-input name="newCategory" required [(ngModel)]="newCategory" type="text"></ion-input>\n\n                        </ion-item>\n\n                          \n\n                          <ion-grid style="height: 100%">\n\n                              <ion-row justify-content-center align-items-center style="height: 100%">\n\n                                    <button ion-button class="submit-btn" full type="submit" [disabled]="!categoryForm.form.valid">Add Category \n\n                                    </button>\n\n                              </ion-row>\n\n                          </ion-grid>\n\n          \n\n                    </ion-list>\n\n                </ion-col>\n\n                </ion-row>\n\n              </form>\n\n    \n\n          <ion-searchbar [(ngModel)]="searchTerm" (ionInput)="filterItems()"></ion-searchbar>\n\n          <ion-list radio-group >\n\n                <ion-grid>\n\n                  <ion-item *ngFor="let categoryObject of categoriesList; let i = index">\n\n\n\n                      <ion-row  >\n\n                        \n\n                        <ion-col col-2> \n\n                                <ion-grid style="height: 100%">\n\n                                        <ion-row justify-content-center align-items-center style="height: 100%">\n\n                                        \n\n                                <ion-item>\n\n                                    <ion-radio *ngIf="i == 0" slot="selectedCategory" value="{{categoryObject}}" checked  (ionSelect)="selectedCategory(categoryObject)">        \n\n\n\n                                    </ion-radio>\n\n                                        <ion-radio *ngIf="i != 0" slot="selectedCategory" value="{{categoryObject}}"   (ionSelect)="selectedCategory(categoryObject)" >        \n\n                                        </ion-radio>\n\n                                   </ion-item>\n\n                                        </ion-row> \n\n                                   </ion-grid>\n\n                        </ion-col>\n\n                        <ion-col >\n\n                                <ion-grid style="height: 100%">\n\n                                        <ion-row justify-content-center align-items-center style="height: 100%">\n\n                                    \n\n                            {{categoryObject}}\n\n                                </ion-row>\n\n                            </ion-grid>\n\n                        </ion-col>\n\n                        <ion-col >\n\n                                <ion-grid style="height: 100%">\n\n                                        <ion-row justify-content-center align-items-center style="height: 100%">\n\n                                    \n\n                            <button ion-button color="danger" (click) = "removeCategory(categoryObject)"> <ion-icon name="trash" ></ion-icon>Delete</button>\n\n                                </ion-row>\n\n                            </ion-grid>\n\n                        </ion-col>\n\n                      \n\n                      </ion-row>\n\n                    </ion-item>\n\n                </ion-grid>\n\n            </ion-list>\n\n        </ion-card>\n\n      </ion-content>\n\n    </ion-content>\n\n    '/*ion-inline-end:"C:\mystuff\master\AcademicInvertionAPP\backup\htmlDemos\backup\1\AIAPPv4.0\src\components\addWordList\addCategoryModal\addCategoryModal.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["h" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["a" /* AlertController */],
            __WEBPACK_IMPORTED_MODULE_1__ionic_storage__["b" /* Storage */],
            __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["i" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["l" /* ViewController */]])
    ], AddCategoryModal);
    return AddCategoryModal;
}());

//# sourceMappingURL=addCategoryModal.js.map

/***/ }),

/***/ 573:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AddWordList; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__models_wordData__ = __webpack_require__(25);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_file__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ionic_angular__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_storage__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__services_dataSetServices__ = __webpack_require__(292);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__addCategoryModal_addCategoryModal__ = __webpack_require__(572);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







var AddWordList = /** @class */ (function () {
    function AddWordList(file, params, viewCtrl, storage, modalCtrl) {
        // this.fromModal = params.get('fromModal');
        var _this = this;
        this.file = file;
        this.params = params;
        this.viewCtrl = viewCtrl;
        this.storage = storage;
        this.modalCtrl = modalCtrl;
        this.wordCategory = "Select Category";
        this.fromModal = false;
        this.isWord = true;
        this.wordType = 0;
        this.storage.get('organizationDetails').then(function (val) {
            var fileData = JSON.parse(val);
            _this.organizationDetails = fileData.organizationDetails;
            _this.dataSetService = new __WEBPACK_IMPORTED_MODULE_5__services_dataSetServices__["a" /* DataSetService */]();
        });
    }
    AddWordList.prototype.addNewWord = function () {
        try {
            if (this.wordCategory == null || this.wordCategory.length == 0 || this.wordCategory == "Select Category") {
                this.error = " Select Category to add the word.";
            }
            else {
                this.wordData = new __WEBPACK_IMPORTED_MODULE_1__models_wordData__["a" /* WordData */]();
                console.log("word:" + this.wordText + "  cat:" + this.wordCategory);
                this.wordData.wordText = this.wordText;
                this.wordData.wordCategory = this.wordCategory;
            }
        }
        catch (e) {
            this.error = e;
        }
    };
    AddWordList.prototype.dismiss = function (wordData) {
        this.viewCtrl.dismiss(this.wordData);
    };
    AddWordList.prototype.selectCateory = function () {
        var _this = this;
        var profileModal = this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_6__addCategoryModal_addCategoryModal__["a" /* AddCategoryModal */], {
            wordType: this.wordType
        }, {
            cssClass: 'update-profile-modal'
        });
        profileModal.present();
        profileModal.onDidDismiss(function (data) {
            var category = data.category;
            if (category != "" || category.length > 0)
                _this.wordCategory = category;
        });
    };
    AddWordList.prototype.changeWordType = function () {
        if (this.isWord)
            this.wordType = 0;
        else
            this.wordType = 1;
        this.wordCategory = "Select Category";
    };
    AddWordList = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-addWordList',template:/*ion-inline-start:"C:\mystuff\master\AcademicInvertionAPP\backup\htmlDemos\backup\1\AIAPPv4.0\src\components\addWordList\addWordList.html"*/'<ion-header>\n\n    <ion-navbar>\n\n      <button ion-button menuToggle *ngIf="!fromModal ">\n\n        <ion-icon name="menu"></ion-icon>\n\n      </button>\n\n      <ion-title>Add Words/MathFacts</ion-title>\n\n    </ion-navbar>\n\n    </ion-header>\n\n    \n\n    <ion-content padding>\n\n    <ion-grid style="height: 10%">\n\n      <ion-row justify-content-center align-items-center style="height: 100%">\n\n        <h3 > Add Word/MathFact Details : </h3>\n\n      </ion-row>\n\n    </ion-grid>\n\n    \n\n    \n\n    <div *ngIf="error" class="error-message">{{error}}</div>\n\n    <ion-content padding="\'true\'" scroll="false" class="has-header">\n\n        <ion-card>\n\n          \n\n          <form class="list" #newStudentForm="ngForm" (ngSubmit)="addNewWord()">\n\n          \n\n              <ion-row>\n\n                  <ion-col>\n\n                    <ion-list inset>\n\n              \n\n                  <ion-item>\n\n                    <ion-label text-wrap >Word : </ion-label>\n\n                    <ion-input name="wordText" required [(ngModel)]="wordText" type="text"></ion-input>\n\n                  </ion-item>\n\n                  <ion-item>\n\n                      <ion-label text-wrap >Word Type : </ion-label>\n\n                      <ion-label text-wrap *ngIf ="isWord" >Words</ion-label>\n\n                      <ion-label text-wrap *ngIf ="!isWord" >Math Facts</ion-label> \n\n                      <ion-toggle [(ngModel)]="isWord" (ionChange)="changeWordType()" [ngModelOptions]="{standalone: true}">\n\n                      </ion-toggle>\n\n                     \n\n                  </ion-item>\n\n                  <ion-item (click)="selectCateory()"  style="color: blue">\n\n                      {{wordCategory}}\n\n                  </ion-item>\n\n\n\n                            <ion-grid style="height: 100%">\n\n                                <ion-row justify-content-center align-items-center style="height: 100%">\n\n                                        <button ion-button class="submit-btn" full type="submit" *ngIf ="isWord" [disabled]="!newStudentForm.form.valid">Add Word\n\n                                          </button>\n\n                                        <button ion-button class="submit-btn" full type="submit" *ngIf ="!isWord" [disabled]="!newStudentForm.form.valid">Add Math Fact\n\n                                          </button>\n\n                                  </ion-row>\n\n                              </ion-grid>\n\n                  </ion-list>\n\n              </ion-col>\n\n              </ion-row>\n\n            </form>\n\n        </ion-card>\n\n      </ion-content>\n\n    </ion-content>\n\n    '/*ion-inline-end:"C:\mystuff\master\AcademicInvertionAPP\backup\htmlDemos\backup\1\AIAPPv4.0\src\components\addWordList\addWordList.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2__ionic_native_file__["a" /* File */],
            __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["i" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["l" /* ViewController */],
            __WEBPACK_IMPORTED_MODULE_4__ionic_storage__["b" /* Storage */],
            __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["f" /* ModalController */]])
    ], AddWordList);
    return AddWordList;
}());

//# sourceMappingURL=addWordList.js.map

/***/ }),

/***/ 576:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Method; });
var Method = /** @class */ (function () {
    function Method(methodName, methodIndex) {
        this.methodIndex = 0;
        this.totalSessions = 0; // total completed sessions
        this.sessionsArray = []; // number of sessions
        this.ratio1 = 0;
        this.ratio2 = 0;
        this.totalOppurtunitiesToRespond = 0;
        this.methodName = methodName;
        this.methodIndex = methodIndex;
        if (methodIndex == 0) {
            this.ratio1 = 5;
            this.ratio2 = 6;
        }
        else if (methodIndex == 1) {
            this.ratio1 = 6;
            this.ratio2 = 6;
            this.totalOppurtunitiesToRespond = 120;
        }
        else if (methodIndex == 2) {
            this.ratio1 = 31;
            this.ratio2 = 4;
        }
        else {
            this.ratio1 = 1;
            this.ratio2 = 1;
        }
    }
    return Method;
}());

//# sourceMappingURL=methodIntervetion.js.map

/***/ }),

/***/ 577:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return StudentData; });
var StudentData = /** @class */ (function () {
    function StudentData() {
        this.firstName = " first name";
        this.studentUID = "Student UID";
        this.lastName = "Last Name";
        this.studentId = "Student Id";
    }
    return StudentData;
}());

//# sourceMappingURL=StudentData.js.map

/***/ }),

/***/ 578:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ViewAssessmentWordObjects; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__wordData__ = __webpack_require__(25);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_angular2_uuid__ = __webpack_require__(574);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_angular2_uuid___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_angular2_uuid__);


var ViewAssessmentWordObjects = /** @class */ (function () {
    function ViewAssessmentWordObjects() {
        this.assessmentWordObjectId = "uuid number";
        this.wordData = new __WEBPACK_IMPORTED_MODULE_0__wordData__["a" /* WordData */]();
        this.testArrayKnown = [false];
        this.stringKnownArray = ["k1", "k2"];
        this.totalKnownTime = 0;
        this.totalTest = 0;
        this.wordAdded = false;
        this.wordType = "word type";
        this.assessmentWordObjectId = __WEBPACK_IMPORTED_MODULE_1_angular2_uuid__["UUID"].UUID();
    }
    return ViewAssessmentWordObjects;
}());

//# sourceMappingURL=viewAssessmentWordObjects.js.map

/***/ }),

/***/ 579:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PreSessionResultTest; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__wordData__ = __webpack_require__(25);

var PreSessionResultTest = /** @class */ (function () {
    function PreSessionResultTest() {
        this.wordData = new __WEBPACK_IMPORTED_MODULE_0__wordData__["a" /* WordData */]();
        this.test1Known = false;
        this.test2Known = false;
        this.isKnownWord = false;
        this.notes = "Notes";
    }
    return PreSessionResultTest;
}());

//# sourceMappingURL=PreSessionAssessmentResultTest.js.map

/***/ }),

/***/ 637:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AdminHomePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_storage__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__models_user__ = __webpack_require__(77);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var AdminHomePage = /** @class */ (function () {
    function AdminHomePage(navCtrl, navParams, storage) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.storage = storage;
        this.userDetails = new __WEBPACK_IMPORTED_MODULE_3__models_user__["a" /* User */]();
    }
    AdminHomePage.prototype.addNewUserEmail = function () {
        console.log('Add student');
        //this.navCtrl.push(AddEmailList);
    };
    AdminHomePage.prototype.updateRegisteredUser = function () {
        console.log('View student');
        //this.navCtrl.push(AddAdminAccess);
    };
    AdminHomePage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-adminHomePage',template:/*ion-inline-start:"C:\mystuff\master\AcademicInvertionAPP\backup\htmlDemos\backup\1\AIAPPv4.0\src\components\home\adminHomePage\adminHomePage.html"*/'<ion-header>\n\n  <ion-navbar>\n\n    <button ion-button menuToggle>\n\n      <ion-icon name="menu"></ion-icon>\n\n    </button>\n\n    <ion-title>Admin</ion-title>\n\n  </ion-navbar>\n\n</ion-header>\n\n\n\n<ion-content padding>\n\n  <h3> Welcome : {{userDetails.firstname}} {{userDetails.lastname}}  ,</h3>\n\n\n\n\n\n  <ion-content has-header="true" padding="true"  ng-controller="AppCtrl as ctrl" >\n\n   \n\n    <div class="ion-content" style=" padding-top: 25%">\n\n        <div class="row row-center">\n\n            <div class="col col-center">\n\n              <button ion-button (click)="addNewUserEmail()" block> Add New User Email </button>\n\n            </div>\n\n          </div>\n\n          \n\n          <div class="row row-center">\n\n            <div class="col col-center">\n\n              <button ion-button (click)="updateRegisteredUser()" block>Update User Role</button>\n\n            </div>\n\n          </div>\n\n          \n\n    </div>\n\n    </ion-content>\n\n</ion-content>\n\n'/*ion-inline-end:"C:\mystuff\master\AcademicInvertionAPP\backup\htmlDemos\backup\1\AIAPPv4.0\src\components\home\adminHomePage\adminHomePage.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_2__ionic_storage__["b" /* Storage */]])
    ], AdminHomePage);
    return AdminHomePage;
}());

//# sourceMappingURL=adminHomePage.js.map

/***/ }),

/***/ 638:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AddStudent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__models_organizationDetails__ = __webpack_require__(35);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__models_student__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__home_home__ = __webpack_require__(315);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__studentDashBoard_studentDashBoard__ = __webpack_require__(639);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var AddStudent = /** @class */ (function () {
    function AddStudent(navCtrl) {
        this.navCtrl = navCtrl;
        this.studentDetailsArray = [];
        this.error = "Error Message";
        this.organizationDetails = new __WEBPACK_IMPORTED_MODULE_2__models_organizationDetails__["a" /* OrganizationDetails */]();
    }
    AddStudent.prototype.addNewStudent = function () {
        var _this = this;
        try {
            this.studentDetails = new __WEBPACK_IMPORTED_MODULE_3__models_student__["a" /* Student */]();
            this.studentDetails.studentData.firstName = this.firstname;
            this.studentDetails.studentData.lastName = this.lastname;
            this.studentDetails.studentData.studentId = this.studentid;
            this.firstname = "";
            this.lastname = "";
            this.studentid = "";
            this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_4__home_home__["a" /* HomePage */]).then(function () {
                _this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_5__studentDashBoard_studentDashBoard__["a" /* StudentdashBoard */]);
            }).catch(function (err) {
                _this.error = err;
            });
        }
        catch (e) {
            this.error = "" + e;
            console.log(e);
        }
    };
    AddStudent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-addStudent',template:/*ion-inline-start:"C:\mystuff\master\AcademicInvertionAPP\backup\htmlDemos\backup\1\AIAPPv4.0\src\components\manageStudentDetails\AddStudent\addStudent.html"*/'<ion-header>\n\n<ion-navbar>\n\n  <button ion-button menuToggle>\n\n    <ion-icon name="menu"></ion-icon>\n\n  </button>\n\n  <ion-title *ngIf="organizationDetails.isSchool" >{{organizationDetails.schoolName}} - Add Student</ion-title>\n\n    <ion-title *ngIf="! organizationDetails.isSchool"> Add Student</ion-title>\n\n  \n\n</ion-navbar>\n\n</ion-header>\n\n\n\n<ion-content padding>\n\n<ion-grid style="height: 10%">\n\n  <ion-row justify-content-center align-items-center style="height: 100%">\n\n    <h3 > Add Student Details : </h3>\n\n  </ion-row>\n\n</ion-grid>\n\n\n\n\n\n<div *ngIf="error" class="error-message">{{error}}</div>\n\n<ion-content padding="\'true\'" scroll="false" class="has-header">\n\n    <ion-card>\n\n      <form class="list" #newStudentForm="ngForm" (ngSubmit)="addNewStudent()">\n\n          <ion-row>\n\n              <ion-col>\n\n                <ion-list inset>\n\n          \n\n              <ion-item>\n\n                <ion-label text-wrap >First Name : </ion-label>\n\n                <ion-input name="firstname" required [(ngModel)]="firstname" type="text"></ion-input>\n\n              </ion-item>\n\n              <ion-item>\n\n                  <ion-label text-wrap >Last Name : </ion-label>\n\n                  <ion-input  name="lastname" required [(ngModel)]="lastname" type="text"></ion-input>\n\n                </ion-item>\n\n                <ion-item>\n\n                    <ion-label text-wrap >Student Id : </ion-label>\n\n                    <ion-input  name="studentid" required [(ngModel)]="studentid" type="text"></ion-input>\n\n                  </ion-item>\n\n                \n\n                        <ion-grid style="height: 100%">\n\n                            <ion-row justify-content-center align-items-center style="height: 100%">\n\n                                    <button ion-button class="submit-btn" full type="submit" [disabled]="!newStudentForm.form.valid">Add Student\n\n                                      </button>\n\n                              </ion-row>\n\n                          </ion-grid>\n\n              </ion-list>\n\n          </ion-col>\n\n          </ion-row>\n\n        </form>\n\n    </ion-card>\n\n  </ion-content>\n\n</ion-content>\n\n'/*ion-inline-end:"C:\mystuff\master\AcademicInvertionAPP\backup\htmlDemos\backup\1\AIAPPv4.0\src\components\manageStudentDetails\AddStudent\addStudent.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */]])
    ], AddStudent);
    return AddStudent;
}());

//# sourceMappingURL=AddStudent.js.map

/***/ }),

/***/ 639:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return StudentdashBoard; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ionic_native_file__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_storage__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ionic_angular__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__models_methodIntervetion__ = __webpack_require__(576);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__models_organizationDetails__ = __webpack_require__(35);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__models_student__ = __webpack_require__(26);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







var StudentdashBoard = /** @class */ (function () {
    function StudentdashBoard(navCtrl, navParams, storage, file, modalCtrl) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.storage = storage;
        this.file = file;
        this.modalCtrl = modalCtrl;
        this.studentObject = new __WEBPACK_IMPORTED_MODULE_6__models_student__["a" /* Student */]();
        // private beginAssessmentDone:boolean ;
        this.methodObjectArray = [new __WEBPACK_IMPORTED_MODULE_4__models_methodIntervetion__["a" /* Method */]("method name", 0)];
        this.PreInterventionAssessmentResults = true;
        this.knownWordLength = 0;
        this.newLearnedWordLength = 0;
        this.unKnownWordLength = 0;
        this.learningWordsLength = 0;
        this.ratio1 = 0;
        this.ratio2 = 0;
        this.error = "Error Message";
        this.organizationDetails = new __WEBPACK_IMPORTED_MODULE_5__models_organizationDetails__["a" /* OrganizationDetails */]();
        this.isWord = true;
        this.wordType = 0;
        this.constructorMethod();
    }
    StudentdashBoard.prototype.constructorMethod = function () {
    };
    StudentdashBoard.prototype.ionViewWillEnter = function () {
        this.constructorMethod();
    };
    StudentdashBoard.prototype.refreshData = function () {
        if (this.studentObject.studentWordDetailsArray[this.wordType].knwonArrayList == null)
            this.studentObject.studentWordDetailsArray[this.wordType].knwonArrayList = [];
        if (this.studentObject.studentWordDetailsArray[this.wordType].unKnownArrayList == null)
            this.studentObject.studentWordDetailsArray[this.wordType].unKnownArrayList = [];
        if (this.studentObject.studentWordDetailsArray[this.wordType].newKnownUnknownArrayList == null)
            this.studentObject.studentWordDetailsArray[this.wordType].newKnownUnknownArrayList = [];
        this.knownWordLength = this.studentObject.studentWordDetailsArray[this.wordType].knwonArrayList.length;
        this.unKnownWordLength = this.studentObject.studentWordDetailsArray[this.wordType].unKnownArrayList.length;
        this.newLearnedWordLength = this.studentObject.studentWordDetailsArray[this.wordType].newKnownUnknownArrayList.length;
        this.methodObjectArray = this.studentObject.studentWordDetailsArray[this.wordType].methodArray;
        this.learningWordsLength = this.getLearningWordsLength();
    };
    StudentdashBoard.prototype.getLearningWordsLength = function () {
        var learningWordsLength = 0;
        for (var _i = 0, _a = this.studentObject.studentWordDetailsArray[this.wordType].methodArray; _i < _a.length; _i++) {
            var methodObj = _a[_i];
            console.log("learningWordsLength:" + learningWordsLength + "  l:" + methodObj.methodIndex);
            if (methodObj.sessionsArray != null && methodObj.sessionsArray.length > 0 && methodObj.sessionsArray[methodObj.sessionsArray.length - 1].unknownWordList != null)
                learningWordsLength += methodObj.sessionsArray[methodObj.sessionsArray.length - 1].unknownWordList.length;
        }
        return learningWordsLength;
    };
    StudentdashBoard.prototype.viewAssessment = function () {
    };
    StudentdashBoard.prototype.startInterventionTest = function (methodIndex) {
        // this.checkRatio(methodIndex);
    };
    StudentdashBoard.prototype.doPostAssessment = function () {
    };
    StudentdashBoard.prototype.viewStudentWords = function () {
    };
    StudentdashBoard.prototype.checkRatio = function (methodIndex) {
    };
    StudentdashBoard.prototype.goBackToView = function () {
    };
    StudentdashBoard.prototype.changeWordType = function () {
    };
    StudentdashBoard = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-StudentdashBoaord',template:/*ion-inline-start:"C:\mystuff\master\AcademicInvertionAPP\backup\htmlDemos\backup\1\AIAPPv4.0\src\components\studentDashBoard\studentDashBoard.html"*/'<ion-header>\n\n    <ion-navbar>\n\n      <button ion-button menuToggle>\n\n        <ion-icon name="menu"></ion-icon>\n\n      </button>\n\n      <ion-title>Existing Students</ion-title>\n\n    </ion-navbar>\n\n  </ion-header>\n\n  \n\n  <ion-content padding>\n\n        <ion-grid style="height: 10%">\n\n                <ion-row justify-content-center align-items-center style="height: 100%">\n\n                        <h3> {{studentObject.studentData.firstName}}  {{studentObject.studentData.lastName}} </h3>\n\n                </ion-row>\n\n              </ion-grid>\n\n   </ion-content>\n\n  \n\n\n\n    <ion-content has-header="true" padding="true"  ng-controller="AppCtrl as ctrl" >\n\n      <!-- <div class="ion-content" style=" padding-top: 20%" *ngIf="beginAssessmentDone">\n\n       -->\n\n      <div class="ion-content"   style=" padding-top: 10%">\n\n        <ion-grid style="height: 100%">\n\n          \n\n          <ion-row justify-content-center align-items-center style="height: 100%">\n\n              <button ion-button class="submit-btn" full (click)="viewAssessment()">Pre Assessment</button>\n\n        </ion-row>\n\n       \n\n        <ion-row justify-content-center align-items-center style="height: 100%">\n\n          <button ion-button class="submit-btn" full (click)="doPostAssessment()">Post Assessment</button>\n\n          </ion-row>\n\n       \n\n        </ion-grid>\n\n        <ion-card>\n\n          <!-- <ion-searchbar [(ngModel)]="searchTerm" (ionInput)="filterItems()"></ion-searchbar> -->\n\n          <div *ngIf="error" class="error-message">{{error}}</div>\n\n          <ion-item>\n\n            <ion-label text-wrap >Word Type : </ion-label>\n\n            <ion-label text-wrap *ngIf ="isWord" >Words</ion-label>\n\n            <ion-label text-wrap *ngIf ="!isWord" >Math Facts</ion-label> \n\n            <ion-toggle [(ngModel)]="isWord" (ionChange)="changeWordType()" [ngModelOptions]="{standalone: true}">\n\n            </ion-toggle>\n\n           \n\n          </ion-item>\n\n          <ion-item style="text-align: center;">\n\n            \n\n              <ion-row class="ion-title" >\n\n                  <ion-col style="background-color: silver;">Pre Intervention Results:</ion-col>\n\n                  <ion-col (click)="viewStudentWords()" style="color: blue" >{{knownWordLength}} Known / {{unKnownWordLength}} Unknown / {{newLearnedWordLength}} Learned Word / {{learningWordsLength}} Learning Words </ion-col>\n\n              </ion-row>\n\n          </ion-item>\n\n          <br>\n\n          \n\n            <ion-item style="text-align: center;" *ngIf="knownWordLength || unKnownWordLength ">\n\n                <ion-row class="ion-title" style="background-color: silver;">\n\n                    <ion-col >Intervention Test</ion-col>\n\n                    <ion-col >Progress</ion-col>\n\n                    \n\n                  </ion-row>\n\n                  <ion-item *ngFor="let methodObject of methodObjectArray"  style="text-align: center;">\n\n                      <ion-row  >\n\n                          <ion-col style="color: blue" (click)="startInterventionTest(methodObject.methodIndex)" >{{methodObject.methodName}}</ion-col>\n\n\n\n                          <ion-col *ngIf="methodObject.sessionsArray">{{methodObject.sessionsArray.length}}</ion-col>\n\n                          <ion-col *ngIf="!methodObject.sessionsArray">0</ion-col>\n\n                          \n\n                      \n\n                      </ion-row>\n\n                    </ion-item>\n\n            </ion-item>\n\n        </ion-card>\n\n      </div>\n\n\n\n      <!-- <div class="ion-content" *ngIf="!beginAssessmentDone"  style=" padding-top: 10%">\n\n        <ion-grid style="height: 100%">\n\n          <ion-row>\n\n              No Data Available : This student has not yet completed the Known/Unknown Item Assessment. \n\n          </ion-row>\n\n          <ion-row justify-content-center align-items-center style="height: 100%">\n\n                  <button ion-button class="submit-btn" full (click)="beginAssessment()">Begin Assessment</button>\n\n            </ion-row>\n\n        </ion-grid>\n\n      </div> -->\n\n    </ion-content>\n\n\n\n  '/*ion-inline-end:"C:\mystuff\master\AcademicInvertionAPP\backup\htmlDemos\backup\1\AIAPPv4.0\src\components\studentDashBoard\studentDashBoard.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_3_ionic_angular__["h" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["i" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_2__ionic_storage__["b" /* Storage */],
            __WEBPACK_IMPORTED_MODULE_1__ionic_native_file__["a" /* File */],
            __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["f" /* ModalController */]])
    ], StudentdashBoard);
    return StudentdashBoard;
}());

//# sourceMappingURL=studentDashBoard.js.map

/***/ }),

/***/ 640:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ViewStudent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ionic_native_document_picker__ = __webpack_require__(230);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_file__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_social_sharing__ = __webpack_require__(232);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_storage__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_ionic_angular__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__models_organizationDetails__ = __webpack_require__(35);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__models_StudentData__ = __webpack_require__(577);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__models_user__ = __webpack_require__(77);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__services_studentAddRemoveServices__ = __webpack_require__(1363);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};










var ViewStudent = /** @class */ (function () {
    function ViewStudent(navCtrl, file, alertCtrl, storage, plt, socialSharing, docPicker) {
        this.navCtrl = navCtrl;
        this.file = file;
        this.alertCtrl = alertCtrl;
        this.storage = storage;
        this.plt = plt;
        this.socialSharing = socialSharing;
        this.docPicker = docPicker;
        this.studentDetailsArray = [new __WEBPACK_IMPORTED_MODULE_7__models_StudentData__["a" /* StudentData */]()];
        this.allData = [new __WEBPACK_IMPORTED_MODULE_7__models_StudentData__["a" /* StudentData */]()];
        this.studentServicesObject = new __WEBPACK_IMPORTED_MODULE_9__services_studentAddRemoveServices__["a" /* StudentServices */]();
        this.searchTerm = '';
        this.error = "Error Message";
        this.userDetails = new __WEBPACK_IMPORTED_MODULE_8__models_user__["a" /* User */]();
        this.organizationDetails = new __WEBPACK_IMPORTED_MODULE_6__models_organizationDetails__["a" /* OrganizationDetails */]();
        this.constructorMethod();
    }
    ;
    ViewStudent.prototype.filterItems = function () {
        var _this = this;
        this.studentDetailsArray = this.allData.filter(function (student) {
            return student.firstName.toLowerCase().indexOf(_this.searchTerm.toLowerCase()) > -1 ||
                student.lastName.toLowerCase().indexOf(_this.searchTerm.toLowerCase()) > -1 ||
                student.studentId.toLowerCase().indexOf(_this.searchTerm.toLowerCase()) > -1;
        });
    };
    ViewStudent.prototype.ionViewDidLoad = function () {
        this.storage.set('studentObject', null);
        //   this.storage.clear();
    };
    ViewStudent.prototype.ionViewWillEnter = function () {
        //  this.constructorMethod();
    };
    ViewStudent.prototype.constructorMethod = function () {
    };
    ViewStudent.prototype.removeStudent = function (studentObj) {
        if (this.userDetails.userRole != "faculty") {
            this.error = "";
            this.presentConfirm(studentObj);
        }
        else {
            this.error = " You are not Admin.";
        }
    };
    ViewStudent.prototype.viewStudentData = function (studentObj) {
    };
    ViewStudent.prototype.presentConfirm = function (studentObj) {
        var _this = this;
        var alert = this.alertCtrl.create({
            title: 'Remove Student',
            message: 'Do you want to remove Student ' + studentObj.studentId + '?',
            buttons: [
                {
                    text: 'Cancel',
                    role: 'cancel',
                    handler: function () {
                        console.log('Cancel clicked');
                    }
                },
                {
                    text: 'yes',
                    handler: function () {
                        _this.studentServicesObject.removeStudentFromArray(_this.allData, studentObj);
                        _this.filterItems();
                        console.log('yes clicked');
                    }
                }
            ]
        });
        alert.present();
    };
    ViewStudent.prototype.exportStudentFile = function () {
        //  this.studentServicesObject.exportStudentFileFromArray(this.file,this.plt,this.socialSharing,this.organizationDetails.organizationDetailsUID);
    };
    ViewStudent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-viewStudent',template:/*ion-inline-start:"C:\mystuff\master\AcademicInvertionAPP\backup\htmlDemos\backup\1\AIAPPv4.0\src\components\manageStudentDetails\viewStudent\viewStudent.html"*/'<ion-header>\n\n  <ion-navbar>\n\n    <button ion-button menuToggle>\n\n      <ion-icon name="menu"></ion-icon>\n\n    </button>\n\n    <ion-title>View Student</ion-title>\n\n  </ion-navbar>\n\n  </ion-header>\n\n  \n\n  <ion-content padding>\n\n  <ion-grid style="height: 10%">\n\n    <ion-row justify-content-center align-items-center style="height: 100%">\n\n      <h3 > View Student : </h3>\n\n    </ion-row>\n\n  </ion-grid>\n\n  \n\n  \n\n  <div *ngIf="error" class="error-message">{{error}}</div>\n\n  <ion-content padding="\'true\'" scroll="false" class="has-header">\n\n      <ion-card>\n\n          <ion-searchbar [(ngModel)]="searchTerm" (ionInput)="filterItems()"></ion-searchbar>\n\n\n\n          <ion-grid style="height: 100%">\n\n              <ion-row justify-content-center align-items-center style="height: 100%">\n\n                      <button ion-button class="submit-btn" full type="submit" (click)="exportStudentFile()">Export Students</button>\n\n                </ion-row>\n\n            </ion-grid>\n\n\n\n            <!-- <ion-grid style="height: 100%">\n\n              <ion-row justify-content-center align-items-center style="height: 100%">\n\n                      <button ion-button class="submit-btn" full type="submit" (click)="importStudentFile()">Import Students</button>\n\n                </ion-row>\n\n            </ion-grid> -->\n\n\n\n\n\n          <ion-item  >\n\n\n\n              <ion-row class="ion-title" style="background-color: silver;">\n\n                  <ion-col >Student ID</ion-col>\n\n                  <ion-col >Name</ion-col>\n\n                  <ion-col ></ion-col>\n\n                  \n\n                </ion-row>\n\n                <ion-item *ngFor="let studentObjects of studentDetailsArray">\n\n                    <ion-row  >\n\n                        <ion-col (click)="viewStudentData(studentObjects)" >{{studentObjects.studentId}}</ion-col>\n\n                        <ion-col (click)="viewStudentData(studentObjects)" >{{studentObjects.firstName}} {{studentObjects.lastName}}</ion-col>\n\n                        <ion-col >\n\n                          <ion-item (click)="removeStudent(studentObjects)"  style="color: blue">\n\n                           \n\n                              Remove Student\n\n                          </ion-item>\n\n                        </ion-col>\n\n                    \n\n                    </ion-row>\n\n                  </ion-item>\n\n          </ion-item>\n\n        \n\n      </ion-card>\n\n    </ion-content>\n\n  </ion-content>\n\n  '/*ion-inline-end:"C:\mystuff\master\AcademicInvertionAPP\backup\htmlDemos\backup\1\AIAPPv4.0\src\components\manageStudentDetails\viewStudent\viewStudent.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_5_ionic_angular__["h" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_2__ionic_native_file__["a" /* File */],
            __WEBPACK_IMPORTED_MODULE_5_ionic_angular__["a" /* AlertController */],
            __WEBPACK_IMPORTED_MODULE_4__ionic_storage__["b" /* Storage */],
            __WEBPACK_IMPORTED_MODULE_5_ionic_angular__["j" /* Platform */],
            __WEBPACK_IMPORTED_MODULE_3__ionic_native_social_sharing__["a" /* SocialSharing */],
            __WEBPACK_IMPORTED_MODULE_1__ionic_native_document_picker__["a" /* DocumentPicker */]])
    ], ViewStudent);
    return ViewStudent;
}());

//# sourceMappingURL=viewStudent.js.map

/***/ }),

/***/ 641:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AddUserDetails; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ionic_native_file__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_storage__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ionic_angular__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__models_organizationDetails__ = __webpack_require__(35);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__models_user__ = __webpack_require__(77);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var AddUserDetails = /** @class */ (function () {
    function AddUserDetails(navCtrl, file, navParams, storage) {
        this.navCtrl = navCtrl;
        this.file = file;
        this.navParams = navParams;
        this.storage = storage;
        this.firstname = "First Name";
        this.lastname = "Last Name";
        this.emailId = "Email Id";
        this.password = "Password";
        this.reTypePassword = "Password";
        this.error = "Error Message";
        this.emailVerfied = false;
        this.securityQuestion = "Security Question ?";
        this.answer = "Security Answer";
        this.emailSent = "Email Sent";
        this.showForm = true;
        this.passwordType = Array(3).fill('password');
        this.passwordIcon = Array(3).fill('eye-off');
        this.schoolcode = "123456";
        this.schoolAddress = "School Address";
        this.organizationDetails = new __WEBPACK_IMPORTED_MODULE_4__models_organizationDetails__["a" /* OrganizationDetails */]();
    }
    AddUserDetails.prototype.addUserDetails = function () {
        if (this.password != this.reTypePassword) {
            this.error = "Password is not matching.";
            console.log("password not matching");
        }
        else if (this.organizationDetails == null) {
            this.error = "Enter correct school code. school code is not available.";
        }
        else {
            console.log("password matching");
            this.error = "";
            var userDetails = new __WEBPACK_IMPORTED_MODULE_5__models_user__["a" /* User */]();
            userDetails.firstname = this.firstname;
            userDetails.lastname = this.lastname;
            userDetails.emailId = this.emailId;
            userDetails.password = this.password;
            userDetails.userRole = "faculty";
            userDetails.securityQuestion = this.securityQuestion;
            userDetails.answer = this.answer;
            var myStorage = this.storage;
            var myNavCtrl = this.navCtrl;
            this.firstname = "";
            this.lastname = "";
            this.emailId = "";
            this.password = "";
            this.reTypePassword = "";
            this.securityQuestion = "";
            this.answer = "";
            console.log("auth state changed user: null ");
            this.showForm = false;
        }
    };
    AddUserDetails.prototype.hideShowPassword = function (index) {
        this.passwordType[index] = this.passwordType[index] === 'text' ? 'password' : 'text';
        this.passwordIcon[index] = this.passwordIcon[index] === 'eye-off' ? 'eye' : 'eye-off';
    };
    AddUserDetails.prototype.getOrganizationDetails = function () {
        this.organizationDetails = null;
        this.schoolAddress = "";
        if (this.schoolcode.length == 6) {
            console.log("school code:" + this.schoolcode);
            if (this.organizationDetails != null) {
                console.log("org:" + this.organizationDetails.organizationDetailsUID);
                this.schoolAddress = this.organizationDetails.addressDetails.street1 + ", " +
                    this.organizationDetails.addressDetails.street2 + ", " +
                    this.organizationDetails.addressDetails.city + ", " +
                    this.organizationDetails.addressDetails.zipcode + " " +
                    this.organizationDetails.addressDetails.state;
            }
        }
    };
    AddUserDetails = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-addUserDetails',template:/*ion-inline-start:"C:\mystuff\master\AcademicInvertionAPP\backup\htmlDemos\backup\1\AIAPPv4.0\src\components\login\addUserDetails\addUserDetails.html"*/'<ion-header>\n\n  <ion-navbar>\n\n    <button ion-button menuToggle>\n\n      <ion-icon name="menu"></ion-icon>\n\n    </button>\n\n    <ion-title>Add User</ion-title>\n\n  </ion-navbar>\n\n</ion-header>\n\n\n\n<ion-content padding>\n\n  <ion-grid style="height: 10%">\n\n    <ion-row justify-content-center align-items-center style="height: 100%">\n\n      <h3> Add User details : </h3>\n\n    </ion-row>\n\n  </ion-grid>\n\n\n\n\n\n  <div *ngIf="error" class="error-message">{{error}}</div>\n\n  <ion-content padding="\'true\'" scroll="false" class="has-header">\n\n    <ion-card *ngIf="showForm">\n\n      <form class="list" #newStudentForm="ngForm" (ngSubmit)="addUserDetails()">\n\n        <ion-row>\n\n          <ion-col>\n\n            <ion-list inset>\n\n\n\n              <ion-item>\n\n                <ion-label text-wrap>School Code (6 digit) : </ion-label>\n\n                <ion-input name="schoolcode" required [(ngModel)]="schoolcode" type="text"\n\n                  (ionChange)="getOrganizationDetails()" maxlength="6"></ion-input>\n\n              </ion-item>\n\n\n\n              <ion-item *ngIf="organizationDetails">\n\n                <ion-label text-wrap>School Address : </ion-label>\n\n                <ion-input name="schoolAddress" required [(ngModel)]="schoolAddress" type="text" disabled="true">\n\n                </ion-input>\n\n              </ion-item>\n\n\n\n              <ion-item>\n\n                <ion-label text-wrap>First Name : </ion-label>\n\n                <ion-input name="firstname" required [(ngModel)]="firstname" type="text"></ion-input>\n\n              </ion-item>\n\n              <ion-item>\n\n                <ion-label text-wrap>Last Name : </ion-label>\n\n                <ion-input name="lastname" required [(ngModel)]="lastname" type="text"></ion-input>\n\n              </ion-item>\n\n              <ion-item>\n\n                <ion-label text-wrap>Email ID : </ion-label>\n\n\n\n                <ion-input name="emailId" required [(ngModel)]="emailId" type="email"></ion-input>\n\n\n\n              </ion-item>\n\n\n\n              <ion-item>\n\n                <ion-label text-wrap>Password : </ion-label>\n\n\n\n\n\n                <ion-input passwordValidator name="password" id="password" [type]="passwordType[0]" required\n\n                  [(ngModel)]="password" #passwordModel="ngModel"></ion-input>\n\n                <ion-icon item-end [name]="passwordIcon[0]" class="passwordIcon" (click)=\'hideShowPassword(0)\'>\n\n                </ion-icon>\n\n              </ion-item>\n\n              <div *ngIf=\'passwordModel.errors\'>\n\n                <ion-item *ngFor="let errMsg of passwordModel.errors.passwordValidator">\n\n                  <div class="error-message">\n\n                    <ion-icon name="information-circle">{{ errMsg }}</ion-icon>\n\n                  </div>\n\n                </ion-item>\n\n              </div>\n\n              <ion-item>\n\n                <ion-label text-wrap>Re-type Password : </ion-label>\n\n\n\n                <ion-input name="reTypePassword" [type]="passwordType[1]" required [(ngModel)]="reTypePassword">\n\n                </ion-input>\n\n                <ion-icon item-end [name]="passwordIcon[1]" class="passwordIcon" (click)=\'hideShowPassword(1)\'>\n\n                </ion-icon>\n\n\n\n              </ion-item>\n\n              <div *ngIf=\'password != reTypePassword\'>\n\n                <ion-item>\n\n                  <div class="error-message">\n\n                    <ion-icon name="information-circle"> Re-type Password is not matching the Password.</ion-icon>\n\n                  </div>\n\n                </ion-item>\n\n              </div>\n\n              <ion-item>\n\n                <ion-label text-wrap>Security Question : </ion-label>\n\n                <ion-input name="securityQuestion" required [(ngModel)]="securityQuestion" type="text"></ion-input>\n\n              </ion-item>\n\n\n\n              <ion-item>\n\n                <ion-label text-wrap>Answer : </ion-label>\n\n\n\n                <ion-input name="answer" [type]="passwordType[2]" required [(ngModel)]="answer"></ion-input>\n\n                <ion-icon item-end [name]="passwordIcon[2]" class="passwordIcon" (click)=\'hideShowPassword(2)\'>\n\n                </ion-icon>\n\n\n\n              </ion-item>\n\n\n\n              <ion-grid style="height: 100%">\n\n                <ion-row justify-content-center align-items-center style="height: 100%">\n\n                  <button ion-button class="submit-btn" full type="submit"\n\n                    [disabled]="(!newStudentForm.form.valid) || (password != reTypePassword)">Add\n\n                    User\n\n                  </button>\n\n                </ion-row>\n\n              </ion-grid>\n\n            </ion-list>\n\n          </ion-col>\n\n        </ion-row>\n\n      </form>\n\n    </ion-card>\n\n\n\n    <ion-card *ngIf="!showForm">\n\n      <ion-item>\n\n        <ion-label text-wrap *ngIf="!emailVerfied"> Check your Email and verify it by clicking the link provided in\n\n          Email. </ion-label>\n\n      </ion-item>\n\n    </ion-card>\n\n  </ion-content>\n\n</ion-content>'/*ion-inline-end:"C:\mystuff\master\AcademicInvertionAPP\backup\htmlDemos\backup\1\AIAPPv4.0\src\components\login\addUserDetails\addUserDetails.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_3_ionic_angular__["h" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1__ionic_native_file__["a" /* File */],
            __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["i" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_2__ionic_storage__["b" /* Storage */]])
    ], AddUserDetails);
    return AddUserDetails;
}());

//# sourceMappingURL=addUserDetails.js.map

/***/ }),

/***/ 642:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Login; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_file__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__models_user__ = __webpack_require__(77);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_storage__ = __webpack_require__(12);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var Login = /** @class */ (function () {
    // private sessionDate:string=new Date("2019-01-17T05:16:12.940Z").toISOString();
    function Login(navCtrl, file, platform, storage, events) {
        this.navCtrl = navCtrl;
        this.file = file;
        this.platform = platform;
        this.storage = storage;
        this.events = events;
        this.user = new __WEBPACK_IMPORTED_MODULE_3__models_user__["a" /* User */]();
        this.user2 = new __WEBPACK_IMPORTED_MODULE_3__models_user__["a" /* User */]();
        this.emailID = "xyz@gmail.com";
        this.password = "password";
        this.error = "Error Message";
        this.passwordType = Array(3).fill('password');
        this.passwordIcon = Array(3).fill('eye-off');
        this.userDetails = new __WEBPACK_IMPORTED_MODULE_3__models_user__["a" /* User */]();
    }
    ;
    Login.prototype.login = function () {
        console.log("UserName:" + this.emailID);
        console.log("Password:" + this.password);
    };
    Login.prototype.signUpFaculty = function () {
    };
    Login.prototype.createOrganizationAccount = function () {
    };
    Login.prototype.forgetPassword = function () {
    };
    Login.prototype.hideShowPassword = function (index) {
        this.passwordType[index] = this.passwordType[index] === 'text' ? 'password' : 'text';
        this.passwordIcon[index] = this.passwordIcon[index] === 'eye-off' ? 'eye' : 'eye-off';
    };
    Login.prototype.setOrganizationDetailsStorage = function () {
    };
    Login = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-login',template:/*ion-inline-start:"C:\mystuff\master\AcademicInvertionAPP\backup\htmlDemos\backup\1\AIAPPv4.0\src\components\login\login.html"*/'<ion-header>\n\n    <ion-navbar>\n\n      <ion-title>\n\n        Login\n\n      </ion-title>\n\n    </ion-navbar>\n\n  </ion-header>\n\n  <ion-content padding center text-center>\n\n      <ion-card>\n\n<!-- \n\n          <ion-datetime displayFormat="MMM DD, YYYY HH:mm" [(ngModel)]="sessionDate"></ion-datetime> -->\n\n\n\n          <div *ngIf="error" class="alert alert-danger">{{error}}</div>\n\n        <form #loginForm="ngForm" (ngSubmit)="login()" autocomplete="off">\n\n          <ion-row>\n\n            <ion-col>\n\n              <ion-list inset>\n\n                <ion-item>\n\n                  <ion-input placeholder="Email ID" name="emailID" id="loginField" type="text" required [(ngModel)]="emailID" #email></ion-input>\n\n                </ion-item>\n\n                <ion-item>\n\n                  <ion-input placeholder="Password" [type]="passwordType[0]" name="password" id="passwordField" required [(ngModel)]="password"></ion-input>\n\n                  <ion-icon item-end [name]="passwordIcon[0]" class="passwordIcon" (click)=\'hideShowPassword(0)\'></ion-icon>\n\n                 \n\n                </ion-item>\n\n\n\n              </ion-list>\n\n\n\n            </ion-col>\n\n          </ion-row>\n\n          <ion-row>\n\n            <ion-col>\n\n                <button ion-button class="submit-btn" full type="submit" [disabled]="!loginForm.form.valid">Login\n\n                  </button>\n\n       \n\n              <ion-item  style="color: blue">\n\n                \n\n                <ion-label text-wrap (click)="createOrganizationAccount()">Create Organization Account !  </ion-label>\n\n              </ion-item>\n\n\n\n              <ion-item  style="color: blue">\n\n                \n\n                  <ion-label text-wrap (click)="signUpFaculty()">Sign Up as a Faculty ! </ion-label>\n\n                </ion-item>\n\n              <ion-item  style="color: blue">\n\n                <ion-label text-wrap (click)="forgetPassword()">Forget Password </ion-label>\n\n              </ion-item>\n\n              \n\n           \n\n              \n\n            </ion-col>\n\n          </ion-row>\n\n        </form>\n\n    </ion-card>\n\n  </ion-content>'/*ion-inline-end:"C:\mystuff\master\AcademicInvertionAPP\backup\htmlDemos\backup\1\AIAPPv4.0\src\components\login\login.html"*/
        }),
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_2__ionic_native_file__["a" /* File */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* Platform */],
            __WEBPACK_IMPORTED_MODULE_4__ionic_storage__["b" /* Storage */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* Events */]])
    ], Login);
    return Login;
}());

//# sourceMappingURL=login.js.map

/***/ }),

/***/ 643:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PasswordValidator; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_forms__ = __webpack_require__(53);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};


var PasswordValidator = /** @class */ (function () {
    function PasswordValidator() {
    }
    PasswordValidator_1 = PasswordValidator;
    PasswordValidator.prototype.validate = function (control) {
        console.log('validat:' + JSON.stringify(PasswordValidator_1.passwordValidator(control)));
        return PasswordValidator_1.passwordValidator(control);
    };
    PasswordValidator.passwordValidator = function (control) {
        var value = control.value || '';
        var errors = [];
        if (!value) {
            return __WEBPACK_IMPORTED_MODULE_0__angular_forms__["i" /* Validators */].required;
        }
        console.log('val2:' + value);
        if (value.length < 8) {
            errors.push("password require length 8");
        }
        var upperCaseCharacters = /[A-Z]+/g;
        if (upperCaseCharacters.test(value) === false) {
            errors.push("one Upper case character");
        }
        var lowerCaseCharacters = /[a-z]+/g;
        if (lowerCaseCharacters.test(value) === false) {
            errors.push("one lower case character");
        }
        var numberCharacters = /[0-9]+/g;
        if (numberCharacters.test(value) === false) {
            errors.push("one number character");
        }
        var specialCharacters = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;
        if (specialCharacters.test(value) === false) {
            errors.push("one special character");
        }
        if (errors.length == 0)
            return __WEBPACK_IMPORTED_MODULE_0__angular_forms__["i" /* Validators */].required;
        return { passwordValidator: errors };
    };
    PasswordValidator.passwordCheck = function (value) {
        var errors = [];
        if (!value) {
            return errors;
        }
        console.log('val2:' + value);
        if (value.length < 8) {
            errors.push("password require length 8");
        }
        var upperCaseCharacters = /[A-Z]+/g;
        if (upperCaseCharacters.test(value) === false) {
            errors.push("one Upper case character");
        }
        var lowerCaseCharacters = /[a-z]+/g;
        if (lowerCaseCharacters.test(value) === false) {
            errors.push("one lower case character");
        }
        var numberCharacters = /[0-9]+/g;
        if (numberCharacters.test(value) === false) {
            errors.push("one number character");
        }
        var specialCharacters = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;
        if (specialCharacters.test(value) === false) {
            errors.push("one special character");
        }
        return errors;
    };
    PasswordValidator = PasswordValidator_1 = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["Directive"])({
            selector: '[passwordValidator]',
            providers: [
                {
                    provide: __WEBPACK_IMPORTED_MODULE_0__angular_forms__["e" /* NG_VALIDATORS */],
                    useExisting: PasswordValidator_1,
                    multi: true
                }
            ]
        })
    ], PasswordValidator);
    return PasswordValidator;
    var PasswordValidator_1;
}());

//# sourceMappingURL=passwordValidator.js.map

/***/ }),

/***/ 644:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return UpdateProfile; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_file__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_storage__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__models_user__ = __webpack_require__(77);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var UpdateProfile = /** @class */ (function () {
    function UpdateProfile(navCtrl, file, navParams, storage) {
        this.navCtrl = navCtrl;
        this.file = file;
        this.navParams = navParams;
        this.storage = storage;
        this.firstname = "firstname1";
        this.lastname = "lastname1";
        this.emailId = "xyz@gmail.com";
        this.password = "123456";
        this.reTypePassword = "123456";
        this.error = "Error Message";
        this.userRole = new __WEBPACK_IMPORTED_MODULE_4__models_user__["a" /* User */]().userRole;
        this.securityQuestion = "";
        this.answer = "";
        this.userDetails = new __WEBPACK_IMPORTED_MODULE_4__models_user__["a" /* User */]();
        this.passwordType = Array(3).fill('password');
        this.passwordIcon = Array(3).fill('eye-off');
    }
    UpdateProfile.prototype.updateUserDetails = function () {
        if (this.password != this.reTypePassword) {
            this.error = "Password is not matching.";
            console.log("password not matching");
        }
        else {
            console.log("password matching");
            var updatedUserDetails = new __WEBPACK_IMPORTED_MODULE_4__models_user__["a" /* User */]();
            updatedUserDetails.firstname = this.firstname;
            updatedUserDetails.lastname = this.lastname;
            updatedUserDetails.emailId = this.emailId;
            updatedUserDetails.password = this.password;
            updatedUserDetails.userRole = this.userDetails.userRole;
            ;
            updatedUserDetails.securityQuestion = this.securityQuestion;
            updatedUserDetails.answer = this.answer;
            updatedUserDetails.verifyEmail = this.userDetails.verifyEmail;
            updatedUserDetails.userUID = this.userDetails.userUID;
            updatedUserDetails.organizationUID = this.userDetails.organizationUID;
        }
    };
    UpdateProfile.prototype.hideShowPassword = function (index) {
        this.passwordType[index] = this.passwordType[index] === 'text' ? 'password' : 'text';
        this.passwordIcon[index] = this.passwordIcon[index] === 'eye-off' ? 'eye' : 'eye-off';
    };
    UpdateProfile = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-updateProfile',template:/*ion-inline-start:"C:\mystuff\master\AcademicInvertionAPP\backup\htmlDemos\backup\1\AIAPPv4.0\src\components\login\userProfile\updateProfile\updateProfile.html"*/'<ion-header>\n\n  <ion-navbar>\n\n    <button ion-button menuToggle>\n\n      <ion-icon name="menu"></ion-icon>\n\n    </button>\n\n    <ion-title>User Details</ion-title>\n\n  </ion-navbar>\n\n</ion-header>\n\n\n\n<ion-content padding>\n\n  <ion-grid style="height: 10%">\n\n    <ion-row justify-content-center align-items-center style="height: 100%">\n\n      <h3> Update User Details : </h3>\n\n    </ion-row>\n\n  </ion-grid>\n\n\n\n\n\n  <div *ngIf="error" class="error-message">{{error}}</div>\n\n  <ion-content padding="\'true\'" scroll="false" class="has-header">\n\n    <ion-card>\n\n      <form class="list" #newStudentForm="ngForm" (ngSubmit)="updateUserDetails()">\n\n        <ion-row>\n\n          <ion-col>\n\n            <ion-list inset>\n\n\n\n              <ion-item>\n\n                <ion-label text-wrap>First Name : </ion-label>\n\n                <ion-input name="firstname" required [(ngModel)]="firstname" type="text"></ion-input>\n\n              </ion-item>\n\n\n\n              <ion-item>\n\n                <ion-label text-wrap>Last Name : </ion-label>\n\n                <ion-input name="lastname" required [(ngModel)]="lastname" type="text"></ion-input>\n\n              </ion-item>\n\n\n\n              <ion-item>\n\n                <ion-label text-wrap>Email ID : </ion-label>\n\n                <ion-input disabled="true" name="emailId" required [(ngModel)]="emailId" type="email"></ion-input>\n\n              </ion-item>\n\n\n\n\n\n              <ion-item>\n\n                <ion-label text-wrap>Password : </ion-label>\n\n                <ion-input passwordValidator name="password" id="password" [type]="passwordType[0]" disabled="true"\n\n                  required [(ngModel)]="password" #passwordModel="ngModel"></ion-input>\n\n                <ion-icon item-end [name]="passwordIcon[0]" class="passwordIcon" (click)=\'hideShowPassword(0)\'>\n\n                </ion-icon>\n\n              </ion-item>\n\n              <div *ngIf=\'passwordModel.errors\'>\n\n                <ion-item *ngFor="let errMsg of passwordModel.errors.passwordValidator">\n\n                  <div class="error-message">\n\n                    <ion-icon name="information-circle">{{ errMsg }}</ion-icon>\n\n                  </div>\n\n                </ion-item>\n\n              </div>\n\n              <ion-item>\n\n                <ion-label text-wrap>Re-type Password : </ion-label>\n\n                <ion-input name="reTypePassword" [type]="passwordType[1]" disabled="true" required\n\n                  [(ngModel)]="reTypePassword"></ion-input>\n\n                <ion-icon item-end [name]="passwordIcon[1]" class="passwordIcon" (click)=\'hideShowPassword(1)\'>\n\n                </ion-icon>\n\n              </ion-item>\n\n              <div *ngIf=\'password != reTypePassword\'>\n\n                <ion-item>\n\n                  <div class="error-message">\n\n                    <ion-icon name="information-circle"> Re-type Password is not matching the Password.</ion-icon>\n\n                  </div>\n\n                </ion-item>\n\n              </div>\n\n              <ion-item>\n\n                <ion-label text-wrap>User Role : </ion-label>\n\n                <ion-input name="userRole" required [(ngModel)]="userRole" type="text" disabled="true"></ion-input>\n\n              </ion-item>\n\n\n\n              <ion-item>\n\n                <ion-label text-wrap>Security Question : </ion-label>\n\n                <ion-input name="securityQuestion" required [(ngModel)]="securityQuestion" type="text"></ion-input>\n\n              </ion-item>\n\n\n\n              <ion-item>\n\n                <ion-label text-wrap>Answer : </ion-label>\n\n                <ion-input name="answer" [type]="passwordType[2]" required [(ngModel)]="answer"></ion-input>\n\n                <ion-icon item-end [name]="passwordIcon[2]" class="passwordIcon" (click)=\'hideShowPassword(2)\'>\n\n                </ion-icon>\n\n              </ion-item>\n\n\n\n              <ion-grid style="height: 100%">\n\n                <ion-row justify-content-center align-items-center style="height: 100%">\n\n                  <button ion-button class="submit-btn" full type="submit"\n\n                    [disabled]="(!newStudentForm.form.valid) || (password != reTypePassword)">Update\n\n                    User\n\n                  </button>\n\n                </ion-row>\n\n              </ion-grid>\n\n\n\n            </ion-list>\n\n          </ion-col>\n\n        </ion-row>\n\n      </form>\n\n    </ion-card>\n\n\n\n  </ion-content>\n\n</ion-content>'/*ion-inline-end:"C:\mystuff\master\AcademicInvertionAPP\backup\htmlDemos\backup\1\AIAPPv4.0\src\components\login\userProfile\updateProfile\updateProfile.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_2__ionic_native_file__["a" /* File */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_3__ionic_storage__["b" /* Storage */]])
    ], UpdateProfile);
    return UpdateProfile;
}());

//# sourceMappingURL=updateProfile.js.map

/***/ }),

/***/ 645:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TraditionalDrillPracticeService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__models_methodInterventionWordData__ = __webpack_require__(110);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__arrayService__ = __webpack_require__(197);


var TraditionalDrillPracticeService = /** @class */ (function () {
    function TraditionalDrillPracticeService() {
        this.arrayService = new __WEBPACK_IMPORTED_MODULE_1__arrayService__["a" /* ArrayService */]();
    }
    TraditionalDrillPracticeService.prototype.getWorDataList = function (methodSessionObject, ratio2, ratio1) {
        if (ratio1 == null || ratio1 == 0)
            ratio1 = 31;
        var unknownWordList = methodSessionObject.unknownWordList;
        var testWordArray = [];
        var unknownWordCropList = [];
        if (methodSessionObject.sessionWordDataList == null)
            methodSessionObject.sessionWordDataList = [];
        var methodInetrventionWordDataArray = methodSessionObject.sessionWordDataList;
        var counter = 0;
        console.log("unknown Array:" + ratio2 + "  a:" + unknownWordList.length);
        if (ratio2 > unknownWordList.length)
            return;
        while (counter < ratio2) {
            console.log("unknown:" + unknownWordList[counter].wordText);
            unknownWordCropList.push(unknownWordList[counter++]);
        }
        console.log("unknown size:" + unknownWordCropList.length);
        counter = 1;
        var lastWord;
        while (counter <= ratio1) {
            var i = 0;
            while (i < ratio2) {
                this.updateWordDataToMethodIntevention(unknownWordCropList[i], methodInetrventionWordDataArray, false);
                testWordArray.push(unknownWordCropList[i++]);
            }
            lastWord = testWordArray[(counter * ratio2) - 1];
            this.arrayService.shuffle(unknownWordCropList);
            //first last word not same
            while (lastWord.wordId == unknownWordCropList[0].wordId && unknownWordCropList.length > 1) {
                this.arrayService.shuffle(unknownWordCropList);
            }
            counter++;
        }
        console.log("total words:" + testWordArray.length);
        methodSessionObject.sessionWordDataList = methodInetrventionWordDataArray;
        return testWordArray;
    };
    TraditionalDrillPracticeService.prototype.updateWordDataToMethodIntevention = function (wordDataObject, methodInetrventionWordDataArray, isKnown) {
        var methodInterventionWordDataObj = this.getMethodSessionWordDataObject(wordDataObject, methodInetrventionWordDataArray);
        if (methodInterventionWordDataObj == null) {
            methodInterventionWordDataObj = new __WEBPACK_IMPORTED_MODULE_0__models_methodInterventionWordData__["a" /* MethodInterventionWordData */]();
            methodInterventionWordDataObj.wordData = wordDataObject;
            methodInterventionWordDataObj.isKnownWord = isKnown;
            methodInetrventionWordDataArray.push(methodInterventionWordDataObj);
        }
    };
    TraditionalDrillPracticeService.prototype.getMethodSessionWordDataObject = function (wordDataObject, methodInetrventionWordDataArray) {
        for (var _i = 0, methodInetrventionWordDataArray_1 = methodInetrventionWordDataArray; _i < methodInetrventionWordDataArray_1.length; _i++) {
            var obj = methodInetrventionWordDataArray_1[_i];
            if (obj.wordData.wordId == wordDataObject.wordId) {
                return obj;
            }
        }
        return null;
    };
    return TraditionalDrillPracticeService;
}());

//# sourceMappingURL=TraditionalDrillPracticeService.js.map

/***/ }),

/***/ 646:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MethodRatioSelection; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ionic_storage__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__models_student__ = __webpack_require__(26);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var MethodRatioSelection = /** @class */ (function () {
    function MethodRatioSelection(navCtrl, viewCtrl, params, storage) {
        this.navCtrl = navCtrl;
        this.viewCtrl = viewCtrl;
        this.params = params;
        this.storage = storage;
        this.error = "Error Message";
        this.studentObject = new __WEBPACK_IMPORTED_MODULE_3__models_student__["a" /* Student */]();
        this.methodIndex = 0;
        this.ratio1 = 1;
        this.oldRatio1 = 1;
        this.minRatio1 = 1;
        this.maxRatio1 = 0;
        this.ratio2 = 1;
        this.oldRatio2 = 1;
        this.minRatio2 = 1;
        this.maxRatio2 = 0;
        this.canUpdateRatio = false;
        this.OTR = 0;
        this.methodTitle = "Method Title";
        this.organizationDetailsUID = "Org UID";
        this.wordType = 0;
    }
    MethodRatioSelection.prototype.dismiss = function () {
    };
    MethodRatioSelection.prototype.updateRatio = function () {
        this.checkUpdateRatio();
        if (!this.canUpdateRatio) {
            this.error = " can not update the ratio.";
        }
        else {
        }
    };
    MethodRatioSelection.prototype.updateRatio1 = function () {
        if (this.methodIndex == 1) {
            this.ratio1 = this.ratio2;
        }
        this.updateOTR();
    };
    MethodRatioSelection.prototype.updateOTR = function () {
    };
    MethodRatioSelection.prototype.checkUpdateRatio = function () {
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
    };
    MethodRatioSelection.prototype.checkRatio1 = function () {
        if (!(this.maxRatio1 > 0 && this.maxRatio1 >= this.ratio1 && this.ratio1 >= this.minRatio1))
            this.canUpdateRatio = false;
    };
    MethodRatioSelection.prototype.checkRatio2 = function () {
        if (!(this.maxRatio2 > 0 && this.maxRatio2 >= this.ratio2 && this.ratio2 >= this.minRatio2))
            this.canUpdateRatio = false;
    };
    MethodRatioSelection = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-methodRatioSelection',template:/*ion-inline-start:"C:\mystuff\master\AcademicInvertionAPP\backup\htmlDemos\backup\1\AIAPPv4.0\src\components\studentDashBoard\methodRatioSelection\methodRatioSelection.html"*/'  \n\n   <ion-header>\n\n      <ion-navbar>\n\n        <ion-title>\n\n          {{methodTitle}}\n\n        </ion-title>\n\n      </ion-navbar>\n\n    </ion-header> \n\n  \n\n    <ion-content has-header="true" padding="true"  ng-controller="AppCtrl as ctrl" >\n\n      <div *ngIf="error" class="error-message">{{error}}</div>\n\n      <ion-content padding="\'true\'" scroll="false" class="has-header">\n\n          <div class="ion-content"  >\n\n         \n\n              <ion-row>\n\n                  <ion-col>\n\n                    <ion-list inset>\n\n                      <ion-item *ngIf="methodIndex == 0">\n\n                          <ion-label text-wrap text-wrap>Number of Known Words </ion-label>\n\n                          <ion-input type="number" [(ngModel)]="ratio1" min="{{minRatio1}}" max="{{maxRatio1}}"  (ionChange)="updateOTR()"></ion-input>\n\n                        </ion-item>\n\n                      <ion-item *ngIf="methodIndex == 2">\n\n                          <ion-label text-wrap text-wrap> Number of cycle </ion-label>\n\n                          <ion-input type="number" [(ngModel)]="ratio1" (ionChange)="updateOTR()"></ion-input>\n\n                        </ion-item>\n\n                        <ion-item *ngIf="methodIndex == 3">\n\n                          <ion-label text-wrap text-wrap>Number of cycle </ion-label>\n\n                          <ion-input type="number" [(ngModel)]="ratio1" (ionChange)="updateOTR()" disabled="true"></ion-input>\n\n                        </ion-item>\n\n                        <ion-item *ngIf="methodIndex == 1">\n\n                            <ion-label text-wrap text-wrap>Number of Known Words </ion-label>\n\n                            <ion-input type="number" [(ngModel)]="ratio1" min="{{minRatio1}}" max="{{maxRatio1}}" disabled="true" (ionChange)="updateOTR()"></ion-input>\n\n                          </ion-item>\n\n                      <ion-item>\n\n                          <ion-label text-wrap text-wrap>Number of Unknown Words </ion-label>\n\n                          <ion-input type="number" [(ngModel)]="ratio2" min="{{minRatio2}}" max="{{maxRatio2}}" (ionChange)="updateRatio1()"></ion-input>\n\n                      </ion-item>\n\n                      <ion-item *ngIf="methodIndex == 1">\n\n                        <ion-label text-wrap text-wrap>Total Opportunity to Respond </ion-label>\n\n                        <ion-input type="number" [(ngModel)]="OTR"  (ionChange)="updateOTR()"></ion-input>\n\n                      </ion-item>\n\n                      <ion-item *ngIf="methodIndex != 1">\n\n                          <ion-label text-wrap text-wrap>Total Opportunity to Respond </ion-label>\n\n                          <ion-input type="number" [(ngModel)]="OTR" disabled="true" (ionChange)="updateOTR()"></ion-input>\n\n                        </ion-item>\n\n                    </ion-list>\n\n      \n\n                  </ion-col>\n\n                </ion-row>\n\n          </div> \n\n          <div class="ion-content"  >\n\n              <ion-grid style="height: 30%">\n\n                <ion-row justify-content-center align-items-center style="height: 100%">\n\n                  <ion-col>\n\n                      <button ion-button class="submit-btn"  (click)="updateRatio()">Change </button>\n\n                  </ion-col>\n\n                  <ion-col>\n\n                      <button ion-button class="submit-btn"  (click)="dismiss()">Cancel</button>\n\n                  </ion-col>\n\n                </ion-row>\n\n              </ion-grid>\n\n            </div>\n\n        </ion-content>\n\n  </ion-content>\n\n  '/*ion-inline-end:"C:\mystuff\master\AcademicInvertionAPP\backup\htmlDemos\backup\1\AIAPPv4.0\src\components\studentDashBoard\methodRatioSelection\methodRatioSelection.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["h" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["l" /* ViewController */],
            __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["i" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_1__ionic_storage__["b" /* Storage */]])
    ], MethodRatioSelection);
    return MethodRatioSelection;
}());

//# sourceMappingURL=methodRatioSelection.js.map

/***/ }),

/***/ 647:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ViewPreSessionUnKnownWord; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ionic_native_file__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__models_wordData__ = __webpack_require__(25);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var ViewPreSessionUnKnownWord = /** @class */ (function () {
    function ViewPreSessionUnKnownWord(file, params, viewCtrl) {
        this.file = file;
        this.params = params;
        this.viewCtrl = viewCtrl;
        this.wordDataObj = new __WEBPACK_IMPORTED_MODULE_3__models_wordData__["a" /* WordData */]();
    }
    ViewPreSessionUnKnownWord.prototype.dismiss = function () {
        this.viewCtrl.dismiss();
    };
    ViewPreSessionUnKnownWord = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-viewPreSessionUnKnownWord',template:/*ion-inline-start:"C:\mystuff\master\AcademicInvertionAPP\backup\htmlDemos\backup\1\AIAPPv4.0\src\components\methodSessions\flashCardTest\preeSessionResult\viewPreSessionUnknownWord\viewPreSessionUnKnownWord.html"*/'  \n\n    \n\n    <div *ngIf="error" class="error-message">{{error}}</div>\n\n    <ion-content padding="\'true\'" scroll="false" class="has-header">\n\n        <div class="ion-content"  >\n\n       \n\n        <ion-grid style="height: 70%">\n\n            <h3 style="font-size: 100px;padding-top: 5%; padding-left: 18%"> {{wordDataObj.wordText}} </h3>\n\n        </ion-grid>\n\n        </div> \n\n        <div class="ion-content"  >\n\n            <ion-grid style="height: 30%">\n\n              <ion-row justify-content-center align-items-center style="height: 100%">\n\n                      <button ion-button class="submit-btn"  (click)="dismiss()">Close</button>\n\n              </ion-row>\n\n            </ion-grid>\n\n          </div>\n\n      </ion-content>\n\n'/*ion-inline-end:"C:\mystuff\master\AcademicInvertionAPP\backup\htmlDemos\backup\1\AIAPPv4.0\src\components\methodSessions\flashCardTest\preeSessionResult\viewPreSessionUnknownWord\viewPreSessionUnKnownWord.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__ionic_native_file__["a" /* File */],
            __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["i" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["l" /* ViewController */]])
    ], ViewPreSessionUnKnownWord);
    return ViewPreSessionUnKnownWord;
}());

//# sourceMappingURL=viewPreSessionUnKnownWord.js.map

/***/ }),

/***/ 648:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ViewWordList; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__models_wordData__ = __webpack_require__(25);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_file__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__services_wordServices__ = __webpack_require__(109);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ionic_native_social_sharing__ = __webpack_require__(232);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__ionic_native_document_picker__ = __webpack_require__(230);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__services_dataSetServices__ = __webpack_require__(292);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__models_Dataset__ = __webpack_require__(193);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__ionic_storage__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__models_organizationDetails__ = __webpack_require__(35);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};











var ViewWordList = /** @class */ (function () {
    function ViewWordList(navCtrl, file, alertCtrl, plt, socialSharing, docPicker, storage) {
        this.navCtrl = navCtrl;
        this.file = file;
        this.alertCtrl = alertCtrl;
        this.plt = plt;
        this.socialSharing = socialSharing;
        this.docPicker = docPicker;
        this.storage = storage;
        this.datasetList = [new __WEBPACK_IMPORTED_MODULE_8__models_Dataset__["a" /* Dataset */]()];
        this.mathDatasetList = [new __WEBPACK_IMPORTED_MODULE_8__models_Dataset__["a" /* Dataset */]()];
        this.wordDataList = [new __WEBPACK_IMPORTED_MODULE_2__models_wordData__["a" /* WordData */]()];
        this.mathWordDataList = [new __WEBPACK_IMPORTED_MODULE_2__models_wordData__["a" /* WordData */]()];
        this.allData = [new __WEBPACK_IMPORTED_MODULE_2__models_wordData__["a" /* WordData */]()];
        this.mathAllData = [new __WEBPACK_IMPORTED_MODULE_2__models_wordData__["a" /* WordData */]()];
        this.searchTerm = '';
        this.wordServiceObject = new __WEBPACK_IMPORTED_MODULE_4__services_wordServices__["a" /* WordServices */]();
        this.datasetService = new __WEBPACK_IMPORTED_MODULE_7__services_dataSetServices__["a" /* DataSetService */]();
        this.error = '';
        this.organizationDetails = new __WEBPACK_IMPORTED_MODULE_10__models_organizationDetails__["a" /* OrganizationDetails */]();
        this.isWord = true;
        this.wordType = 0;
    }
    ;
    ViewWordList.prototype.filterItems = function () {
        var _this = this;
        this.wordDataList = this.allData.filter(function (wordObject) {
            return wordObject.wordText.toLowerCase().indexOf(_this.searchTerm.toLowerCase()) > -1 ||
                wordObject.wordCategory.toLowerCase().indexOf(_this.searchTerm.toLowerCase()) > -1;
        });
        this.mathWordDataList = this.mathAllData.filter(function (wordObject) {
            return wordObject.wordText.toLowerCase().indexOf(_this.searchTerm.toLowerCase()) > -1 ||
                wordObject.wordCategory.toLowerCase().indexOf(_this.searchTerm.toLowerCase()) > -1;
        });
    };
    ViewWordList.prototype.removeWord = function (wordObj) {
        this.presentConfirm(wordObj);
    };
    ViewWordList.prototype.presentConfirm = function (wordDataObj) {
        var _this = this;
        var alert = this.alertCtrl.create({
            title: 'Remove Student',
            message: 'Do you want to remove word ' + wordDataObj.wordText + '?',
            buttons: [
                {
                    text: 'Cancel',
                    role: 'cancel',
                    handler: function () {
                        console.log('Cancel clicked');
                    }
                },
                {
                    text: 'yes',
                    handler: function () {
                        _this.datasetService.removeWordDataFromFile(wordDataObj, _this.file, _this.datasetService, _this.wordType);
                        if (_this.wordType == 0)
                            _this.wordServiceObject.removeWordFromArray(_this.allData, wordDataObj);
                        else
                            _this.wordServiceObject.removeWordFromArray(_this.mathAllData, wordDataObj);
                        _this.filterItems();
                        //this.wordDataFireBaseService.r
                        console.log('yes clicked');
                    }
                }
            ]
        });
        alert.present();
    };
    ViewWordList.prototype.exportWordsFile = function () {
        var _this = this;
        this.wordServiceObject.exportWordFileFromArray(this.file, this.plt, this.socialSharing, this.allData, 'WordDetails.csv').then(function (data) {
            _this.wordServiceObject.exportWordFileFromArray(_this.file, _this.plt, _this.socialSharing, _this.mathAllData, 'MathDetails.csv');
        });
    };
    ViewWordList.prototype.importWordsFile = function () {
    };
    ViewWordList.prototype.changeWordType = function () {
        if (this.isWord)
            this.wordType = 0;
        else
            this.wordType = 1;
    };
    ViewWordList = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-viewWordList',template:/*ion-inline-start:"C:\mystuff\master\AcademicInvertionAPP\backup\htmlDemos\backup\1\AIAPPv4.0\src\components\viewWordList\viewWordList.html"*/'<ion-header>\n\n    <ion-navbar>\n\n      <button ion-button menuToggle>\n\n        <ion-icon name="menu"></ion-icon>\n\n      </button>\n\n      <ion-title>View Words</ion-title>\n\n    </ion-navbar>\n\n    </ion-header>\n\n    \n\n    <ion-content padding>\n\n    <ion-grid style="height: 10%">\n\n      <ion-row justify-content-center align-items-center style="height: 100%">\n\n        <h3 > View Words : </h3>\n\n      </ion-row>\n\n    </ion-grid>\n\n    \n\n    \n\n    <div *ngIf="error" class="error-message">{{error}}</div>\n\n    <ion-content padding="\'true\'" scroll="false" class="has-header">\n\n        <ion-card>\n\n\n\n            <ion-item>\n\n                <ion-label text-wrap >Word Type : </ion-label>\n\n                <ion-label text-wrap *ngIf ="isWord" >Words</ion-label>\n\n                <ion-label text-wrap *ngIf ="!isWord" >Math Facts</ion-label> \n\n                <ion-toggle [(ngModel)]="isWord" (ionChange)="changeWordType()" [ngModelOptions]="{standalone: true}">\n\n                </ion-toggle>\n\n            </ion-item>\n\n\n\n            <ion-searchbar [(ngModel)]="searchTerm" (ionInput)="filterItems()"></ion-searchbar>\n\n  \n\n            <ion-grid style="height: 100%">\n\n              <ion-row justify-content-center align-items-center style="height: 100%">\n\n                      <button ion-button class="submit-btn" full type="submit" (click)="exportWordsFile()">Export Words</button>\n\n                </ion-row>\n\n            </ion-grid>\n\n\n\n            <ion-grid style="height: 100%">\n\n              <ion-row justify-content-center align-items-center style="height: 100%">\n\n                      <button ion-button class="submit-btn" full type="submit" (click)="importWordsFile()">Import Words</button>\n\n                </ion-row>\n\n            </ion-grid>\n\n\n\n            <ion-item  *ngIf ="isWord">\n\n                <ion-row class="ion-title" style="background-color: silver;">\n\n                    <ion-col >Word</ion-col>\n\n                    <ion-col >Word Category</ion-col>\n\n                    <ion-col ></ion-col>\n\n                    \n\n                  </ion-row>\n\n                  <ion-item *ngFor="let wordObjects of wordDataList">\n\n                      <ion-row  >\n\n                          <ion-col (click)="viewWordData(wordObjects)" >{{wordObjects.wordText}}</ion-col>\n\n                          <ion-col (click)="viewWordData(wordObjects)" >{{wordObjects.wordCategory}}</ion-col>\n\n                          <ion-col >\n\n                            <ion-item (click)="removeWord(wordObjects)" style="color: blue">\n\n                             \n\n                                Remove Word\n\n                            </ion-item>\n\n                          </ion-col>\n\n                      \n\n                      </ion-row>\n\n                    </ion-item>\n\n          </ion-item>\n\n\n\n          \n\n          <ion-item *ngIf ="!isWord" >\n\n              <ion-row class="ion-title" style="background-color: silver;">\n\n                  <ion-col >Math Fact</ion-col>\n\n                  <ion-col >Category</ion-col>\n\n                  <ion-col ></ion-col>\n\n                  \n\n                </ion-row>\n\n                <ion-item *ngFor="let wordObjects of mathWordDataList">\n\n                    <ion-row  >\n\n                        <ion-col (click)="viewWordData(wordObjects)" >{{wordObjects.wordText}}</ion-col>\n\n                        <ion-col (click)="viewWordData(wordObjects)" >{{wordObjects.wordCategory}}</ion-col>\n\n                        <ion-col >\n\n                          <ion-item (click)="removeWord(wordObjects)" style="color: blue">\n\n                           \n\n                              Remove Word\n\n                          </ion-item>\n\n                        </ion-col>\n\n                    \n\n                    </ion-row>\n\n                  </ion-item>\n\n        </ion-item>\n\n\n\n        </ion-card>\n\n      </ion-content>\n\n    </ion-content>\n\n    '/*ion-inline-end:"C:\mystuff\master\AcademicInvertionAPP\backup\htmlDemos\backup\1\AIAPPv4.0\src\components\viewWordList\viewWordList.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_3__ionic_native_file__["a" /* File */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* Platform */],
            __WEBPACK_IMPORTED_MODULE_5__ionic_native_social_sharing__["a" /* SocialSharing */],
            __WEBPACK_IMPORTED_MODULE_6__ionic_native_document_picker__["a" /* DocumentPicker */],
            __WEBPACK_IMPORTED_MODULE_9__ionic_storage__["b" /* Storage */]])
    ], ViewWordList);
    return ViewWordList;
}());

//# sourceMappingURL=viewWordList.js.map

/***/ }),

/***/ 741:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__ = __webpack_require__(742);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__app_module__ = __webpack_require__(746);


Object(__WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_1__app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 746:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_forms__ = __webpack_require__(53);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_http__ = __webpack_require__(748);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_platform_browser__ = __webpack_require__(105);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_document_picker__ = __webpack_require__(230);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ionic_native_file__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__ionic_native_firebase__ = __webpack_require__(754);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__ionic_native_screen_orientation__ = __webpack_require__(349);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__ionic_native_social_sharing__ = __webpack_require__(232);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__ionic_native_splash_screen__ = __webpack_require__(350);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__ionic_native_status_bar__ = __webpack_require__(351);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__ionic_native_stripe_ngx__ = __webpack_require__(755);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__ionic_native_text_to_speech__ = __webpack_require__(118);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__ionic_storage__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14_firebase__ = __webpack_require__(759);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14_firebase___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_14_firebase__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15_ionic_angular__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16_ng2_charts__ = __webpack_require__(876);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16_ng2_charts___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_16_ng2_charts__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__components_addWordList_addCategoryModal_addCategoryModal__ = __webpack_require__(572);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18__components_addWordList_addWordList__ = __webpack_require__(573);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19__components_Assessment_BeginAssessmentTest_assessmentTest__ = __webpack_require__(927);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_20__components_Assessment_viewAssessment_viewAssessment__ = __webpack_require__(929);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_21__components_Assessment_viewStudentDatasetRecordList_viewStudentDatasetRecordList__ = __webpack_require__(930);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_22__components_billingGenerator_ManageSubscription_selectSubscription_selectSubscription__ = __webpack_require__(932);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_23__components_charts_lineCharts_lineCharts__ = __webpack_require__(933);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_24__components_flashCardTest_flashCard__ = __webpack_require__(934);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_25__components_home_adminHomePage_adminHomePage__ = __webpack_require__(637);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_26__components_home_home__ = __webpack_require__(315);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_27__components_login_addAdminAccess_addAdminAccess__ = __webpack_require__(1364);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_28__components_login_addEmail_addEmailList__ = __webpack_require__(1365);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_29__components_login_addUserDetails_addUserDetails__ = __webpack_require__(641);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_30__components_login_forgetPassword_securityCheckUP_SecurityCheckUp__ = __webpack_require__(1366);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_31__components_login_login__ = __webpack_require__(642);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_32__components_login_OrganizationRegister_organizationRegister__ = __webpack_require__(1367);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_33__components_login_userProfile_updateProfile_updateProfile__ = __webpack_require__(644);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_34__components_methodSessions_flashCardTest_DIMethodSessionTest_DIFlashCardSessionTest__ = __webpack_require__(1368);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_35__components_methodSessions_flashCardTest_flashCardIntervention__ = __webpack_require__(1370);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_36__components_methodSessions_flashCardTest_preeSessionResult_preSessionResult__ = __webpack_require__(1371);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_37__components_methodSessions_flashCardTest_preeSessionResult_viewPreSessionUnknownWord_viewPreSessionUnKnownWord__ = __webpack_require__(647);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_38__components_methodSessions_flashCardTest_preSessionFlashCardTest_preSessionFlashCard__ = __webpack_require__(1372);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_39__components_methodSessions_flashCardTest_sessionSummary_sessionSummary__ = __webpack_require__(1373);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_40__components_methodSessions_preSessionAssessment_preSessionAssessmentView_preSessionAssessmentView__ = __webpack_require__(1374);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_41__components_methodSessions_sessionsList_sessionList__ = __webpack_require__(1375);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_42__components_methodSessions_viewPreSessionData_preSessionData__ = __webpack_require__(1376);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_43__components_PostAssessment_postAssessmentDashBoard_postAssessmentDashBoard__ = __webpack_require__(1377);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_44__components_PostAssessment_postAssessmentFlashCard_postAssessmentFlashCard__ = __webpack_require__(1378);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_45__components_PostAssessment_startNewPostAssessment_startNewPostAssessment__ = __webpack_require__(1380);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_46__components_PostAssessment_viewPostAssessment_viewPostAssessmentRecordList__ = __webpack_require__(1381);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_47__components_PostAssessment_viewPostAssessmentList_ViewPostAssessmentList__ = __webpack_require__(1382);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_48__components_PostAssessment_viewSubPostTestAssessmentRecord_viewSubPostTestAssessmentRecord__ = __webpack_require__(1383);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_49__components_studentDashBoard_methodRatioSelection_methodRatioSelection__ = __webpack_require__(646);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_50__components_studentDashBoard_studentDashBoard__ = __webpack_require__(639);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_51__components_studentDashBoard_ViewStudentAllWords_viewStudentAllWords__ = __webpack_require__(1384);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_52__components_viewWordList_viewWordList__ = __webpack_require__(648);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_53__models_globalVariables__ = __webpack_require__(1385);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_54__pages_list_list__ = __webpack_require__(1386);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_55__providers_data_data__ = __webpack_require__(1387);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_56__providers_firebase_firebase__ = __webpack_require__(1388);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_57__app_component__ = __webpack_require__(1389);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_58__validation_passwordValidator__ = __webpack_require__(643);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_59__components_manageStudentDetails_AddStudent_AddStudent__ = __webpack_require__(638);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_60__components_manageStudentDetails_viewStudent_viewStudent__ = __webpack_require__(640);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};





























































var firebaseConfig = {
    apiKey: "AIzaSyDnFDx9WT_WnS0q4avo6BsoKUl9Cc5jJx0",
    authDomain: "acdemic-flashcard-intervention.firebaseapp.com",
    databaseURL: "https://acdemic-flashcard-intervention.firebaseio.com",
    projectId: "acdemic-flashcard-intervention",
    storageBucket: "acdemic-flashcard-intervention.appspot.com",
    messagingSenderId: "490691003601"
};
__WEBPACK_IMPORTED_MODULE_14_firebase__["initializeApp"](firebaseConfig);
var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
            // schemas:[CUSTOM_ELEMENTS_SCHEMA],
            declarations: [
                __WEBPACK_IMPORTED_MODULE_57__app_component__["a" /* MyApp */],
                __WEBPACK_IMPORTED_MODULE_26__components_home_home__["a" /* HomePage */],
                __WEBPACK_IMPORTED_MODULE_31__components_login_login__["a" /* Login */],
                __WEBPACK_IMPORTED_MODULE_59__components_manageStudentDetails_AddStudent_AddStudent__["a" /* AddStudent */],
                __WEBPACK_IMPORTED_MODULE_60__components_manageStudentDetails_viewStudent_viewStudent__["a" /* ViewStudent */],
                __WEBPACK_IMPORTED_MODULE_50__components_studentDashBoard_studentDashBoard__["a" /* StudentdashBoard */],
                __WEBPACK_IMPORTED_MODULE_18__components_addWordList_addWordList__["a" /* AddWordList */],
                __WEBPACK_IMPORTED_MODULE_52__components_viewWordList_viewWordList__["a" /* ViewWordList */],
                __WEBPACK_IMPORTED_MODULE_19__components_Assessment_BeginAssessmentTest_assessmentTest__["a" /* AssessmentTest */],
                __WEBPACK_IMPORTED_MODULE_42__components_methodSessions_viewPreSessionData_preSessionData__["a" /* PreSessionView */],
                __WEBPACK_IMPORTED_MODULE_24__components_flashCardTest_flashCard__["a" /* FlashCard */],
                __WEBPACK_IMPORTED_MODULE_54__pages_list_list__["a" /* ListPage */],
                __WEBPACK_IMPORTED_MODULE_35__components_methodSessions_flashCardTest_flashCardIntervention__["a" /* FlashCardIntervetion */],
                __WEBPACK_IMPORTED_MODULE_38__components_methodSessions_flashCardTest_preSessionFlashCardTest_preSessionFlashCard__["a" /* PreSessionFlashCard */],
                __WEBPACK_IMPORTED_MODULE_20__components_Assessment_viewAssessment_viewAssessment__["a" /* ViewAssessmentTest */],
                __WEBPACK_IMPORTED_MODULE_39__components_methodSessions_flashCardTest_sessionSummary_sessionSummary__["a" /* SessionSummary */],
                __WEBPACK_IMPORTED_MODULE_36__components_methodSessions_flashCardTest_preeSessionResult_preSessionResult__["a" /* PreSessionResult */],
                __WEBPACK_IMPORTED_MODULE_41__components_methodSessions_sessionsList_sessionList__["a" /* SessionList */],
                __WEBPACK_IMPORTED_MODULE_34__components_methodSessions_flashCardTest_DIMethodSessionTest_DIFlashCardSessionTest__["a" /* DIFlashCardSessionTest */],
                __WEBPACK_IMPORTED_MODULE_23__components_charts_lineCharts_lineCharts__["a" /* LineChart */],
                __WEBPACK_IMPORTED_MODULE_40__components_methodSessions_preSessionAssessment_preSessionAssessmentView_preSessionAssessmentView__["a" /* PreSessionAssessmentView */],
                __WEBPACK_IMPORTED_MODULE_51__components_studentDashBoard_ViewStudentAllWords_viewStudentAllWords__["a" /* ViewStudentAllWords */],
                __WEBPACK_IMPORTED_MODULE_37__components_methodSessions_flashCardTest_preeSessionResult_viewPreSessionUnknownWord_viewPreSessionUnKnownWord__["a" /* ViewPreSessionUnKnownWord */],
                __WEBPACK_IMPORTED_MODULE_43__components_PostAssessment_postAssessmentDashBoard_postAssessmentDashBoard__["a" /* PostAssessmentDashBoard */],
                __WEBPACK_IMPORTED_MODULE_45__components_PostAssessment_startNewPostAssessment_startNewPostAssessment__["a" /* StartNewPostAssessment */],
                __WEBPACK_IMPORTED_MODULE_46__components_PostAssessment_viewPostAssessment_viewPostAssessmentRecordList__["a" /* ViewPostAssessmentRecordList */],
                __WEBPACK_IMPORTED_MODULE_47__components_PostAssessment_viewPostAssessmentList_ViewPostAssessmentList__["a" /* ViewPostAssessmentList */],
                __WEBPACK_IMPORTED_MODULE_44__components_PostAssessment_postAssessmentFlashCard_postAssessmentFlashCard__["a" /* PostAssessmentFlashCard */],
                __WEBPACK_IMPORTED_MODULE_48__components_PostAssessment_viewSubPostTestAssessmentRecord_viewSubPostTestAssessmentRecord__["a" /* ViewSubPostTestAssessmentRecord */],
                __WEBPACK_IMPORTED_MODULE_28__components_login_addEmail_addEmailList__["a" /* AddEmailList */],
                __WEBPACK_IMPORTED_MODULE_29__components_login_addUserDetails_addUserDetails__["a" /* AddUserDetails */],
                __WEBPACK_IMPORTED_MODULE_30__components_login_forgetPassword_securityCheckUP_SecurityCheckUp__["a" /* SecurityCheckUp */],
                __WEBPACK_IMPORTED_MODULE_21__components_Assessment_viewStudentDatasetRecordList_viewStudentDatasetRecordList__["a" /* ViewStudentDatasetRecordList */],
                __WEBPACK_IMPORTED_MODULE_33__components_login_userProfile_updateProfile_updateProfile__["a" /* UpdateProfile */],
                __WEBPACK_IMPORTED_MODULE_27__components_login_addAdminAccess_addAdminAccess__["a" /* AddAdminAccess */],
                __WEBPACK_IMPORTED_MODULE_25__components_home_adminHomePage_adminHomePage__["a" /* AdminHomePage */],
                __WEBPACK_IMPORTED_MODULE_49__components_studentDashBoard_methodRatioSelection_methodRatioSelection__["a" /* MethodRatioSelection */],
                __WEBPACK_IMPORTED_MODULE_32__components_login_OrganizationRegister_organizationRegister__["a" /* organizationRegister */],
                __WEBPACK_IMPORTED_MODULE_22__components_billingGenerator_ManageSubscription_selectSubscription_selectSubscription__["a" /* SelectSubscription */],
                __WEBPACK_IMPORTED_MODULE_17__components_addWordList_addCategoryModal_addCategoryModal__["a" /* AddCategoryModal */],
                __WEBPACK_IMPORTED_MODULE_58__validation_passwordValidator__["a" /* PasswordValidator */]
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_3__angular_platform_browser__["a" /* BrowserModule */],
                __WEBPACK_IMPORTED_MODULE_15_ionic_angular__["e" /* IonicModule */].forRoot(__WEBPACK_IMPORTED_MODULE_57__app_component__["a" /* MyApp */], {}, {
                    links: []
                }),
                __WEBPACK_IMPORTED_MODULE_16_ng2_charts__["ChartsModule"],
                __WEBPACK_IMPORTED_MODULE_1__angular_forms__["h" /* ReactiveFormsModule */],
                __WEBPACK_IMPORTED_MODULE_1__angular_forms__["d" /* FormsModule */],
                __WEBPACK_IMPORTED_MODULE_2__angular_http__["a" /* HttpModule */],
                __WEBPACK_IMPORTED_MODULE_13__ionic_storage__["a" /* IonicStorageModule */].forRoot({
                    name: '__mydb',
                    driverOrder: ['indexeddb', 'sqlite', 'websql']
                })
            ],
            bootstrap: [__WEBPACK_IMPORTED_MODULE_15_ionic_angular__["c" /* IonicApp */]],
            entryComponents: [
                __WEBPACK_IMPORTED_MODULE_57__app_component__["a" /* MyApp */],
                __WEBPACK_IMPORTED_MODULE_26__components_home_home__["a" /* HomePage */],
                __WEBPACK_IMPORTED_MODULE_31__components_login_login__["a" /* Login */],
                __WEBPACK_IMPORTED_MODULE_59__components_manageStudentDetails_AddStudent_AddStudent__["a" /* AddStudent */],
                __WEBPACK_IMPORTED_MODULE_60__components_manageStudentDetails_viewStudent_viewStudent__["a" /* ViewStudent */],
                __WEBPACK_IMPORTED_MODULE_50__components_studentDashBoard_studentDashBoard__["a" /* StudentdashBoard */],
                __WEBPACK_IMPORTED_MODULE_18__components_addWordList_addWordList__["a" /* AddWordList */],
                __WEBPACK_IMPORTED_MODULE_52__components_viewWordList_viewWordList__["a" /* ViewWordList */],
                __WEBPACK_IMPORTED_MODULE_24__components_flashCardTest_flashCard__["a" /* FlashCard */],
                __WEBPACK_IMPORTED_MODULE_54__pages_list_list__["a" /* ListPage */],
                __WEBPACK_IMPORTED_MODULE_42__components_methodSessions_viewPreSessionData_preSessionData__["a" /* PreSessionView */],
                __WEBPACK_IMPORTED_MODULE_19__components_Assessment_BeginAssessmentTest_assessmentTest__["a" /* AssessmentTest */],
                __WEBPACK_IMPORTED_MODULE_35__components_methodSessions_flashCardTest_flashCardIntervention__["a" /* FlashCardIntervetion */],
                __WEBPACK_IMPORTED_MODULE_38__components_methodSessions_flashCardTest_preSessionFlashCardTest_preSessionFlashCard__["a" /* PreSessionFlashCard */],
                __WEBPACK_IMPORTED_MODULE_20__components_Assessment_viewAssessment_viewAssessment__["a" /* ViewAssessmentTest */],
                __WEBPACK_IMPORTED_MODULE_39__components_methodSessions_flashCardTest_sessionSummary_sessionSummary__["a" /* SessionSummary */],
                __WEBPACK_IMPORTED_MODULE_36__components_methodSessions_flashCardTest_preeSessionResult_preSessionResult__["a" /* PreSessionResult */],
                __WEBPACK_IMPORTED_MODULE_41__components_methodSessions_sessionsList_sessionList__["a" /* SessionList */],
                __WEBPACK_IMPORTED_MODULE_34__components_methodSessions_flashCardTest_DIMethodSessionTest_DIFlashCardSessionTest__["a" /* DIFlashCardSessionTest */],
                __WEBPACK_IMPORTED_MODULE_23__components_charts_lineCharts_lineCharts__["a" /* LineChart */],
                __WEBPACK_IMPORTED_MODULE_40__components_methodSessions_preSessionAssessment_preSessionAssessmentView_preSessionAssessmentView__["a" /* PreSessionAssessmentView */],
                __WEBPACK_IMPORTED_MODULE_51__components_studentDashBoard_ViewStudentAllWords_viewStudentAllWords__["a" /* ViewStudentAllWords */],
                __WEBPACK_IMPORTED_MODULE_37__components_methodSessions_flashCardTest_preeSessionResult_viewPreSessionUnknownWord_viewPreSessionUnKnownWord__["a" /* ViewPreSessionUnKnownWord */],
                __WEBPACK_IMPORTED_MODULE_43__components_PostAssessment_postAssessmentDashBoard_postAssessmentDashBoard__["a" /* PostAssessmentDashBoard */],
                __WEBPACK_IMPORTED_MODULE_45__components_PostAssessment_startNewPostAssessment_startNewPostAssessment__["a" /* StartNewPostAssessment */],
                __WEBPACK_IMPORTED_MODULE_46__components_PostAssessment_viewPostAssessment_viewPostAssessmentRecordList__["a" /* ViewPostAssessmentRecordList */],
                __WEBPACK_IMPORTED_MODULE_47__components_PostAssessment_viewPostAssessmentList_ViewPostAssessmentList__["a" /* ViewPostAssessmentList */],
                __WEBPACK_IMPORTED_MODULE_44__components_PostAssessment_postAssessmentFlashCard_postAssessmentFlashCard__["a" /* PostAssessmentFlashCard */],
                __WEBPACK_IMPORTED_MODULE_48__components_PostAssessment_viewSubPostTestAssessmentRecord_viewSubPostTestAssessmentRecord__["a" /* ViewSubPostTestAssessmentRecord */],
                __WEBPACK_IMPORTED_MODULE_28__components_login_addEmail_addEmailList__["a" /* AddEmailList */],
                __WEBPACK_IMPORTED_MODULE_29__components_login_addUserDetails_addUserDetails__["a" /* AddUserDetails */],
                __WEBPACK_IMPORTED_MODULE_30__components_login_forgetPassword_securityCheckUP_SecurityCheckUp__["a" /* SecurityCheckUp */],
                __WEBPACK_IMPORTED_MODULE_21__components_Assessment_viewStudentDatasetRecordList_viewStudentDatasetRecordList__["a" /* ViewStudentDatasetRecordList */],
                __WEBPACK_IMPORTED_MODULE_33__components_login_userProfile_updateProfile_updateProfile__["a" /* UpdateProfile */],
                __WEBPACK_IMPORTED_MODULE_27__components_login_addAdminAccess_addAdminAccess__["a" /* AddAdminAccess */],
                __WEBPACK_IMPORTED_MODULE_25__components_home_adminHomePage_adminHomePage__["a" /* AdminHomePage */],
                __WEBPACK_IMPORTED_MODULE_49__components_studentDashBoard_methodRatioSelection_methodRatioSelection__["a" /* MethodRatioSelection */],
                __WEBPACK_IMPORTED_MODULE_32__components_login_OrganizationRegister_organizationRegister__["a" /* organizationRegister */],
                __WEBPACK_IMPORTED_MODULE_22__components_billingGenerator_ManageSubscription_selectSubscription_selectSubscription__["a" /* SelectSubscription */],
                __WEBPACK_IMPORTED_MODULE_17__components_addWordList_addCategoryModal_addCategoryModal__["a" /* AddCategoryModal */]
            ],
            providers: [
                __WEBPACK_IMPORTED_MODULE_10__ionic_native_status_bar__["a" /* StatusBar */],
                __WEBPACK_IMPORTED_MODULE_9__ionic_native_splash_screen__["a" /* SplashScreen */],
                __WEBPACK_IMPORTED_MODULE_5__ionic_native_file__["a" /* File */],
                __WEBPACK_IMPORTED_MODULE_53__models_globalVariables__["a" /* GlobalVariables */],
                __WEBPACK_IMPORTED_MODULE_7__ionic_native_screen_orientation__["a" /* ScreenOrientation */],
                __WEBPACK_IMPORTED_MODULE_8__ionic_native_social_sharing__["a" /* SocialSharing */],
                __WEBPACK_IMPORTED_MODULE_4__ionic_native_document_picker__["a" /* DocumentPicker */],
                __WEBPACK_IMPORTED_MODULE_6__ionic_native_firebase__["a" /* Firebase */],
                { provide: __WEBPACK_IMPORTED_MODULE_0__angular_core__["ErrorHandler"], useClass: __WEBPACK_IMPORTED_MODULE_15_ionic_angular__["d" /* IonicErrorHandler */] },
                __WEBPACK_IMPORTED_MODULE_55__providers_data_data__["a" /* DataProvider */],
                __WEBPACK_IMPORTED_MODULE_56__providers_firebase_firebase__["a" /* FirebaseProvider */],
                __WEBPACK_IMPORTED_MODULE_12__ionic_native_text_to_speech__["a" /* TextToSpeech */],
                __WEBPACK_IMPORTED_MODULE_11__ionic_native_stripe_ngx__["a" /* Stripe */]
            ]
        })
    ], AppModule);
    return AppModule;
}());

//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ 77:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return User; });
var User = /** @class */ (function () {
    function User() {
        this.firstname = "";
        this.lastname = "";
        this.emailId = "";
        this.password = "";
        this.userRole = "";
        this.verifyEmail = false;
        this.securityQuestion = "";
        this.answer = "";
        this.userUID = "";
        this.organizationUID = "";
    }
    return User;
}());

//# sourceMappingURL=user.js.map

/***/ }),

/***/ 907:
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./af": 449,
	"./af.js": 449,
	"./ar": 450,
	"./ar-dz": 451,
	"./ar-dz.js": 451,
	"./ar-kw": 452,
	"./ar-kw.js": 452,
	"./ar-ly": 453,
	"./ar-ly.js": 453,
	"./ar-ma": 454,
	"./ar-ma.js": 454,
	"./ar-sa": 455,
	"./ar-sa.js": 455,
	"./ar-tn": 456,
	"./ar-tn.js": 456,
	"./ar.js": 450,
	"./az": 457,
	"./az.js": 457,
	"./be": 458,
	"./be.js": 458,
	"./bg": 459,
	"./bg.js": 459,
	"./bm": 460,
	"./bm.js": 460,
	"./bn": 461,
	"./bn.js": 461,
	"./bo": 462,
	"./bo.js": 462,
	"./br": 463,
	"./br.js": 463,
	"./bs": 464,
	"./bs.js": 464,
	"./ca": 465,
	"./ca.js": 465,
	"./cs": 466,
	"./cs.js": 466,
	"./cv": 467,
	"./cv.js": 467,
	"./cy": 468,
	"./cy.js": 468,
	"./da": 469,
	"./da.js": 469,
	"./de": 470,
	"./de-at": 471,
	"./de-at.js": 471,
	"./de-ch": 472,
	"./de-ch.js": 472,
	"./de.js": 470,
	"./dv": 473,
	"./dv.js": 473,
	"./el": 474,
	"./el.js": 474,
	"./en-au": 475,
	"./en-au.js": 475,
	"./en-ca": 476,
	"./en-ca.js": 476,
	"./en-gb": 477,
	"./en-gb.js": 477,
	"./en-ie": 478,
	"./en-ie.js": 478,
	"./en-il": 479,
	"./en-il.js": 479,
	"./en-nz": 480,
	"./en-nz.js": 480,
	"./eo": 481,
	"./eo.js": 481,
	"./es": 482,
	"./es-do": 483,
	"./es-do.js": 483,
	"./es-us": 484,
	"./es-us.js": 484,
	"./es.js": 482,
	"./et": 485,
	"./et.js": 485,
	"./eu": 486,
	"./eu.js": 486,
	"./fa": 487,
	"./fa.js": 487,
	"./fi": 488,
	"./fi.js": 488,
	"./fo": 489,
	"./fo.js": 489,
	"./fr": 490,
	"./fr-ca": 491,
	"./fr-ca.js": 491,
	"./fr-ch": 492,
	"./fr-ch.js": 492,
	"./fr.js": 490,
	"./fy": 493,
	"./fy.js": 493,
	"./gd": 494,
	"./gd.js": 494,
	"./gl": 495,
	"./gl.js": 495,
	"./gom-latn": 496,
	"./gom-latn.js": 496,
	"./gu": 497,
	"./gu.js": 497,
	"./he": 498,
	"./he.js": 498,
	"./hi": 499,
	"./hi.js": 499,
	"./hr": 500,
	"./hr.js": 500,
	"./hu": 501,
	"./hu.js": 501,
	"./hy-am": 502,
	"./hy-am.js": 502,
	"./id": 503,
	"./id.js": 503,
	"./is": 504,
	"./is.js": 504,
	"./it": 505,
	"./it.js": 505,
	"./ja": 506,
	"./ja.js": 506,
	"./jv": 507,
	"./jv.js": 507,
	"./ka": 508,
	"./ka.js": 508,
	"./kk": 509,
	"./kk.js": 509,
	"./km": 510,
	"./km.js": 510,
	"./kn": 511,
	"./kn.js": 511,
	"./ko": 512,
	"./ko.js": 512,
	"./ky": 513,
	"./ky.js": 513,
	"./lb": 514,
	"./lb.js": 514,
	"./lo": 515,
	"./lo.js": 515,
	"./lt": 516,
	"./lt.js": 516,
	"./lv": 517,
	"./lv.js": 517,
	"./me": 518,
	"./me.js": 518,
	"./mi": 519,
	"./mi.js": 519,
	"./mk": 520,
	"./mk.js": 520,
	"./ml": 521,
	"./ml.js": 521,
	"./mn": 522,
	"./mn.js": 522,
	"./mr": 523,
	"./mr.js": 523,
	"./ms": 524,
	"./ms-my": 525,
	"./ms-my.js": 525,
	"./ms.js": 524,
	"./mt": 526,
	"./mt.js": 526,
	"./my": 527,
	"./my.js": 527,
	"./nb": 528,
	"./nb.js": 528,
	"./ne": 529,
	"./ne.js": 529,
	"./nl": 530,
	"./nl-be": 531,
	"./nl-be.js": 531,
	"./nl.js": 530,
	"./nn": 532,
	"./nn.js": 532,
	"./pa-in": 533,
	"./pa-in.js": 533,
	"./pl": 534,
	"./pl.js": 534,
	"./pt": 535,
	"./pt-br": 536,
	"./pt-br.js": 536,
	"./pt.js": 535,
	"./ro": 537,
	"./ro.js": 537,
	"./ru": 538,
	"./ru.js": 538,
	"./sd": 539,
	"./sd.js": 539,
	"./se": 540,
	"./se.js": 540,
	"./si": 541,
	"./si.js": 541,
	"./sk": 542,
	"./sk.js": 542,
	"./sl": 543,
	"./sl.js": 543,
	"./sq": 544,
	"./sq.js": 544,
	"./sr": 545,
	"./sr-cyrl": 546,
	"./sr-cyrl.js": 546,
	"./sr.js": 545,
	"./ss": 547,
	"./ss.js": 547,
	"./sv": 548,
	"./sv.js": 548,
	"./sw": 549,
	"./sw.js": 549,
	"./ta": 550,
	"./ta.js": 550,
	"./te": 551,
	"./te.js": 551,
	"./tet": 552,
	"./tet.js": 552,
	"./tg": 553,
	"./tg.js": 553,
	"./th": 554,
	"./th.js": 554,
	"./tl-ph": 555,
	"./tl-ph.js": 555,
	"./tlh": 556,
	"./tlh.js": 556,
	"./tr": 557,
	"./tr.js": 557,
	"./tzl": 558,
	"./tzl.js": 558,
	"./tzm": 559,
	"./tzm-latn": 560,
	"./tzm-latn.js": 560,
	"./tzm.js": 559,
	"./ug-cn": 561,
	"./ug-cn.js": 561,
	"./uk": 562,
	"./uk.js": 562,
	"./ur": 563,
	"./ur.js": 563,
	"./uz": 564,
	"./uz-latn": 565,
	"./uz-latn.js": 565,
	"./uz.js": 564,
	"./vi": 566,
	"./vi.js": 566,
	"./x-pseudo": 567,
	"./x-pseudo.js": 567,
	"./yo": 568,
	"./yo.js": 568,
	"./zh-cn": 569,
	"./zh-cn.js": 569,
	"./zh-hk": 570,
	"./zh-hk.js": 570,
	"./zh-tw": 571,
	"./zh-tw.js": 571
};
function webpackContext(req) {
	return __webpack_require__(webpackContextResolve(req));
};
function webpackContextResolve(req) {
	var id = map[req];
	if(!(id + 1)) // check for number or string
		throw new Error("Cannot find module '" + req + "'.");
	return id;
};
webpackContext.keys = function webpackContextKeys() {
	return Object.keys(map);
};
webpackContext.resolve = webpackContextResolve;
module.exports = webpackContext;
webpackContext.id = 907;

/***/ }),

/***/ 926:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AddressFormat; });
var AddressFormat = /** @class */ (function () {
    function AddressFormat() {
        this.street1 = "";
        this.street2 = "";
        this.zipcode = "";
        this.city = "";
        this.state = "";
    }
    return AddressFormat;
}());

//# sourceMappingURL=addressFormat.js.map

/***/ }),

/***/ 927:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AssessmentTest; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__models_student__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__models_AssessmentTestData__ = __webpack_require__(194);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_storage__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ionic_native_file__ = __webpack_require__(23);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var AssessmentTest = /** @class */ (function () {
    function AssessmentTest(modalCtrl, navCtrl, navParams, storage, file) {
        this.modalCtrl = modalCtrl;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.storage = storage;
        this.file = file;
        this.studentObject = new __WEBPACK_IMPORTED_MODULE_2__models_student__["a" /* Student */]();
        this.assessmentTestObjectArray = [new __WEBPACK_IMPORTED_MODULE_3__models_AssessmentTestData__["a" /* AssessmentTestData */](0)];
        this.assessmentTestDataObject = new __WEBPACK_IMPORTED_MODULE_3__models_AssessmentTestData__["a" /* AssessmentTestData */](0);
        this.studentDataSetRecordIndex = 0;
        this.wordType = 0;
        this.datasetName = "dataset name";
        this.numberOfTest = 0;
        this.ConsistancyPercentage = [0, 0, 0];
        this.error = "Error Message";
        this.constructorMethod();
    }
    AssessmentTest.prototype.ionViewWillEnter = function () {
        this.constructorMethod();
    };
    AssessmentTest.prototype.constructorMethod = function () {
        //   this.assessmentTestObjectArray = this.studentObject.studentWordDetailsArray[this.wordType].studentDatasetRecordList[this.studentDataSetRecordIndex].assessmentDataArrayObject;
        //  this.datasetName = this.studentObject.studentWordDetailsArray[this.wordType].studentDatasetRecordList[this.studentDataSetRecordIndex].datasetObject.datasetName;
        console.log("asse:" + this.assessmentTestObjectArray.length);
        this.numberOfTest = this.assessmentTestObjectArray.length;
    };
    AssessmentTest.prototype.startAssessmentTest = function (index) {
        if (this.assessmentTestObjectArray[index].testStatus) {
            this.error = " Test " + (index + 1) + " is already done";
        }
        else if (index > 0 && !this.assessmentTestObjectArray[index - 1].testStatus) {
            this.error = " First complete test " + index;
        }
    };
    AssessmentTest.prototype.goBackToView = function (studentObject) {
    };
    AssessmentTest = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-assessmentTest',template:/*ion-inline-start:"C:\mystuff\master\AcademicInvertionAPP\backup\htmlDemos\backup\1\AIAPPv4.0\src\components\Assessment\BeginAssessmentTest\assessmentTest.html"*/'<ion-header>\n\n    <ion-navbar>\n\n      <button ion-button menuToggle>\n\n        <ion-icon name="menu"></ion-icon>\n\n      </button>\n\n      <ion-title>Assessment Test</ion-title>\n\n    </ion-navbar>\n\n  </ion-header>\n\n  \n\n  \n\n  \n\n\n\n\n\n   <ion-content padding="\'true\'" scroll="false" class="has-header">\n\n            <ion-grid style="height: 10%">\n\n                    <ion-row justify-content-center align-items-center style="height: 100%">\n\n                            <h3> {{studentObject.studentData.firstName}}  {{studentObject.studentData.lastName}}  </h3>\n\n                    </ion-row>\n\n                  </ion-grid>\n\n      \n\n    <ion-card>\n\n        \n\n        <ion-item>\n\n            <ion-row justify-content-center align-items-center style="height: 100%"  > \n\n                <ion-col  style="background-color: silver">Set Name  </ion-col>\n\n      \n\n                <ion-col> {{datasetName}}</ion-col>\n\n  \n\n          </ion-row>\n\n        </ion-item>\n\n        \n\n        <br>\n\n           <!-- <ion-searchbar [(ngModel)]="searchTerm" (ionInput)="filterItems()"></ion-searchbar> -->\n\n           <div *ngIf="error" class="error-message">{{error}}</div>\n\n           \n\n           <ion-item  >\n\n               <ion-row class="ion-title" style="background-color: silver;">\n\n                   <ion-col >Assessment Test</ion-col>\n\n                   <ion-col >Test Status</ion-col>\n\n                   <ion-col >Total Words</ion-col>\n\n                   <ion-col >Known Words</ion-col>\n\n                   <ion-col>Unknown Words</ion-col>\n\n                   <ion-col>Consistancy %</ion-col>\n\n                   \n\n                 </ion-row>\n\n                 <ion-item *ngFor="let assessmentTestObject of assessmentTestObjectArray">\n\n                     <ion-row  >\n\n                         <ion-col style="color: blue" (click)="startAssessmentTest(assessmentTestObject.testIndex)" >Test {{assessmentTestObject.testIndex+1}}</ion-col>\n\n                         <ion-col *ngIf="assessmentTestObject.testStatus">Completed</ion-col>\n\n                         <ion-col *ngIf="!assessmentTestObject.testStatus">Incomplete</ion-col>\n\n                         <ion-col >{{assessmentTestObject.totalWordList}} </ion-col>\n\n\n\n                         <ion-col *ngIf="assessmentTestObject.knownWordList">{{assessmentTestObject.knownWordList.length}} </ion-col>\n\n                         <ion-col *ngIf="!assessmentTestObject.knownWordList">0</ion-col>\n\n                         <ion-col *ngIf="assessmentTestObject.unknownWordList">{{assessmentTestObject.unknownWordList.length}} </ion-col>\n\n                         <ion-col *ngIf="!assessmentTestObject.unknownWordList"> 0 </ion-col>\n\n                         <ion-col >{{assessmentTestObject.consistancyPercentage}} </ion-col>\n\n                     \n\n                     </ion-row>\n\n                   </ion-item>\n\n           </ion-item>\n\n         \n\n       </ion-card>\n\n     </ion-content>\n\n   '/*ion-inline-end:"C:\mystuff\master\AcademicInvertionAPP\backup\htmlDemos\backup\1\AIAPPv4.0\src\components\Assessment\BeginAssessmentTest\assessmentTest.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* ModalController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_4__ionic_storage__["b" /* Storage */],
            __WEBPACK_IMPORTED_MODULE_5__ionic_native_file__["a" /* File */]])
    ], AssessmentTest);
    return AssessmentTest;
}());

//# sourceMappingURL=assessmentTest.js.map

/***/ }),

/***/ 928:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return StudentWordDetails; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__AssessmentTestData__ = __webpack_require__(194);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__methodIntervetion__ = __webpack_require__(576);


var StudentWordDetails = /** @class */ (function () {
    function StudentWordDetails(studentWordType) {
        this.totalAssessment = 3;
        this.assessmentDataArrayObject = [new __WEBPACK_IMPORTED_MODULE_0__AssessmentTestData__["a" /* AssessmentTestData */](0), new __WEBPACK_IMPORTED_MODULE_0__AssessmentTestData__["a" /* AssessmentTestData */](1), new __WEBPACK_IMPORTED_MODULE_0__AssessmentTestData__["a" /* AssessmentTestData */](2)];
        this.methodArray = [new __WEBPACK_IMPORTED_MODULE_1__methodIntervetion__["a" /* Method */]("Incremental Rehearsal", 0), new __WEBPACK_IMPORTED_MODULE_1__methodIntervetion__["a" /* Method */]("Direct Instruction", 1), new __WEBPACK_IMPORTED_MODULE_1__methodIntervetion__["a" /* Method */]("Traditional Drill & Practice", 2), new __WEBPACK_IMPORTED_MODULE_1__methodIntervetion__["a" /* Method */]("Control Intervention", 3)]; //store 3 methods
        this.knwonArrayList = []; // known array 
        this.unKnownArrayList = []; // unknown 
        this.knownUnknownArrayList = []; // unknown becomes known
        this.assessmentWordDataArray = []; //begining assessment objects
        this.convertToAssessmentWord = false;
        this.postTestWordDataRecordListArray = [];
        this.newKnownUnknownArrayList = [];
        this.studentDatasetRecordList = [];
        this.studentLockDatasetRecordList = false;
        this.studentWordType = "";
        this.studentWordType = studentWordType;
    }
    return StudentWordDetails;
}());

//# sourceMappingURL=StudentWordDetails.js.map

/***/ }),

/***/ 929:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ViewAssessmentTest; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__models_student__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__models_AssessmentTestData__ = __webpack_require__(194);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__models_viewAssessmentWordObjects__ = __webpack_require__(578);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ionic_storage__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__models_organizationDetails__ = __webpack_require__(35);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







var ViewAssessmentTest = /** @class */ (function () {
    function ViewAssessmentTest(navCtrl, alertCtrl, storage) {
        this.navCtrl = navCtrl;
        this.alertCtrl = alertCtrl;
        this.storage = storage;
        this.datasetName = "Dataset Name";
        this.isenabled = true;
        this.knownsTime = 0;
        this.totalKnowns = 0;
        this.totalUnKnowns = 0;
        this.studentObject = new __WEBPACK_IMPORTED_MODULE_2__models_student__["a" /* Student */]();
        this.intArray = [];
        this.error = "Error Message";
        this.assessmentTestObjectArray = [new __WEBPACK_IMPORTED_MODULE_3__models_AssessmentTestData__["a" /* AssessmentTestData */](0)];
        this.assessmentTestDataObject = new __WEBPACK_IMPORTED_MODULE_3__models_AssessmentTestData__["a" /* AssessmentTestData */](0);
        this.assessmentWordDataArray = [new __WEBPACK_IMPORTED_MODULE_4__models_viewAssessmentWordObjects__["a" /* ViewAssessmentWordObjects */]()];
        this.organizationDetails = new __WEBPACK_IMPORTED_MODULE_6__models_organizationDetails__["a" /* OrganizationDetails */]();
        this.studentDataSetRecordIndex = 0;
        this.wordType = 0;
    }
    ViewAssessmentTest.prototype.getAssessmentObject = function (wordData) {
        for (var _i = 0, _a = this.assessmentWordDataArray; _i < _a.length; _i++) {
            var obj = _a[_i];
            if (obj.wordData.wordId == wordData.wordId) {
                console.log("same : " + obj.wordData.wordText + " s:" + wordData.wordText);
                return obj;
            }
        }
        return null;
    };
    ViewAssessmentTest.prototype.updateAssessmentObjectToArray = function (viewAssessmentWordObject) {
        var i = 0;
        if (this.assessmentWordDataArray == null)
            this.assessmentWordDataArray = [];
        for (var _i = 0, _a = this.assessmentWordDataArray; _i < _a.length; _i++) {
            var obj = _a[_i];
            if (obj.assessmentWordObjectId == viewAssessmentWordObject.assessmentWordObjectId) {
                this.assessmentWordDataArray[i] = viewAssessmentWordObject;
                return;
            }
            i++;
        }
        this.assessmentWordDataArray.push(viewAssessmentWordObject);
    };
    ViewAssessmentTest.prototype.addToKnownList = function (wordDataObj) {
        this.knownConfirm(wordDataObj);
    };
    ViewAssessmentTest.prototype.addToUnKnownList = function (wordDataObj) {
        this.unKnownConfirm(wordDataObj);
    };
    ViewAssessmentTest.prototype.removeWordFromStudentAssessment = function (wordDataObj, wordType) {
    };
    ViewAssessmentTest.prototype.saveToKnownUnknown = function () {
        var anyChanges = false;
        console.log("student view2:" + this.studentObject.studentData.studentUID);
        for (var _i = 0, _a = this.studentObject.studentWordDetailsArray[this.wordType].studentDatasetRecordList[this.studentDataSetRecordIndex].assessmentWordDataArray; _i < _a.length; _i++) {
            var obj = _a[_i];
            if (!obj.wordAdded) {
                anyChanges = true;
                //loginc
                if (obj.totalKnownTime >= this.knownsTime) {
                    obj.wordType = "Known";
                    obj.wordAdded = true;
                    if (this.studentObject.studentWordDetailsArray[this.wordType].studentDatasetRecordList[this.studentDataSetRecordIndex].knwonArrayList == null)
                        this.studentObject.studentWordDetailsArray[this.wordType].studentDatasetRecordList[this.studentDataSetRecordIndex].knwonArrayList = [];
                    this.studentObject.studentWordDetailsArray[this.wordType].studentDatasetRecordList[this.studentDataSetRecordIndex].knwonArrayList.push(obj.wordData);
                }
                else {
                    obj.wordType = "UnKnown";
                    obj.wordAdded = true;
                    if (this.studentObject.studentWordDetailsArray[this.wordType].studentDatasetRecordList[this.studentDataSetRecordIndex].unKnownArrayList == null)
                        this.studentObject.studentWordDetailsArray[this.wordType].studentDatasetRecordList[this.studentDataSetRecordIndex].unKnownArrayList = [];
                    this.studentObject.studentWordDetailsArray[this.wordType].studentDatasetRecordList[this.studentDataSetRecordIndex].unKnownArrayList.push(obj.wordData);
                }
                obj.wordAdded = true;
            }
        }
        this.assessmentWordDataArray = this.studentObject.studentWordDetailsArray[this.wordType].studentDatasetRecordList[this.studentDataSetRecordIndex].assessmentWordDataArray;
        //this.assessmentWordDataArray=[];
    };
    ViewAssessmentTest.prototype.chekEnableDisable = function () {
        var counter = 0;
        var previBool = this.studentObject.studentWordDetailsArray[this.wordType].studentDatasetRecordList[this.studentDataSetRecordIndex].isConvertedAll;
        if (previBool) {
            this.isenabled = false;
            return;
        }
        else {
            for (var _i = 0, _a = this.assessmentWordDataArray; _i < _a.length; _i++) {
                var assessmentwordObject = _a[_i];
                if (assessmentwordObject.wordAdded) {
                    counter++;
                }
            }
            if (counter == this.assessmentWordDataArray.length && counter > 0) {
                this.isenabled = false;
                this.studentObject.studentWordDetailsArray[this.wordType].studentDatasetRecordList[this.studentDataSetRecordIndex].isConvertedAll = true;
            }
        }
    };
    ViewAssessmentTest.prototype.goBackToView = function (studentObject) {
    };
    ViewAssessmentTest.prototype.knownConfirm = function (wordDataObj) {
        var _this = this;
        var alert = this.alertCtrl.create({
            title: 'Known Word',
            message: 'Do you want to set as Known word ' + wordDataObj.wordText + '?',
            buttons: [
                {
                    text: 'Cancel',
                    role: 'cancel',
                    handler: function () {
                        //     alert.dismiss();
                        console.log('Cancel clicked');
                    }
                },
                {
                    text: 'yes',
                    handler: function () {
                        if (_this.studentObject.studentWordDetailsArray[_this.wordType].studentDatasetRecordList[_this.studentDataSetRecordIndex].knwonArrayList == null)
                            _this.studentObject.studentWordDetailsArray[_this.wordType].studentDatasetRecordList[_this.studentDataSetRecordIndex].knwonArrayList = [];
                        _this.studentObject.studentWordDetailsArray[_this.wordType].studentDatasetRecordList[_this.studentDataSetRecordIndex].knwonArrayList.push(wordDataObj);
                        _this.removeWordFromStudentAssessment(wordDataObj, "Known");
                        _this.goBackToView(_this.studentObject);
                    }
                }
            ]
        });
        alert.present();
    };
    ViewAssessmentTest.prototype.unKnownConfirm = function (wordDataObj) {
        var _this = this;
        var alert = this.alertCtrl.create({
            title: 'unKnown word',
            message: 'Do you want to set as unKnown word' + wordDataObj.wordText + '?',
            buttons: [
                {
                    text: 'Cancel',
                    role: 'cancel',
                    handler: function () {
                        //  alert.dismiss();
                        console.log('Cancel clicked');
                    }
                },
                {
                    text: 'yes',
                    handler: function () {
                        if (_this.studentObject.studentWordDetailsArray[_this.wordType].studentDatasetRecordList[_this.studentDataSetRecordIndex].unKnownArrayList == null)
                            _this.studentObject.studentWordDetailsArray[_this.wordType].studentDatasetRecordList[_this.studentDataSetRecordIndex].unKnownArrayList = [];
                        _this.studentObject.studentWordDetailsArray[_this.wordType].studentDatasetRecordList[_this.studentDataSetRecordIndex].unKnownArrayList.push(wordDataObj);
                        _this.removeWordFromStudentAssessment(wordDataObj, "UnKnown");
                        //this.studentFireBaseService.updateUnKnownList(this.studentObject);
                        _this.goBackToView(_this.studentObject);
                        // alert.dismiss();  
                    }
                }
            ]
        });
        alert.present();
    };
    ViewAssessmentTest.prototype.showKnownUnKnownWords = function () {
        this.totalKnowns = 0;
        this.totalUnKnowns = 0;
        console.log("size::" + this.assessmentWordDataArray.length);
        for (var _i = 0, _a = this.assessmentWordDataArray; _i < _a.length; _i++) {
            var assessmentwordObject = _a[_i];
            console.log("word obj::" + assessmentwordObject.wordAdded);
            if (assessmentwordObject.wordAdded != null && assessmentwordObject.wordAdded) {
                if (assessmentwordObject.wordType == "Known")
                    this.totalKnowns++;
                else
                    this.totalUnKnowns++;
            }
            else {
                if (assessmentwordObject.totalKnownTime >= this.knownsTime)
                    this.totalKnowns++;
                else
                    this.totalUnKnowns++;
            }
        }
    };
    ViewAssessmentTest = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-viewAssessment',template:/*ion-inline-start:"C:\mystuff\master\AcademicInvertionAPP\backup\htmlDemos\backup\1\AIAPPv4.0\src\components\Assessment\viewAssessment\viewAssessment.html"*/'<ion-header>\n\n  <ion-navbar>\n\n    <button ion-button menuToggle>\n\n      <ion-icon name="menu"></ion-icon>\n\n    </button>\n\n    <ion-title>View Assessment Test</ion-title>\n\n  </ion-navbar>\n\n</ion-header>\n\n\n\n\n\n\n\n<ion-content padding="\'true\'" scroll="false" class="has-header">\n\n  <ion-grid style="height: 20%">\n\n    <ion-row justify-content-center align-items-center style="height: 100%">\n\n      <h3> {{studentObject.studentData.firstName}} {{studentObject.studentData.lastName}} </h3>\n\n    </ion-row>\n\n  </ion-grid>\n\n  <ion-card>\n\n    <!-- <ion-searchbar [(ngModel)]="searchTerm" (ionInput)="filterItems()"></ion-searchbar> -->\n\n\n\n    <div *ngIf="error" class="error-message">error:{{error}}</div>\n\n\n\n    <ion-row>\n\n\n\n      <ion-col>\n\n        <ion-item>\n\n          Enter Number of Knowns\n\n        </ion-item>\n\n      </ion-col>\n\n\n\n\n\n      <ion-col>\n\n        <ion-select [(ngModel)]="knownsTime" (ngModelChange)="showKnownUnKnownWords()">\n\n          <ion-option *ngFor="let intObj of intArray" value="{{intObj}}">{{intObj}}</ion-option>\n\n\n\n        </ion-select>\n\n      </ion-col>\n\n    </ion-row>\n\n\n\n    <ion-item>\n\n\n\n      <ion-row>\n\n        <ion-col>Set Name : </ion-col>\n\n\n\n        <ion-col> {{datasetName}}</ion-col>\n\n\n\n      </ion-row>\n\n      <br>\n\n\n\n      <ion-row>\n\n        <ion-col>Total Test </ion-col>\n\n\n\n        <ion-col> {{assessmentTestObjectArray.length}}</ion-col>\n\n\n\n      </ion-row>\n\n      <br>\n\n      <ion-row>\n\n        <ion-col>Number of Knowns / Unknowns</ion-col>\n\n        <ion-col>{{totalKnowns}}/{{totalUnKnowns}}</ion-col>\n\n\n\n      </ion-row>\n\n      <br>\n\n      <ion-row justify-content-center align-items-center style="height: 100%">\n\n        <button ion-button class="submit-btn" full (click)="saveToKnownUnknown()" [disabled]="!isenabled">add All to\n\n          known/unknown</button>\n\n      </ion-row>\n\n      <br>\n\n\n\n\n\n      <ion-row class="ion-title" style="background-color: silver;">\n\n        <ion-col>Words</ion-col>\n\n        <ion-col *ngFor="let assessmentwordObject of assessmentTestObjectArray;let i=index ">\n\n          <ion-col>Test {{i}}</ion-col>\n\n        </ion-col>\n\n        <ion-col>Total Knowns</ion-col>\n\n        <ion-col></ion-col>\n\n        <ion-col></ion-col>\n\n      </ion-row>\n\n\n\n      <ion-item *ngFor="let assessmentwordObject of assessmentWordDataArray">\n\n        <ion-row>\n\n          <ion-col>{{assessmentwordObject.wordData.wordText}}</ion-col>\n\n          <ion-col *ngFor="let stringObj of assessmentwordObject.stringKnownArray ">\n\n            <ion-col>{{stringObj}}</ion-col>\n\n          </ion-col>\n\n          <ion-col>{{assessmentwordObject.totalKnownTime}} </ion-col>\n\n          <ion-col *ngIf="!assessmentwordObject.wordAdded" style="color: blue"\n\n            (click)="addToKnownList(assessmentwordObject.wordData)">Add to Known List</ion-col>\n\n          <ion-col *ngIf="!assessmentwordObject.wordAdded" style="color: blue"\n\n            (click)="addToUnKnownList(assessmentwordObject.wordData)">Add to UnKnown List</ion-col>\n\n          <ion-col *ngIf="assessmentwordObject.wordAdded" style="color: rebeccapurple">{{assessmentwordObject.wordType}}\n\n          </ion-col>\n\n          <ion-col *ngIf="assessmentwordObject.wordAdded"></ion-col>\n\n\n\n        </ion-row>\n\n      </ion-item>\n\n    </ion-item>\n\n\n\n  </ion-card>\n\n</ion-content>'/*ion-inline-end:"C:\mystuff\master\AcademicInvertionAPP\backup\htmlDemos\backup\1\AIAPPv4.0\src\components\Assessment\viewAssessment\viewAssessment.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */],
            __WEBPACK_IMPORTED_MODULE_5__ionic_storage__["b" /* Storage */]])
    ], ViewAssessmentTest);
    return ViewAssessmentTest;
}());

//# sourceMappingURL=viewAssessment.js.map

/***/ }),

/***/ 930:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ViewStudentDatasetRecordList; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_forms__ = __webpack_require__(53);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_file__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_storage__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_ionic_angular__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__models_Dataset__ = __webpack_require__(193);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__models_organizationDetails__ = __webpack_require__(35);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__models_student__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__models_studentDataSetRecord__ = __webpack_require__(931);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__services_dataSetServices__ = __webpack_require__(292);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};










var ViewStudentDatasetRecordList = /** @class */ (function () {
    function ViewStudentDatasetRecordList(navCtrl, storage, file, alertCtrl, formBuilder) {
        this.navCtrl = navCtrl;
        this.storage = storage;
        this.file = file;
        this.alertCtrl = alertCtrl;
        this.formBuilder = formBuilder;
        this.studentObject = new __WEBPACK_IMPORTED_MODULE_7__models_student__["a" /* Student */]();
        this.studentDatasetRecordList = [];
        this.dataSetService = new __WEBPACK_IMPORTED_MODULE_9__services_dataSetServices__["a" /* DataSetService */]();
        this.datasetList = [new __WEBPACK_IMPORTED_MODULE_5__models_Dataset__["a" /* Dataset */]()];
        this.error = "Error Message";
        this.wordType = 0;
        this.selectedDatasetList = [new __WEBPACK_IMPORTED_MODULE_8__models_studentDataSetRecord__["a" /* StudentDataSetRecord */]()];
        this.restrictedDatasetList = [new __WEBPACK_IMPORTED_MODULE_8__models_studentDataSetRecord__["a" /* StudentDataSetRecord */]()];
        this.notConvertedcompletedDatasetList = [new __WEBPACK_IMPORTED_MODULE_8__models_studentDataSetRecord__["a" /* StudentDataSetRecord */]()];
        this.organizationDetails = new __WEBPACK_IMPORTED_MODULE_6__models_organizationDetails__["a" /* OrganizationDetails */]();
        this.controls = this.selectedDatasetList.map(function (c) { return new __WEBPACK_IMPORTED_MODULE_1__angular_forms__["c" /* FormControl */](false); });
        this.studentDatasetRecordObjectGroup = this.formBuilder.group({
            studentDatasetRecordObjectGroupList: new __WEBPACK_IMPORTED_MODULE_1__angular_forms__["a" /* FormArray */](this.controls, this.minSelectedCheckboxes(0))
        });
        this.constructorMethod();
    }
    ViewStudentDatasetRecordList.prototype.ionViewWillEnter = function () {
        this.constructorMethod();
    };
    ViewStudentDatasetRecordList.prototype.constructorMethod = function () {
        this.controls = this.selectedDatasetList.map(function (c) { return new __WEBPACK_IMPORTED_MODULE_1__angular_forms__["c" /* FormControl */](true); });
    };
    ViewStudentDatasetRecordList.prototype.addObjecttoSelectedDataset = function () {
        this.selectedDatasetList = [];
        this.restrictedDatasetList = [];
        this.notConvertedcompletedDatasetList = [];
        for (var _i = 0, _a = this.studentDatasetRecordList; _i < _a.length; _i++) {
            var studentDatasetRecordObject = _a[_i];
            if (!studentDatasetRecordObject.assessmentMethodTestDone && studentDatasetRecordObject.sessionTestDone) {
                if (studentDatasetRecordObject.isConvertedAll)
                    this.selectedDatasetList.push(studentDatasetRecordObject);
                else
                    this.notConvertedcompletedDatasetList.push(studentDatasetRecordObject);
            }
            else {
                this.restrictedDatasetList.push(studentDatasetRecordObject);
            }
        }
    };
    ViewStudentDatasetRecordList.prototype.minSelectedCheckboxes = function (min) {
        if (min === void 0) { min = 1; }
        var validator = function (formArray) {
            var totalSelected = formArray.controls
                .map(function (control) { return control.value; })
                .reduce(function (prev, next) { return next ? prev + next : prev; }, 0);
            // if the total is not greater than the minimum, return the error message
            return totalSelected >= min ? null : { required: true };
        };
        return validator;
    };
    ViewStudentDatasetRecordList.prototype.lockDatasetAssessment = function () {
        var _this = this;
        var subSelectedDatasetList = this.studentDatasetRecordObjectGroup.value.studentDatasetRecordObjectGroupList
            .map(function (v, i) { return v ? _this.selectedDatasetList[i] : null; })
            .filter(function (v) { return v !== null; });
        if (subSelectedDatasetList == null || subSelectedDatasetList.length <= 0) {
            this.error = "select one word at least.";
        }
        else {
            this.error = "";
            console.log("len:" + subSelectedDatasetList.length + "  x:" + subSelectedDatasetList[0].datasetObject.datasetName);
            this.confirmLockDataset(subSelectedDatasetList);
        }
    };
    ViewStudentDatasetRecordList.prototype.startPreAssessment = function (datasetObject) {
        var studentDataSetRecordObject = new __WEBPACK_IMPORTED_MODULE_8__models_studentDataSetRecord__["a" /* StudentDataSetRecord */]();
        console.log("wordType:" + this.wordType);
        studentDataSetRecordObject.datasetObject = datasetObject;
        if (this.studentObject.studentWordDetailsArray[this.wordType].studentDatasetRecordList == null)
            this.studentObject.studentWordDetailsArray[this.wordType].studentDatasetRecordList = [];
        this.studentObject.studentWordDetailsArray[this.wordType].studentDatasetRecordList.push(studentDataSetRecordObject);
        this.completePreAssessmentTest(this.studentObject.studentWordDetailsArray[this.wordType].studentDatasetRecordList.length - 1);
    };
    ViewStudentDatasetRecordList.prototype.completePreAssessmentTest = function (index) {
    };
    ViewStudentDatasetRecordList.prototype.viewStudentDatasetRecordObject = function (studentDatasetRecordObject) {
        var index = this.studentObject.studentWordDetailsArray[this.wordType].studentDatasetRecordList.indexOf(studentDatasetRecordObject);
    };
    ViewStudentDatasetRecordList.prototype.confirmLockDataset = function (subSelectedDatasetList) {
        var _this = this;
        var alert = this.alertCtrl.create({
            title: 'Lock Datasets',
            message: 'Do you want to lock selected datasets for session method tests ?',
            buttons: [
                {
                    text: 'Cancel',
                    role: 'cancel',
                    handler: function () {
                        console.log('Cancel clicked');
                    }
                },
                {
                    text: 'yes',
                    handler: function () {
                        _this.makeLockDataset(subSelectedDatasetList);
                    }
                }
            ]
        });
        alert.present();
    };
    ViewStudentDatasetRecordList.prototype.makeLockDataset = function (subSelectedDatasetList) {
        if (this.studentObject.studentWordDetailsArray[this.wordType].knwonArrayList == null)
            this.studentObject.studentWordDetailsArray[this.wordType].knwonArrayList = [];
        if (this.studentObject.studentWordDetailsArray[this.wordType].unKnownArrayList == null)
            this.studentObject.studentWordDetailsArray[this.wordType].unKnownArrayList = [];
        for (var _i = 0, subSelectedDatasetList_1 = subSelectedDatasetList; _i < subSelectedDatasetList_1.length; _i++) {
            var obj = subSelectedDatasetList_1[_i];
            if (obj.knwonArrayList != null)
                this.studentObject.studentWordDetailsArray[this.wordType].knwonArrayList = this.studentObject.studentWordDetailsArray[this.wordType].knwonArrayList.concat(obj.knwonArrayList);
            if (obj.unKnownArrayList != null)
                this.studentObject.studentWordDetailsArray[this.wordType].unKnownArrayList = this.studentObject.studentWordDetailsArray[this.wordType].unKnownArrayList.concat(obj.unKnownArrayList);
            obj.assessmentMethodTestDone = true;
            var index = this.studentObject.studentWordDetailsArray[this.wordType].studentDatasetRecordList.indexOf(obj);
            console.log("index:" + index);
        }
    };
    ViewStudentDatasetRecordList = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-viewStudentDatasetRecordList',template:/*ion-inline-start:"C:\mystuff\master\AcademicInvertionAPP\backup\htmlDemos\backup\1\AIAPPv4.0\src\components\Assessment\viewStudentDatasetRecordList\viewStudentDatasetRecordList.html"*/'<ion-header>\n\n    <ion-navbar>\n\n      <button ion-button menuToggle>\n\n        <ion-icon name="menu"></ion-icon>\n\n      </button>\n\n      <ion-title>View Assessments</ion-title>\n\n    </ion-navbar>\n\n  </ion-header>\n\n  \n\n\n\n\n\n   <ion-content padding="\'true\'" scroll="false" class="has-header" >\n\n        <ion-grid style="height: 20%">\n\n                <ion-row justify-content-center align-items-center style="height: 100%">\n\n                        <h3> {{studentObject.studentData.firstName}}  {{studentObject.studentData.lastName}}  </h3>\n\n                </ion-row>\n\n              </ion-grid>\n\n       <ion-card>\n\n           <!-- <ion-searchbar [(ngModel)]="searchTerm" (ionInput)="filterItems()"></ion-searchbar> -->\n\n         \n\n           <div *ngIf="error" class="error-message">error:{{error}}</div>\n\n             \n\n           <ion-grid style="height: 100%" >\n\n                <ion-row justify-content-center align-items-center style="height: 100%">\n\n                        <button ion-button class="submit-btn" full type="submit" (click)="lockDatasetAssessment()" >\n\n                            Add Set to Assessment </button>\n\n                </ion-row>\n\n            </ion-grid>\n\n            <ion-item  >\n\n      \n\n               <ion-row class="ion-title" style="background-color: silver;">\n\n                   <ion-col >Set Name</ion-col>\n\n                   <ion-col >Set Status</ion-col>\n\n                   <ion-col></ion-col>\n\n\n\n                 </ion-row>\n\n\n\n                 <form [formGroup]="studentDatasetRecordObjectGroup" (ngSubmit)="lockDatasetAssessment()" >\n\n               \n\n                    <ion-item formArrayName="studentDatasetRecordObjectGroupList" *ngFor="let studentDatasetRecordObject of selectedDatasetList; let i = index">\n\n                        <ion-row  >\n\n                            <ion-col style="color: blue" (click)="viewStudentDatasetRecordObject(studentDatasetRecordObject)" >\n\n                                {{studentDatasetRecordObject.datasetObject.datasetName}}\n\n                            </ion-col>\n\n                            \n\n                            <ion-col *ngIf="studentDatasetRecordObject.sessionTestDone">Completed </ion-col>\n\n                            \n\n                            <ion-col *ngIf="!studentDatasetRecordObject.sessionTestDone">Incomplete </ion-col>\n\n                            \n\n                            <ion-col  justify-content-center align-items-center>\n\n                                    <ion-item>\n\n                                            <ion-checkbox  checked="true"   [formControlName]="i" > {{i}}</ion-checkbox>\n\n                                    </ion-item>\n\n                                </ion-col>\n\n                        </ion-row>\n\n                        \n\n                    </ion-item>\n\n                   </form>\n\n\n\n                   <ion-item *ngFor="let studentDatasetRecordObject of notConvertedcompletedDatasetList; let i = index">\n\n                        <ion-row  >\n\n                            <ion-col style="color: blue" (click)="viewStudentDatasetRecordObject(studentDatasetRecordObject)" >\n\n                                {{studentDatasetRecordObject.datasetObject.datasetName}}\n\n                            </ion-col>\n\n                            \n\n                            <ion-col *ngIf="studentDatasetRecordObject.sessionTestDone">Completed </ion-col>\n\n                            \n\n                            <ion-col *ngIf="!studentDatasetRecordObject.sessionTestDone">Incomplete </ion-col>\n\n                            \n\n                         \n\n\n\n                            <ion-col justify-content-center align-items-center>\n\n                                    convet known/unknown\n\n                            </ion-col>\n\n                            \n\n\n\n                        </ion-row>\n\n                        \n\n                    </ion-item>\n\n\n\n\n\n                   <ion-item *ngFor="let studentDatasetRecordObject of restrictedDatasetList; let i = index">\n\n                        <ion-row  >\n\n                            <ion-col style="color: blue" (click)="viewStudentDatasetRecordObject(studentDatasetRecordObject)" >\n\n                                {{studentDatasetRecordObject.datasetObject.datasetName}}\n\n                            </ion-col>\n\n                            \n\n                            <ion-col *ngIf="studentDatasetRecordObject.sessionTestDone">Completed </ion-col>\n\n                            \n\n                            <ion-col *ngIf="!studentDatasetRecordObject.sessionTestDone">Incomplete </ion-col>\n\n                            \n\n                         \n\n\n\n                            <ion-col justify-content-center align-items-center>\n\n                                    view\n\n                            </ion-col>\n\n                            \n\n\n\n                        </ion-row>\n\n                        \n\n                    </ion-item>\n\n                    \n\n                   <ion-item *ngFor="let datsetObject of datasetList; ">\n\n                        <ion-row  >\n\n                            <ion-col style="color: blue" (click)="startPreAssessment(datsetObject)" >\n\n                                {{datsetObject.datasetName}}\n\n                            </ion-col>\n\n                            \n\n                            \n\n                            <ion-col >Incomplete </ion-col>\n\n                            \n\n                            <ion-col justify-content-center align-items-center>\n\n                               begin\n\n                            </ion-col>\n\n                            \n\n                        </ion-row>\n\n                        \n\n                    </ion-item>\n\n\n\n                \n\n                  \n\n                       \n\n           </ion-item>\n\n          \n\n       </ion-card>\n\n     </ion-content>\n\n   '/*ion-inline-end:"C:\mystuff\master\AcademicInvertionAPP\backup\htmlDemos\backup\1\AIAPPv4.0\src\components\Assessment\viewStudentDatasetRecordList\viewStudentDatasetRecordList.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_4_ionic_angular__["h" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_3__ionic_storage__["b" /* Storage */],
            __WEBPACK_IMPORTED_MODULE_2__ionic_native_file__["a" /* File */],
            __WEBPACK_IMPORTED_MODULE_4_ionic_angular__["a" /* AlertController */],
            __WEBPACK_IMPORTED_MODULE_1__angular_forms__["b" /* FormBuilder */]])
    ], ViewStudentDatasetRecordList);
    return ViewStudentDatasetRecordList;
}());

//# sourceMappingURL=viewStudentDatasetRecordList.js.map

/***/ }),

/***/ 931:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return StudentDataSetRecord; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Dataset__ = __webpack_require__(193);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__AssessmentTestData__ = __webpack_require__(194);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__viewAssessmentWordObjects__ = __webpack_require__(578);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__wordData__ = __webpack_require__(25);




var StudentDataSetRecord = /** @class */ (function () {
    function StudentDataSetRecord() {
        this.datasetObject = new __WEBPACK_IMPORTED_MODULE_0__Dataset__["a" /* Dataset */]();
        this.assessmentMethodTestDone = false; // this dataset is done with all 3 methods
        this.sessionTestDone = false; // all 3 test is completed or not
        this.assessmentDataArrayObject = [new __WEBPACK_IMPORTED_MODULE_1__AssessmentTestData__["a" /* AssessmentTestData */](0), new __WEBPACK_IMPORTED_MODULE_1__AssessmentTestData__["a" /* AssessmentTestData */](1), new __WEBPACK_IMPORTED_MODULE_1__AssessmentTestData__["a" /* AssessmentTestData */](2)];
        this.assessmentWordDataArray = [new __WEBPACK_IMPORTED_MODULE_2__viewAssessmentWordObjects__["a" /* ViewAssessmentWordObjects */]()]; //begining assessment objects
        this.knwonArrayList = [new __WEBPACK_IMPORTED_MODULE_3__wordData__["a" /* WordData */]()]; // known array 
        this.unKnownArrayList = [new __WEBPACK_IMPORTED_MODULE_3__wordData__["a" /* WordData */]()]; // unknown 
        this.isConvertedAll = false;
    }
    return StudentDataSetRecord;
}());

//# sourceMappingURL=studentDataSetRecord.js.map

/***/ }),

/***/ 932:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SelectSubscription; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_storage__ = __webpack_require__(12);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var SelectSubscription = /** @class */ (function () {
    function SelectSubscription(navCtrl, storage) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.storage = storage;
        this.amount = "";
        this.couponCode = "";
        this.storage.get('userDetails').then(function (val) {
            var fileData = JSON.parse(val);
            console.log("user:" + fileData);
            _this.userDetails = fileData.userDetails;
            _this.storage.get('organizationDetails').then(function (val) {
                var fileData = JSON.parse(val);
                _this.organizationDetails = fileData.organizationDetails;
                console.log("org:" + fileData);
            });
        });
    }
    SelectSubscription.prototype.applyCoupon = function () {
        if (this.couponCode == "1995") {
            this.amount = "0.0";
        }
    };
    SelectSubscription.prototype.subscribe = function () {
        if (this.amount.length > 0) {
            var amountFloat = parseFloat(this.amount);
            // var myStorage=this.storage;
            // var myNavCtrl = this.navCtrl;
            // this.userFireBaseService.registerUserDetails(userDetails,this.navCtrl).then(data=>{
            //   this.firstname="";
            //   this.lastname="";
            //   this.emailId="";
            //   this.password="";
            //   this.reTypePassword="";
            //   this.securityQuestion="";
            //   this.answer="";
            //   console.log("auth state changed user: null ");
            //  this.showForm=false;
            //     var refreshIntervalId=setInterval(function(){ 
            //         firebase.auth().currentUser.reload();
            //         console.log("verify email"+firebase.auth().currentUser.emailVerified);
            //         firebase.auth().onAuthStateChanged(function(user){
            //              console.log("auth state changed ");
            //             if(!user)
            //             {
            //               console.log("auth state changed user: null ");
            //             }
            //             else{
            //               console.log("auth state changed user: not null ");
            //               var userObj = firebase.auth().currentUser;
            //                console.log("firebase auth: "+(userObj ==null));
            //               if(userObj!=null)
            //               {
            //                 var emailSent = userObj.email;
            //                 var emailVerfied=userObj.emailVerified;
            //                 console.log("email verified: "+emailVerfied+"  email:"+emailSent);
            //                 if(emailVerfied)
            //                 {
            //                   userDetails.verifyEmail = true;
            //                   console.log("email verified: true");
            //                   var userFireBaseService:UserFireBaseService = new UserFireBaseService();
            //                   userFireBaseService.updateUserDetails(userDetails);  
            //                   myStorage.set('userDetails',JSON.stringify({ userDetails: userDetails }) );
            //                   myNavCtrl.setRoot(HomePage).then(_=>{
            //                     clearInterval(refreshIntervalId);
            //                   });
            //                 }
            //               }
            //             }
            //           });
            //       }, 3000);
            // console.log("stop interval");
            // }).catch(err=>{
            // //  this.error=""+err;
            // });
        }
    };
    SelectSubscription = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-selectSubscription',template:/*ion-inline-start:"C:\mystuff\master\AcademicInvertionAPP\backup\htmlDemos\backup\1\AIAPPv4.0\src\components\billingGenerator\ManageSubscription\selectSubscription\selectSubscription.html"*/'<ion-header>\n\n        <ion-navbar>\n\n          <button ion-button menuToggle>\n\n            <ion-icon name="menu"></ion-icon>\n\n          </button>\n\n          <ion-title>Manage Subscription</ion-title>\n\n        </ion-navbar>\n\n        </ion-header>\n\n    \n\n        <ion-content padding>\n\n        <ion-grid style="height: 10%">\n\n          <ion-row justify-content-center align-items-center style="height: 100%">\n\n            <h3 > Subscription </h3>\n\n          </ion-row>\n\n        </ion-grid>\n\n        \n\n        \n\n        <div *ngIf="error" class="error-message">{{error}}</div>\n\n        <ion-content padding="\'true\'" scroll="false" class="has-header">\n\n    \n\n          <ion-card >\n\n    \n\n              <form class="list" #newStudentForm="ngForm" (ngSubmit)="subscribe()">\n\n                  <ion-row>\n\n                      <ion-col>\n\n                        <ion-list inset>\n\n                          \n\n                      <ion-item>\n\n                        <ion-label text-wrap >Amount ( $ ): </ion-label>\n\n                        <ion-input name="amount" required [(ngModel)]="amount" type="text" ></ion-input>\n\n                      </ion-item>\n\n\n\n                      <form class="list" #couponCodeForm="ngForm" (ngSubmit)="applyCoupon()">\n\n               \n\n                      <ion-grid style="height: 100%">\n\n                          <ion-row justify-content-center align-items-center style="height: 100%">\n\n                            <ion-col>\n\n                                <ion-item>\n\n                                    <ion-label text-wrap >Coupon Code : </ion-label>\n\n                                    <ion-input name="couponCode" required [(ngModel)]="couponCode" type="text"></ion-input>\n\n                                </ion-item>\n\n                      \n\n                            </ion-col>\n\n                              <ion-col>\n\n                                  <button ion-button class="submit-btn" full type="submit" [disabled]="!couponCodeForm.form.valid">Subscribe\n\n                                    </button>\n\n                            \n\n                              </ion-col>\n\n                            </ion-row>\n\n                        </ion-grid>\n\n                        </form>\n\n                               \n\n                        <ion-grid style="height: 100%">\n\n                                    <ion-row justify-content-center align-items-center style="height: 100%">\n\n                                            <button ion-button class="submit-btn" full type="submit" [disabled]="!newStudentForm.form.valid">Subscribe\n\n                                              </button>\n\n                                      </ion-row>\n\n                                  </ion-grid>\n\n                      </ion-list>\n\n                  </ion-col>\n\n                  </ion-row>\n\n                </form>\n\n            </ion-card>\n\n            \n\n            <!-- <ion-card *ngIf="!showForm">\n\n              <ion-item>\n\n                <ion-label text-wrap *ngIf="!emailVerfied"> Check your Email and verify it by clicking the link provided in Email. </ion-label>\n\n              </ion-item>\n\n            </ion-card> -->\n\n          </ion-content>\n\n        </ion-content>\n\n        \n\n     '/*ion-inline-end:"C:\mystuff\master\AcademicInvertionAPP\backup\htmlDemos\backup\1\AIAPPv4.0\src\components\billingGenerator\ManageSubscription\selectSubscription\selectSubscription.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_2__ionic_storage__["b" /* Storage */]])
    ], SelectSubscription);
    return SelectSubscription;
}());

//# sourceMappingURL=selectSubscription.js.map

/***/ }),

/***/ 933:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LineChart; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__models_student__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__models_methodIntervetionSession__ = __webpack_require__(98);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_storage__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ionic_native_file__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__services_IncrementalRehersalService__ = __webpack_require__(195);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







var LineChart = /** @class */ (function () {
    function LineChart(file, navCtrl, storage) {
        var _this = this;
        this.file = file;
        this.navCtrl = navCtrl;
        this.storage = storage;
        this.studentObject = new __WEBPACK_IMPORTED_MODULE_2__models_student__["a" /* Student */]();
        this.methodIndex = 0;
        this.methodName = "";
        this.sessionArray = [new __WEBPACK_IMPORTED_MODULE_3__models_methodIntervetionSession__["a" /* MethodSession */]()];
        this.chartLabels = ["a", "b", "c"];
        this.data = [];
        this.myColors = [];
        this.preSessionWordDataArray = [];
        this.incrementalRehrsalService = new __WEBPACK_IMPORTED_MODULE_6__services_IncrementalRehersalService__["a" /* IncrementalRehersalService */]();
        this.wordType = 0;
        this.chartData = [];
        this.chartOptions = {
            responsive: true,
            scales: {
                yAxes: [{
                        scaleLabel: {
                            display: true,
                            labelString: 'Total Items Acquired'
                        },
                        ticks: {
                            min: 0,
                            stepSize: 1
                        }
                    }],
                xAxes: [{
                        scaleLabel: {
                            display: true,
                            labelString: 'Sessions'
                        },
                        ticks: {
                            min: 0,
                            stepSize: 1
                        }
                    }]
            },
            // Container for pan options
            pan: {
                // Boolean to enable panning
                enabled: true,
                // Panning directions. Remove the appropriate direction to disable 
                // Eg. 'y' would only allow panning in the y direction
                mode: 'xy',
                rangeMin: {
                    // Format of min pan range depends on scale type
                    x: null,
                    y: null
                },
                rangeMax: {
                    // Format of max pan range depends on scale type
                    x: null,
                    y: null
                },
            },
            // Container for zoom options
            zoom: {
                // Boolean to enable zooming
                enabled: true,
                // Enable drag-to-zoom behavior
                drag: true,
                // Zooming directions. Remove the appropriate direction to disable 
                // Eg. 'y' would only allow zooming in the y direction
                mode: 'xy',
                rangeMin: {
                    // Format of min zoom range depends on scale type
                    x: null,
                    y: null
                },
                rangeMax: {
                    // Format of max zoom range depends on scale type
                    x: null,
                    y: null
                },
            }
        };
        this.storage.get('wordType').then(function (val) {
            var fileData = JSON.parse(val);
            _this.wordType = fileData.wordType;
            storage.get('studentObject').then(function (val) {
                var fileData = JSON.parse(val);
                _this.studentObject = fileData.studentObject;
                _this.storage.get('methodIndex').then(function (val) {
                    var fileData = JSON.parse(val);
                    _this.methodIndex = fileData.methodIndex;
                    console.log("methodIndex:" + _this.methodIndex);
                    _this.sessionArray = _this.studentObject.studentWordDetailsArray[_this.wordType].methodArray[_this.methodIndex].sessionsArray;
                    _this.methodName = _this.studentObject.studentWordDetailsArray[_this.wordType].methodArray[_this.methodIndex].methodName;
                    var counter = 0;
                    for (var _i = 0, _a = _this.sessionArray; _i < _a.length; _i++) {
                        var sessionObj = _a[_i];
                        _this.chartLabels.push('' + (sessionObj.sessionIndex + 1));
                        //  this.data.push(sessionObj.sessionIndex+3);
                        // if(sessionObj.sessionIndex >0)
                        // {
                        _this.preSessionWordDataArray = [];
                        console.log("retention:" + sessionObj.retentionWordList.values);
                        console.log("control:" + sessionObj.controlItems.values);
                        _this.test1Map = sessionObj.retentionWordList;
                        _this.test2Map = sessionObj.controlItems;
                        _this.updatePreSessionResultTest();
                        for (var _b = 0, _c = _this.preSessionWordDataArray; _b < _c.length; _b++) {
                            var preSessionObj = _c[_b];
                            if (preSessionObj.isKnownWord)
                                counter++;
                        }
                        console.log("counter:" + counter);
                        _this.data.push(counter);
                        //     }
                        //console.log(sessionObj.)
                    }
                    _this.chartData.push({ data: _this.data, label: 'Intervention Line', lineTension: 0 });
                    _this.myColors.push({
                        backgroundColor: 'rgba(255,255,255, .1)',
                        borderColor: 'blue',
                        pointBackgroundColor: 'rgb(103, 58, 183)',
                        pointBorderColor: '#fff',
                        //pointHoverBackgroundColor: '#fff',
                        pointHoverBorderColor: 'rgba(103, 58, 183, .8)'
                    });
                    console.log("Method Name:" + _this.methodName);
                });
            });
        });
    }
    //session List
    LineChart.prototype.onChartClick = function (event) {
        console.log(event);
    };
    LineChart.prototype.updatePreSessionResultTest = function () {
        this.preSessionWordDataArray = this.incrementalRehrsalService.compareAssessment(this.test1Map, this.test2Map, this.preSessionWordDataArray);
    };
    LineChart = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-lineCharts',template:/*ion-inline-start:"C:\mystuff\master\AcademicInvertionAPP\backup\htmlDemos\backup\1\AIAPPv4.0\src\components\charts\lineCharts\lineCharts.html"*/'<ion-header>\n\n    <ion-navbar>\n\n      <button ion-button menuToggle>\n\n        <ion-icon name="menu"></ion-icon>\n\n      </button>\n\n      <ion-title>Line Charts</ion-title>\n\n    </ion-navbar>\n\n  </ion-header>\n\n  \n\n  <ion-content padding>\n\n    <h3> Growth Charts</h3>\n\n  \n\n  \n\n    <ion-content has-header="true" padding="true"  ng-controller="AppCtrl as ctrl" >\n\n        <!-- <ion-card> -->\n\n            <div style="width: 70%;" *ngIf="chartData.length > 0"> \n\n                <canvas\n\n                    baseChart\n\n                    [chartType]="\'line\'"\n\n                    [datasets]="chartData"\n\n                    [labels]="chartLabels"\n\n                    [options]="chartOptions"\n\n                    [colors]="myColors"\n\n                    [legend]="true"\n\n                    (chartClick)="onChartClick($event)">\n\n                </canvas>\n\n            </div>\n\n            \n\n        <!-- </ion-card>     -->\n\n    </ion-content>\n\n  </ion-content>\n\n  '/*ion-inline-end:"C:\mystuff\master\AcademicInvertionAPP\backup\htmlDemos\backup\1\AIAPPv4.0\src\components\charts\lineCharts\lineCharts.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_5__ionic_native_file__["a" /* File */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_4__ionic_storage__["b" /* Storage */]])
    ], LineChart);
    return LineChart;
}());

//# sourceMappingURL=lineCharts.js.map

/***/ }),

/***/ 934:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return FlashCard; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ionic_native_file__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__models_wordData__ = __webpack_require__(25);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__models_student__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__services_wordServices__ = __webpack_require__(109);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_ionic_angular__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__ionic_storage__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__services_arrayService__ = __webpack_require__(197);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__ionic_native_text_to_speech__ = __webpack_require__(118);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__models_organizationDetails__ = __webpack_require__(35);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__services_flashcardService__ = __webpack_require__(149);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};











var FlashCard = /** @class */ (function () {
    function FlashCard(file, navCtrl, navParams, viewCtrl, storage, tts) {
        this.file = file;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.viewCtrl = viewCtrl;
        this.storage = storage;
        this.tts = tts;
        this.wordDataObject = new __WEBPACK_IMPORTED_MODULE_2__models_wordData__["a" /* WordData */]();
        this.wordDataArray = [new __WEBPACK_IMPORTED_MODULE_2__models_wordData__["a" /* WordData */](), new __WEBPACK_IMPORTED_MODULE_2__models_wordData__["a" /* WordData */]()];
        this.TestTitle = "Test Title";
        this.currentCardNumber = 0;
        this.totalCardNumber = 0;
        this.wordServiceObject = new __WEBPACK_IMPORTED_MODULE_4__services_wordServices__["a" /* WordServices */]();
        this.studentObject = new __WEBPACK_IMPORTED_MODULE_3__models_student__["a" /* Student */]();
        this.testIndex = 0;
        this.arrayServiceObj = new __WEBPACK_IMPORTED_MODULE_7__services_arrayService__["a" /* ArrayService */]();
        this.studentDataSetRecordIndex = 0;
        this.organizationDetails = new __WEBPACK_IMPORTED_MODULE_9__models_organizationDetails__["a" /* OrganizationDetails */]();
        this.wordType = 0;
        this.showAnswer = false;
        this.flashcardService = new __WEBPACK_IMPORTED_MODULE_10__services_flashcardService__["a" /* FlashcardService */]();
        this.number1 = "223";
        this.number2 = "2";
        this.operation = "+";
        this.result = [];
        this.TestTitle = "Assessment Test " + this.testIndex;
        console.log("test:" + this.TestTitle + "  index:" + this.studentDataSetRecordIndex);
        this.wordDataArray = this.arrayServiceObj.shuffle(this.studentObject.studentWordDetailsArray[this.wordType].studentDatasetRecordList[this.studentDataSetRecordIndex].datasetObject.wordList);
        this.totalCardNumber = this.wordDataArray.length;
        this.studentObject.studentWordDetailsArray[this.wordType].studentDatasetRecordList[this.studentDataSetRecordIndex].assessmentDataArrayObject[this.testIndex].totalWordList = this.wordDataArray.length;
        console.log("len: " + this.totalCardNumber + "  d:" + this.wordDataArray.length);
        if (this.totalCardNumber > 0) {
            this.studentObject.studentWordDetailsArray[this.wordType].studentDatasetRecordList[this.studentDataSetRecordIndex].assessmentDataArrayObject[this.testIndex].unknownWordList = [];
            this.studentObject.studentWordDetailsArray[this.wordType].studentDatasetRecordList[this.studentDataSetRecordIndex].assessmentDataArrayObject[this.testIndex].knownWordList = [];
            this.currentCardNumber = 1;
            this.wordDataObject = this.wordDataArray[this.currentCardNumber - 1];
            this.convertTextToMath(this.wordDataObject.wordText);
        }
    }
    FlashCard.prototype.ionViewDidLoad = function () {
        console.log("onviewdidload");
    };
    FlashCard.prototype.greenCircleClick = function () {
        this.showAnswer = false;
        this.studentObject.studentWordDetailsArray[this.wordType].studentDatasetRecordList[this.studentDataSetRecordIndex].assessmentDataArrayObject[this.testIndex].knownWordList.push(this.wordDataObject);
        if (this.currentCardNumber + 1 <= this.wordDataArray.length) {
            this.wordDataObject = this.wordDataArray[this.currentCardNumber];
            this.convertTextToMath(this.wordDataObject.wordText);
            this.currentCardNumber++;
        }
        else {
            console.log("else:green");
            this.studentObject.studentWordDetailsArray[this.wordType].studentDatasetRecordList[this.studentDataSetRecordIndex].assessmentDataArrayObject[this.testIndex].testStatus = true;
            if (this.testIndex > 0) {
                var known2Len = 0;
                var known1Len = 0;
                if (this.studentObject.studentWordDetailsArray[this.wordType].studentDatasetRecordList[this.studentDataSetRecordIndex].assessmentDataArrayObject[this.testIndex].knownWordList != null)
                    known2Len = this.studentObject.studentWordDetailsArray[this.wordType].studentDatasetRecordList[this.studentDataSetRecordIndex].assessmentDataArrayObject[this.testIndex].knownWordList.length;
                if (this.studentObject.studentWordDetailsArray[this.wordType].studentDatasetRecordList[this.studentDataSetRecordIndex].assessmentDataArrayObject[this.testIndex - 1].knownWordList != null)
                    known1Len = this.studentObject.studentWordDetailsArray[this.wordType].studentDatasetRecordList[this.studentDataSetRecordIndex].assessmentDataArrayObject[this.testIndex - 1].knownWordList.length;
                this.studentObject.studentWordDetailsArray[this.wordType].studentDatasetRecordList[this.studentDataSetRecordIndex].assessmentDataArrayObject[this.testIndex].consistancyPercentage =
                    known2Len - known1Len;
            }
            this.goBackToView(this.studentObject);
        }
    };
    FlashCard.prototype.redCircleClick = function () {
        this.showAnswer = false;
        this.studentObject.studentWordDetailsArray[this.wordType].studentDatasetRecordList[this.studentDataSetRecordIndex].assessmentDataArrayObject[this.testIndex].unknownWordList.push(this.wordDataObject);
        if (this.currentCardNumber + 1 <= this.wordDataArray.length) {
            this.wordDataObject = this.wordDataArray[this.currentCardNumber];
            this.convertTextToMath(this.wordDataObject.wordText);
            this.currentCardNumber++;
        }
        else {
            console.log("else:red");
            this.studentObject.studentWordDetailsArray[this.wordType].studentDatasetRecordList[this.studentDataSetRecordIndex].assessmentDataArrayObject[this.testIndex].testStatus = true;
            if (this.testIndex > 0) {
                var known2Len = 0;
                var known1Len = 0;
                if (this.studentObject.studentWordDetailsArray[this.wordType].studentDatasetRecordList[this.studentDataSetRecordIndex].assessmentDataArrayObject[this.testIndex].knownWordList != null)
                    known2Len = this.studentObject.studentWordDetailsArray[this.wordType].studentDatasetRecordList[this.studentDataSetRecordIndex].assessmentDataArrayObject[this.testIndex].knownWordList.length;
                if (this.studentObject.studentWordDetailsArray[this.wordType].studentDatasetRecordList[this.studentDataSetRecordIndex].assessmentDataArrayObject[this.testIndex - 1].knownWordList != null)
                    known1Len = this.studentObject.studentWordDetailsArray[this.wordType].studentDatasetRecordList[this.studentDataSetRecordIndex].assessmentDataArrayObject[this.testIndex - 1].knownWordList.length;
                this.studentObject.studentWordDetailsArray[this.wordType].studentDatasetRecordList[this.studentDataSetRecordIndex].assessmentDataArrayObject[this.testIndex].consistancyPercentage =
                    known2Len - known1Len;
            }
            this.goBackToView(this.studentObject);
        }
    };
    FlashCard.prototype.goBackToView = function (studentObject) {
    };
    FlashCard.prototype.textToSpeechWordData = function (text) {
        this.flashcardService.textToSpeechWordData(text, this.tts, this.showAnswer);
    };
    FlashCard.prototype.getAnswer = function (equation) {
        return this.flashcardService.getAnswer(equation);
    };
    FlashCard.prototype.flipCard = function () {
        this.showAnswer = !this.showAnswer;
    };
    FlashCard.prototype.convertTextToMath = function (mathString) {
        var convertTextToMathResult = this.flashcardService.convertTextToMath(mathString);
        this.result = convertTextToMathResult.result;
        this.operation = convertTextToMathResult.operation;
        this.number1 = convertTextToMathResult.number1;
        this.number2 = convertTextToMathResult.number2;
    };
    FlashCard = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-blueflashcard',template:/*ion-inline-start:"C:\mystuff\master\AcademicInvertionAPP\backup\htmlDemos\backup\1\AIAPPv4.0\src\htmlpages\blueflashcard\blueflashcard.html"*/'<ion-header>\n\n  <ion-navbar>\n\n    <!-- <ion-title>{{TestTitle}} : {{currentCardNumber}}/{{totalCardNumber}}</ion-title> -->\n\n  </ion-navbar>\n\n</ion-header>\n\n\n\n<ion-content padding>\n\n  <ion-grid style="height: 50%;padding-top: 10%;" *ngIf="result.length != 2">\n\n    <ion-row justify-content-center align-items-center style="height: 100%">\n\n      <h3 style="font-size: 150px;"> {{wordDataObject.wordText}} </h3>\n\n    </ion-row>\n\n  </ion-grid>\n\n\n\n  <ion-grid style="height: 50%;padding-top: 10%;width:40%;" *ngIf="result.length == 2">\n\n    <ion-row justify-content-center align-items-center style="float: right">\n\n      <ion-col></ion-col>\n\n      <ion-col>\n\n        <h3 style="font-size: 80px;"> {{number1}} </h3>\n\n      </ion-col>\n\n    </ion-row>\n\n    <ion-row justify-content-center align-items-center style="float: right">\n\n      <ion-col>\n\n        <h3 style="font-size: 80px;"> {{operation}} </h3>\n\n      </ion-col>\n\n      <ion-col>\n\n        <h3 style="font-size: 80px;"> {{number2}} </h3>\n\n      </ion-col>\n\n    </ion-row>\n\n    <ion-row style="float: right">\n\n      <div class="horizontal-black-line"></div>\n\n    </ion-row>\n\n    <ion-row *ngIf="showAnswer" justify-content-center align-items-center style="float: right">\n\n      <ion-col></ion-col>\n\n      <ion-col>\n\n        <h3 style="font-size: 80px;"> {{getAnswer(wordDataObject.wordText)}} </h3>\n\n      </ion-col>\n\n    </ion-row>\n\n  </ion-grid>\n\n</ion-content>\n\n\n\n<ion-content padding>\n\n  <ion-grid style="padding-top: 40%;">\n\n    <ion-row justify-content-center align-items-center style="height: 100%">\n\n      <ion-col class="center-col-item" style="max-width: 30%;">\n\n        <div class="img-circular-blue" (click)="greenCircleClick()">\n\n          <div class="horizontal-line"></div>\n\n        </div>\n\n      </ion-col>\n\n      <ion-col class="center-col-item" style="max-width: 30%;">\n\n        <div class="img-circular-blue" (click)="redCircleClick()">\n\n          <div class="verticle-line"></div>\n\n        </div>\n\n      </ion-col>\n\n    </ion-row>\n\n  </ion-grid>\n\n\n\n  <ion-grid style="height: 10%;padding-top: 10%;">\n\n    <ion-row justify-content-center align-items-right style="height: 100%">\n\n      <ion-icon name="volume-up" style="height: 20%;top: 20%;right: 20%;position: absolute;font-size: xx-large;"\n\n        (click)="textToSpeechWordData(wordDataObject.wordText)"></ion-icon>\n\n    </ion-row>\n\n  </ion-grid>\n\n\n\n  <ion-grid style="height: 10%;padding-top: 10%;" *ngIf="wordType == 1">\n\n    <ion-row justify-content-center align-items-right style="height: 100%">\n\n      <ion-icon name="sync" style="height: 20%;top: 20%;left: 20%;position: absolute;font-size: xx-large;"\n\n        (click)="flipCard()"></ion-icon>\n\n    </ion-row>\n\n  </ion-grid>\n\n</ion-content>'/*ion-inline-end:"C:\mystuff\master\AcademicInvertionAPP\backup\htmlDemos\backup\1\AIAPPv4.0\src\htmlpages\blueflashcard\blueflashcard.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__ionic_native_file__["a" /* File */],
            __WEBPACK_IMPORTED_MODULE_5_ionic_angular__["h" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_5_ionic_angular__["i" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_5_ionic_angular__["l" /* ViewController */],
            __WEBPACK_IMPORTED_MODULE_6__ionic_storage__["b" /* Storage */],
            __WEBPACK_IMPORTED_MODULE_8__ionic_native_text_to_speech__["a" /* TextToSpeech */]])
    ], FlashCard);
    return FlashCard;
}());

//# sourceMappingURL=flashCard.js.map

/***/ }),

/***/ 98:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MethodSession; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__wordData__ = __webpack_require__(25);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__methodInterventionWordData__ = __webpack_require__(110);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__myMap__ = __webpack_require__(123);



var MethodSession = /** @class */ (function () {
    function MethodSession() {
        this.sessionIndex = 0; //
        this.sessionDate = new Date().toISOString(); //
        this.sessionCompletedTime = " 11/22/2019"; // completed seesions
        this.sessionWordDataList = [new __WEBPACK_IMPORTED_MODULE_1__methodInterventionWordData__["a" /* MethodInterventionWordData */]()]; // stores each words known time, total asked time.
        this.knownWordList = [new __WEBPACK_IMPORTED_MODULE_0__wordData__["a" /* WordData */]()]; // shuffle known list
        this.unknownWordList = [new __WEBPACK_IMPORTED_MODULE_0__wordData__["a" /* WordData */]()]; //total remaining unknown items
        this.sessionUnknownList = [new __WEBPACK_IMPORTED_MODULE_0__wordData__["a" /* WordData */]()]; // unknown items for the session
        this.retentionWordList = new __WEBPACK_IMPORTED_MODULE_2__myMap__["a" /* MyMap */](); //previous session list
        this.controlItems = new __WEBPACK_IMPORTED_MODULE_2__myMap__["a" /* MyMap */](); //current unknownList
        this.totalOppurtunitiesToRespond = 0;
    }
    return MethodSession;
}());

//# sourceMappingURL=methodIntervetionSession.js.map

/***/ })

},[741]);
//# sourceMappingURL=main.js.map