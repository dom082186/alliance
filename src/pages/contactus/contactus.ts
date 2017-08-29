import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController } from 'ionic-angular';
import { Storage } from '@ionic/storage';


@IonicPage()
@Component({
  selector: 'page-contactus',
  templateUrl: 'contactus.html',
})
export class ContactusPage {


  loggedIn : boolean = true;

  constructor(public navCtrl: NavController, public navParams: NavParams, public menu: MenuController,
              public storage: Storage, ) {
  
  }

  ionViewDidEnter() {
    this.menu.swipeEnable(false);
  }

  ionViewDidLoad() {
    this.getMemInfo();
  }

  getMemInfo(){
    this.storage.get('memInfo').then((val) => {
        if(val == null || val == "null"){
          this.loggedIn = false;
        }else{
          this.loggedIn = true;
        }
    });
  }

  backButtonClick()
	{
    	this.navCtrl.pop();  // remember to put this to add the back button behavior
	}
}
