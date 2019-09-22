import { ErrorHandler, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';
import { DocumentPicker } from '@ionic-native/document-picker';
import { File } from '@ionic-native/file';
import { Firebase } from '@ionic-native/firebase';
import { ScreenOrientation } from '@ionic-native/screen-orientation';
import { SocialSharing } from '@ionic-native/social-sharing';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { Stripe } from '@ionic-native/stripe/ngx';
import { TextToSpeech } from '@ionic-native/text-to-speech';
import { IonicStorageModule } from '@ionic/storage';
import * as firebase from 'firebase';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { ChartsModule } from 'ng2-charts';
import { AddStudent } from '../components/AddStudent/AddStudent';
import { AddCategoryModal } from '../components/addWordList/addCategoryModal/addCategoryModal';
import { AddWordList } from '../components/addWordList/addWordList';
import { AssessmentTest } from '../components/Assessment/BeginAssessmentTest/assessmentTest';
import { ViewAssessmentTest } from '../components/Assessment/viewAssessment/viewAssessment';
import { ViewStudentDatasetRecordList } from '../components/Assessment/viewStudentDatasetRecordList/viewStudentDatasetRecordList';
import { SelectSubscription } from '../components/billingGenerator/ManageSubscription/selectSubscription/selectSubscription';
import { LineChart } from '../components/charts/lineCharts/lineCharts';
import { FlashCard } from '../components/flashCardTest/flashCard';
import { AdminHomePage } from '../components/home/adminHomePage/adminHomePage';
import { HomePage } from '../components/home/home';
import { AddAdminAccess } from '../components/login/addAdminAccess/addAdminAccess';
import { AddEmailList } from '../components/login/addEmail/addEmailList';
import { AddUserDetails } from '../components/login/addUserDetails/addUserDetails';
import { SecurityCheckUp } from '../components/login/forgetPassword/securityCheckUP/SecurityCheckUp';
import { Login } from '../components/login/login';
import { organizationRegister } from '../components/login/OrganizationRegister/organizationRegister';
import { UpdateProfile } from '../components/login/userProfile/updateProfile/updateProfile';
import { DIFlashCardSessionTest } from '../components/methodSessions/flashCardTest/DIMethodSessionTest/DIFlashCardSessionTest';
import { FlashCardIntervetion } from '../components/methodSessions/flashCardTest/flashCardIntervention';
import { PreSessionResult } from '../components/methodSessions/flashCardTest/preeSessionResult/preSessionResult';
import { ViewPreSessionUnKnownWord } from '../components/methodSessions/flashCardTest/preeSessionResult/viewPreSessionUnknownWord/viewPreSessionUnKnownWord';
import { PreSessionFlashCard } from '../components/methodSessions/flashCardTest/preSessionFlashCardTest/preSessionFlashCard';
import { SessionSummary } from '../components/methodSessions/flashCardTest/sessionSummary/sessionSummary';
import { PreSessionAssessmentView } from '../components/methodSessions/preSessionAssessment/preSessionAssessmentView/preSessionAssessmentView';
import { SessionList } from '../components/methodSessions/sessionsList/sessionList';
import { PreSessionView } from '../components/methodSessions/viewPreSessionData/preSessionData';
import { PostAssessmentDashBoard } from '../components/PostAssessment/postAssessmentDashBoard/postAssessmentDashBoard';
import { PostAssessmentFlashCard } from '../components/PostAssessment/postAssessmentFlashCard/postAssessmentFlashCard';
import { StartNewPostAssessment } from '../components/PostAssessment/startNewPostAssessment/startNewPostAssessment';
import { ViewPostAssessmentRecordList } from '../components/PostAssessment/viewPostAssessment/viewPostAssessmentRecordList';
import { ViewPostAssessmentList } from '../components/PostAssessment/viewPostAssessmentList/ViewPostAssessmentList';
import { ViewSubPostTestAssessmentRecord } from '../components/PostAssessment/viewSubPostTestAssessmentRecord/viewSubPostTestAssessmentRecord';
import { MethodRatioSelection } from '../components/studentDashBoard/methodRatioSelection/methodRatioSelection';
import { StudentdashBoard } from '../components/studentDashBoard/studentDashBoard';
import { ViewStudentAllWords } from '../components/studentDashBoard/ViewStudentAllWords/viewStudentAllWords';
import { ViewStudent } from '../components/viewStudent/viewStudent';
import { ViewWordList } from '../components/viewWordList/viewWordList';
import { GlobalVariables } from '../models/globalVariables';
import { ListPage } from '../pages/list/list';
import { DataProvider } from '../providers/data/data';
import { FirebaseProvider } from '../providers/firebase/firebase';
import { MyApp } from './app.component';





const firebaseConfig = {
  apiKey: "AIzaSyDnFDx9WT_WnS0q4avo6BsoKUl9Cc5jJx0",
  authDomain: "acdemic-flashcard-intervention.firebaseapp.com",
  databaseURL: "https://acdemic-flashcard-intervention.firebaseio.com",
  projectId: "acdemic-flashcard-intervention",
  storageBucket: "acdemic-flashcard-intervention.appspot.com",
  messagingSenderId: "490691003601"
  };
 
firebase.initializeApp(firebaseConfig);

@NgModule({
  // schemas:[CUSTOM_ELEMENTS_SCHEMA],
  declarations: [
    MyApp,
    HomePage,
    Login,
    AddStudent,
    ViewStudent,
    StudentdashBoard,
    AddWordList,
    ViewWordList,
    AssessmentTest,
    PreSessionView,
    FlashCard,
    ListPage,
    FlashCardIntervetion,
    PreSessionFlashCard,
    ViewAssessmentTest,
    SessionSummary,
    PreSessionResult,
    SessionList,
    DIFlashCardSessionTest,
    LineChart,
    PreSessionAssessmentView,
    ViewStudentAllWords,
    ViewPreSessionUnKnownWord,
    PostAssessmentDashBoard,
    StartNewPostAssessment,
    ViewPostAssessmentRecordList,
    ViewPostAssessmentList,
    PostAssessmentFlashCard,
    ViewSubPostTestAssessmentRecord,
    AddEmailList,
    AddUserDetails,
    SecurityCheckUp,
    ViewStudentDatasetRecordList,
    UpdateProfile,
    AddAdminAccess,
    AdminHomePage,
    MethodRatioSelection,
    organizationRegister,
    SelectSubscription,
    AddCategoryModal
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    ChartsModule,
    ReactiveFormsModule,
    FormsModule,
    HttpModule,
    IonicStorageModule.forRoot({
      name: '__mydb',
      driverOrder: ['indexeddb', 'sqlite', 'websql']
    })
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    Login,
    AddStudent,
    ViewStudent,
    StudentdashBoard,
    AddWordList,
    ViewWordList,
    FlashCard,
    ListPage,
    PreSessionView,
    AssessmentTest,
    FlashCardIntervetion,
    PreSessionFlashCard,
    ViewAssessmentTest,
    SessionSummary,
    PreSessionResult,
    SessionList,
    DIFlashCardSessionTest,
    LineChart,
    PreSessionAssessmentView,
  
    ViewStudentAllWords,
    ViewPreSessionUnKnownWord,
    PostAssessmentDashBoard,
    StartNewPostAssessment,
    ViewPostAssessmentRecordList,
    ViewPostAssessmentList,
    PostAssessmentFlashCard,
    ViewSubPostTestAssessmentRecord,
    AddEmailList,
    AddUserDetails,
    SecurityCheckUp,
    ViewStudentDatasetRecordList,
    UpdateProfile,
    AddAdminAccess,
    AdminHomePage,
    MethodRatioSelection,
    organizationRegister,
    SelectSubscription,
    AddCategoryModal
  ],
  providers: [
    StatusBar,
    SplashScreen,
    File,
    GlobalVariables,
    ScreenOrientation,
    SocialSharing,
    DocumentPicker,
    Firebase,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    DataProvider,
    FirebaseProvider,
    TextToSpeech,
    Stripe
  ]
})
export class AppModule {}
