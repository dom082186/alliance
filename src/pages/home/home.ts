import { Component } from '@angular/core';
import { NavController, MenuController, AlertController,Events } from 'ionic-angular';
import { Storage } from '@ionic/storage';

import { LoginServiceProvider } from '../../providers/login-service/login-service';
import { InAppBrowser, InAppBrowserOptions } from '@ionic-native/in-app-browser';

import { ClinicslocatorPage } from '../clinicslocator/clinicslocator';
import { CheckbalancePage } from '../checkbalance/checkbalance';
import { ClaimsPage } from '../claims/claims';
import { EcardPage } from '../ecard/ecard';
import { AboutusPage } from '../aboutus/aboutus';
import { ContactusPage } from '../contactus/contactus';
import { LoginNonmedinetPage } from '../login-nonmedinet/login-nonmedinet';
import { LoginPage } from '../login/login';


declare var window;

@Component({
	selector: 'page-home',
	templateUrl: 'home.html',
	providers: [LoginServiceProvider]
})
export class HomePage {

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

	posts: any;
	public people: any
	memberInfo: any[];
	memberNetwork: any;
	sessionID: any;
	isAccountHasClaims: boolean = false;
	isAccountAviva: boolean = false;
	isDependent: boolean = false;

	
	constructor ( public navCtrl: NavController, public loginService: LoginServiceProvider,public storage: Storage, 
		public menu: MenuController, private theInAppBrowser: InAppBrowser, private alertCtrl: AlertController,
		public events: Events) {
		

		this.getData();
		this.menu.swipeEnable(false);

	}



	ionViewDidEnter() {
    	this.menu.swipeEnable(false);
  	}

	getData(){
		this.storage.get('memInfo').then((val) => {
		    this.memberInfo = val;
		    this.sessionID = val[0].Internal_LoggedInUserRegisterID
		    if(val[0].MemberNRIC != ""){
		    	this.isAccountHasClaims = true	
		    }
		    if(this.memberInfo[0]['IsEmployee'] != true){ 
		    	this.isDependent = false	
		    }
		    this.getNetwork();

		});
	}
	getNetwork(){
		this.storage.get('memNetwork').then((val1) => {
		    this.memberNetwork = val1;
		    if(val1.toLowerCase() == "aviva"){
		    	this.isAccountAviva = true;
		    }
		});	
	}

	gotoClinicsLocator() {
		this.navCtrl.push( ClinicslocatorPage );
	}

	gotoEcard() {
		this.navCtrl.push( EcardPage );
	}

	gotoCheckBalance() {
		this.navCtrl.push( CheckbalancePage );
	}

	gotoClaims() {
		//this.navCtrl.push( ClaimsPage );	
		this.navCtrl.push(LoginPage);
	}

	gotoAboutUs() {
		this.navCtrl.push( AboutusPage );
	}

	gotoContactUs() {
		this.navCtrl.push( ContactusPage );
	}

	gotoLogout() {
		this.storage.clear().then(() => {
	      this.navCtrl.push( LoginNonmedinetPage );
	    });
		
	}

	public openWithSystemBrowser(url : string){
	    let target = "_system";
	    this.theInAppBrowser.create(url,target,this.options);
	}

	public openWithInAppBrowser(url : string){


		if(this.memberNetwork.toLowerCase() == "aviva"){
			let target = "_blank";
	    	this.theInAppBrowser.create(url,target,this.options);
		}else{
			let alert = this.alertCtrl.create({
				title: 'Alert',
				message: 'Appointment (ARS) is for AVIVA members only.',
				enableBackdropDismiss: false,
				buttons: [{
			        text: 'OK',
			        role: 'Cancel',
			        handler: () => {
			          
			      }
			    }]
			});
			alert.present();
		}
	}

	call(){
		window.location = "tel:" + '+6566977700'
	}

}
