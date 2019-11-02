# AIAPPHtml

### Installing Ionic 
- Install 'Node.js' first. (https://ionicframework.com/docs/installation/environment#node-npm)
- "npm install -g ionic cordova" (https://ionicframework.com/docs/installation/cli)

### Cloning this Ionic Application Steps
- git clone https://github.com/dhruvilkotak/AIAPPHtml.git
- cd AIAPPHtml
- npm install
- ionic cordova prepare

### Run Application 
- npm run ionic

### Pushing to Git.
- Use only 'master' branch to push your code. Do not merge any branch. Git graph should be linear.
- before you push your code. Make sure you rebase your commit with remote branch. 'git rebase origin/master'
- For a safe side, apply one more command : 'git rebase -i HEAD~n' where n is number of commits you are going to push.
- push your changes to origin/master branch.

##### e.g.  If I want to push my 3 commits. 
- git rebase origin/master
- git rebase -i HEAD~3
- git pull origin/master
- merge your conflicts if it has.
- git push origin/master

### HTML pages for all devices (Android devices, IOSDevices, Web App)
- Make all pages responsive for all devices : https://ionicacademy.com/ionic-different-device-sizes/


### How to Test Html Pages one by one 
- open the File 'AIAPPHtml/src/app/app.component.ts'
- try to find line "rootPage: any = Login ;" 
- change line to "rootPage: any = {Your Module};" e.g. Login, viewWordList, addWordList etc.
- then run application with the command "ionic cordova run browser".

### Deploying
- Deploy to IOS, Android, Browser (https://ionicframework.com/docs/v3/intro/deploying/)

### List of Modules 

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

