import { Component,Renderer2, ViewChild,ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';
import { Storage } from '@ionic/storage';


import { EcardServiceProvider } from '../../providers/ecard-service/ecard-service';
import { LoginNonmedinetPage } from '../login-nonmedinet/login-nonmedinet';



let apiUrl = 'http://118.201.197.142';

@IonicPage()
@Component({
  selector: 'page-ecard',
  templateUrl: 'ecard.html',
  providers: [EcardServiceProvider]
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
	card = {}
	hasDependents: boolean = false;
	

	@ViewChild('cardContainer') elem:ElementRef;
	@ViewChild('detailsContainer') detailsElement:ElementRef;

	constructor(public navCtrl: NavController, 
		public navParams: NavParams, 
		public storage: Storage, 
		public loadingCtrl: LoadingController,
		private alertCtrl: AlertController,
		public ecardService: EcardServiceProvider,
		private rd: Renderer2) {

		
	}

	ionViewDidLoad(){
		this.getData();


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
		    this.getSession();
		});	
	}

	getSession(){
		//this.showLoader();
		this.storage.get('sessionID').then((val1) => {
		    this.sessionID = val1;
		    
		    this.dependentsParam = "relatedmemberid=" + this.memberInfo['RelatedMemberID'] + "&network="  + this.memberNetwork + "&internal_LoggedInUserRegisterID="+ this.sessionID;
		    
			this.ecardService.getDependents(this.dependentsParam).then((result) => {
			    this.loading.dismiss();
				console.log(result);

				// if(result.Status == "Failed"){
				// 	let alert = this.alertCtrl.create({
				// 		title: 'Alert',
				// 		message: result.ValidateMessage,
				// 		enableBackdropDismiss: false,
				// 		buttons: [{
				// 	        text: 'OK',
				// 	        role: 'Cancel',
				// 	        handler: () => {
				// 	          this.navCtrl.setRoot(LoginNonmedinetPage); 
				// 	      }
				// 	    }]
				// 	});
				// 	alert.present();
					
				// }else{
					if(result.length == 0){
						this.hasDependents = false
					}else{
						this.hasDependents = true
						this.names = [
						{'key1': 'mhay', 'key2': 'value', 'key3': 'value3'}, 
						{'key1': 'mhay1', 'key2': 'value1', 'key3': 'value3'},
						{'key1': 'mhay2', 'key2': 'value2', 'key3': 'value3'}];
					}
					
				//}
			}, (err) => {
			    //this.loading.dismiss();
		    });
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
			console.log(val)
	}

	loadEcardDetails(){
		//console.log(this.memberNetwork);

		var empType = "";

		if(this.memberInfo['IsEmployee']){ empType = "employee"; }else{ empType = "dependent"; }

			this.showLoader();

			this.ecardParam = "nric=" + this.memberInfo['MemberNRIC'] + "&empType=" + empType + "&network="  + this.memberNetwork + "&internal_LoggedInUserRegisterID="+ this.sessionID;
			console.log(this.ecardParam);
			this.ecardService.getEcard(this.ecardParam).then((result) => {
			    this.loading.dismiss();
			    console.log(result);

			    if(result.Status == "Failed"){
					let alert = this.alertCtrl.create({
						title: 'Alert',
						message: result.ValidateMessage,
						enableBackdropDismiss: false,
						buttons: [{
					        text: 'OK',
					        role: 'Cancel',
					        handler: () => {
					        	if(result.ValidateMessage.toLowerCase() == "Records not found."){
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
					    if(this.cardInfo['MemberCardFrontUrl'] == ""){
					    	this.cardImgF = apiUrl+"/Images/MemberCard/GE_Front.png";	
					    }else{
					    	this.cardImgF = apiUrl+this.cardInfo['MemberCardFrontUrl'];	
					    }
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

	flipCard(){
		this.rd.addClass(this.elem.nativeElement, 'flip');
	}

	flipCardBack(){
		this.rd.removeClass(this.elem.nativeElement, 'flip');
	}


	

	backButtonClick(){
		console.log('backButtonClick')
    	this.navCtrl.pop();  // remember to put this to add the back button behavior
    	//this.navCtrl.popToRoot();

	}

}
