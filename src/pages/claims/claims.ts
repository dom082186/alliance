import { Component,Renderer2, ViewChild,ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams,LoadingController, AlertController } from 'ionic-angular';
import { DatePicker } from '@ionic-native/date-picker';
import { Storage } from '@ionic/storage';

//import { BenefitsPage } from '../benefits/benefits';
import { SubmitclaimsPage } from '../submitclaims/submitclaims';
import { ClaimdetailsPage } from '../claimdetails/claimdetails';


import { ClaimServiceProvider } from '../../providers/claim-service/claim-service';

@IonicPage()
@Component({
  selector: 'page-claims',
  templateUrl: 'claims.html',
  providers: [ClaimServiceProvider],
})
export class ClaimsPage {

  @ViewChild('benefitsBtn') benefitsBtnElem:ElementRef;
  @ViewChild('claimsBtn') claimsBtnElem:ElementRef;
  @ViewChild('claimsPage') claimsPageElem:ElementRef;
  

  loading: any;
  memberInfo: any[];
  memberNetwork: any;
  memberName: any;
  memberNRIC: any;
  sessionID: any;
  params: any;
  claimForm = {}
  claimHistoryList: any;
  showBenefitsPage: boolean = false;
  showClaimsPage: boolean = true;

  constructor(public navCtrl: NavController, public navParams: NavParams, private rd: Renderer2,
    public storage: Storage,public claimService: ClaimServiceProvider,public loadingCtrl: LoadingController,
    private alertCtrl: AlertController,) {
  
  }


  ionViewDidLoad(){
    
    this.getData();
  }

  showLoader(){
      this.loading = this.loadingCtrl.create({
          content: 'Please Wait...'
      });

      this.loading.present();
  }

  getData(){
    this.storage.get('memInfo').then((val) => {
        this.memberInfo = val;
        this.memberName = this.memberInfo['MemberName'];
        this.memberNRIC = this.memberInfo['MemberNRIC'];

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
    this.showLoader();
    var dateFromObj = new Date(this.claimForm['fromDate']);
    var dateToObj = new Date(this.claimForm['toDate']);

    console.log(this.claimForm['claimName']);
    if(this.claimForm['claimName'] == "" || this.claimForm['claimName'] == undefined){
        this.loading.dismiss();
        let alert = this.alertCtrl.create({
            title: 'Alert',
            message: 'Kindly select a Name',
            enableBackdropDismiss: false,
            buttons: [{
                  text: 'OK',
                  role: 'Cancel',
                  handler: () => {
                    
                }
              }]
          });
          alert.present();
    }else if(this.claimForm['fromDate'] == "" || this.claimForm['fromDate'] == undefined){
        this.loading.dismiss();
        let alert = this.alertCtrl.create({
            title: 'Alert',
            message: 'Date is required',
            enableBackdropDismiss: false,
            buttons: [{
                  text: 'OK',
                  role: 'Cancel',
                  handler: () => {
                    
                }
              }]
          });
          alert.present();
    }else if(this.claimForm['toDate'] == "" || this.claimForm['toDate'] == undefined){
        this.loading.dismiss();
        let alert = this.alertCtrl.create({
            title: 'Alert',
            message: 'Date is required',
            enableBackdropDismiss: false,
            buttons: [{
                  text: 'OK',
                  role: 'Cancel',
                  handler: () => {
                    
                }
              }]
          });
          alert.present();
    }else if(dateFromObj  > dateToObj){
         
         this.loading.dismiss();
          let alert = this.alertCtrl.create({
              title: 'Alert',
              message: 'Date format is incorrect',
              enableBackdropDismiss: false,
              buttons: [{
                    text: 'OK',
                    role: 'Cancel',
                    handler: () => {
                      
                  }
                }]
            });
            alert.present();

    }else{
     
      this.params = "network="  + this.memberNetwork + "&membercompanyid=" + this.memberInfo['MemberCompanyID'] + "&visitdatefrom=" + this.claimForm['fromDate'] + "&visitdateto=" + this.claimForm['toDate'] +"&internal_LoggedInUserRegisterID="+ this.sessionID;

      console.log(this.params);

        this.claimService.getClaimsAPI(this.params).then((result) => {
            this.loading.dismiss();
            console.log(result);

            if(result.Status == "Failed"){
              let alert = this.alertCtrl.create({
                title: 'Alert',
                message: result.ValidateMessage,
                enableBackdropDismiss: false,
                buttons: [{
                      text: 'OK',
                      role: 'Cancel',
                      handler: () => {
                        
                    }
                  }]
              });
              alert.present();
              
            }else{
                
                 this.claimHistoryList = 
                  [
                     {
                        "ClaimID": "14a2cae4-2598-4f7e-8f29-d0e6b5f634e7",
                        "ClaimCode": "TPA52183",
                        "ClaimType": "TPA Claim",
                        "Treatmentdate": "2015-09-02T00:00:00",
                        "ClinicName": "ktge test clinic",
                        "ClaimStatus": "NEW",
                        "PatientName": "John",
                        "PatientNRIC": "S1234567A",
                        "MCDays": 2
                     },
                     {
                        "ClaimID": "14a2cae4-2598-4f7e-8f29-d0e6b5f634e7",
                        "ClaimCode": "TPA52184",
                        "ClaimType": "TPA Claim 2",
                        "Treatmentdate": "2015-10-02T00:00:00",
                        "ClinicName": "maine test clinic",
                        "ClaimStatus": "NEW",
                        "PatientName": "Maine",
                        "PatientNRIC": "S1234567C",
                        "MCDays": 4
                     }
                  ]

            }
          
        }, (err) => {
            this.loading.dismiss();
        }); 

    }
  }

  openClaim(index){
    console.log(index);
    console.log(this.claimHistoryList[index]);
    this.navCtrl.push( ClaimdetailsPage, {details: this.claimHistoryList[index]});
  }

  gotoBenefits() {
    this.showBenefitsPage = true;
    this.showClaimsPage = false;
    this.rd.addClass(this.benefitsBtnElem.nativeElement, 'active');
    this.rd.removeClass(this.claimsBtnElem.nativeElement, 'active');
  }

  gotoClaims() {
    this.showBenefitsPage = false;
    this.showClaimsPage = true;
    this.rd.addClass(this.claimsBtnElem.nativeElement, 'active');
    this.rd.removeClass(this.benefitsBtnElem.nativeElement, 'active');
  }

  backButtonClick()
	{
    	this.navCtrl.pop({});  // remember to put this to add the back button behavior
	}

}
