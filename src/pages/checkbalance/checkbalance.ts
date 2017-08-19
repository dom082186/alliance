import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
/**
 * Generated class for the CheckbalancePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-checkbalance',
  templateUrl: 'checkbalance.html',
})
export class CheckbalancePage {

  memberInfo: any[];
  memberNetwork: any;
  sessionID: any;

  constructor(public navCtrl: NavController, public navParams: NavParams,public storage: Storage) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CheckbalancePage');
    this.getData();
  }

  getData(){
    this.storage.get('memInfo').then((val) => {
        this.memberInfo = val;
        console.log(val);
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
    this.storage.get('sessionID').then((val1) => {
        this.sessionID = val1;
    });  
  }







  	backButtonClick()
	{
    	this.navCtrl.pop();  // remember to put this to add the back button behavior
	}

}
