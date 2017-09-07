import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { AlertController } from 'ionic-angular';


let apiUrl = 'http://localhost:47503/api/';

@Injectable()
export class TermsconsServiceProvider {

	data: any;

	constructor(public http: Http,private alertCtrl: AlertController,) {
		console.log('Hello TermsconsServiceProvider Provider');
	}


	getTermsCons(parameters) {
		if (this.data) {
		    return Promise.resolve(this.data);
		}
		
		return new Promise((resolve,reject) => {
			var URL = apiUrl + "tpaclaim/TermsOfService?network=" + parameters;
		    this.http.get(URL)
		      .map(res => res.json())
		      .subscribe(
		      	data => {
		        	resolve(data); 	
		        }, error => {
					let alert = this.alertCtrl.create({
						title: 'Alert',
						message: "Error loading requests",
						buttons: [{
					        text: 'OK',
					        role: 'cancel',
					        handler: () => {
					          //navigator['app'].exitApp();
					          return;
					      }
					    }]
					});
					alert.present();
					reject(error);
		      });
		});

	}

}
