import { Component } from '@angular/core';

import { IonicPage, NavController, NavParams, LoadingController, Platform, MenuController } from 'ionic-angular';

import { LoginPage } from '../login/login';
import { RegisterPage } from '../register/register';
import { HomePage } from '../home/home';
import { OnboardPage } from '../onboard/onboard';

import { LoginServiceProvider } from '../../providers/login-service/login-service';


import { Storage } from '@ionic/storage';
import { AlertController } from 'ionic-angular';

import { Geolocation } from '@ionic-native/geolocation';
//import { NativeGeocoder, NativeGeocoderReverseResult, NativeGeocoderForwardResult } from '@ionic-native/native-geocoder';



declare var require: any
declare var google;

@IonicPage()
@Component({
  selector: 'page-login-nonmedinet',
  templateUrl: 'login-nonmedinet.html',
  providers: [LoginServiceProvider]

})
export class LoginNonmedinetPage {

	data: any;	
	public networks: any[];
	posts: any
	public termsStr = "";
	public memberinfo: any;
	loading: any;
  	loginCredentials: any;
	login = {}
	// isCheckTM : boolean = false;


  constructor(public navCtrl: NavController, 
  		public navParams: NavParams,
  		public loginService: LoginServiceProvider, 
		public loadingCtrl: LoadingController, 
		public storage: Storage, 
		private alertCtrl: AlertController, 
		public geolocation: Geolocation,
		public platform: Platform,
		public menu: MenuController) {
		
		this.loadNetworks();
		// platform.ready().then(() => {
		//     this.loadMap();
		// });

		this.menu.swipeEnable(false);
  }


  	ionViewDidLoad(){

		this.storage.clear().then(() => {
			console.log('clear')
	    });
	}

	gotoLogin() {
		this.navCtrl.push( LoginPage );
	}

	goRegister() {
		this.navCtrl.setRoot( RegisterPage );
	}

	gotoHome() {
		// this.navCtrl.setRoot( HomePage );
	}

	goSlider() {
		this.navCtrl.setRoot( OnboardPage );	
	}

	onChange(val){
		console.log(val);
		// this.termsconService.loadTermsCon(val).then((result) => {
		// 	this.termsStr = result;
		// 	console.log(result);
		// }, (err) => {
		// 	this.loading.dismiss();
		// });
	}



	loadNetworks(){
		this.loginService.loadNetworkAPI().then((result) => {
			if(result.ValidateMessage != undefined){
				let alert = this.alertCtrl.create({
					title: 'Alert',
					message: result.ValidateMessage,
					buttons: [{
				        text: 'OK',
				        role: 'cancel',
				        handler: () => {
				          console.log('Cancel clicked');
				      }
				    }]
				});
				alert.present();
			}else{
				this.networks = result;
				
			}

		}, (err) => {
			this.loading.dismiss();
		});
	}
	

	addValue(e): void {
	    //var isChecked = e.currentTarget.checked;
	}

	doLogin() {
		
		this.storage.set('memNetwork', this.login['network']); //set localstorage for network
		//this.storage.set('memNetwork', 'ge');

		if( this.login['nric'] == "" || this.login['nric'] == undefined){
			let alert = this.alertCtrl.create({
				title: 'Alert',
				message: 'NRIC is required',
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
		}

		if(this.login['membertype'] == "" || this.login['membertype'] == undefined){
			let alert = this.alertCtrl.create({
				title: 'Alert',
				message: 'Please select a Member Type',
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
		}

		if(this.login['network']=="" || this.login['network'] == undefined){
			let alert = this.alertCtrl.create({
				title: 'Alert',
				message: 'Kindly select a network',
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

			// if(this.isCheckTM == true){
				this.showLoader();
				// var sha512 = require('sha512')
				// var hash = sha512(this.login['password'])
				// this.loginCredentials = "usernric=S00000002A&network=ge&membertype=member";
				this.loginCredentials = "usernric=" + this.login['nric'] + "&network=" + this.login['network'].toLowerCase() + "&membertype=" + this.login['membertype'].toLowerCase() ;
					console.log(this.loginCredentials);
				this.loginService.login(this.loginCredentials).then((result) => {
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
						          console.log('Cancel clicked');
						      }
						    }]
						});
						alert.present();
				    }else{
				    	this.setData(result);
				    	this.navCtrl.setRoot( HomePage );	
				    	for(let item of result){
					    	//this.storage.set('sessionID', result.Internal_LoggedInUserRegisterID);
					    	
						}

				    }

				    /*	
				    if(result.Status_Volatile){
				    	let alert = this.alertCtrl.create({
							title: 'Alert',
							message: 'Member does not exist',
							buttons: [{
						        text: 'OK',
						        role: 'cancel',
						        handler: () => {
						          console.log('Cancel clicked');
						      }
						    }]
						});
						alert.present();
				    }else {
				    	this.setData(result);
				    	this.storage.set('sessionID', result.Internal_LoggedInUserRegisterID);
				    	this.navCtrl.setRoot( HomePage );	
				    }
				    */
				    
				}, (err) => {
				      this.loading.dismiss();
			    });

			// }else{
			// 	let alert = this.alertCtrl.create({
			// 		title: 'Alert',
			// 		message: 'Please confirm that you have agreed on our Terms and Condition.',
			// 		buttons: [{
			// 	        text: 'OK',
			// 	        role: 'cancel',
			// 	        handler: () => {
			// 	          console.log('Cancel clicked');
			// 	      }
			// 	    }]
			// 	});
			// 	alert.present();
			// 	return;
			// }
			
		}

	}

	setData(res){
		console.log('set memInfo')
		this.storage.set('memInfo', res);

	}

	showLoader(){
	    this.loading = this.loadingCtrl.create({
	        content: 'Authenticating...'
	    });

	    this.loading.present();
	  }

}
