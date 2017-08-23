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
  tempMemInfo: any;
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
    this.getNetwork();
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

  getNetwork(){
    this.storage.get('memInfo').then((val) => {
        this.loading.dismiss();
        this.memberInfo1 = val;
        this.memberInfo = this.getFromStorageAsync();
        if(val.length > 1){ this.hasDependents = true; }else{this.hasDependents = false;}
        this.storage.get('memNetwork').then((val1) => {
            this.memberNetwork = val1;
        });  
        this.balance['name'] = 0; // initial value for dropdown

    });

  }

  getSession(){
    this.storage.get('sessionID').then((val1) => {
        this.sessionID = val1;
        this.loading.dismiss();
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
