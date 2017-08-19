import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController } from 'ionic-angular';
import { Storage } from '@ionic/storage';

/**
 * Generated class for the ContactusPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
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

  ionViewDidLoad() {
    console.log('ionViewDidLoad ContactusPage');
    this.getData();
  }

  getData(){
    this.storage.get('memInfo').then((val) => {
      console.log(val)
        val === undefined ? this.loggedIn = false : this.loggedIn = true;
    });
  }

  backButtonClick()
	{
    	this.navCtrl.pop();  // remember to put this to add the back button behavior
	}
}
