import { Component } from '@angular/core';
import { Storage } from '@ionic/storage';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { DomSanitizer } from '@angular/platform-browser';

@IonicPage()
@Component({
  selector: 'page-appointment',
  templateUrl: 'appointment.html',
})
export class AppointmentPage {

  loading: any;
  memberInfo: any[];
  arsURL: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public loadingCtrl: LoadingController,
    public storage: Storage,private domSanitizer : DomSanitizer) {
  }

  ionViewDidLoad() {    
    this.showLoader();
    this.getData();
  }

  getData(){
    this.storage.get('memInfo').then((val) => {
        this.memberInfo = val;
        this.getNetwork();

    });
  }

  getNetwork(){
    this.storage.get('memNetwork').then((val1) => {
        var newURL = "http://116.12.139.101:8123/ars-beta/#/registration/"+ this.memberInfo[0].MemberNRIC + ","+ val1; 
        this.arsURL = this.domSanitizer.bypassSecurityTrustResourceUrl(newURL);
        this.loading.dismiss();
    });  
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
    //this.getData();
  }

  dismissLoading(){
    this.loading.dismiss();
  }
}
