import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';
import { Storage } from '@ionic/storage';

import { EcardServiceProvider } from '../../providers/ecard-service/ecard-service';

import { LoginNonmedinetPage } from '../login-nonmedinet/login-nonmedinet';
import { ClaimServiceProvider } from '../../providers/claim-service/claim-service';

@IonicPage()
@Component({
  selector: 'page-checkbalance',
  templateUrl: 'checkbalance.html',
  providers: [ClaimServiceProvider],
})
export class CheckbalancePage {

  memberInfo: any;
  memberInfo1: any;
  tempMemInfo: any;
  memberNetwork: any;
  sessionID: any;
  checkBalanceInfo: any;
  balanceRemarks: any;
  annualLimitDetails: any;
  loading: any;
  names: any;
  dependentsParam: any;
  balance ={}
  toDate: String = new Date().toISOString();
  hasDependents: boolean = false;
  params: any;




  
  constructor(public navCtrl: NavController, public navParams: NavParams,public storage: Storage,
              public loadingCtrl: LoadingController, private alertCtrl: AlertController,
              public claimService: ClaimServiceProvider) {
      
  }

  ionViewDidLoad() {
    
    this.showLoader();
    this.getMemInfo();
  }

  showLoader(){
      this.loading = this.loadingCtrl.create({
          content: 'Please Wait...'
      });

      this.loading.present();
  }

  async getFromStorageAsync(){
    
    return await this.memberInfo1[0];
 
  }

  getMemInfo(){
    this.storage.get('memInfo').then((val) => {
        this.memberInfo1 = val;
        this.memberInfo = this.getFromStorageAsync();
        if(val.length > 1){ this.hasDependents = true; }else{this.hasDependents = false;}
        this.balance['name'] = 0; // initial value for dropdown
    });

    this.storage.get('memNetwork').then((val1) => {
        this.memberNetwork = val1;
        this.getCheckBalanceInfo();
    });

  }

  getNetwork(){
    this.storage.get('memNetwork').then((val1) => {
        this.memberNetwork = val1;
        console.log(val1);
    });
    this.getCheckBalanceInfo();
  }

  getCheckBalanceInfo(){
      
      var empType = "";
      if(this.memberInfo1[0]['IsEmployee']){ empType = "employee"; }else{ empType = "dependent"; }
      this.params = "network="  + this.memberNetwork + "&nric=" + this.memberInfo1[0]['MemberNRIC'] + "&empType=" + empType + "&internal_LoggedInUserRegisterID="+ this.memberInfo1[0]['Internal_LoggedInUserRegisterID'];
      
      console.log(this.params)

      this.claimService.getCheckBalanceAPI(this.params).then((result) => {
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
                        
                    }
                  }]
              });
              alert.present();
              
            }else{
              this.balanceRemarks = this.getCheckInfoFromAsync(result)
              this.annualLimitDetails = result.AnnualLimitDetails[0];
            }
          
      }, (err) => {
            this.loading.dismiss();
      }); 
  }

  onChange(value) {
    this.memberInfo = this.getInfoFromAsync(value);
  }

  async getInfoFromAsync(val){
    
    return await this.memberInfo1[val];
 
  }

  async getCheckInfoFromAsync(val){
    
    return await val;
 
  }

  	backButtonClick()
	{
    	this.navCtrl.pop();  // remember to put this to add the back button behavior
	}

}
