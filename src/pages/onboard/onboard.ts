import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { LoginPage } from '../login/login';
import { LoginNonmedinetPage } from '../login-nonmedinet/login-nonmedinet';
import { HomePage } from '../home/home';
import { RegisterPage } from '../register/register';
import { ContactusPage } from '../contactus/contactus';

/**
 * Generated class for the OnboardPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-onboard',
  templateUrl: 'onboard.html',
})
export class OnboardPage {

	constructor( public navCtrl: NavController, public navParams: NavParams ) {

	}

	goLoginPage() {
		this.navCtrl.setRoot(LoginPage);
	}

	gotoContact(){
		this.navCtrl.push( ContactusPage );	
	}

  gotoLoginNonMediNet() {
    this.navCtrl.setRoot( LoginNonmedinetPage );
  }

	gotoHome() {
		this.navCtrl.setRoot( HomePage );
	}

	goRegister() {
    this.navCtrl.setRoot( RegisterPage );
  }

}
