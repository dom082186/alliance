import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController,AlertController,LoadingController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { LoginServiceProvider } from '../../providers/login-service/login-service';


@IonicPage()
@Component({
  selector: 'page-contactus',
  templateUrl: 'contactus.html',
  providers: [LoginServiceProvider]
})
export class ContactusPage {


  loggedIn : boolean = true;
  contactInfo : any;
  loading: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public menu: MenuController,
              public storage: Storage, public loginService: LoginServiceProvider,private alertCtrl: AlertController,
              public loadingCtrl: LoadingController,) {
  
  }

  ionViewDidEnter() {
    this.menu.swipeEnable(false);
  }

  ionViewDidLoad() {

    this.getMemInfo();
  }

  showLoader(){
      this.loading = this.loadingCtrl.create({
          content: 'Please Wait...'
      });

      this.loading.present();
  }

  getMemInfo(){
    this.showLoader();
    this.storage.get('memInfo').then((val) => {
        if(val == null || val == "null"){
          this.loggedIn = false;
        }else{
          this.loggedIn = true;
        }
        this.loadContactInfo();
    });
  }

  loadContactInfo () {
      this.loginService.getContactInfo().then((result) => {
        this.loading.dismiss();
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
          this.contactInfo = this.getContactAsync(result);
        }

      }, (err) => {
        this.loading.dismiss();
      });

  }


  async getContactAsync(val){

    return await val;
 
  }



  backButtonClick()
	{
    	this.navCtrl.pop();  // remember to put this to add the back button behavior
	}
}
