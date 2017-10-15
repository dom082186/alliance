import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';

/**
 * Generated class for the AppointmentPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-appointment',
  templateUrl: 'appointment.html',
})
export class AppointmentPage {

  loading: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public loadingCtrl: LoadingController,) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AppointmentPage');
    this.showLoader();
  }

  	backButtonClick()
	{
    	this.navCtrl.pop();  // remember to put this to add the back button behavior
	}

  showLoader(){
    this.loading = this.loadingCtrl.create({
        content: 'Please Wait...'
    });

    this.loading.present();
  }

  dismissLoading(){
    this.loading.dismiss();
  }
}
