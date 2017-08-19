import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Storage } from '@ionic/storage';

import { LoginServiceProvider } from '../../providers/login-service/login-service';

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

	posts: any;
	public people: any
	memberInfo: any[];
	memberNetwork: any;
	sessionID: any;
	isAccountHasClaims: boolean = false;

	
	constructor ( public navCtrl: NavController, public loginService: LoginServiceProvider,public storage: Storage ) {
		this.getData();
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

	gotoLogin() {
		this.storage.clear().then(() => {
	      this.navCtrl.push( LoginNonmedinetPage );
	    });
		
	}
	call(){
		window.location = "tel:" + '6566977700'
	}

}
