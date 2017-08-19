import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { ClinicslocatorPage } from '../clinicslocator/clinicslocator';



@IonicPage()
@Component({
  selector: 'page-clinicnearby',
  templateUrl: 'clinicnearby.html',
})
export class ClinicnearbyPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ClinicnearbyPage');
  }

	gotoAll(){
		console.log('aaa');
		this.navCtrl.push( ClinicslocatorPage );
	}

  	backButtonClick(){
    	this.navCtrl.pop(); 
	}

}
