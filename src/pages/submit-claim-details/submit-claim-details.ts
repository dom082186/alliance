import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, LoadingController,AlertController, } from 'ionic-angular';

import { SubmitClaimServiceProvider } from '../../providers/submit-claim-service/submit-claim-service';

import { TermsconditionsPage } from '../termsconditions/termsconditions';


@IonicPage()
@Component({
  selector: 'page-submit-claim-details',
  templateUrl: 'submit-claim-details.html',
  providers: [SubmitClaimServiceProvider],
})
export class SubmitClaimDetailsPage {

	submitClaimDetails: any;
	loading: any;
	isCheckTM : boolean = false;
	totalFee: any;
	totalGST: any;

	constructor(public navCtrl: NavController, public navParams: NavParams,public viewCtrl: ViewController,
		 	public submitClaimService: SubmitClaimServiceProvider,public loadingCtrl: LoadingController,
		 	private alertCtrl: AlertController, ) {
		
			this.submitClaimDetails = this.navParams.get('details');
			this.totalFee = this.submitClaimDetails.totalamount;
			this.totalGST = this.submitClaimDetails.totalgstamount;
			console.log(this.submitClaimDetails)
	}

	ionViewDidLoad() {
		console.log('ionViewDidLoad SubmitClaimDetailsPage');
	}

	showLoader(){
      this.loading = this.loadingCtrl.create({
          content: 'Please Wait...'
      });

      this.loading.present();
  }

	modalClose() {
		this.viewCtrl.dismiss();
	}

	addValue(e): void {
	    //var isChecked = e.currentTarget.checked;
	    console.log(e)
	}

	submitClaimInfo(){
		this.showLoader();
		if(this.isCheckTM){
			this.submitClaimDetails['ischeckedtermsofservice'] = true;	
		}else{
			this.submitClaimDetails['ischeckedtermsofservice'] = false;
		}

		console.log(this.submitClaimDetails)
		
		if(this.isCheckTM == true){
			this.submitClaimService.submitClaimAPI(this.submitClaimDetails).then((result) => {

		        console.log('success')
		        console.log(result)

		        this.loading.dismiss();

		    }, (err) => {
		        this.loading.dismiss();
		    });
		}else{
			let alert = this.alertCtrl.create({
				title: 'Alert',
				message: 'Please confirm that you have agreed on our Terms and Condition.',
				buttons: [{
			        text: 'OK',
			        role: 'cancel',
			        handler: () => {
			          console.log('Cancel clicked');
			      }
			    }]
			});
			alert.present();
			return;
		}    
	}


	gotoTermsCons(page)
	{
		this.navCtrl.push( TermsconditionsPage, {page: page})
	}



}
