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
	mode: any;
	isCheckTM : boolean = true

	constructor(public navCtrl: NavController, public navParams: NavParams,public viewCtrl: ViewController) {
			this.claimDetails = this.navParams.get('details');
			this.claimIndex = this.navParams.get('index');
			this.mode = this.navParams.get('mode');

			console.log(this.claimDetails);
	}

	ionViewDidLoad() {
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

		if(this.claimDetails._ClaimStatus != null ){
			if(this.claimDetails._ClaimStatus.toLowerCase() == "paid" || this.claimDetails._ClaimStatus.toLowerCase() == "pending" || this.claimDetails._ClaimStatus == ""){
			}else{
				this.navCtrl.push( SubmitclaimsPage, {details: this.claimDetails, mode: 'edit'} );
			}	
		}else{
			//this.navCtrl.push( SubmitclaimsPage, {details: this.claimDetails} );
		}
		
	}

}
