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
	loading: any;
	public cardBack:boolean = false;
	public cardFront:boolean = true;
	public isFlip:boolean = false;
	public cardInfo: any;
	public cardImgF: any;
	public cardImgB: any;
	names:any;
	card = {}
	

	@ViewChild('cardContainer') elem:ElementRef;

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
		this.names = [
		{'key1': 'mhay', 'key2': 'value', 'key3': 'value3'}, 
		{'key1': 'mhay1', 'key2': 'value1', 'key3': 'value3'},
		{'key1': 'mhay2', 'key2': 'value2', 'key3': 'value3'}];
	}
	getNetwork(){
		this.storage.get('memNetwork').then((val1) => {
		    this.memberNetwork = val1;
		    this.getSession();
		});	
	}

	getSession(){
		this.storage.get('sessionID').then((val1) => {
		    this.sessionID = val1;
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

		this.ecardService.getEcard(this.ecardParam).then((result) => {
		    this.loading.dismiss();
		    console.log(result);

		    if(result.Status == "Failed"){
				let alert = this.alertCtrl.create({
					title: 'Alert',
					message: result.ValidateMessage,
					buttons: [{
				        text: 'OK',
				        role: 'Cancel',
				        handler: () => {
				          this.navCtrl.setRoot(LoginNonmedinetPage); 
				      }
				    }]
				});
				alert.present();

			}else{
				this.cardInfo = result;
				console.log(result);
			    this.cardImgF = apiUrl+this.cardInfo['MemberCardFrontUrl'];	
			    this.cardImgB = apiUrl+this.cardInfo['MemberCardBackUrl'];	
			}
		    //console.log(this.cardInfo.CompanyCode);
		    //console.log(this.cardInfo.MemberCardFrontUrl);
		    // this.cardImgF.onload = function () {
		    //     console.log(this.height + " / " + this.width);
		    // }
		   
		    
		}, (err) => {
		    this.loading.dismiss();
	    });
	}

	flipCard(){
		//this.rd.addClass(this.elem.nativeElement, 'flip');
		this.cardFront = !this.cardFront;this.cardBack = false;
		//this.cardFront = !this.cardFront;

	}

	flipCardBack(){
		//this.rd.addClass(this.elem.nativeElement, 'flip');
		//this.cardBack = !this.cardBack;
		this.cardBack = !this.cardBack;this.cardFront = false;
	}


	

	backButtonClick(){
		console.log('backButtonClick')
    	//this.navCtrl.pop();  // remember to put this to add the back button behavior
    	this.navCtrl.popToRoot();

	}

}
