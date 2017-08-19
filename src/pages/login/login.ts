import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';

import { OnboardPage } from '../onboard/onboard';
import { RegisterPage } from '../register/register';
import { HomePage } from '../home/home';
import { LoginNonmedinetPage } from '../login-nonmedinet/login-nonmedinet';

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

	//networks: {}
	public networks: any[];
	posts: any
	public memberinfo: any;
	loading: any;
  	data: any;
  	loginCredentials: any;
	login = {}



	constructor( public navCtrl: NavController, 
		public navParams: NavParams, 
		public loginService: LoginServiceProvider, 
		public loadingCtrl: LoadingController, 
		public storage: Storage,
		private alertCtrl: AlertController ) {
		
	}

	doLogin() {
		console.log(this.login['password'])
		console.log(this.login['network'])

		if( this.login['username'] == "" || this.login['username'] == undefined){
			let alert = this.alertCtrl.create({
				title: 'Alert',
				message: 'Username is required',
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

			this.showLoader();
			var sha512 = require('sha512')
			var hash = sha512(this.login['password'])
				console.log(hash.toString('hex'))
			this.loginCredentials = "username=" + this.login['username'] + "&network=" + this.login['network'] + "&password=" + hash.toString('hex');
				console.log(this.loginCredentials);
			this.loginService.login(this.loginCredentials).then((result) => {
			    this.loading.dismiss();
			    console.log(result);
			    console.log(result.IsActive);

			    if(result.IsActive){
			    	this.navCtrl.setRoot( HomePage );	
			    }else{
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
			    }

			    
			      //this.data = result;
			      //localStorage.setItem('token', this.data.access_token);
			      //this.navCtrl.setRoot(TabsPage);
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


	logForm() {
	    //console.log(this.login)
	    // this.loginService.postRequest()
	    // .then(data => {
	    //   this.memberinfo = data;
	    //   console.log ('Hello LoginServiceProvider Provider')
	    // });
	    // console.log (this.memberinfo)
	}
	  

	gotoLoginNonMediNet() {
		this.navCtrl.setRoot( LoginNonmedinetPage );
	}

	goSlider() {
		this.navCtrl.setRoot(OnboardPage);
	}

	goRegister() {
		this.navCtrl.setRoot(RegisterPage);
	}

	gotoHome() {
		this.navCtrl.setRoot( HomePage );
	}


	setData(){
		console.log('setData')
		this.storage.set('myData', 'good');	
	}

	getData(){
		// this.storage.get('myData').then((val) => {
	 	// console.log('Your age is', val);
	 	// });
	 		// Or to get a key/value pair
		  this.storage.get('myData').then((val) => {
		    console.log('Your age is', val);
		  });
	}
	







}
