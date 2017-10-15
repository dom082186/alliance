import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';


import { Storage } from '@ionic/storage';

import { LoginServiceProvider } from '../../providers/login-service/login-service';


import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@IonicPage()
@Component({
  selector: 'page-termsconditions',
  templateUrl: 'termsconditions.html',
  providers: [LoginServiceProvider]
})
export class TermsconditionsPage {

  loggedIn : boolean = false;
  termsTitle: any;
  termsBody: any;
  loading: any;
  page: any;


  constructor(public navCtrl: NavController, public navParams: NavParams,public storage: Storage,
              public loginService: LoginServiceProvider,private alertCtrl: AlertController,
              public loadingCtrl: LoadingController,public http: Http,) {

      this.page = this.navParams.get('page');

  }

  ionViewDidLoad() {
    console.log(this.page)
    if(this.page != undefined){
      //this.showLoader();
      this.getMemInfo();
      this.getNetwork();
    }else{
      this.showLoader();
      this.getTerms("a");
    }
    
  }

  getMemInfo(){
    this.storage.get('memInfo').then((val) => {
        //val === "null" ? this.loggedIn = false : this.loggedIn = true;
        if(val == null || val == "null"){
          this.loggedIn = false;
        }else{
          this.loggedIn = true;
        }
    });
  }

  getNetwork(){
    this.showLoader();
    this.storage.get('memNetwork').then((val1) => {
        this.getTerms(val1);
        //this.tandc = this.getDataFromAsync(val1);
    });

     
  }

  showLoader(){
    this.loading = this.loadingCtrl.create({
        content: 'Please Wait...'
    });

    this.loading.present();
  }


  getTerms(params) {

      if(this.page == "claims"){
        this.loginService.loadTerms(params).then((result) => {  

          if(result.ValidateMessage != undefined){
            let alert = this.alertCtrl.create({
              title: 'Alert',
              message: result.ValidateMessage,
              buttons: [{
                    text: 'OK',
                    role: 'cancel',
                    handler: () => {
                      console.log('Cancel clicked');
                  }
                }]
            });
            alert.present();
          }else{
            
            this.termsTitle = result.title;//this.getDataFromAsync(result);
            this.termsBody = result.content;
              
          }
          this.loading.dismiss();
        }, (err) => {
          this.loading.dismiss();
        });
      }else{
        this.loading.dismiss();
      }

  }


  backButtonClick()
	{
    	this.navCtrl.pop();  // remember to put this to add the back button behavior
	}

}
