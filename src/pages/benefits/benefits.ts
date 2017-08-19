import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { ClaimsPage } from '../claims/claims';

/**
 * Generated class for the BenefitsPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-benefits',
  templateUrl: 'benefits.html',
})
export class BenefitsPage {

	constructor(public navCtrl: NavController, public navParams: NavParams) {

	}

	gotoClaimsHistory() {
		this.navCtrl.setRoot( ClaimsPage );
	}

	backButtonClick()
	{
    	this.navCtrl.pop();  // remember to put this to add the back button behavior
	}

}
