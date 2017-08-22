import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { AlertController } from 'ionic-angular';


let apiUrl = 'http://118.201.197.142/api/';


@Injectable()
export class LoginServiceProvider {

	data: any;

	constructor(public http: Http,private alertCtrl: AlertController) {

	}

	login(credentials) {
		if (this.data) {
		    // already loaded data
		    return Promise.resolve(this.data);
		  }
		
		return new Promise((resolve, reject) => {
			var headers1 = new Headers({'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8'});
		    //headers1.append("content-type", 'application/json');
		    //headers1.append('Content-Type', 'application/x-www-form-urlencoded; charset=utf-8');

		    //var params = "username=S00000002A&network=ge&password=9bda4d02b5633524ec0016088c5bd482df8c8291bb258a490750184bb4bb31abb5ec4c8689e819ddf657158ceeca952d8d5748bd31fb589780397395a3117c58";
		    var link = apiUrl + "loginauthentication/LoginNonMedinetNRIC";
		    var opts = new RequestOptions({headers:headers1});
		    this.http
			    .post(link, credentials, opts)
			    .map(response => response.json())
			    .subscribe(data => {
			        resolve(data);
			    }, e => {
			        console.log(e);
			        let alert = this.alertCtrl.create({
						title: 'Alert',
						message: "Error loading requests",
						buttons: [{
					        text: 'OK',
					        role: 'cancel',
					        handler: () => {
					          navigator['app'].exitApp();
					      }
					    }]
					});
					alert.present();
			        reject(e);
			});
		})
	};


	loadNetworkAPI(){
		if (this.data) {
		    return Promise.resolve(this.data);
		}
		
		return new Promise((resolve,reject) => {
		    this.http.get('http://118.201.197.142/api/program/list')
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
					          navigator['app'].exitApp();
					      }
					    }]
					});
					alert.present();
					reject(error);
		      });
		});
	};

}
