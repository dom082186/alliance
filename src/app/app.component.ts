import { Component, ViewChild } from '@angular/core';
import { Nav, Platform,AlertController,ToastController,Events } from 'ionic-angular';
import { Keyboard } from '@ionic-native/keyboard';
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
import { LoginPage } from '../pages/login/login';


import { Storage } from '@ionic/storage';



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
  public memberNetwork: any;
  appMemInfo: any;
  appMemNetwork: any;
  arsNRIC: any;
  arsNetwork: any;


  pages: Array<{title: string, component: any, icon: string, class: any, close:any}>;

    constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen, 
       private theInAppBrowser: InAppBrowser,public storage: Storage,private alertCtrl: AlertController,
       public toastCtrl:ToastController, private keyboard: Keyboard,public events: Events) {
        

        this.platform.ready().then(() => {
            let view = this.nav.getActive();
            console.log(view.component.name)

        });

        this.initializeApp();

        events.subscribe('claimuser:created', (user, network) => {
              if(user.length > 0){
                this.pages = [
                    { title: 'Home', component: HomePage, icon: './assets/img/icons/home.png', class: '', close: 'true' },
                    { title: 'Clinics Locator', component: ClinicslocatorPage, icon: './assets/img/icons/clinics-locator.png', class: '', close: 'true' },
                    { title: 'E-Card', component: EcardPage, icon: './assets/img/icons/ecard.png', class: '', close: 'true' },
                    { title: 'Check Balance', component: CheckbalancePage, icon: './assets/img/icons/check-balance.png', class: '', close: 'true' },
                    { title: 'Claims', component: LoginPage, icon: './assets/img/icons/claims.png', class: '', close: 'true' },
                    { title: 'Appointment (ARS)', component: AppointmentPage, icon: './assets/img/icons/appointment.png', class: '', close: 'true' },
                    { title: 'About Us', component: AboutusPage, icon: './assets/img/icons/about-us.png', class: '', close: 'true'},
                    { title: 'Contact Us', component: ContactusPage, icon: './assets/img/icons/contact-us.png', class: '', close: 'true' },
                    { title: 'Terms & Conditions', component: TermsconditionsPage, icon: './assets/img/icons/tnc.png', class: '', close: 'true' },
                    { title: 'Logout', component: LoginNonmedinetPage, icon: './assets/img/icons/login.png', class: '', close: 'true' }
                ];
              }else{
                this.pages = [
                    { title: 'Home', component: HomePage, icon: './assets/img/icons/home.png', class: '', close: 'true' },
                    { title: 'Clinics Locator', component: ClinicslocatorPage, icon: './assets/img/icons/clinics-locator.png', class: '', close: 'true' },
                    { title: 'E-Card', component: EcardPage, icon: './assets/img/icons/ecard.png', class: '', close: 'true' },
                    { title: 'Check Balance', component: CheckbalancePage, icon: './assets/img/icons/check-balance.png', class: '', close: 'true' },
                    { title: 'Claims', component: ClaimsPage, icon: './assets/img/icons/claims.png', class: '', close: 'true' },
                    { title: 'Appointment (ARS)', component: AppointmentPage, icon: './assets/img/icons/appointment.png', class: '', close: 'true' },
                    { title: 'About Us', component: AboutusPage, icon: './assets/img/icons/about-us.png', class: '', close: 'true'},
                    { title: 'Contact Us', component: ContactusPage, icon: './assets/img/icons/contact-us.png', class: '', close: 'true' },
                    { title: 'Terms & Conditions', component: TermsconditionsPage, icon: './assets/img/icons/tnc.png', class: '', close: 'true' },
                    { title: 'Logout', component: LoginNonmedinetPage, icon: './assets/img/icons/login.png', class: '', close: 'true' }
                ];
              }

              if(network.toLowerCase() != "aviva"){
                  this.pages = [
                      { title: 'Home', component: HomePage, icon: './assets/img/icons/home.png', class: '', close: 'true' },
                      { title: 'Clinics Locator', component: ClinicslocatorPage, icon: './assets/img/icons/clinics-locator.png', class: '', close: 'true' },
                      { title: 'E-Card', component: EcardPage, icon: './assets/img/icons/ecard.png', class: '', close: 'true' },
                      { title: 'Check Balance', component: CheckbalancePage, icon: './assets/img/icons/check-balance.png', class: '', close: 'true' },
                      { title: 'Claims', component: ClaimsPage, icon: './assets/img/icons/claims.png', class: '', close: 'true' },
                      { title: 'Appointment (ARS)', component: AppointmentPage, icon: './assets/img/icons/appointment.png', class: '', close: 'true' },
                      { title: 'About Us', component: AboutusPage, icon: './assets/img/icons/about-us.png', class: '', close: 'true'},
                      { title: 'Contact Us', component: ContactusPage, icon: './assets/img/icons/contact-us.png', class: '', close: 'true' },
                      { title: 'Terms & Conditions', component: TermsconditionsPage, icon: './assets/img/icons/tnc.png', class: '', close: 'true' },
                      { title: 'Logout', component: LoginNonmedinetPage, icon: './assets/img/icons/login.png', class: '', close: 'true' }
                  ];
                }

                if(user.MemberNRIC == "" || user.IsDependant == true){
                  this.pages = [
                      { title: 'Home', component: HomePage, icon: './assets/img/icons/home.png', class: '', close: 'true' },
                      { title: 'Clinics Locator', component: ClinicslocatorPage, icon: './assets/img/icons/clinics-locator.png', class: '', close: 'true' },
                      { title: 'E-Card', component: EcardPage, icon: './assets/img/icons/ecard.png', class: '', close: 'true' },
                      { title: 'Check Balance', component: CheckbalancePage, icon: './assets/img/icons/check-balance.png', class: '', close: 'true' },
                      //{ title: 'Claims', component: ClaimsPage, icon: './assets/img/icons/claims.png', class: '', close: 'true' },
                      //{ title: 'Appointment (ARS)', component: AppointmentPage, icon: './assets/img/icons/appointment.png', class: '', close: 'true' },
                      { title: 'About Us', component: AboutusPage, icon: './assets/img/icons/about-us.png', class: '', close: 'true'},
                      { title: 'Contact Us', component: ContactusPage, icon: './assets/img/icons/contact-us.png', class: '', close: 'true' },
                      { title: 'Terms & Conditions', component: TermsconditionsPage, icon: './assets/img/icons/tnc.png', class: '', close: 'true' },
                      { title: 'Logout', component: LoginNonmedinetPage, icon: './assets/img/icons/login.png', class: '', close: 'true' }
                  ];
                }
        });

        //var loginInfo = this.storage.get('memInfo');
        //console.log(this.pages);

          events.subscribe('user:created', (user, network) => {
            this.arsNRIC = user[0].MemberNRIC;
            this.arsNetwork = network;
            
            this.pages = [
                { title: 'Home', component: HomePage, icon: './assets/img/icons/home.png', class: '', close: 'true' },
                { title: 'Clinics Locator', component: ClinicslocatorPage, icon: './assets/img/icons/clinics-locator.png', class: '', close: 'true' },
                { title: 'E-Card', component: EcardPage, icon: './assets/img/icons/ecard.png', class: '', close: 'true' },
                { title: 'Check Balance', component: CheckbalancePage, icon: './assets/img/icons/check-balance.png', class: '', close: 'true' },
                { title: 'Claims', component: LoginPage, icon: './assets/img/icons/claims.png', class: '', close: 'true' },
                { title: 'Appointment (ARS)', component: AppointmentPage, icon: './assets/img/icons/appointment.png', class: '', close: 'true' },
                { title: 'About Us', component: AboutusPage, icon: './assets/img/icons/about-us.png', class: '', close: 'true'},
                { title: 'Contact Us', component: ContactusPage, icon: './assets/img/icons/contact-us.png', class: '', close: 'true' },
                { title: 'Terms & Conditions', component: TermsconditionsPage, icon: './assets/img/icons/tnc.png', class: '', close: 'true' },
                { title: 'Logout', component: LoginNonmedinetPage, icon: './assets/img/icons/login.png', class: '', close: 'true' }
            ];

            if(user.length > 0){
                this.appMemInfo = user;
                this.appMemNetwork = network;
                              
                if(network.toLowerCase() != "aviva"){
                  // this.pages[5].icon = './assets/img/icons/appointment-black.png';
                  // this.pages[5].class = 'text-color';
                  // this.pages[5].close = 'false';
                  //this.pages.splice( 5, 1 );
                  this.pages = [
                      { title: 'Home', component: HomePage, icon: './assets/img/icons/home.png', class: '', close: 'true' },
                      { title: 'Clinics Locator', component: ClinicslocatorPage, icon: './assets/img/icons/clinics-locator.png', class: '', close: 'true' },
                      { title: 'E-Card', component: EcardPage, icon: './assets/img/icons/ecard.png', class: '', close: 'true' },
                      { title: 'Check Balance', component: CheckbalancePage, icon: './assets/img/icons/check-balance.png', class: '', close: 'true' },
                      { title: 'Claims', component: LoginPage, icon: './assets/img/icons/claims.png', class: '', close: 'true' },
                      { title: 'Appointment (ARS)', component: AppointmentPage, icon: './assets/img/icons/appointment.png', class: '', close: 'true' },
                      { title: 'About Us', component: AboutusPage, icon: './assets/img/icons/about-us.png', class: '', close: 'true'},
                      { title: 'Contact Us', component: ContactusPage, icon: './assets/img/icons/contact-us.png', class: '', close: 'true' },
                      { title: 'Terms & Conditions', component: TermsconditionsPage, icon: './assets/img/icons/tnc.png', class: '', close: 'true' },
                      { title: 'Logout', component: LoginNonmedinetPage, icon: './assets/img/icons/login.png', class: '', close: 'true' }
                  ];
                }

                if(user[0].MemberNRIC == "" || user[0].IsDependant == true){
                  //this.pages[4].icon = './assets/img/icons/claims-black.png';
                  //this.pages[4].class = 'text-color';
                  //this.pages[4].close = 'false';
                  //this.pages.splice( 4, 1 );
                  this.pages = [
                      { title: 'Home', component: HomePage, icon: './assets/img/icons/home.png', class: '', close: 'true' },
                      { title: 'Clinics Locator', component: ClinicslocatorPage, icon: './assets/img/icons/clinics-locator.png', class: '', close: 'true' },
                      { title: 'E-Card', component: EcardPage, icon: './assets/img/icons/ecard.png', class: '', close: 'true' },
                      { title: 'Check Balance', component: CheckbalancePage, icon: './assets/img/icons/check-balance.png', class: '', close: 'true' },
                      //{ title: 'Claims', component: ClaimsPage, icon: './assets/img/icons/claims.png', class: '', close: 'true' },
                      //{ title: 'Appointment (ARS)', component: AppointmentPage, icon: './assets/img/icons/appointment.png', class: '', close: 'true' },
                      { title: 'About Us', component: AboutusPage, icon: './assets/img/icons/about-us.png', class: '', close: 'true'},
                      { title: 'Contact Us', component: ContactusPage, icon: './assets/img/icons/contact-us.png', class: '', close: 'true' },
                      { title: 'Terms & Conditions', component: TermsconditionsPage, icon: './assets/img/icons/tnc.png', class: '', close: 'true' },
                      { title: 'Logout', component: LoginNonmedinetPage, icon: './assets/img/icons/login.png', class: '', close: 'true' }
                  ];
                }


            }

          });
        
    }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      this.keyboard.hideKeyboardAccessoryBar(false);


      // ******************************| ONE SIGNAL SETUP |**************************
      /*
      // OneSignal Code start:
      // Enable to debug issues:
      //window["plugins"].OneSignal.setLogLevel({logLevel: 4, visualLevel: 4});

      var notificationOpenedCallback = function(jsonData) {
        console.log('notificationOpenedCallback: ' + JSON.stringify(jsonData));
      };

      window["plugins"].OneSignal
        .startInit("401e5025-498a-4aaa-96fa-5f40ed1649ad", "618250019113")
        .handleNotificationOpened(notificationOpenedCallback)
        .endInit();


      //Registration of push in Android and Windows Phone
        var lastTimeBackPress = 0;
        var timePeriodToExit  = 2000;

        this.platform.registerBackButtonAction(() => {
            // get current active page
            let view = this.nav.getActive();
            let backButtonPressedOnceToExit = false;
            if (view.component.name == "HomePage") {
                //Double check to exit app
                if (new Date().getTime() - lastTimeBackPress < timePeriodToExit) {
                    this.platform.exitApp(); //Exit from app
                } else {
                    let toast = this.toastCtrl.create({
                        message:  'Press back again to exit App?',
                        duration: 3000,
                        position: 'bottom'
                    });
                    toast.present();
                    lastTimeBackPress = new Date().getTime();
                }
            }else{
              this.nav.pop();
            } 
        });
      */

    });


  }


  clickMenu(item) {
    this.events.publish('menu:clicked', item);
  }


  openPage(page) {
      // Reset the content nav to have just this page
      // we wouldn't want the back button to show in this scenario
     
      // if(page.title.toLowerCase() == 'appointment (ars)' ){

      //   this.theInAppBrowser.create('https://ars.alliancehealthcare.com.sg/#/registration','_system',this.options);
      //   //if(this.appMemNetwork.toLowerCase() != "aviva"){
      //   //     //console.log('no ars');
      //   //   //}

      //   // //   if(this.appMemInfo[0].MemberNRIC == ""){
      //   // //     console.log('no claims');
      //   // //   }
      // }else{
          this.nav.push( page.component );  
      // }
      
  }

 
}
