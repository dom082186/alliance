import { Component,Renderer2, ViewChild,ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';
import { Storage } from '@ionic/storage';

import { LoginNonmedinetPage } from '../login-nonmedinet/login-nonmedinet';
import { EcardServiceProvider } from '../../providers/ecard-service/ecard-service';

import { ScreenOrientation } from '@ionic-native/screen-orientation';


let apiUrl = 'http://118.201.197.142';

@IonicPage()
@Component({
  selector: 'page-ecard',
  templateUrl: 'ecard.html',
  providers: [EcardServiceProvider],
})
export class EcardPage {

	parameters: any;
	public memberInfo: any;
	memberNetwork: any;
	sessionID: any;
	ecardParam: any;
	dependentsParam: any;
	loading: any;
	public cardBack:boolean = false;
	public cardFront:boolean = true;
	public isFlip:boolean = false;
	public cardInfo: any;
	public cardImgF: any;
	public cardImgB: any;
	names:any;
	cardName:any;
	cardNRIC:any;
	card = {}
	hasDependents: boolean = false;
	

	@ViewChild('cardContainer') elem:ElementRef;
	@ViewChild('detailsContainer') detailsElement:ElementRef;

	constructor(public navCtrl: NavController, 
		public navParams: NavParams, 
		public storage: Storage, 
		public loadingCtrl: LoadingController,
		private alertCtrl: AlertController,
		private rd: Renderer2,
		private screenOrientation: ScreenOrientation,
		public ecardService: EcardServiceProvider,) {

		//this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.LANDSCAPE);	

	}

	

	ionViewDidLoad(){
		this.getData();
		this.card['name'] = 0; // initial value for dropdown
		//this.screenOrientation.unlock();
		// get current
		console.log(this.screenOrientation.type); 
	}


	getData(){
		this.storage.get('memInfo').then((val) => {
		    this.memberInfo = val;
		    this.getNetwork();
		});
	}


	getNetwork(){
		this.storage.get('memNetwork').then((val1) => {
		    this.memberNetwork = val1;
		    if(this.memberInfo.length > 1){ this.hasDependents = true; }else{this.hasDependents = false;}
		    this.loadEcardDetails();
		});	
	}

	showLoader(){
	    this.loading = this.loadingCtrl.create({
	        content: 'Please Wait...'
	    });

	    this.loading.present();
	}

	onChange(val){
		
		var empType = "";
		if(this.memberInfo[val]['IsEmployee']){ empType = "employee"; }else{ empType = "dependent"; }

		this.showLoader();
		this.cardNRIC = this.memberInfo[val]['MemberNRIC'];
		this.ecardParam = "nric=" + this.memberInfo[val]['MemberNRIC'] + "&empType=" + empType + "&network="  + this.memberNetwork + "&internal_LoggedInUserRegisterID="+ this.memberInfo[val]['Internal_LoggedInUserRegisterID'];
		
		this.ecardService.getEcard(this.ecardParam).then((result) => {
		    this.loading.dismiss();

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
				        	}else{
				        		this.navCtrl.pop();
				        	}
				           
				      }
				    }]
				});
				alert.present();

			}else{
				
				if(result.ErrorMsg == ""){
					this.cardInfo = result;
					
					if(result.DependentName != ""){
						this.cardName = result.DependentName; }else{
						this.cardName = result.EmployeeName; }
					
				    if(this.cardInfo['MemberCardFrontUrl'] == ""){
				    	this.cardImgF = apiUrl+"/Images/MemberCard/GE_Front.png"; }else{
				    	this.cardImgF = apiUrl+this.cardInfo['MemberCardFrontUrl']; }

				    this.cardImgB = apiUrl+this.cardInfo['MemberCardBackUrl'];	
				}else{
					let alert = this.alertCtrl.create({
						title: 'Alert',
						message: result.ErrorMsg,
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
				}

			if(this.memberNetwork.toLowerCase() == "axa"){
				this.rd.addClass(this.detailsElement.nativeElement, 'card-axa');
			}
		}
	    
		}, (err) => {
	    	this.loading.dismiss();
    	});
	}


	loadEcardDetails(){
		this.showLoader();
		var empType = "";
		if(this.memberInfo[0]['IsEmployee']){ empType = "employee"; }else{ empType = "dependent"; }
		
		this.cardNRIC = this.memberInfo[0]['MemberNRIC'];
		this.ecardParam = "nric=" + this.memberInfo[0]['MemberNRIC'] + "&empType=" + empType + "&network="  + this.memberNetwork + "&internal_LoggedInUserRegisterID="+ this.memberInfo[0]['Internal_LoggedInUserRegisterID'];
		

		this.ecardService.getEcard(this.ecardParam).then((result) => {
		    this.loading.dismiss();

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
				        	}else{
				        		this.navCtrl.pop();
				        	}
				           
				      }
				    }]
				});
				alert.present();

			}else{
				
				if(result.ErrorMsg == ""){
					this.cardInfo = result;

					if(result.DependentName != ""){
						this.cardName = result.DependentName; }else{
						this.cardName = result.EmployeeName; }
					
				    if(this.cardInfo['MemberCardFrontUrl'] == ""){
				    	this.cardImgF = apiUrl+"/Images/MemberCard/GE_Front.png"; }else{
				    	this.cardImgF = apiUrl+this.cardInfo['MemberCardFrontUrl'];	}
				    
				    this.cardImgB = apiUrl+this.cardInfo['MemberCardBackUrl'];	

				}else{
					let alert = this.alertCtrl.create({
						title: 'Alert',
						message: result.ErrorMsg,
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
				}

			if(this.memberNetwork.toLowerCase() == "axa"){
				this.rd.addClass(this.detailsElement.nativeElement, 'card-axa');
			}
			if(this.memberNetwork.toLowerCase() == "pcube"){
				this.rd.addClass(this.detailsElement.nativeElement, 'card-p3');
			}

			if(this.memberNetwork.toLowerCase() == "ntuc"){
				this.rd.addClass(this.detailsElement.nativeElement, 'card-ntuc');
			}
		}
	    
		}, (err) => {
	    	this.loading.dismiss();
    	});
	}

	flipCard(){
		this.rd.addClass(this.elem.nativeElement, 'flip');
	}

	flipCardBack(){
		this.rd.removeClass(this.elem.nativeElement, 'flip');
	}

	backButtonClick(){
    	this.navCtrl.pop();  // remember to put this to add the back button behavior
	}

}
