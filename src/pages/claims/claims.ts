import { Component,Renderer2, ViewChild,ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams,LoadingController, AlertController, ModalController } from 'ionic-angular';
import { DatePicker } from '@ionic-native/date-picker';
import { Storage } from '@ionic/storage';

//import { BenefitsPage } from '../benefits/benefits';
import { SubmitclaimsPage } from '../submitclaims/submitclaims';
import { ClaimdetailsPage } from '../claimdetails/claimdetails';

import { EcardServiceProvider } from '../../providers/ecard-service/ecard-service';
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
  sessionID: any;
  params: any;
  claimForm = {}
  benefitsForm = {}
  claimHistoryList: any;
  showBenefitsPage: boolean = false;
  showClaimsPage: boolean = true;
  hasDependents: boolean = false;

  constructor(public navCtrl: NavController, public navParams: NavParams, private rd: Renderer2,
    public storage: Storage,public claimService: ClaimServiceProvider,public loadingCtrl: LoadingController,
    private alertCtrl: AlertController,public modalCtrl: ModalController,) {
  
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
        if(val.length > 1){ this.hasDependents = true; }else{this.hasDependents = false;}
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
    this.showBenefitsPage = false;
    this.showClaimsPage = true;
    this.rd.addClass(this.claimsBtnElem.nativeElement, 'active');
    this.rd.removeClass(this.benefitsBtnElem.nativeElement, 'active');
    var dateFromObj = new Date(this.claimForm['fromDate']);
    var dateToObj = new Date(this.claimForm['toDate']);
    var nameIndex = this.claimForm['claimName'];


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
     
      this.params = "network="  + this.memberNetwork + "&membercompanyid=" + this.memberInfo[nameIndex]['MemberCompanyID'] + "&visitdatefrom=" + this.claimForm['fromDate'] + "&visitdateto=" + this.claimForm['toDate'] +"&internal_LoggedInUserRegisterID="+ this.memberInfo[nameIndex]['Internal_LoggedInUserRegisterID'];

      console.log(this.params);

        this.claimService.getClaimsAPI(this.params).then((result) => {
            this.loading.dismiss();
            console.log(result);

            // if(result.Status == "Failed"){
            //   let alert = this.alertCtrl.create({
            //     title: 'Alert',
            //     message: result.ValidateMessage,
            //     enableBackdropDismiss: false,
            //     buttons: [{
            //           text: 'OK',
            //           role: 'Cancel',
            //           handler: () => {
                        
            //         }
            //       }]
            //   });
            //   alert.present();
              
            // }else{
                
                 this.claimHistoryList = 
                  [
                    {
                        "ClaimID": "906b3a4e-3f66-430e-9c4e-82b9bee65553",
                        "ClaimCode": "TPA45297",
                        "ClaimType": "TPA Claim",
                        "Treatmentdate": "2017-07-28T00:00:00",
                        "ClinicName": "A LIFE CLINIC PTE LTD",
                        "ClaimStatus": "Paid",
                        "PatientName": "Alfred",
                        "PatientNRIC": "S7211235B",
                        "MCDays": 0,
                        "TotalFeeBeforeGST": 160,
                        "TotalFeeGST": 20,
                        "TotalFeeAfterGST": 180,
                        "ClaimBeforeGST": 0,
                        "ClaimGST": 0,
                        "ClaimAfterGST": 0,
                        "CashCollected": 150,
                        "TotalDeductAmount": 30
                    },
                    {
                        "ClaimID": "56d770bf-9bf4-4e92-864f-8db6248109d8",
                        "ClaimCode": "TPA45299",
                        "ClaimType": "TPA Claim",
                        "Treatmentdate": "2017-07-31T00:00:00",
                        "ClinicName": "A LIFE CLINIC PTE LTD",
                        "ClaimStatus": "Pending",
                        "PatientName": "Alfred",
                        "PatientNRIC": "S7211235B",
                        "MCDays": 0,
                        "TotalFeeBeforeGST": 138,
                        "TotalFeeGST": 0,
                        "TotalFeeAfterGST": 138,
                        "ClaimBeforeGST": 0,
                        "ClaimGST": 0,
                        "ClaimAfterGST": 0,
                        "CashCollected": 108,
                        "TotalDeductAmount": 30
                    },
                    {
                        "ClaimID": "d00e5f34-2d8c-42e4-9fd2-84b3b89fc9bd",
                        "ClaimCode": "Claim236732",
                        "ClaimType": "Panel Claim",
                        "Treatmentdate": "2017-08-02T00:00:00",
                        "ClinicName": "ABUNDANT HEALTH MEDICAL CLINIC PTE LTD",
                        "ClaimStatus": null,
                        "PatientName": "Alfred",
                        "PatientNRIC": "S7211235B",
                        "MCDays": 1,
                        "TotalFeeBeforeGST": 22,
                        "TotalFeeGST": 1.54,
                        "TotalFeeAfterGST": 23.54,
                        "ClaimBeforeGST": 17.33,
                        "ClaimGST": 1.21,
                        "ClaimAfterGST": 18.54,
                        "CashCollected": 5,
                        "TotalDeductAmount": 18.54
                    }
                ]

            // }
          
        }, (err) => {
            this.loading.dismiss();
        }); 

    }
  }


  openClaim(index){
    console.log(index);
    console.log(this.claimHistoryList[index]);
    //this.navCtrl.push( ClaimdetailsPage, {details: this.claimHistoryList[index]});
     let contactModal = this.modalCtrl.create(ClaimdetailsPage);
     contactModal.present();
  }

  gotoBenefits() {
    this.showBenefitsPage = true;
    this.showClaimsPage = false;
    this.rd.addClass(this.benefitsBtnElem.nativeElement, 'active');
    this.rd.removeClass(this.claimsBtnElem.nativeElement, 'active');


     this.showLoader();
     this.params = "network="  + this.memberNetwork + "&membercompanyid=" + this.memberInfo['MemberCompanyID'] + "&memberbenefitplanid=" + this.memberInfo['BenefitPlanID']  +"&internal_LoggedInUserRegisterID="+ this.sessionID;
     this.claimService.getBenefitsAPI(this.params).then((result) => {
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
               console.log('success');
            }
          
        }, (err) => {
            this.loading.dismiss();
        }); 


  }

  backButtonClick()
	{
    	this.navCtrl.pop({});  // remember to put this to add the back button behavior
	}

}
