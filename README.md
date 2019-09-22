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

How to Test Html Pages one by one 
- open the File 'AIAPPHtml/src/app/app.component.ts'
- try to find line "rootPage: any = Login ;" 
- change line to "rootPage: any = {Your Module};" e.g. Login, viewWordList, addWordList etc.
- then run application with the command "ionic cordova run browser".
