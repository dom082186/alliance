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


	loadAcuteDiagnosisAPI(parameters){
		if (this.data) {
		    // already loaded data
		    return Promise.resolve(this.data);
		}
		
		return new Promise((resolve, reject) => {
			var headers1 = new Headers({'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8'});
		    
		    var link = apiUrl + "diagnosis/acutelist";
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


	loadChronicDiagnosisAPI(parameters){
		if (this.data) {
		    // already loaded data
		    return Promise.resolve(this.data);
		}
		
		return new Promise((resolve, reject) => {
			var headers1 = new Headers({'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8'});
		    
		    var link = apiUrl + "diagnosis/chroniclist";
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


	generateClaimID (params){

		if (this.data) {
		    // already loaded data
		    return Promise.resolve(this.data);
		}
		
		return new Promise((resolve, reject) => {
			var headers1 = new Headers({'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8'});
		    
		    var link = apiUrl + "tpaclaim/generateclaimid";
		    console.log(link);
		    var opts = new RequestOptions({headers:headers1});
		    this.http
			    .post(link, params, opts)
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



	submitClaimAPI (params){
		
		if(this.data) {
			return Promise.resolve(this.data);
		}

		return new Promise((resolve, reject) => {
			var header = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8' });
			var opts = new RequestOptions({ headers: header });
			var link = apiUrl + "tpaclaim/submitclaim";
			var str = [];

			for(let key in params) {
				str.push(encodeURIComponent(key) + "=" + encodeURIComponent(params[key]));
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


	uploadFile(params){
		if(this.data) {
			return Promise.resolve(this.data);
		}

		return new Promise((resolve, reject) => {
			var header = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8' });
			var opts = new RequestOptions({ headers: header });
			var link = apiUrl + "tpaupload/add";
			var str = [];

			for(let key in params) {
				str.push(encodeURIComponent(key) + "=" + encodeURIComponent(params[key]));
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



}
