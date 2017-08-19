import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';


let apiUrl = 'http://118.201.197.142/api/';

@Injectable()
export class ClaimServiceProvider {

	data: any;

	constructor(public http: Http) {
		console.log('Hello ClaimServiceProvider Provider');
	}


	getClaimsAPI(parameters){
		if (this.data) {
			// already loaded data
			return Promise.resolve(this.data);
		}

		return new Promise((resolve, reject) => {
			var headers1 = new Headers({'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8'});

			var link = apiUrl + "tpaclaimsearch";
			var opts = new RequestOptions({headers:headers1});
			this.http
				.post(link, parameters, opts)
				.map(response => response.json())
				.subscribe(data => {
				
				//console.log('login API success');
				resolve(data);
			}, e => {
				console.log(e);
				reject(e);
			});
		})


	}





}
