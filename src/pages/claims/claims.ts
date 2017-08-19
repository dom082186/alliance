import { Component,Renderer2, ViewChild,ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DatePicker } from '@ionic-native/date-picker';
import { Storage } from '@ionic/storage';

//import { BenefitsPage } from '../benefits/benefits';
import { SubmitclaimsPage } from '../submitclaims/submitclaims';



@IonicPage()
@Component({
  selector: 'page-claims',
  templateUrl: 'claims.html',
})
export class ClaimsPage {

  @ViewChild('benefitsBtn') elem:ElementRef;

  memberInfo: any[];
  memberNetwork: any;
  memberName: any;
  sessionID: any;
  claimForm = {}

  constructor(public navCtrl: NavController, public navParams: NavParams, private rd: Renderer2,public storage: Storage) {
  
  }


  ionViewDidLoad(){
    this.getData();
  }

  getData(){
    this.storage.get('memInfo').then((val) => {
        this.memberInfo = val;
        this.memberName = this.memberInfo['MemberName'];
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
        //this.loadClaims();
    });  
  }

  searchClaim() {
    //console.log(this.memberInfo);
    console.log(this.memberNetwork);
    console.log(this.claimForm);

  }

  gotoBenefits() {
    this.rd.addClass(this.elem.nativeElement, 'pane');
  	//this.navCtrl.push( BenefitsPage,{},{ animate: true, direction: 'left'});
    this.navCtrl.push( SubmitclaimsPage);
  }

  backButtonClick()
	{
    	this.navCtrl.pop({});  // remember to put this to add the back button behavior
	}

}
