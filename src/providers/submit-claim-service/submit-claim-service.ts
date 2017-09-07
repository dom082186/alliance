import { Injectable } from '@angular/core';
import { Http,RequestOptions,Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { AlertController } from 'ionic-angular';


let apiUrl = 'http://118.201.197.142/api/';

@Injectable()
export class SubmitClaimServiceProvider {

	data: any;	

	constructor(public http: Http,private alertCtrl: AlertController,) {

	}

	loadProvidersAPI(parameters){
		if (this.data) {
		    return Promise.resolve(this.data);
		}
		
		return new Promise((resolve, reject) => {
			var headers1 = new Headers({'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8'});
		    
		    var link = apiUrl + "tpaclaimprovider";
		    console.log(link);
		    var opts = new RequestOptions({headers:headers1});
		    this.http
			    .post(link, parameters, opts)
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
					        	return;
					          //navigator['app'].exitApp();
					      }
					    }]
					});
					alert.present();
			        reject(e);
			});
		})
	}


	loadClaimTypeAPI(parameters){
		if (this.data) {
		    // already loaded data
		    return Promise.resolve(this.data);
		}
		
		return new Promise((resolve, reject) => {
			var headers1 = new Headers({'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8'});
		    
		    var link = apiUrl + "claimtype";
		    console.log(link);
		    var opts = new RequestOptions({headers:headers1});
		    this.http
			    .post(link, parameters, opts)
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
					        	return;
					          //navigator['app'].exitApp();
					      }
					    }]
					});
					alert.present();
			        reject(e);
			});
		})

	}


}
