import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';
import { Storage } from '@ionic/storage';

import { EcardServiceProvider } from '../../providers/ecard-service/ecard-service';

import { LoginNonmedinetPage } from '../login-nonmedinet/login-nonmedinet';

@IonicPage()
@Component({
  selector: 'page-checkbalance',
  templateUrl: 'checkbalance.html',
  providers: [EcardServiceProvider]
})
export class CheckbalancePage {

  memberInfo: any;
  memberInfo1: any;
  memberNetwork: any;
  sessionID: any;
  loading: any;
  names: any;
  dependentsParam: any;
  balance ={}
  toDate: String = new Date().toISOString();
  hasDependents: boolean = false;
  
  constructor(public navCtrl: NavController, public navParams: NavParams,public storage: Storage,
              public loadingCtrl: LoadingController, private alertCtrl: AlertController,
              public ecardService: EcardServiceProvider) {
      
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CheckbalancePage');
    this.showLoader();
    this.memberInfo = this.getFromStorageAsync();
  }

  showLoader(){
      this.loading = this.loadingCtrl.create({
          content: 'Please Wait...'
      });

      this.loading.present();
  }

  async getFromStorageAsync(){
    this.getNetwork();
    return await this.storage.get('memInfo');
 
  }

  getNetwork(){
    this.storage.get('memInfo').then((val) => {
        this.memberInfo1 = val;
    });

    this.storage.get('memNetwork').then((val1) => {
        this.memberNetwork = val1;
        this.getSession();
    });  
  }

  getSession(){
    this.storage.get('sessionID').then((val1) => {
        this.sessionID = val1;
        this.dependentsParam = "relatedmemberid=" + this.memberInfo1['RelatedMemberID'] + "&network="  + this.memberNetwork + "&internal_LoggedInUserRegisterID="+ this.sessionID;

        this.ecardService.getDependents(this.dependentsParam).then((result) => {
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
                        this.navCtrl.setRoot(LoginNonmedinetPage); 
                    }
                  }]
              });
              alert.present();
              
            }else{
              if(result.length == 0){
                this.hasDependents = false
              }else{
                this.hasDependents = true
                this.names = [
                {'key1': 'mhay', 'key2': 'value', 'key3': 'value3'}, 
                {'key1': 'mhay1', 'key2': 'value1', 'key3': 'value3'},
                {'key1': 'mhay2', 'key2': 'value2', 'key3': 'value3'}];
              }
              
            }
          }, (err) => {
              this.loading.dismiss();
          });
    });  
  }

  onChange(value) {
    console.log(value);
  }







  	backButtonClick()
	{
    	this.navCtrl.pop();  // remember to put this to add the back button behavior
	}

}
