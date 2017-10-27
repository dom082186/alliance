import { Component,Renderer2, ViewChild,ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams,LoadingController, AlertController, ModalController,ViewController } from 'ionic-angular';
import { Storage } from '@ionic/storage';

//import { BenefitsPage } from '../benefits/benefits';
import { SubmitclaimsPage } from '../submitclaims/submitclaims';
import { ClaimdetailsPage } from '../claimdetails/claimdetails';
import { LoginNonmedinetPage } from '../login-nonmedinet/login-nonmedinet';

import { ClaimServiceProvider } from '../../providers/claim-service/claim-service';
import { HomePage } from '../home/home';



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
  memberInfo: any;
  memberClaimInfo: any;
  memberNetwork: any;
  memberNRIC: any;
  sessionID: any;
  params: any;
  panelClaimList: any;
  tpaClaimList: any;
  claimHistoryList: any;
  benefitPeriod: any;
  selectedBenefitPeriod: any;
  selectedBenefitID: any;
  benefitsInfo: any;
  tpa_benefits: any;
  inpanel_benefits: any;
  claimForm = {}
  benefitsForm = {}
  showBenefitsPage: boolean = false;
  showClaimsPage: boolean = true;
  hasDependents: boolean = false;
  noRecordsFound: boolean = false;
  hideExportButton: boolean = false;

  pageFrom: any;
  successSubmit: any;
  hideMunaBackButton: boolean = true;

  contactModal: any;
  

  constructor(public navCtrl: NavController, public navParams: NavParams, private rd: Renderer2,
    public storage: Storage,public claimService: ClaimServiceProvider,public loadingCtrl: LoadingController,
    private alertCtrl: AlertController,public modalCtrl: ModalController,public viewCtrl: ViewController) {

    this.pageFrom = this.navParams.get('pageFrom');
    this.successSubmit = this.navParams.get('successSubmit');
    if(this.successSubmit !=undefined){
        this.deleteSubmitClaimpage();
    }
    this.getData();
  }


  ionViewDidLoad(){
    //this.getData();
    //this.memberInfo = this.getFromStorageAsync();
    //this.getNetwork();
  }

  showLoader(){
      this.loading = this.loadingCtrl.create({
          content: 'Please Wait...'
      });
      this.loading.present();
  }


  /// *******************   GET FROM LOGIN API ***************
  async getFromStorageAsync(){
    return await this.storage.get('claimMemInfo');
  }
  /// *******************   END  ***************


  /// *******************   GET FROM LOGINNONMEDINET API ***************
  getData(){
    this.showLoader();
    this.storage.get('memInfo').then((val) => {
        this.memberInfo = val;
        this.claimForm['claimName'] = 0;
        if(val.length > 1){ this.hasDependents = true; }else{this.hasDependents = false;}
        this.getNetwork();
    });
  }
  /// *******************   END  ***************


  getNetwork(){
    
    this.storage.get('memNetwork').then((val1) => {
        this.memberNetwork = val1;

        this.storage.get('claimMemInfo').then((val1) => {
            this.memberClaimInfo = val1;
            this.loadAllClaims();
            //this.getSession();
        });
    });
  }

  getSession(){
    this.storage.get('sessionID').then((val1) => {
        this.sessionID = val1;
        //this.loadClaims();
    });  
  }

  async getBenefitsFromSync(val){
    return await val;
  }


  loadAllClaims(){
    
        //===========  LIVE 
        this.params = "network="  + this.memberNetwork + "&membercompanyid=" + this.memberClaimInfo['MemberCompanyID'] + "&visitdatefrom=" + "null" + "&visitdateto=" + "null" +"&internal_LoggedInUserRegisterID="+ this.memberInfo[0]['Internal_LoggedInUserRegisterID'];
        //this.params = "network="  + this.memberNetwork + "&membercompanyid=" + "2eec42d7-7a5c-43a2-a1c1-1c21da218ccc" + "&visitdatefrom=" + this.claimForm['fromDate'] + "&visitdateto=" + this.claimForm['toDate'] +"&internal_LoggedInUserRegisterID="+ this.memberInfo[nameIndex]['Internal_LoggedInUserRegisterID'];

        //===========  TEST FROM LOGIN NONMEDINET
        //this.params = "network="  + "ntuc" + "&membercompanyid=" + "2eec42d7-7a5c-43a2-a1c1-1c21da218ccc" + "&visitdatefrom=" + "2000-09-02 00:00:00.000" + "&visitdateto=" + "2017-09-02 00:00:00.000" +"&internal_LoggedInUserRegisterID="+ this.memberInfo[0]['Internal_LoggedInUserRegisterID'];

        //===========  TEST FROM LOGIN
        //this.params = "network="  + "ntuc" + "&membercompanyid=" + "2eec42d7-7a5c-43a2-a1c1-1c21da218ccc" + "&visitdatefrom=" + "2000-09-02 00:00:00.000" + "&visitdateto=" + "2017-09-02 00:00:00.000" +"&internal_LoggedInUserRegisterID="+ this.memberClaimInfo['Internal_LoggedInUserRegisterID'];


        console.log(this.params);

          this.claimService.getClaimsAPI(this.params).then((result) => {
              this.loading.dismiss();

              if(result.Status == "Failed"){
                let alert = this.alertCtrl.create({
                  title: 'Alert',
                  message: result.ValidateMessage,
                  enableBackdropDismiss: false,
                  buttons: [{
                        text: 'OK',
                        role: 'Cancel',
                        handler: () => {
                          if(result.ValidateMessage.toLowerCase() != "records not found."){
                            this.navCtrl.setRoot(LoginNonmedinetPage);
                          }
                      }
                    }]
                });
                alert.present();
                
              }else{
                  
                  //this.panelClaimList = result.panelclaims;
                  //this.tpaClaimList = result.tpaclaims;

                  if(result.length == 0){
                    this.noRecordsFound = true;
                  }else{
                    this.noRecordsFound = false;
                    this.hideExportButton = true;
                  }

                  this.claimHistoryList = result;//this.panelClaimList.concat(this.tpaClaimList);

                  // this.claimHistoryList.sort((a, b) => {
                  //   let date1 = new Date(a._Treatmentdate);
                  //   let date2 = new Date(b._Treatmentdate);

                  //   if (date2 > date1) {
                  //       return 1;
                  //   } else if (date2 < date1) {
                  //       return -1;
                  //   } else {
                  //       return 0;
                  //   }
                  // });

              }
            
          }, (err) => {
            console.log(err)
              this.loading.dismiss();
          }); 
  }

  gotoClaim(){
    this.showBenefitsPage = false;
    this.showClaimsPage = true;
    this.rd.addClass(this.claimsBtnElem.nativeElement, 'active');
    this.rd.removeClass(this.benefitsBtnElem.nativeElement, 'active');
    this.getData();
  }

  searchClaim() {

      this.showLoader();
      var dateFromObj = new Date(this.claimForm['fromDate']);
      var dateToObj = new Date(this.claimForm['toDate']);
      var nameIndex = this.claimForm['claimName'];


      if(this.claimForm['fromDate'] == "" || this.claimForm['fromDate'] == undefined){
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
       
        //===========  LIVE 
        if(nameIndex > 0){
          this.params = "network="  + this.memberNetwork + "&membercompanyid=" + this.memberInfo[nameIndex]['MemberCompanyID'] + "&visitdatefrom=" + this.claimForm['fromDate'] + "&visitdateto=" + this.claimForm['toDate'] +"&internal_LoggedInUserRegisterID="+ this.memberInfo[0]['Internal_LoggedInUserRegisterID'];
        }else{
          this.params = "network="  + this.memberNetwork + "&membercompanyid=" + this.memberClaimInfo['MemberCompanyID'] + "&visitdatefrom=" + this.claimForm['fromDate'] + "&visitdateto=" + this.claimForm['toDate'] +"&internal_LoggedInUserRegisterID="+ this.memberInfo[0]['Internal_LoggedInUserRegisterID'];
        }
        //this.params = "network="  + this.memberNetwork + "&membercompanyid=" + "2eec42d7-7a5c-43a2-a1c1-1c21da218ccc" + "&visitdatefrom=" + this.claimForm['fromDate'] + "&visitdateto=" + this.claimForm['toDate'] +"&internal_LoggedInUserRegisterID="+ this.memberInfo[nameIndex]['Internal_LoggedInUserRegisterID'];

        //===========  TEST FROM LOGIN NONMEDINET
        //this.params = "network="  + "ntuc" + "&membercompanyid=" + "2eec42d7-7a5c-43a2-a1c1-1c21da218ccc" + "&visitdatefrom=" + "2000-09-02 00:00:00.000" + "&visitdateto=" + "2017-09-02 00:00:00.000" +"&internal_LoggedInUserRegisterID="+ this.memberInfo[0]['Internal_LoggedInUserRegisterID'];

        //===========  TEST FROM LOGIN
        //this.params = "network="  + "ntuc" + "&membercompanyid=" + "2eec42d7-7a5c-43a2-a1c1-1c21da218ccc" + "&visitdatefrom=" + "2000-09-02 00:00:00.000" + "&visitdateto=" + "2017-09-02 00:00:00.000" +"&internal_LoggedInUserRegisterID="+ this.memberClaimInfo['Internal_LoggedInUserRegisterID'];


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
                          if(result.ValidateMessage.toLowerCase() != "records not found."){
                            this.navCtrl.setRoot(LoginNonmedinetPage);
                          }
                      }
                    }]
                });
                alert.present();
                
              }else{
                
                  this.panelClaimList = result.panelclaims;
                  this.tpaClaimList = result.tpaclaims;

                  if(result.length == 0){
                    this.noRecordsFound = true;
                  }else{
                    this.noRecordsFound = false;
                    this.hideExportButton = true;
                  }
                  
                  this.claimHistoryList = result;//this.panelClaimList.concat(this.tpaClaimList);

                  // this.claimHistoryList.sort((a, b) => {
                  //   let date1 = new Date(a._Treatmentdate);
                  //   let date2 = new Date(b._Treatmentdate);

                  //   if (date2 > date1) {
                  //       return 1;
                  //   } else if (date2 < date1) {
                  //       return -1;
                  //   } else {
                  //       return 0;
                  //   }
                  // });
              }
            
          }, (err) => {
              this.loading.dismiss();
          }); 

      }
  }

  openClaim(index, mode){
    this.contactModal = this.modalCtrl.create(ClaimdetailsPage, {details: this.claimHistoryList[index], index:index, mode:mode});
    this.contactModal.present();

    /*
    if(mode == 'panel'){
      let contactModal = this.modalCtrl.create(ClaimdetailsPage, {details: this.panelClaimList[index],index: index,mode:mode});
      contactModal.present();
    }else{
      let contactModal = this.modalCtrl.create(ClaimdetailsPage, {details: this.tpaClaimList[index],index: index, mode:mode});
      contactModal.present();
    }
    */
  }

  gotoBenefits() {
      this.showBenefitsPage = true;
      this.showClaimsPage = false;
      this.rd.addClass(this.benefitsBtnElem.nativeElement, 'active');
      this.rd.removeClass(this.claimsBtnElem.nativeElement, 'active');
      this.showLoader();

      this.benefitsForm['employee_nric'] =  this.memberClaimInfo['MemberNRIC']; 
      this.benefitsForm['select_employeeName'] =  this.memberClaimInfo['MemberNRIC']; 
      this.benefitsForm['select_employeeName'] = 0;

      var params = "network="  + this.memberNetwork + "&membercompanyid=" + this.memberClaimInfo['MemberCompanyID'] + "&memberid=" + this.memberClaimInfo['MemberID'] + "&companyid=" + this.memberClaimInfo['CompanyID'] +"&internal_LoggedInUserRegisterID="+ this.memberClaimInfo['Internal_LoggedInUserRegisterID'];
      console.log(params)  

      this.claimService.loadBenefitPeriodAPI(params).then((result) => {
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
                          if(result.ValidateMessage.toLowerCase() != "records not found."){
                            this.navCtrl.setRoot(LoginNonmedinetPage);
                          }
                      }
                    }]
                });
                alert.present();
                
              }else{

                 this.benefitPeriod = result;
                 this.benefitsForm['select_benefitPeriod'] = 0
                 this.onChange(0);
              }
        
      }, (err) => {
          this.loading.dismiss();
      }); 
  }

  onChange(val){
      
    this.showLoader();  
    this.selectedBenefitPeriod = this.benefitPeriod[val].period;
    this.selectedBenefitID = this.benefitPeriod[val].id;
    var periodArray = this.selectedBenefitPeriod.split(' To ')
    var periodFrom = periodArray[0].split('From ')
    
    this.benefitsForm['benefitPlan_startDate'] = periodFrom[1];
    this.benefitsForm['benefitPlan_endDate'] = periodArray[1];

    var memIndex = this.benefitsForm['select_employeeName'];
    var params = "";

    if(memIndex > 0){
      params = "network="  + this.memberNetwork + "&membercompanyid=" + this.memberInfo[memIndex]['MemberCompanyID'] + "&memberbenefitplanid=" + this.selectedBenefitID  +"&internal_LoggedInUserRegisterID="+ this.memberClaimInfo['Internal_LoggedInUserRegisterID'];
    }else{
      params = "network="  + this.memberNetwork + "&membercompanyid=" + this.memberClaimInfo['MemberCompanyID'] + "&memberbenefitplanid=" + this.selectedBenefitID  +"&internal_LoggedInUserRegisterID="+ this.memberClaimInfo['Internal_LoggedInUserRegisterID'];
    }
    console.log(memIndex)
    console.log(params)
    
    this.claimService.getBenefitsAPI(params).then((result) => {
            this.loading.dismiss();

            if(result.Status == "Failed"){
              let alert = this.alertCtrl.create({
                title: 'Alert',
                message: result.ValidateMessage,
                enableBackdropDismiss: false,
                buttons: [{
                      text: 'OK',
                      role: 'Cancel',
                      handler: () => {
                        if(result.ValidateMessage.toLowerCase() != "records not found."){
                          this.navCtrl.setRoot(LoginNonmedinetPage);
                        }
                    }
                  }]
              });
              alert.present();
              
            }else{
               this.benefitsInfo = this.getBenefitsFromSync(result);
               this.tpa_benefits = result.tpa_benefits;
               this.inpanel_benefits = result.inpanel_benefits;
               console.log(result);
            }

            
        }, (err) => {
            this.loading.dismiss();
    }); 
  }

  onChangeName(val){
     console.log(val)
     this.claimForm['claimName'] = val;
  }

  backButtonClick()
	{
    
    // if(this.successSubmit !=undefined){
    // 	this.navCtrl.push(Homepa,{successSubmit: undefined}).then(() => {
    //       //this.navCtrl.remove(0,3);
    //   });
    //   this.successSubmit = undefined;
    // }else{
    //   this.navCtrl.pop({});
    // }
    this.navCtrl.setRoot(HomePage)
	}

  gotoSubmitClaims(){
    this.navCtrl.push( SubmitclaimsPage,{claimName: this.claimForm['claimName']} );
  }

  deleteSubmitClaimpage(){
    // this.hideMunaBackButton = false;
    // this.navCtrl.push(ClaimsPage).then(() => {
    //     const index = this.navCtrl.getActive().index;
            //this.navCtrl.remove(2,2);
        //this.navCtrl.pop();
    // });
  }


  onChangeNameBenefits(val){
     
      this.showLoader();
      var memIndex = this.benefitsForm['select_employeeName'];
      var params = "";

      if(memIndex > 0){
        params = "network="  + this.memberNetwork + "&membercompanyid=" + this.memberInfo[memIndex]['MemberCompanyID'] + "&memberid=" + this.memberInfo[memIndex]['MemberID'] + "&companyid=" + this.memberInfo[memIndex]['CompanyID'] +"&internal_LoggedInUserRegisterID="+ this.memberClaimInfo['Internal_LoggedInUserRegisterID'];
      }else{
        params = "network="  + this.memberNetwork + "&membercompanyid=" + this.memberClaimInfo['MemberCompanyID'] + "&memberid=" + this.memberClaimInfo['MemberID'] + "&companyid=" + this.memberClaimInfo['CompanyID'] +"&internal_LoggedInUserRegisterID="+ this.memberClaimInfo['Internal_LoggedInUserRegisterID'];
      }
      console.log(params)  

      this.claimService.loadBenefitPeriodAPI(params).then((result) => {
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
                          if(result.ValidateMessage.toLowerCase() != "records not found."){
                            this.navCtrl.setRoot(LoginNonmedinetPage);
                          }
                      }
                    }]
                });
                alert.present();
                
              }else{

                 this.benefitPeriod = result;
                 this.benefitsForm['select_benefitPeriod'] = 0
                 this.onChange(0);
              }
        
      }, (err) => {
          this.loading.dismiss();
      }); 

  }



}
