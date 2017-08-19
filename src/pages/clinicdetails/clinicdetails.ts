import { Component,ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { ClinicdirectionsPage } from '../clinicdirections/clinicdirections';
import { ClinicServiceProvider } from '../../providers/clinic-service/clinic-service';
import { Geolocation } from '@ionic-native/geolocation';


declare var google;

@IonicPage()
@Component({
  selector: 'page-clinicdetails',
  templateUrl: 'clinicdetails.html',
  providers: [ClinicServiceProvider]
})
export class ClinicdetailsPage {

	@ViewChild('map') mapElement: ElementRef;
  	
  	map: any;
	clinicDetails: any;
	clinicAddress: any;

	constructor(public navCtrl: NavController, public navParams: NavParams, public clinicService: ClinicServiceProvider,public geolocation: Geolocation) {
		this.clinicDetails = this.navParams.get('details');
		this.clinicAddress = this.clinicDetails.UnitNumber + " " + this.clinicDetails.BuildingName + " " + this.clinicDetails.RoadName + " " + this.clinicDetails.BlockNumber + " " + this.clinicDetails.PostalCode

	}

	ionViewDidLoad(){
		this.loadMap();
	}

	loadMap(){

		let latLng = new google.maps.LatLng(this.clinicDetails.Latitude, this.clinicDetails.Longitude);

		let mapOptions = {
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
		this.addMarker();
	}

	addMarker(){
		let latLng = new google.maps.LatLng(this.clinicDetails.Latitude, this.clinicDetails.Longitude);

		let marker = new google.maps.Marker({
			map: this.map,
			animation: google.maps.Animation.DROP,
			//position: this.map.getCenter()
			position: latLng
		});

		let content = "<p>" + this.clinicDetails.Name + "</p>";          

		this.addInfoWindow(marker, content);

	}

	addInfoWindow(marker, content){

		let infoWindow = new google.maps.InfoWindow({
			content: content
		});

		google.maps.event.addListener(marker, 'click', () => {
			infoWindow.open(this.map, marker);
		});

	}

	gotoDirections() {
		this.navCtrl.push(ClinicdirectionsPage,{lat: this.clinicDetails.Latitude, long: this.clinicDetails.Longitude, name: this.clinicDetails.Name, address: this.clinicAddress });
	}

	backButtonClick()
	{
    	this.navCtrl.pop();  // remember to put this to add the back button behavior
	}

}
