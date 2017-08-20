import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { InAppBrowser, InAppBrowserOptions } from '@ionic-native/in-app-browser';

import { HomePage } from '../pages/home/home';
import { OnboardPage } from '../pages/onboard/onboard';
import { ClinicslocatorPage } from '../pages/clinicslocator/clinicslocator';
import { CheckbalancePage } from '../pages/checkbalance/checkbalance';
import { ClaimsPage } from '../pages/claims/claims';
import { EcardPage } from '../pages/ecard/ecard';
import { AppointmentPage } from '../pages/appointment/appointment';
import { AboutusPage } from '../pages/aboutus/aboutus';
import { ContactusPage } from '../pages/contactus/contactus';
import { TermsconditionsPage } from '../pages/termsconditions/termsconditions';
import { LoginNonmedinetPage } from '../pages/login-nonmedinet/login-nonmedinet';
import { SubmitclaimsPage } from '../pages/submitclaims/submitclaims';
import { ClaimdetailsPage } from '../pages/claimdetails/claimdetails';
import { BenefitsPage } from '../pages/benefits/benefits';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {

  options : InAppBrowserOptions = {
      location : 'yes',//Or 'no' 
      hidden : 'no', //Or  'yes'
      clearcache : 'yes',
      clearsessioncache : 'yes',
      zoom : 'yes',//Android only ,shows browser zoom controls 
      hardwareback : 'yes',
      mediaPlaybackRequiresUserAction : 'no',
      shouldPauseOnSuspend : 'no', //Android only 
      closebuttoncaption : 'Close', //iOS only
      disallowoverscroll : 'no', //iOS only 
      toolbar : 'yes', //iOS only 
      enableViewportScale : 'no', //iOS only 
      allowInlineMediaPlayback : 'no',//iOS only 
      presentationstyle : 'pagesheet',//iOS only 
      fullscreen : 'yes',//Windows only    
  };


  @ViewChild(Nav) nav: Nav;

  rootPage: any = OnboardPage;

  pages: Array<{title: string, component: any, icon: string}>;

    constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen, 
       private theInAppBrowser: InAppBrowser) {
        this.initializeApp();

        // used for an example of ngFor and navigation
        this.pages = [
            { title: 'Home', component: HomePage, icon: './assets/img/icons/home.png' },
            { title: 'Clinics Locator', component: ClinicslocatorPage, icon: './assets/img/icons/clinics-locator.png' },
            { title: 'E-Card', component: EcardPage, icon: './assets/img/icons/ecard.png' },
            { title: 'Check Balance', component: CheckbalancePage, icon: './assets/img/icons/check-balance.png' },
            { title: 'Claims', component: ClaimsPage, icon: './assets/img/icons/claims.png' },
            { title: 'Appointment (ARS)', component: AppointmentPage, icon: './assets/img/icons/appointment.png' },
            { title: 'About Us', component: AboutusPage, icon: './assets/img/icons/about-us.png'},
            { title: 'Contact Us', component: ContactusPage, icon: './assets/img/icons/contact-us.png' },
            { title: 'Terms & Conditions', component: TermsconditionsPage, icon: './assets/img/icons/tnc.png' },
            { title: 'Logout', component: LoginNonmedinetPage, icon: './assets/img/icons/login.png' }
        ];
    }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openPage(page) {
      // Reset the content nav to have just this page
      // we wouldn't want the back button to show in this scenario
      if(page.title == "Appointment (ARS)"){
        let target = "_blank";
        this.theInAppBrowser.create('https://ars.alliancehealthcare.com.sg/#/registration',target,this.options);
      }else{
        this.nav.setRoot(page.component);  
      }
  }
}
