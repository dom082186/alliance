import { Injectable } from '@angular/core';
import { Http,  Headers, RequestOptions  } from '@angular/http';
import 'rxjs/add/operator/map';
import { AlertController } from 'ionic-angular';


let apiUrl = 'http://118.201.197.142/api/';

@Injectable()
export class ClinicServiceProvider {

	data: any;

  constructor(public http: Http,private alertCtrl: AlertController) {
    
  }

  getClinicsAPI(parameters){
		if (this.data) {
			// already loaded data
			return Promise.resolve(this.data);
		}

		return new Promise((resolve, reject) => {
			var headers1 = new Headers({'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8'});

		    var link = apiUrl + "ClinicSearch";
		    var opts = new RequestOptions({headers:headers1});
		    this.http
			    .post(link, parameters, opts)
			    .map(response => response.json())
			    .subscribe(data => {
			        //console.log('login API success');
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
					          //navigator['app'].exitApp();
					          return;
					      }
					    }]
					});
					alert.present();
			        reject(e);
			});
		})


	}

	getClinicsAPIx(parameters) {
		if(this.data) {
			return Promise.resolve(this.data);
		}

		return new Promise((resolve, reject) => {
			var header = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8' });
			var opts = new RequestOptions({ headers: header });
			var link = apiUrl + "ClinicSearch";
			var str = [];

			for(let key in parameters) {
				str.push(encodeURIComponent(key) + "=" + encodeURIComponent(parameters[key]));
			}

			this.http
				.post(link, str.join('&'), opts)
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

	getClinic(id) {
		
		// console.log(this.data);
		return new Promise(resolve => {
			resolve(this.data[id]);
		})
	}


	preCalculateClaimAPI(parameters){
		
		if(this.data) {
			return Promise.resolve(this.data);
		}

		return new Promise((resolve, reject) => {
			var header = new Headers({ 'Content-Type': 'application/json; charset=utf-8' });
			var opts = new RequestOptions({ headers: header });
			var link = apiUrl + "tpaclaim/PreCalculateClaim";

			this.http
				.post(link, parameters, opts)
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
		})

	}

}
