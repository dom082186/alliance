import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, LoadingController,AlertController, } from 'ionic-angular';

import { SubmitClaimServiceProvider } from '../../providers/submit-claim-service/submit-claim-service';

import { TermsconditionsPage } from '../termsconditions/termsconditions';
import { ClaimsPage } from '../claims/claims';


@IonicPage()
@Component({
  selector: 'page-submit-claim-details',
  templateUrl: 'submit-claim-details.html',
  providers: [SubmitClaimServiceProvider],
})
export class SubmitClaimDetailsPage {

	submitClaimDetails: any;
	submitAttachedFile: any;
	loading: any;
	isCheckTM : boolean = false;
	totalFee: any;
	totalGST: any;

	constructor(public navCtrl: NavController, public navParams: NavParams,public viewCtrl: ViewController,
		 	public submitClaimService: SubmitClaimServiceProvider,public loadingCtrl: LoadingController,
		 	private alertCtrl: AlertController, ) {
		
			this.submitClaimDetails = this.navParams.get('details');
			this.submitAttachedFile = this.navParams.get('files');
			this.totalFee = this.submitClaimDetails.totalamount;
			this.totalGST = this.submitClaimDetails.totalgstamount;
			console.log(this.submitClaimDetails)
			//console.log(this.submitAttachedFile)
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
			if(this.submitAttachedFile !=undefined){
				this.submitClaimService.saveFiles(this.submitAttachedFile).then((result) => {

					if(result.Status == "Failed"){
		              let alert = this.alertCtrl.create({
		                title: 'Alert',
		                message: result.ValidateMessage,
		                enableBackdropDismiss: false,
		                buttons: [{
		                      text: 'OK',
		                      role: 'Cancel',
		                      handler: () => {
		                        
		                    }
		                  }]
		              });
		              alert.present();
		              
		            }else{
		                console.log('success file attachment')
			        	console.log(result)
			        	this.submitClaimInfo_cont();

		            }
		        }, (err) => {
			    	console.log(err)
			        this.loading.dismiss();
			    });
			}else{
				this.submitClaimInfo_cont();
			}
			

		}else{
			this.loading.dismiss();
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


	backButtonClick()
	{
    	this.navCtrl.pop();  // remember to put this to add the back button behavior
	}


	submitClaimInfo_cont(){
		this.submitClaimService.submitClaimAPI(this.submitClaimDetails).then((result) => {

			if(result.Status == "Failed"){
              let alert = this.alertCtrl.create({
                title: 'Alert',
                message: result.ValidateMessage,
                enableBackdropDismiss: false,
                buttons: [{
                      text: 'OK',
                      role: 'Cancel',
                      handler: () => {
                        
                    }
                  }]
              });
              alert.present();
              
            }else{
                console.log('success submit claim')
	        	console.log(result)
	        	this.viewCtrl.dismiss();

				let alert = this.alertCtrl.create({
					title: 'Success',
					message: 'Claim successfully submitted',
					buttons: [{
				        text: 'OK',
				        role: 'cancel',
				        handler: () => {
				        	this.navCtrl.push(ClaimsPage);
				        	this.loading.dismiss();
				      }
				    }]
				});
				alert.present();

            }
	        
	        this.loading.dismiss();

	    }, (err) => {
	    	console.log(err)
	        this.loading.dismiss();
	    });
	}


	
	

}
