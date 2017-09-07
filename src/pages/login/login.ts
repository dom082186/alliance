import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';

import { OnboardPage } from '../onboard/onboard';
import { RegisterPage } from '../register/register';
import { HomePage } from '../home/home';
import { LoginNonmedinetPage } from '../login-nonmedinet/login-nonmedinet';
import { ClaimsPage } from '../claims/claims';

import { LoginServiceProvider } from '../../providers/login-service/login-service';

import { Storage } from '@ionic/storage';
import { AlertController } from 'ionic-angular';




/**
 * Generated class for the LoginPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

 declare var require: any
 
@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
  providers: [LoginServiceProvider ]
})
export class LoginPage {

	
	memberNetwork: any;
	posts: any
	public memberInfo: any;
	loading: any;
  	data: any;
  	loginCredentials: any;
  	sessionID: any;
	login = {}



	constructor( public navCtrl: NavController, 
		public navParams: NavParams, 
		public loginService: LoginServiceProvider, 
		public loadingCtrl: LoadingController, 
		public storage: Storage,
		private alertCtrl: AlertController ) {
		
		
		this.storage.get('memInfo').then((val) => {
		    this.memberInfo = val;
		    this.sessionID = val[0].Internal_LoggedInUserRegisterID
		    //this.login['username'] = val[0].UserName
		    this.login['username'] = val[0].MemberNRIC
		    this.getNetwork();

		});
	}

	getNetwork(){
		this.storage.get('memNetwork').then((val1) => {
		    this.memberNetwork = val1;
		});	
	}



	doLogin() {	

		if(this.login['password'] == "" || this.login['password'] == undefined){
			let alert = this.alertCtrl.create({
				title: 'Alert',
				message: 'Password is required',
				buttons: [{
			        text: 'OK',
			        role: 'cancel',
			        handler: () => {
			          console.log('Cancel clicked');
			      }
			    }]
			});
			alert.present();
			return;

		}else{

			this.showLoader();
			var sha512 = require('sha512')
			var hash = sha512(this.login['password'])//sha512('P@ssw0rd');//

			//this.loginCredentials = "usernric=S8124356A&network=ntuc"+ "&password=" + hash.toString('hex');	
			this.loginCredentials = "usernric=" + this.memberInfo[0].MemberNRIC + "&network=" + this.memberNetwork + "&password=" + hash.toString('hex');
			console.log(this.loginCredentials);

			this.loginService.loginUsername(this.loginCredentials).then((result) => {
			    this.loading.dismiss();
			    console.log(result);

			    	if(result.Status_Volatile){
				    	let alert = this.alertCtrl.create({
							title: 'Alert',
							message: 'Member does not exist',
							buttons: [{
						        text: 'OK',
						        role: 'cancel',
						        handler: () => {
						          //this.navCtrl.setRoot( HomePage );	
						          return;
						      }
						    }]
						});
						alert.present();
				    }else{
				    	this.setData(result);
				    	this.navCtrl.push( ClaimsPage );		
				    }

			    }, (err) => {
			      this.loading.dismiss();
		    });
		}

	}

	 showLoader(){
	    this.loading = this.loadingCtrl.create({
	        content: 'Authenticating...'
	    });

	    this.loading.present();
	  }


	setData(res){
		this.storage.set('claimMemInfo', res);
	}



	backButtonClick()
	{
    	this.navCtrl.pop();  // remember to put this to add the back button behavior
	}




}
