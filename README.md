# AIAPPHtml

Installing Ionic 
- Install 'Node.js' first. (https://ionicframework.com/docs/installation/environment#node-npm)
- "npm install -g ionic cordova" (https://ionicframework.com/docs/installation/cli)

Cloning this Ionic Application Steps
- git clone https://github.com/dhruvilkotak/AIAPPHtml.git
- cd AIAPPHtml
- npm install
- ionic cordova prepare

Run Application 
- ionic cordova run browser

HTML pages for all devices (Android devices, IOSDevices, Web App)
- Make all pages responsive for all devices : https://ionicacademy.com/ionic-different-device-sizes/


How to Test Html Pages one by one 
- open the File 'AIAPPHtml/src/app/app.component.ts'
- try to find line "rootPage: any = Login ;" 
- change line to "rootPage: any = {Your Module};" e.g. Login, viewWordList, addWordList etc.
- then run application with the command "ionic cordova run browser".

Deploying
- Deploy to IOS, Android, Browser (https://ionicframework.com/docs/v3/intro/deploying/)

List of Modules 

| Module Name |
|-------------|
 |  MyApp | 
 |  HomePage | 
 |  Login | 
 |  AddStudent | 
 |  ViewStudent | 
 |  StudentdashBoard | 
 |  AddWordList | 
 |  ViewWordList | 
 |  FlashCard | 
 |  ListPage | 
 |  PreSessionView | 
 |  AssessmentTest | 
 |  FlashCardIntervetion | 
 |  PreSessionFlashCard | 
 |  ViewAssessmentTest | 
 |  SessionSummary | 
 |  PreSessionResult | 
 |  SessionList | 
 |  DIFlashCardSessionTest | 
 |  LineChart | 
 |  PreSessionAssessmentView | 
 |  ViewStudentAllWords | 
 |  ViewPreSessionUnKnownWord | 
 |  PostAssessmentDashBoard | 
 |  StartNewPostAssessment | 
 |  ViewPostAssessmentRecordList | 
 |  ViewPostAssessmentList | 
 |  PostAssessmentFlashCard | 
 |  ViewSubPostTestAssessmentRecord | 
 |  AddEmailList | 
 |  AddUserDetails | 
 |  SecurityCheckUp | 
 |  ViewStudentDatasetRecordList | 
 |  UpdateProfile | 
 |  AddAdminAccess | 
 |  AdminHomePage | 
 |  MethodRatioSelection | 
 |  organizationRegister | 
 |  AddCategoryModal |

