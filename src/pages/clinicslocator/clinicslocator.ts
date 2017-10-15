import { Component,Renderer2,ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController, Content } from 'ionic-angular';
import { Storage } from '@ionic/storage';


import { ClinicdetailsPage } from '../clinicdetails/clinicdetails';
import { LoginNonmedinetPage } from '../login-nonmedinet/login-nonmedinet';
import { ContactusPage } from '../contactus/contactus';

import { ClinicServiceProvider } from '../../providers/clinic-service/clinic-service';
import { Geolocation } from '@ionic-native/geolocation';
import { Keyboard } from '@ionic-native/keyboard';

declare var google;

@IonicPage()
@Component({
  selector: 'page-clinicslocator',
  templateUrl: 'clinicslocator.html',
  providers: [ClinicServiceProvider]
})
export class ClinicslocatorPage {

	@ViewChild(Content) content: Content;
	@ViewChild('map') mapElement: ElementRef;
	@ViewChild('searchList') searchElement: ElementRef;
	@ViewChild('sp') spElement: ElementRef;
	@ViewChild('nearby') nearbyElement: ElementRef;
	@ViewChild('all') allElement: ElementRef;
  	
  	map: any;
	parameters: any;
	memberInfo: any[];
	memberNetwork: any;
	sessionID: any;
	ecardParam: any;
	loading: any;
	clinicsParams: any;
	allClinics: any;
	allClinics1: any;
	resultClinics: any;
	resultNearClinics: any;
	currentLat: any;
	currentLong: any;
	noClinics: boolean = false;
	ngClinic = {}

	constructor(public navCtrl: NavController, public navParams: NavParams, 
		public storage: Storage, 
		public loadingCtrl: LoadingController,
		private alertCtrl: AlertController,
		public clinicService: ClinicServiceProvider,
		private rd: Renderer2,
		public geolocation: Geolocation,
		private keyboard: Keyboard) {

		
	}

	ionViewDidLoad(){
		
		this.loadMap();
		this.rd.addClass(this.allElement.nativeElement, 'active');		
	}

	loadMap(){
		
		this.showLoader();
		var posOptions = { timeout: 20000, enableHighAccuracy: true };
		
		this.geolocation.getCurrentPosition(posOptions).then((position) => {
			this.loading.dismiss();
			this.getData();

			this.currentLat = position.coords.latitude;
			this.currentLong = position.coords.longitude;
			// this.currentLat = "1.3011873";
			// this.currentLong = "103.8495055";

			let latLng = new google.maps.LatLng(this.currentLat, this.currentLong);
			let mapOptions = {
				enableHighAccuracy: true,
      			timeout: 5000,
				center: latLng,
				zoom: 15,
				mapTypeId: google.maps.MapTypeId.ROADMAP,
				zoomControl: false,
				mapTypeControl: false,
				scaleControl: false,
				streetViewControl: false,
				rotateControl: false
			}
			this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);

			let marker = new google.maps.Marker({
				map: this.map,
				animation: google.maps.Animation.DROP,
				position: latLng
			});

			let content = "<p>You're Here</p>";          

			this.addInfoWindow(marker, content);

		}, (err) => {
			this.loading.dismiss();
			
			var errorMsg = ""
			if(err.code == 1){
				errorMsg = "User denied location";
			}else{
				errorMsg = "Location service not available";
			}

			let alert = this.alertCtrl.create({
				title: 'Alert',
				message: errorMsg,
				enableBackdropDismiss: false,
				buttons: [{
			        text: 'OK',
			        role: 'Cancel',
			        handler: () => {
			        	this.navCtrl.pop();
			      	}
			    }]
			});
			alert.present();

			// let latLng = new google.maps.LatLng("1.3011873", "103.8495055");
			// this.currentLat = "1.3011873";
			// this.currentLong = "103.8495055";
			// let mapOptions = {
			// 	enableHighAccuracy: true,
   //    			timeout: 5000,
			// 	center: latLng,
			// 	zoom: 15,
			// 	mapTypeId: google.maps.MapTypeId.ROADMAP,
			// 	zoomControl: false,
			// 	mapTypeControl: false,
			// 	scaleControl: false,
			// 	streetViewControl: false,
			// 	rotateControl: false
			// }
			// this.loading.dismiss();
			// this.getData();
			// this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
			// let marker = new google.maps.Marker({
			// 	map: this.map,
			// 	animation: google.maps.Animation.DROP,
			// 	position: latLng
			// });

			// let content = "<p>You're Here</p>";          

			// this.addInfoWindow(marker, content);
		});

		
	}

	addInfoWindow(marker, content){

		let infoWindow = new google.maps.InfoWindow({
			content: content
		});

		google.maps.event.addListener(marker, 'click', () => {
			infoWindow.open(this.map, marker);
		});

	}

	getData(){
		this.storage.get('memInfo').then((val) => {
		    this.memberInfo = val;
		    this.getNetwork();
		});
	}
	getNetwork(){
		this.storage.get('memNetwork').then((val1) => {
		    this.memberNetwork = val1;
		    this.getAllClinics();
		});	
	}
	getSession(){
		this.storage.get('sessionID').then((val1) => {
		    this.sessionID = val1;
		    this.getAllClinics();
		});	
	}

	showLoader(){
	    this.loading = this.loadingCtrl.create({
	        content: 'Please Wait...'
	    });

	    this.loading.present();
	}

	getAllClinics(){
		this.showLoader();
		this.ngClinic['searchList'] = "";
		var empType = "";
		if(this.memberInfo[0]['IsEmployee']){ empType = "employee"; }else{ empType = "dependent"; }

		this.clinicService.getClinicsAPIx({
			nric: this.memberInfo[0]['MemberNRIC'],
			Program: "null",
			EmpType: empType,
			network: this.memberNetwork,
			internal_LoggedInUserRegisterID: this.memberInfo[0]['Internal_LoggedInUserRegisterID']
		}).then(result => {
			this.loading.dismiss();

			if(result.Status == "Failed"){
				let alert = this.alertCtrl.create({
					title: 'Alert',
					message: result.ValidateMessage,
					enableBackdropDismiss: false,
					buttons: [{
				        text: 'OK',
				        role: 'Cancel',
				        handler: () => {
				        	if(result.ValidateMessage.toLowerCase() != "records not found."){
				        		this.navCtrl.setRoot(LoginNonmedinetPage); 
				        	}else{
				        		this.navCtrl.pop();
				        	}
				          
				      }
				    }]
				});
				alert.present();

			}else{
				this.allClinics = result;	
				this.allClinics1 = result;
				this.allClinics1.sort((a, b) => {
			      if (a.Name < b.Name) return -1;
			      else if (a.Name > b.Name) return 1;
			      else return 0;
			    });
			    
				this.filterAllData();

			}
			
		}, err => {
			this.loading.dismiss();
			

			let alert = this.alertCtrl.create({
				title: 'Alert',
				message: err.statusText,
				enableBackdropDismiss: false,
				buttons: [{
			        text: 'OK',
			        role: 'Cancel',
			        handler: () => {
			        	this.navCtrl.pop(); 
			      }
			    }]
			});
			alert.present();
		})
	}

	onInputChange(searchStr) {
	    
	    if(searchStr == undefined || searchStr ==""){
	    	if(this.resultNearClinics != undefined){
	    		this.allClinics = this.resultNearClinics;
	    	}else{
	    		this.allClinics = this.allClinics1;	
	    	}
	    
	    }else{

	    	if(this.resultNearClinics != undefined){
	    		this.allClinics = this.resultNearClinics;
	    	}else{
	    		this.allClinics = this.allClinics1;
	    	}

	    	console.log(this.allClinics)
			this.allClinics = this.allClinics.filter((clinic) => {
				return clinic.Name.toLowerCase().indexOf(searchStr.toLowerCase()) > -1;
			});

			if(this.allClinics.length == 0){
				this.noClinics = true;
			}else{
				this.noClinics = false;
			}
	    }
	}


	searchClinic(searchStr){
		
		if(searchStr != undefined || searchStr != ""){
			
			if(this.resultNearClinics != undefined){
	    		this.allClinics = this.resultNearClinics;
	    	}else{
	    		this.allClinics = this.allClinics1;
	    	}

			this.allClinics = this.allClinics.filter((clinic) => {			
				return clinic.Name.toLowerCase().indexOf(searchStr.toLowerCase()) > -1;				
			});

			if(this.allClinics.length == 0){
				this.noClinics = true;
			}else{
				this.noClinics = false;
			}
		}
		this.keyboard.close();
	}

	filterGPData(){
		this.allClinics = this.allClinics1;
		//this.rd.addClass(this.gpElement.nativeElement, 'active');
		this.rd.removeClass(this.spElement.nativeElement, 'active');
		this.rd.removeClass(this.nearbyElement.nativeElement, 'active');
		this.rd.removeClass(this.allElement.nativeElement, 'active');

		console.log('gp');

		this.allClinics = this.allClinics.filter((clinic) => {
			return clinic.ClinicType == "GP";
		});
		
		if(this.allClinics.length == 0){
			this.noClinics = true;
		}
	}
	filterSPData(){
		this.allClinics = this.allClinics1;
		// this.rd.removeClass(this.gpElement.nativeElement, 'active');
		this.rd.removeClass(this.spElement.nativeElement, 'active');
		this.rd.removeClass(this.nearbyElement.nativeElement, 'active');
		this.rd.addClass(this.allElement.nativeElement, 'active');

		console.log('sp');
		let alert = this.alertCtrl.create({
		    title: 'Alert',
		    message: 'For SP Clinics, please contact us',
		    enableBackdropDismiss: false,
		    buttons: [
		      {
		        text: 'OK',
		        //role: 'cancel',
		        handler: () => {
		          this.getAllClinics();
		        }
		      },
		      {
		        text: 'Call Us',
		        handler: () => {
		          this.navCtrl.push( ContactusPage );
		        }
		      }
		    ]
		  });
		  alert.present();

		// this.allClinics = this.allClinics.filter((clinic) => {
		// 	return clinic.ClinicType == "SP";
		// });
		
		// if(this.allClinics.length == 0){
		// 	this.noClinics = true;
		// }
	}

	filterNearData(){
		this.content.scrollToTop();
		this.allClinics = this.allClinics1;

		//this.rd.removeClass(this.gpElement.nativeElement, 'active');
		this.rd.removeClass(this.spElement.nativeElement, 'active');
		this.rd.addClass(this.nearbyElement.nativeElement, 'active');
		this.rd.removeClass(this.allElement.nativeElement, 'active');

		console.log('near');

		this.allClinics = this.allClinics.filter((clinic) => {
			
			var lat1 = this.currentLat;
			var lat2 = clinic.Latitude;
			var lon1 = this.currentLong;
			var lon2 = clinic.Longitude;


			var radlat1 = Math.PI * lat1 / 180;
			var radlat2 = Math.PI * lat2 / 180;
			var theta = lon1 - lon2;
			var radtheta = Math.PI * theta / 180;
			var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
			dist = Math.acos(dist);
			dist = dist * 180 / Math.PI;
			dist = dist * 60 * 1.1515;
			dist = dist * 1.609344;
			clinic.Distance = dist.toFixed(2);

			return dist < 8;
		});

		this.resultClinics = this.allClinics;
		this.resultNearClinics = this.allClinics;

		this.resultClinics.sort((a, b) => {
	      if (a.Distance < b.Distance) return -1;
	      else if (a.Distance > b.Distance) return 1;
	      else return 0;
	    });

		
		if(this.allClinics.length == 0){
			this.noClinics = true;
		}
	}

	filterAllData() {
		this.content.scrollToTop();
		//this.rd.removeClass(this.gpElement.nativeElement, 'active');
		this.rd.removeClass(this.spElement.nativeElement, 'active');
		this.rd.removeClass(this.nearbyElement.nativeElement, 'active');
		this.rd.addClass(this.allElement.nativeElement, 'active');
		this.ngClinic['searchList'] = "";
		this.resultNearClinics = undefined;
		console.log('all');

		this.allClinics = this.allClinics1;

		this.allClinics.filter((clinic) => {
			var lat1 = this.currentLat;
			var lat2 = clinic.Latitude;
			var lon1 = this.currentLong;
			var lon2 = clinic.Longitude;


			var radlat1 = Math.PI * lat1 / 180;
			var radlat2 = Math.PI * lat2 / 180;
			var theta = lon1 - lon2;
			var radtheta = Math.PI * theta / 180;
			var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
			dist = Math.acos(dist);
			dist = dist * 180 / Math.PI;
			dist = dist * 60 * 1.1515;
			dist = dist * 1.609344;
			clinic.Distance = dist.toFixed(2);
			return this.allClinics;
		});
		
		if(this.allClinics.length == 0){
			this.noClinics = true;
		}
	}
		


	gotoDetails(index) {
		this.clinicService.getClinic(index).then(result => {
			this.navCtrl.push( ClinicdetailsPage, {details: this.allClinics[index]});
		}, err => {
		})
		
	}


	backButtonClick()
	{
    	this.navCtrl.pop();  // remember to put this to add the back button behavior
	}


	




}
