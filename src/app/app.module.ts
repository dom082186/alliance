import { BrowserModule } from '@angular/platform-browser';
import { IonicStorageModule } from '@ionic/storage';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
//import {FORM_DIRECTIVES, FormBuilder,  ControlGroup, Validators, AbstractControl} from '@angular/common';

import { HttpModule } from '@angular/http';
import { Geolocation } from '@ionic-native/geolocation';
import { Keyboard } from '@ionic-native/keyboard';
import {Camera} from '@ionic-native/camera';


import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { OnboardPage } from '../pages/onboard/onboard';
import { LoginPage } from '../pages/login/login';
import { RegisterPage } from '../pages/register/register';
import { ClinicslocatorPage } from '../pages/clinicslocator/clinicslocator';
import { ClinicdetailsPage } from '../pages/clinicdetails/clinicdetails';
import { ClinicdirectionsPage } from '../pages/clinicdirections/clinicdirections';
import { CheckbalancePage } from '../pages/checkbalance/checkbalance';
import { ClaimsPage } from '../pages/claims/claims';
import { EcardPage } from '../pages/ecard/ecard';
import { SubmitclaimsPage } from '../pages/submitclaims/submitclaims';
import { BenefitsPage } from '../pages/benefits/benefits';
import { AppointmentPage } from '../pages/appointment/appointment';
import { AboutusPage } from '../pages/aboutus/aboutus';
import { ContactusPage } from '../pages/contactus/contactus';
import { TermsconditionsPage } from '../pages/termsconditions/termsconditions';
import { LoginNonmedinetPage } from '../pages/login-nonmedinet/login-nonmedinet';
import { ClinicnearbyPage } from '../pages/clinicnearby/clinicnearby';
import { SubmitClaimDetailsPage } from '../pages/submit-claim-details/submit-claim-details';
import { AddSpPage } from '../pages/add-sp/add-sp';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';


import { LoginServiceProvider } from '../providers/login-service/login-service';
import { EcardServiceProvider } from '../providers/ecard-service/ecard-service';
import { ClinicServiceProvider } from '../providers/clinic-service/clinic-service';
import { NativeGeocoder } from '@ionic-native/native-geocoder';
import { GeocoderProvider } from '../providers/geocoder/geocoder';
import { ClaimServiceProvider } from '../providers/claim-service/claim-service';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { ClaimdetailsPage } from '../pages/claimdetails/claimdetails';
import { KeyPipe } from '../pipes/key/key';
import { TermsconsServiceProvider } from '../providers/termscons-service/termscons-service';
import { SubmitClaimServiceProvider } from '../providers/submit-claim-service/submit-claim-service';


import { ScreenOrientation } from '@ionic-native/screen-orientation';
import { FileChooser } from '@ionic-native/file-chooser';
import { Base64 } from '@ionic-native/base64';
import { File } from '@ionic-native/file';

@NgModule({
    declarations: [
        MyApp,
        HomePage,
        ListPage,
        OnboardPage,
        LoginPage,
        RegisterPage,
        ClinicslocatorPage,
        ClinicdetailsPage,
        ClinicdirectionsPage,
        CheckbalancePage,
        ClaimsPage,
        EcardPage,
        SubmitclaimsPage,
        BenefitsPage,
        AppointmentPage,
        AboutusPage,
        ContactusPage,
        TermsconditionsPage,
        LoginNonmedinetPage,
        ClinicnearbyPage,
        ClaimdetailsPage,
        SubmitClaimDetailsPage,
        AddSpPage,
        KeyPipe
    ],
    imports: [
        BrowserModule,
        IonicModule.forRoot(MyApp, {tabsPlacement: 'top'}),
        HttpModule,
        IonicStorageModule.forRoot({ name: '__mydb', driverOrder: ['sqlite', 'websql', 'indexeddb'] })
    ],
  bootstrap: [IonicApp],
    entryComponents: [
        MyApp,
        HomePage,
        ListPage,
        OnboardPage,
        LoginPage,
        RegisterPage,
        ClinicslocatorPage,
        ClinicdetailsPage,
        ClinicdirectionsPage,
        CheckbalancePage,
        ClaimsPage,
        EcardPage,
        SubmitclaimsPage,
        BenefitsPage,
        AppointmentPage,
        AboutusPage,
        ContactusPage,
        TermsconditionsPage,
        LoginNonmedinetPage,
        ClinicnearbyPage,
        ClaimdetailsPage,
        SubmitClaimDetailsPage,
        AddSpPage
    ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    LoginServiceProvider,
    EcardServiceProvider,
    ClinicServiceProvider,
    Geolocation,
    NativeGeocoder,
    GeocoderProvider,
    ClaimServiceProvider,
    InAppBrowser,
    Keyboard,
    TermsconsServiceProvider,
    SubmitClaimServiceProvider,
    ScreenOrientation,
    FileChooser,
    Camera,
    Base64,
    File,
    
  ]
})
export class AppModule {}
