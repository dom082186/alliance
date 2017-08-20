import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-claimdetails',
  templateUrl: 'claimdetails.html',
})
export class ClaimdetailsPage {

	claimDetials: any;

	constructor(public navCtrl: NavController, public navParams: NavParams) {
			this.claimDetials = this.navParams.get('details');
	}

	ionViewDidLoad() {
		console.log('ionViewDidLoad ClaimdetailsPage');
	}


	backButtonClick()
	{
    	this.navCtrl.pop({});  // remember to put this to add the back button behavior
	}

}
