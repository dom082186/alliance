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
  tandc: any;
  loading: any;

  constructor(public navCtrl: NavController, public navParams: NavParams,public storage: Storage,
              public loginService: LoginServiceProvider,private alertCtrl: AlertController,
              public loadingCtrl: LoadingController,public http: Http,) {
    
    this.tandc =   {
       "Remarks": "30",
       "AnnualLimitDetails": "<table cellpadding='0' cellspacing='0' width='100%'><tr class='header'><td><u>Annual Limit Details</u><br/><br/></td></tr> <tr><td><table cellpadding='0' cellspacing='0'><tr><tr><td>Chronic Annual Limit</td><td nowrap>:&nbsp;&nbsp;</td></tr><tr><td>Chronic Annual Visit (Consult fee)</td><td nowrap>:&nbsp;&nbsp;</td></tr><tr><td>Dental Annual Limit</td><td nowrap>:&nbsp;&nbsp;</td></tr><tr><td>Dental Annual Limit Balance</td><td nowrap>:300.00</td></tr></tr><tr><tr><td>Diagnostic Annual Limit</td><td nowrap>:&nbsp;&nbsp;</td></tr><tr><td>Diagnostic Annual Limit Balance</td><td nowrap>:300.00</td></tr><tr><td>GP Referrer Diagnostic Limit</td><td nowrap>:&nbsp;&nbsp;</td></tr><tr><td>GP Referrer Diagnostic Limit Balance</td><td nowrap>:300.00</td></tr></tr><tr><tr><td>GP/Diagnostic Annual Limit</td><td nowrap>:&nbsp;&nbsp;</td></tr><tr><td>GP/Diagnostic Annual Limit  Balance</td><td nowrap>:300.00</td></tr><tr><td>GP/SP Annual Limit</td><td nowrap>:&nbsp;&nbsp;</td></tr><tr><td>GP/SP Annual Limit Balance</td><td nowrap>:300.00</td></tr></tr><tr><tr><td>GP/SP/Diagnostic Annual Limit</td><td nowrap>:&nbsp;&nbsp;</td></tr><tr><td>GP/SP/Diagnostic Annual Limit Balance</td><td nowrap>:300.00</td></tr><tr><td>Hospital Annual Limit</td><td nowrap>:&nbsp;&nbsp;</td></tr><tr><td>Hospital Annual Limit Balance</td><td nowrap>:300.00</td></tr></tr><tr><tr><td>Physiotherapy Annual Limit</td><td nowrap>:&nbsp;&nbsp;</td></tr><tr><td>Physiotherapy Annual Limit Balance</td><td nowrap>:300.00</td></tr><tr><td>Polyclinic/GP Annual Limit</td><td nowrap>:&nbsp;&nbsp;</td></tr><tr><td>Polyclinic/GP Annual Limit Balance</td><td nowrap>:300.00</td></tr></tr><tr><tr><td>SP Annual Limit</td><td nowrap>:&nbsp;&nbsp;</td></tr><tr><td>SP Annual Limit Balance</td><td nowrap>:300.00</td></tr><tr><td>SP Referrer Diagnostic Limit</td><td nowrap>:&nbsp;&nbsp;</td></tr><tr><td>SP Referrer Diagnostic Limit Balance</td><td nowrap>:300.00</td></tr></tr><tr><tr><td>SP Specialized Diagnosis Procedure Limit</td><td nowrap>:&nbsp;&nbsp;</td></tr><tr><td>SP/Diagnostic Annual Limit</td><td nowrap>:&nbsp;&nbsp;</td></tr><tr><td>SP/Diagnostic Annual Limit Balance</td><td nowrap>:300.00</td></tr><tr><td>SP/NP Diagnostic Annual Limit</td><td nowrap>:&nbsp;&nbsp;</td></tr></tr><tr><tr><td>SP/NP Diagnostic Annual Limit Balance</td><td nowrap>:300.00</td></tr><tr><td>Total Annual Limit</td><td nowrap>:&nbsp;&nbsp;</td></tr><tr><td>Total Annual Limit Balance</td><td nowrap>:300.00</td></tr><tr><td>Total Dental Family Limit</td><td nowrap>:&nbsp;&nbsp;</td></tr></tr><tr><tr><td>Total Dental Family Limit Balance</td><td nowrap>:300.00</td></tr><tr><td>Total Family Limit</td><td nowrap>:&nbsp;&nbsp;</td></tr><tr><td>Total Family Limit Balance</td><td nowrap>:300.00</td></tr><tr><td>Total GP Family Limit</td><td nowrap>:&nbsp;&nbsp;</td></tr></tr><tr><tr><td>Total GP Family Limit Balance</td><td nowrap>:300.00</td></tr><tr><td>Total GP/Diagnostic Family Limit</td><td nowrap>:300.00</td></tr><tr><td>Total No Of Visits</td><td nowrap>:&nbsp;&nbsp;</td></tr><tr><td>Total Panel Limit</td><td nowrap>:&nbsp;&nbsp;</td></tr></tr><tr><tr><td>Total Panel Limit Balance</td><td nowrap>:300.00</td></tr><tr><td>Total SP Family Limit</td><td nowrap>:&nbsp;&nbsp;</td></tr><tr><td>Total SP Family Limit Balance</td><td nowrap>:300.00</td></tr><tr><td>Total TPA Entitlement Limit</td><td nowrap>:&nbsp;&nbsp;</td></tr></tr><tr><tr><td>Total TPA Limit</td><td nowrap>:&nbsp;&nbsp;</td></tr><tr><td>Total TPA Limit Balance</td><td nowrap>:300.00</td></tr></tr></table></td></tr></table>",
       "IndependentAnnualLimit": "<table cellpadding='0' cellspacing='0' width='100%'><tr class='header'><td><u>Independent Annual Limits</u><br/><br/></td></tr><tr><td><table cellpadding='0' cellspacing='0'><tr><tr><td nowrap>Additional Limit</td><td>:&nbsp;&nbsp;</td></tr><tr><td nowrap>Chronic Annual Limit</td><td>:&nbsp;&nbsp;</td></tr><tr><td nowrap>Chronic Annual Limit Balance</td><td>:300.00</td></tr><tr><td nowrap>Dental Annual Limit</td><td>:&nbsp;&nbsp;</td></tr></tr><tr><tr><td nowrap>Dental Annual Limit Balance</td><td>:300.00</td></tr><tr><td nowrap>Flexi-Benefits Annual Limit Balance</td><td>:300.00</td></tr><tr><td nowrap>Physiotherapy Annual Limit</td><td>:&nbsp;&nbsp;</td></tr><tr><td nowrap>Physiotherapy Annual Limit Balance</td><td>:300.00</td></tr></tr><tr><tr><td nowrap>SP Specialized Diagnosis Procedure Limit Balance</td><td>:300.00</td></tr></tr></table></td></tr></table>",
       "MemberName": "name",
       "BenefitName": "test plan",
       "Error": "",
       "CompanyName": "test co",
       "BenefitModifiedDate": "06/10/2015"
    }

  }

  ionViewDidLoad() {
    //this.showLoader();
    this.getMemInfo();
    this.getTerms();
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

  showLoader(){
    this.loading = this.loadingCtrl.create({
        content: 'Please Wait...'
    });

    this.loading.present();
  }


  getTerms() {
    //this.loginService.loadTerms()

    // .then((result) => {

    //   console.log(result)

    //   if(result.ValidateMessage != undefined){
    //     let alert = this.alertCtrl.create({
    //       title: 'Alert',
    //       message: result.ValidateMessage,
    //       buttons: [{
    //             text: 'OK',
    //             role: 'cancel',
    //             handler: () => {
    //               console.log('Cancel clicked');
    //           }
    //         }]
    //     });
    //     alert.present();
    //   }else{
        
        
    //   }

    // }, (err) => {
    //   this.loading.dismiss();
    // });

  }


  backButtonClick()
	{
    	this.navCtrl.pop();  // remember to put this to add the back button behavior
	}

}
