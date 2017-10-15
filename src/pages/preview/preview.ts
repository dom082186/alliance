import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, LoadingController,AlertController, } from 'ionic-angular';
import { DomSanitizer } from '@angular/platform-browser';


@IonicPage()
@Component({
  selector: 'page-preview',
  templateUrl: 'preview.html',
})
export class PreviewPage {

	attachmentDetails: any;
	attachmentURL: any;
	attachmentContent: any;
	attachmentFileName: any;
	attachmentFileType: any;

	constructor(public navCtrl: NavController, public navParams: NavParams,public viewCtrl: ViewController,public loadingCtrl: LoadingController,
		 		private alertCtrl: AlertController,public _DomSanitizer: DomSanitizer) {
			
			//this.attachmentDetails = this.navParams.get('imageArray');

	}

	ionViewDidLoad() {
		//this.attachmentURL = this.attachmentDetails._FilePathUrl
		// this.attachmentContent = this.attachmentDetails._ImageContent
		// this.attachmentFileName = this.attachmentDetails._AcutalFileName
		// //this.attachmentFileType = this.attachmentDetails._FileType

		// if(this.attachmentDetails._ImageContent != undefined){
		// 	this.attachmentURL = this.attachmentDetails._ImageContent
		// }else{
		// 	this.attachmentURL = this.attachmentDetails._FilePathUrl
		// }

		// if(this.attachmentDetails._FileType.includes('pdf')){
		// 	this.attachmentFileType = "./assets/img/pdf-icon.png";
		// }else{
		// 	this.attachmentFileType = this.attachmentDetails._FileType;
		// }
		console.log(this.navParams.get('imageArray'));
		this.attachmentDetails = this.getFromStorageAsync();
		
		
	}

	async getFromStorageAsync(){
    
	    return await this.navParams.get('imageArray');
	 
	  }

	modalClose() {
		this.viewCtrl.dismiss();
	}



}
