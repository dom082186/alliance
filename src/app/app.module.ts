import { BrowserModule } from '@angular/platform-browser';
import { IonicStorageModule } from '@ionic/storage';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
//import {FORM_DIRECTIVES, FormBuilder,  ControlGroup, Validators, AbstractControl} from '@angular/common';

import { HttpModule } from '@angular/http';
import { Geolocation } from '@ionic-native/geolocation';
// import { NativeGeocoder } from '@ionic-native/native-geocoder';


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

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';


import { LoginServiceProvider } from '../providers/login-service/login-service';
import { EcardServiceProvider } from '../providers/ecard-service/ecard-service';
import { ClinicServiceProvider } from '../providers/clinic-service/clinic-service';
import { NativeGeocoder } from '@ionic-native/native-geocoder';
import { GeocoderProvider } from '../providers/geocoder/geocoder';
import { ClaimServiceProvider } from '../providers/claim-service/claim-service';



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
        ClinicnearbyPage
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
        ClinicnearbyPage
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
    ClaimServiceProvider
    
  ]
})
export class AppModule {}
