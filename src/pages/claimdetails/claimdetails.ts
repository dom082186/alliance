import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ViewController } from 'ionic-angular';


import { SubmitclaimsPage } from '../submitclaims/submitclaims';
import { TermsconditionsPage } from '../termsconditions/termsconditions';

@IonicPage()
@Component({
  selector: 'page-claimdetails',
  templateUrl: 'claimdetails.html',
})
export class ClaimdetailsPage {

	claimDetails: any;
	claimIndex: any;
	isCheckTM : boolean = true

	constructor(public navCtrl: NavController, public navParams: NavParams,public viewCtrl: ViewController) {
			this.claimDetails = this.navParams.get('details');
			this.claimIndex = this.navParams.get('index');
			
	}

	ionViewDidLoad() {
		console.log('ionViewDidLoad ClaimdetailsPage');
	}

	modalClose() {
		this.viewCtrl.dismiss();
	}

	backButtonClick()
	{
    	this.navCtrl.pop({});  // remember to put this to add the back button behavior
	}

	gotoTermsCons(page)
	{
		this.navCtrl.push( TermsconditionsPage, {page: page})
	}

	addValue(e): void {
	    //var isChecked = e.currentTarget.checked;
	}

	editClaim(){

		if(this.claimDetails.ClaimStatus != null){
			if(this.claimDetails.ClaimStatus.toLowerCase() == "paid" || this.claimDetails.ClaimStatus.toLowerCase() == "pending"){
			}else{
				this.navCtrl.push( SubmitclaimsPage );
			}	
		}else{
			//this.navCtrl.push( SubmitclaimsPage, {details: this.claimDetails} );
		}
		
	}

}
