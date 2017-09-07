import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';

import { Storage } from '@ionic/storage';

import { SubmitClaimServiceProvider } from '../../providers/submit-claim-service/submit-claim-service';


@IonicPage()
@Component({
  selector: 'page-submitclaims',
  templateUrl: 'submitclaims.html',
  providers: [SubmitClaimServiceProvider],
})

export class SubmitclaimsPage {

  claimEditDetails: any;
  memberInfo: any;
  memberClaimInfo: any;
  memberNetwork: any;
  memberNRIC: any;
  providers: any;
  claimTypes: any;
  claimForm = {};


  constructor(public navCtrl: NavController, public navParams: NavParams, public storage: Storage,
    public submitClaimService: SubmitClaimServiceProvider,private alertCtrl: AlertController,) {
      this.claimEditDetails = this.navParams.get('details');
     
  }

  ionViewDidLoad() {
      //console.log('ionViewDidLoad SubmitclaimsPage');
      //this.memberInfo = this.getFromStorageAsync();
      this.getNetwork();
  }

  onChange(value) {
    console.log(value);
  }

  getNetwork(){
    
    console.log(this.claimEditDetails)
    this.storage.get('memNetwork').then((val1) => {
        this.memberNetwork = val1;
        this.claimForm['claimName'] = "S8124356A";

        this.storage.get('claimMemInfo').then((val1) => {
            this.memberClaimInfo = val1;

              if(this.claimEditDetails != undefined){
                  this.claimForm['claimName'] = this.claimEditDetails['PatientNRIC']; 
              }else{
                  this.claimForm['claimName'] = this.memberClaimInfo['MemberNRIC'];     
              }
        });

        this.storage.get('memInfo').then((val) => {
            this.memberInfo = val;
            
            if(this.claimEditDetails != undefined){
                  this.claimForm['claimName'] = this.claimEditDetails['PatientNRIC']; 
              }else{
                  this.claimForm['claimName'] = this.memberInfo[0]['MemberNRIC'];     
              }

              console.log(this.claimForm['claimName']);
            
            this.getClaimTypes();
            this.getProvider();
        });
    });

     
  }

  /// *******************   GET FROM LOGIN API ***************
  async getFromStorageAsync(){
    return await this.storage.get('claimMemInfo');
  }
  /// *******************   END  ***************


  getProvider(){

    var parameters = "network="  + this.memberNetwork + "&internal_LoggedInUserRegisterID="+ this.memberClaimInfo['Internal_LoggedInUserRegisterID'];

    this.submitClaimService.loadProvidersAPI(parameters).then((result) => {
      if(result.ValidateMessage != undefined){
        let alert = this.alertCtrl.create({
          title: 'Alert',
          message: result.ValidateMessage,
          buttons: [{
                text: 'OK',
                role: 'cancel',
                handler: () => {
                  console.log('Cancel clicked');
                  return;
              }
            }]
        });
        alert.present();
      }else{
        this.providers = result;
        console.log(result)
        
      }

    }, (err) => {
      //this.loading.dismiss();
    });
  }


  getClaimTypes(){
    var params = "network="  + this.memberNetwork + "&membercompanyid=" + this.memberClaimInfo['MemberCompanyID']  +"&internal_LoggedInUserRegisterID="+ this.memberClaimInfo['Internal_LoggedInUserRegisterID'];
    
    this.submitClaimService.loadClaimTypeAPI(params).then((result) => {
      if(result.ValidateMessage != undefined){
        let alert = this.alertCtrl.create({
          title: 'Alert',
          message: result.ValidateMessage,
          buttons: [{
                text: 'OK',
                role: 'cancel',
                handler: () => {
                  console.log('Cancel clicked');
                  return;
              }
            }]
        });
        alert.present();
      }else{
        this.claimTypes = result;
        console.log(result)
        
      }

      console.log(result)


    }, (err) => {
      //this.loading.dismiss();
      console.log(err)
    });
  }



  backButtonClick()
	{
    	this.navCtrl.pop();  // remember to put this to add the back button behavior
	}

}
