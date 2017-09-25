import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, LoadingController,AlertController, } from 'ionic-angular';

import { SubmitClaimServiceProvider } from '../../providers/submit-claim-service/submit-claim-service';
import { ClaimServiceProvider } from '../../providers/claim-service/claim-service';

import { TermsconditionsPage } from '../termsconditions/termsconditions';
import { ClaimsPage } from '../claims/claims';
import { LoginNonmedinetPage } from '../login-nonmedinet/login-nonmedinet';


@IonicPage()
@Component({
  selector: 'page-submit-claim-details',
  templateUrl: 'submit-claim-details.html',
  providers: [SubmitClaimServiceProvider, ClaimServiceProvider],
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
		 	private alertCtrl: AlertController, public claimService: ClaimServiceProvider) {
		
			this.submitClaimDetails = this.navParams.get('details');
			this.submitAttachedFile = this.navParams.get('files');
			this.totalFee = this.submitClaimDetails.totalamount;
			this.totalGST = this.submitClaimDetails.totalgstamount;
			
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
	    //console.log(e)
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
	                        	if(result.ValidateMessage.toLowerCase() != "records not found."){
		                          this.navCtrl.setRoot(LoginNonmedinetPage);
		                        }
		                    }
		                  }]
		              });
		              alert.present();
		              
		            }else{
		                console.log('success file attachment')
			        	console.log(result)
			        	if(result[0] != undefined){
			        		this.submitClaimInfo_cont();
			        	}
		            }
		        }, (err) => {
			    	console.log(err)
			        this.loading.dismiss();
			    });
			}else{
				this.loading.dismiss();
				let alert = this.alertCtrl.create({
	                title: 'Alert',
	                message: 'File attachement is required',
	                enableBackdropDismiss: false,
	                buttons: [{
	                      text: 'OK',
	                      role: 'Cancel',
	                      handler: () => {
                        	return;
	                    }
	                  }]
	              });
	              alert.present();
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

		this.claimService.addClaimAPI(this.submitClaimDetails).then((result1) => {
			
			console.log(result1)

			if(result1.Status == "Failed"){
              let alert = this.alertCtrl.create({
                title: 'Alert',
                message: result1.ValidateMessage,
                enableBackdropDismiss: false,
                buttons: [{
                      text: 'OK',
                      role: 'Cancel',
                      handler: () => {
                        if(result1.ValidateMessage.toLowerCase().contains('active session')){
                          this.navCtrl.setRoot(LoginNonmedinetPage);
                        }else{
                        	return;
                        }
                    }
                  }]
              });
              alert.present();
              
            }else{

                console.log('success submit claim')
	        	this.viewCtrl.dismiss();

				let alert = this.alertCtrl.create({
					title: 'Success',
					message: 'Claim successfully submitted',
					buttons: [{
				        text: 'OK',
				        role: 'cancel',
				        handler: () => {
				        	this.viewCtrl.dismiss();
                        	this.navCtrl.push(ClaimsPage).then(() => {
                            	const index = this.navCtrl.getActive().index;
                            	this.navCtrl.remove(index);
                          	});
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
