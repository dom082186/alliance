import { Component } from '@angular/core';
import { NavController, MenuController, AlertController } from 'ionic-angular';
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

	
	constructor ( public navCtrl: NavController, public loginService: LoginServiceProvider,public storage: Storage, 
		public menu: MenuController, private theInAppBrowser: InAppBrowser, private alertCtrl: AlertController) {
	
		this.getData();
		this.menu.swipeEnable(false);

	}



	ionViewDidEnter() {
    	this.menu.swipeEnable(false);
  	}

	getData(){
		this.storage.get('memInfo').then((val) => {
		    this.memberInfo = val;
		    this.sessionID = val.Internal_LoggedInUserRegisterID
		    if(val.UserName != ""){
		    	this.isAccountHasClaims = true	
		    }
		    this.getNetwork();
		    console.log(this.isAccountHasClaims)
		});
	}
	getNetwork(){
		this.storage.get('memNetwork').then((val1) => {
		    this.memberNetwork = val1;
		    console.log(val1);
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
		this.navCtrl.push( ClaimsPage );	
		
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
		if(this.memberNetwork == "aviva"){
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
		window.location = "tel:" + '6566977700'
	}

}
