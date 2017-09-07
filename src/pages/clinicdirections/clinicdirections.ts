import { Component,ViewChild, ElementRef, Renderer2 } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController,LoadingController,Platform } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import { GeocoderProvider } from '../../providers/geocoder/geocoder';


declare var google;

@IonicPage()
@Component({
  selector: 'page-clinicdirections',
  templateUrl: 'clinicdirections.html',
})
export class ClinicdirectionsPage {
	
	@ViewChild('googlemap') mapElement: ElementRef;
	@ViewChild('directionlist') directionElement: ElementRef;
	@ViewChild('mode') modeElement: ElementRef;

	
  	
  	map: any;
	clinicLong: any;
	clinicLat: any;
	clinicname: any;
	currentLong: any;
	currentLat: any;
	loading: any;
	

	/**
    * Define a string value to handle returned geocoding results
    */
    public results : string;
    currentAddress : any;
    clinicAddress  : any;
    directions =  {}


	constructor(public navCtrl: NavController, public navParams: NavParams,
		public geolocation: Geolocation, private alertCtrl: AlertController,
		public _GEOCODE   : GeocoderProvider,
		public loadingCtrl: LoadingController,
		public platform: Platform,
		public rd: Renderer2) {
		this.clinicLong = this.navParams.get('long');
		this.clinicLat = this.navParams.get('lat');
		this.clinicname = this.navParams.get('name');
		this.clinicAddress = this.navParams.get('address');

		
	}

	ionViewDidLoad(){
		this.platform.ready().then(() => {
		    this.loadMap('d');
		});
	}

	showLoader(){
	    this.loading = this.loadingCtrl.create({
	        content: 'Please Wait...'
	    });

	    this.loading.present();
	}

	loadMap(distanceMode){
		this.showLoader();

		var posOptions = { timeout: 30000, enableHighAccuracy: true };

		this.geolocation.getCurrentPosition(posOptions).then((position) => {
			this.currentLat =  position.coords.latitude;
			this.currentLong = position.coords.longitude;
			this.loading.dismiss();
			
			let currentLatLng = new google.maps.LatLng(this.currentLat, this.currentLong);

			let mapOptions = {
				center: currentLatLng,
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
				position: currentLatLng
			});

			let content = "<p>Information</p>";

	        //this._GEOCODE.reverseGeocode(position.coords.latitude, position.coords.longitude).then((data : any) => {
	        this._GEOCODE.reverseGeocode(this.currentLat, this.currentLong).then((data : any) => {

	        	if(data.subThoroughfare != undefined || data.thoroughfare != undefined || data.subLocality != undefined || data.locality!= undefined || data.administrativeArea !=undefined){
	        		this.currentAddress = data.thoroughfare + " " + data.locality + " " + data.countryName;
	        	}else{
					this.currentAddress = data.subThoroughfare + " " + data.thoroughfare + " " + data.subLocality + " " + data.locality + " " + data.administrativeArea +" "+ data.countryName;	        		
	        	}
	        }).catch((error : any)=> {
	            this.results       = error.message;
	        });

	        this.addInfoWindow(marker, content, distanceMode);

	        var p = new google.maps.DirectionsService();
        	var r = new google.maps.DirectionsRenderer();

        	r.setMap(this.map);
        	r.setPanel(this.directionElement.nativeElement);

			//--- Listen to click events in the component
			//--- onchange travelMode
		    this.rd.listen(this.modeElement.nativeElement, 'change', (event) => {
		      	this.getDistance(this.directions['mode'], p,r)
		    })

		    //-- initial travelMode
		    this.directions['mode'] = 'd';
		    this.getDistance('d', p,r);

		}, (err) => {
			
			this.loading.dismiss();
			
			let alert = this.alertCtrl.create({
				title: 'Alert',
				message: err.message,
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
			/*
			this.currentLat =  "1.3011873";
				this.currentLong = "103.8495055";
				this.loading.dismiss();
			let currentLatLng = new google.maps.LatLng("1.3011873", "103.8495055");

				let mapOptions = {
					center: currentLatLng,
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
				position: currentLatLng
			});

			let content = "<p>Information</p>";
			*/

		});

	}


	addMarker(){
		let latLng = new google.maps.LatLng(this.currentLat, this.currentLong);
		let marker = new google.maps.Marker({
			map: this.map,
			animation: google.maps.Animation.DROP,
			position: latLng
		});

		let content = "<p>Information</p>";  

		//this.addInfoWindow(marker, content,distanceMode);

	}

	addInfoWindow(marker, content, distanceMode){

		let infoWindow = new google.maps.InfoWindow({
			content: content
		});

		google.maps.event.addListener(marker, 'click', () => {
			infoWindow.open(this.map, marker);
		});

		//this.getDistance(distanceMode);

	}

	getDistance(distanceMode,p,r) {

		var mode: any;//google.maps.TravelMode.DRIVING
		if(distanceMode == 'd'){mode = google.maps.TravelMode.DRIVING}else{mode = google.maps.TravelMode.WALKING}


		let latLng = new google.maps.LatLng(this.currentLat, this.currentLong);
		let clinicLatLng = new google.maps.LatLng(this.clinicLat, this.clinicLong);
		//let clinicLatLng = new google.maps.LatLng("14.3489", "121.0392");
		
        var f = {
            origin: latLng,
            destination: clinicLatLng,
            travelMode: mode
        };

        
        p.route(f, function(t, e) {
	        if (e == google.maps.DirectionsStatus.OK) {
	        	r.setDirections(t)
	    	}       
    	}); 
	}


	backButtonClick()
	{
		this.navCtrl.pop();  // remember to put this to add the back button behavior
	}

}
