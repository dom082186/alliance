import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { AlertController } from 'ionic-angular';

let apiUrl = 'http://118.201.197.142/api/';

@Injectable()
export class AddSpServiceProvider {

	data: any;

	constructor(public http: Http, private alertCtrl: AlertController) {
	
	}


	addProcedureAPI(params){
		
		if(this.data) {
			return Promise.resolve(this.data);
		}

		return new Promise((resolve, reject) => {

			var header = new Headers({ 'Content-Type': 'application/json' });
			var opts = new RequestOptions({ headers: header });
			var link = apiUrl + "tpaclaim/submitprocedure";

			this.http
				.post(link, params, opts)
				.map(response => response.json())
				.subscribe(data => {
					this.data = data;
					resolve(data);
				}, e => {
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
					reject(e);
				});

		});
	}



}
