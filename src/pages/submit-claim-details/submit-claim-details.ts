import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, LoadingController,AlertController, } from 'ionic-angular';

import { SubmitClaimServiceProvider } from '../../providers/submit-claim-service/submit-claim-service';
import { ClaimServiceProvider } from '../../providers/claim-service/claim-service';
import { ClinicServiceProvider } from '../../providers/clinic-service/clinic-service';


import { TermsconditionsPage } from '../termsconditions/termsconditions';
import { SubmitclaimsPage } from '../submitclaims/submitclaims';
import { ClaimsPage } from '../claims/claims';
import { LoginNonmedinetPage } from '../login-nonmedinet/login-nonmedinet';
import { LoginPage } from '../login/login';


@IonicPage()
@Component({
  selector: 'page-submit-claim-details',
  templateUrl: 'submit-claim-details.html',
  providers: [SubmitClaimServiceProvider, ClaimServiceProvider],
})
export class SubmitClaimDetailsPage {

	submitClaimDetails: any;
	submitAttachedFile: any;
	isEdit: any;
	loading: any;
	isCheckTM : boolean = false;
	totalFee: any;
	totalGST: any;
	calculatedClaim1: any;
	calculatedClaim: any;
	claimLimitValue: any;
	memberNetwork: any;
	claimsExceedShow: boolean = false;
	claimsExceedSaveBtnDisplay: boolean = false;

	constructor(public navCtrl: NavController, public navParams: NavParams,public viewCtrl: ViewController,
		 	public submitClaimService: SubmitClaimServiceProvider,public loadingCtrl: LoadingController,
		 	private alertCtrl: AlertController, public claimService: ClaimServiceProvider,public clinicService: ClinicServiceProvider) {
		
			this.submitClaimDetails = this.navParams.get('details');
			this.submitAttachedFile = this.navParams.get('files');
			this.isEdit = this.navParams.get('isEdit');
			this.memberNetwork = this.navParams.get('network');
			this.totalFee = this.submitClaimDetails.totalamount;
			this.totalGST = this.submitClaimDetails.totalgstamount;
			
			//console.log(this.submitAttachedFile)
	}

	ionViewDidLoad() {
		console.log('ionViewDidLoad SubmitClaimDetailsPage');
		
		this.calculateClaim();
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

	getClaimLimit(){

		
		var params = {network: this.memberNetwork};

		this.submitClaimService.getClaimLimitAPI(params).then((result1) => {

			if(result1.Status == "Failed"){
              let alert = this.alertCtrl.create({
                title: 'Alert',
                message: result1.ValidateMessage,
                enableBackdropDismiss: false,
                buttons: [{
                      text: 'OK',
                      role: 'Cancel',
                      handler: () => {
                        if(result1.ValidateMessage.toLowerCase().includes('active session')){
                          this.navCtrl.setRoot(LoginNonmedinetPage);
                        }else{
				        	return;
                        }
                    }
                  }]
              });
              alert.present();
              
            }else{
                console.log(result1)
                this.claimLimitValue = result1.claimlimit;
                this.calculateClaim();
            }


	    }, (err) => {
	    	console.log(err)
	        this.loading.dismiss();
	    });
	}

	calculateClaim(){
		this.showLoader();
		console.log(this.submitClaimDetails)
		this.clinicService.preCalculateClaimAPI(this.submitClaimDetails).then((result1) => {
			console.log(result1)
			if(result1.Status == "Failed"){
				if(result1.ValidateMessage.toLowerCase().includes('claimamount')){
					this.claimsExceedShow = true;
					this.claimsExceedSaveBtnDisplay = true;
					this.calculatedClaim = this.getInfoFromAsync(result1);
				}else{
					let alert = this.alertCtrl.create({
	                title: 'Alert',
	                message: result1.ValidateMessage,
	                enableBackdropDismiss: false,
	                buttons: [{
	                      text: 'OK',
	                      role: 'Cancel',
	                      handler: () => {
	                        if(result1.ValidateMessage.toLowerCase().includes('active session')){
	                          this.navCtrl.setRoot(LoginNonmedinetPage);
	                        }else{
					        	return;
	                        }
	                    }
	                  }]
	              });
	              alert.present();
				}	
            }else{
                console.log('success calculate claim')
                this.calculatedClaim1 = result1;
                this.calculatedClaim = this.getInfoFromAsync(result1);
            }

	        this.loading.dismiss();

	    }, (err) => {
	    	console.log(err)
	        this.loading.dismiss();
	    });
	}

	
	async getInfoFromAsync(val){
    
    	return await val;
 
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
              if(result1.ValidateMessage.toLowerCase().includes('claimamount')){
					this.claimsExceedShow = true;
					this.claimsExceedSaveBtnDisplay = true;
				}else{
					let alert = this.alertCtrl.create({
	                title: 'Alert',
	                message: result1.ValidateMessage,
	                enableBackdropDismiss: false,
	                buttons: [{
	                      text: 'OK',
	                      role: 'Cancel',
	                      handler: () => {
	                        if(result1.ValidateMessage.toLowerCase().includes('active session')){
	                          this.navCtrl.setRoot(LoginNonmedinetPage);
	                        }else{
					        	return;
	                        }
	                    }
	                  }]
	              });
	              alert.present();
				}	
              
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
				        	console.log(this.isEdit)
				        	this.loading.dismiss();

                        	if(this.isEdit != ""){
				        		this.viewCtrl.dismiss();
	                        	this.navCtrl.push(ClaimsPage).then(() => {
	                            	const startIndex = this.navCtrl.getActive().index - 1;
	                            	this.navCtrl.remove(startIndex,2);
	                            	this.navCtrl.pop();
	                          	});
				        	}else{
					        	this.navCtrl.push(ClaimsPage,{successSubmit: 'success'}).then(() => {
	      							this.navCtrl.remove(0, 3);
	                          	});
				        	}
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


	claimsExceedClose(){
		this.claimsExceedShow = false;
		this.claimsExceedSaveBtnDisplay = true;
	}


	
	

}
