import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';
import { Storage } from '@ionic/storage';


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
  TotalAnnualLimit: any;
  TotalFamilyLimit: any;
  balance ={}
  toDate: String = new Date().toISOString();
  hasDependents: boolean = false;
  params: any;
  dateModified: any;
  annualLimitValue: any;
  independentAnnualDetails: any;
  independentAnnualValue: any;




  
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
    });
    this.getCheckBalanceInfo();
  }

  getCheckBalanceInfo(){
      
      var empType = "";
      if(this.memberInfo1[0]['IsEmployee']){ empType = "employee"; }else{ empType = "dependent"; }
      this.params = "network="  + this.memberNetwork + "&nric=" + this.memberInfo1[0]['MemberNRIC'] + "&empType=" + empType + "&internal_LoggedInUserRegisterID="+ this.memberInfo1[0]['Internal_LoggedInUserRegisterID'];

      this.claimService.getCheckBalanceAPI(this.params).then((result) => {
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
              this.balanceRemarks = this.getCheckInfoFromAsync(result)
              this.annualLimitDetails = result.AnnualLimitDetails[0];
              this.independentAnnualDetails = result.IndependentAnnualLimit[0];
              var annualVal = [];
              var independentVal = [];
               console.log(result)

              for (let key in this.annualLimitDetails) {
                  if(this.annualLimitDetails[key].toLowerCase() != 'unlimited' && this.annualLimitDetails[key].toLowerCase() != 'na' ){
                    annualVal.push({key: key, value: this.annualLimitDetails[key]} )
                  }
              }
              for (let key in this.independentAnnualDetails) {
                  if(this.independentAnnualDetails[key].toLowerCase() != 'unlimited' &&   this.independentAnnualDetails[key].toLowerCase() != 'na'){
                    independentVal.push({key: key, value: this.independentAnnualDetails[key]} )
                  }
              }
              this.annualLimitValue = annualVal;
              this.independentAnnualValue = independentVal;

              this.TotalFamilyLimit = this.annualLimitDetails.TotalFamilyLimit;
              this.TotalAnnualLimit = this.annualLimitDetails.TotalAnnualLimit;
              
            }
          
      }, (err) => {
            this.loading.dismiss();
      }); 
  }

  onChange(value) {
    this.memberInfo = this.getInfoFromAsync(value);
    this.showLoader();
    var empType = "";
      if(this.memberInfo1[value]['IsEmployee']){ empType = "employee"; }else{ empType = "dependent"; }
      this.params = "network="  + this.memberNetwork + "&nric=" + this.memberInfo1[value]['MemberNRIC'] + "&empType=" + empType + "&internal_LoggedInUserRegisterID="+ this.memberInfo1[0]['Internal_LoggedInUserRegisterID'];

      this.claimService.getCheckBalanceAPI(this.params).then((result) => {
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
              this.balanceRemarks = this.getCheckInfoFromAsync(result)
              this.annualLimitDetails = result.AnnualLimitDetails[0];
              this.independentAnnualDetails = result.IndependentAnnualLimit[0];
              var annualVal = [];
              var independentVal = [];
               console.log(result)

              for (let key in this.annualLimitDetails) {
                  if(this.annualLimitDetails[key].toLowerCase() != 'unlimited' && this.annualLimitDetails[key].toLowerCase() != 'na' ){
                    annualVal.push({key: key, value: this.annualLimitDetails[key]} )
                  }
              }
              for (let key in this.independentAnnualDetails) {
                  if(this.independentAnnualDetails[key].toLowerCase() != 'unlimited' &&   this.independentAnnualDetails[key].toLowerCase() != 'na'){
                    independentVal.push({key: key, value: this.independentAnnualDetails[key]} )
                  }
              }
              this.annualLimitValue = annualVal;
              this.independentAnnualValue = independentVal;

              this.TotalFamilyLimit = this.annualLimitDetails.TotalFamilyLimit;
              this.TotalAnnualLimit = this.annualLimitDetails.TotalAnnualLimit;
              
            }
          
      }, (err) => {
            this.loading.dismiss();
      });
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
