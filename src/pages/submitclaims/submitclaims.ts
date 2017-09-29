import { Component, } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController, ModalController, Platform, ViewController, MenuController} from 'ionic-angular';

import { Storage } from '@ionic/storage';
import { FormBuilder, Validators } from '@angular/forms';
import { Camera } from '@ionic-native/camera';
import { Base64 } from '@ionic-native/base64';
import { DomSanitizer } from '@angular/platform-browser';
import { File } from '@ionic-native/file';


import { SubmitClaimServiceProvider } from '../../providers/submit-claim-service/submit-claim-service';
import { SubmitClaimDetailsPage } from '../submit-claim-details/submit-claim-details';
import { ClaimsPage } from '../claims/claims';
import { AddSpPage } from '../add-sp/add-sp';
import { LoginNonmedinetPage } from '../login-nonmedinet/login-nonmedinet';

import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import * as moment from 'moment';


@IonicPage()
@Component({
  selector: 'page-submitclaims',
  templateUrl: 'submitclaims.html',
  providers: [SubmitClaimServiceProvider],
})

export class SubmitclaimsPage {


  loading: any;
  dateToday: any;
  claimEditDetails: any;
  memberInfo: any;
  memberClaimInfo: any;
  memberNetwork: any;
  memberNRIC: any;
  providers: any;
  providers1: any;
  acuteDiagnosisList: any;
  acuteDiagnosisList1: any;
  chronicDiagnosisList: any;
  chronicDiagnosisList1: any;
  claimTypes: any;
  claimForm = {};
  claimFormGroup: any;
  addFilesArr: any;
  saveFilesArr: any;
  deleteClaimParams: any;
  tpaClaimID: any;
  imgSrc: any;
  imgType: any;
  imgArr: any;
  imgArray=[];
  claimMode: any;
  

  acute1: boolean = true
  acute2: boolean = false
  acute3: boolean = false
  acute4: boolean = false

  chronic1: boolean = true
  chronic2: boolean = false
  chronic3: boolean = false
  chronic4: boolean = false

  showReferral: boolean = false
  isFromDevice: boolean = false
  isEdit: boolean = false

  showAD1: boolean = false;
  showAD2: boolean = false;
  showAD3: boolean = false;
  showAD4: boolean = false;

  showCD1: boolean = false;
  showCD2: boolean = false;
  showCD3: boolean = false;
  showCD4: boolean = false;

  showProv: boolean = false;

  base64ImageBefore: string;
  imageNameBefore: string;
  base64Image: string;
  imageName: string;

  successSubmit: any;
  hideCalculateClaim: boolean = false;
  maxDate: any;
  maxDateStr: any;


  constructor(public navCtrl: NavController, public navParams: NavParams, public storage: Storage,
    public submitClaimService: SubmitClaimServiceProvider,private alertCtrl: AlertController,
    public loadingCtrl: LoadingController,public formBuilder: FormBuilder,public modalCtrl: ModalController,
    private camera: Camera, private base64: Base64, public platform: Platform,public _DomSanitizer: DomSanitizer,
    private file: File, public http: Http, public viewCtrl: ViewController,public menuCtrl: MenuController,) {

      this.claimEditDetails = this.navParams.get('details');
      this.claimMode = this.navParams.get('mode');
      this.claimForm['select_acuteDiagnosis1'] = "";
      this.claimForm['select_chronicDiagnosis1'] = "";

      this.successSubmit = this.navParams.get('successSubmit');

      this.claimFormGroup = formBuilder.group({
            claimName: ['',Validators.compose([Validators.required])],
            toDate: ['',Validators.compose([Validators.required])],
            select_providerName: ['',Validators.compose([Validators.required])],
            select_claimType: ['',Validators.compose([Validators.required])],
            referral: [''],
            ref_clinic: [''],
            select_ref_clinicType: [''],
            select_acuteDiagnosis1: [''],
            select_acuteDiagnosis1x: [''],
            select_acuteDiagnosis2: [''],
            select_acuteDiagnosis2x: [''],
            select_acuteDiagnosis3: [''],
            select_acuteDiagnosis3x: [''],
            select_acuteDiagnosis4: [''],
            select_acuteDiagnosis4x: [''],
            //select_chronicDiagnosis1: ['',Validators.compose([Validators.required])],
            select_chronicDiagnosis1: [''],
            select_chronicDiagnosis1x: ['',],
            select_chronicDiagnosis2: [''],
            select_chronicDiagnosis2x: [''],
            select_chronicDiagnosis3: [''],
            select_chronicDiagnosis3x: [''],
            select_chronicDiagnosis4: [''],
            select_chronicDiagnosis4x: [''],
            remarks: [''],
            total_amount: ['',Validators.compose([Validators.required])],
            total_amount_gst: ['',Validators.compose([Validators.required])]
      });

       
     
  }

  ionViewDidLoad() {
      
      this.imageNameBefore = "Select File";
      this.imgArr = 0;
      this.dateToday = new Date();
      this.maxDate = new Date().toJSON().split('T')[0];
      this.claimFormGroup.controls['toDate'].setValue(new Date().toISOString());


       if(this.successSubmit !=undefined){
          //this.deleteSubmitClaimpage();
          this.hideCalculateClaim = true;
        }else{
          this.getNetwork();    
        }
      

  }

  showLoader(){
      this.loading = this.loadingCtrl.create({
          content: 'Please Wait...'
      });

      this.loading.present();
  }

  onChange(value) {
    console.log(this.claimFormGroup);
    
  }

  getNetwork(){
    this.showLoader();
    console.log(this.claimEditDetails)
    this.storage.get('memNetwork').then((val1) => {
        this.memberNetwork = val1;
        this.claimFormGroup.controls['claimName'].setValue('S8124356A');

        this.storage.get('claimMemInfo').then((val1) => {
            this.memberClaimInfo = val1;

              if(this.claimEditDetails != undefined){
                  //this.claimForm['claimName'] = this.claimEditDetails['PatientNRIC']; 
                  this.claimFormGroup.controls['claimName'].setValue(this.claimEditDetails._PatientNRIC);
              }else{
                  //this.claimForm['claimName'] = this.memberClaimInfo['MemberNRIC'];     
                  this.claimFormGroup.controls['claimName'].setValue(this.memberClaimInfo['MemberNRIC']);
              }
        });

        this.storage.get('memInfo').then((val) => {
            this.memberInfo = val;
            
              if(this.claimEditDetails != undefined){
                  this.claimFormGroup.controls['claimName'].setValue(this.claimEditDetails._PatientNRIC);
              }else{
                  this.claimFormGroup.controls['claimName'].setValue(this.memberClaimInfo['MemberNRIC']);
              }

              console.log(this.claimForm['claimName']);
            
            this.getClaimTypes();
            
            
        });
    });

  }

  /// *******************   GET FROM LOGIN API ***************
  async getFromStorageAsync(){
    return await this.storage.get('claimMemInfo');
  }
  /// *******************   END  ***************

  getClaimTypes(){
    
    var params = "network="  + this.memberNetwork + "&membercompanyid=" + this.memberClaimInfo['MemberCompanyID']  +"&internal_LoggedInUserRegisterID="+ this.memberClaimInfo['Internal_LoggedInUserRegisterID'];
    
    this.submitClaimService.loadClaimTypeAPI(params).then((result) => {
      
      if(result.ValidateMessage != undefined){
        let alert = this.alertCtrl.create({
          title: 'Alert',
          message: result.ValidateMessage,
          buttons: [{
                text: 'OK',
                role: 'cancel',
                handler: () => {
                  console.log('Cancel clicked');
                  return;
              }
            }]
        });
        alert.present();
      }else{
        this.claimTypes = result;
        //console.log(result)
        this.getProvider();
        
      }
    }, (err) => {
      this.loading.dismiss();
      console.log(err)
    });
  }

  getProvider(){
    
    var parameters = "network="  + this.memberNetwork + "&internal_LoggedInUserRegisterID="+ this.memberClaimInfo['Internal_LoggedInUserRegisterID'];

    this.submitClaimService.loadProvidersAPI(parameters).then((result) => {
      if(result.ValidateMessage != undefined){
        let alert = this.alertCtrl.create({
          title: 'Alert',
          message: result.ValidateMessage,
          buttons: [{
                text: 'OK',
                role: 'cancel',
                handler: () => {
                  console.log('Cancel clicked');
                  return;
              }
            }]
        });
        alert.present();
      }else{
        this.providers = result;
        this.providers1 = result;
        //console.log(result)
        this.getAcuteDiagnosis();
      }
      
    }, (err) => {
      this.loading.dismiss();
    });
  
  }

  onChangeClaimType(){
    console.log(this.claimFormGroup.controls['select_claimType'].value);

    var claimType = this.claimTypes[this.claimFormGroup.controls['select_claimType'].value].RefColumnName;

    if( claimType.toLowerCase() == "xray_p" || claimType.toLowerCase() == "lab_p"){
      this.showReferral = true     
    }else{
      this.showReferral = false
    }
  }


  getAcuteDiagnosis(){
    var parameters = "network="  + this.memberNetwork + "&internal_LoggedInUserRegisterID="+ this.memberClaimInfo['Internal_LoggedInUserRegisterID'];

    this.submitClaimService.loadAcuteDiagnosisAPI(parameters).then((result) => {
      if(result.ValidateMessage != undefined){
        let alert = this.alertCtrl.create({
          title: 'Alert',
          message: result.ValidateMessage,
          buttons: [{
                text: 'OK',
                role: 'cancel',
                handler: () => {
                  console.log('Cancel clicked');
                  return;
              }
            }]
        });
        alert.present();
      }else{
        this.acuteDiagnosisList = result;
        this.acuteDiagnosisList1 = result;
        
        this.getChronicDiagnosis();  
      }
      
    }, (err) => {
      this.loading.dismiss();
    });
  }


  getChronicDiagnosis(){
    this.claimFormGroup.controls['referral'].setValue(false);

    var parameters = "network="  + this.memberNetwork + "&internal_LoggedInUserRegisterID="+ this.memberClaimInfo['Internal_LoggedInUserRegisterID'];

    this.submitClaimService.loadChronicDiagnosisAPI(parameters).then((result) => {
      if(result.ValidateMessage != undefined){
        let alert = this.alertCtrl.create({
          title: 'Alert',
          message: result.ValidateMessage,
          buttons: [{
                text: 'OK',
                role: 'cancel',
                handler: () => {
                  console.log('Cancel clicked');
                  return;
              }
            }]
        });
        alert.present();
      }else{
        this.chronicDiagnosisList = result;
        this.chronicDiagnosisList1 = result;
        //console.log(result)
        
        if(this.claimEditDetails != undefined ){
          this.getFileList();
        }else{
          this.generateClaimID("");
        }
        
      }
      
    }, (err) => {
      this.loading.dismiss();
    });
  }

  displayEditClaims(){
      this.loading.dismiss();
     
      var varClaimForm = this.claimFormGroup;
      this.tpaClaimID = this.claimEditDetails._ID

      if(this.claimMode != undefined){
        if(this.claimMode == 'edit'){
          this.isEdit = true;
          
          for(var i=0; i<this.claimTypes.length; i++){ 
            if(this.claimEditDetails._ClaimType == this.claimTypes[i].ClaimTypeDescription){
               varClaimForm.controls['select_claimType'].setValue(this.claimTypes[i].ClaimTypeDescription.indexOf(this.claimEditDetails._ClaimType));
            }
          }

          for(var i=0; i<this.providers.length; i++){ 
            if(this.claimEditDetails._providername == this.providers[i].Name){
               varClaimForm.controls['select_providerName'].setValue(this.providers[i].Name.indexOf(this.claimEditDetails._providername));
            }
          }

          ///======= CHRONIC
          for(var i=0; i<this.chronicDiagnosisList1.length; i++){ 

            if(this.claimEditDetails._ChronicDiagnosis1 == this.chronicDiagnosisList1[i].ID){
              var index1 = this.chronicDiagnosisList1[i].ID.indexOf(this.claimEditDetails._ChronicDiagnosis1)
               varClaimForm.controls['select_chronicDiagnosis1'].setValue(this.chronicDiagnosisList1[i].ID.indexOf(this.claimEditDetails._ChronicDiagnosis1));
               varClaimForm.controls['select_chronicDiagnosis1x'].setValue(this.chronicDiagnosisList1[index1].Description);
            }
            if(this.claimEditDetails._ChronicDiagnosis2 != "00000000-0000-0000-0000-000000000000"){
              this.chronic2 = true;
            }
            if(this.claimEditDetails._ChronicDiagnosis2 == this.chronicDiagnosisList1[i].ID){
               varClaimForm.controls['select_chronicDiagnosis2'].setValue(this.chronicDiagnosisList1[i].ID.indexOf(this.claimEditDetails._ChronicDiagnosis2));
               varClaimForm.controls['select_chronicDiagnosis2x'].setValue(this.chronicDiagnosisList1[i].Description);
            }
            if(this.claimEditDetails._ChronicDiagnosis3 != "00000000-0000-0000-0000-000000000000"){
              this.chronic3 = true;
            }
            if(this.claimEditDetails._ChronicDiagnosis3 == this.chronicDiagnosisList1[i].ID){
               varClaimForm.controls['select_chronicDiagnosis3'].setValue(this.chronicDiagnosisList1[i].ID.indexOf(this.claimEditDetails._ChronicDiagnosis3));
               varClaimForm.controls['select_chronicDiagnosis3x'].setValue(this.chronicDiagnosisList1[i].Description);
            }
            if(this.claimEditDetails._ChronicDiagnosis4 != "00000000-0000-0000-0000-000000000000"){
              this.chronic4 = true;
            }
            if(this.claimEditDetails._ChronicDiagnosis4 == this.chronicDiagnosisList1[i].ID){
               varClaimForm.controls['select_chronicDiagnosis4'].setValue(this.chronicDiagnosisList1[i].ID.indexOf(this.claimEditDetails._ChronicDiagnosis4));
               varClaimForm.controls['select_chronicDiagnosis4x'].setValue(this.chronicDiagnosisList1[i].Description);
            }

          }

          ///======= ACUTE
          for(var i=0; i<this.acuteDiagnosisList1.length; i++){ 

            if(this.claimEditDetails._PrimaryDiagnosis.toLowerCase() == this.acuteDiagnosisList1[i].Description.toLowerCase()){
              var index1 =  this.acuteDiagnosisList1[i].Description.indexOf(this.claimEditDetails._PrimaryDiagnosis)
               varClaimForm.controls['select_acuteDiagnosis1'].setValue(this.acuteDiagnosisList1[index1].ID);
               varClaimForm.controls['select_acuteDiagnosis1x'].setValue(this.claimEditDetails._PrimaryDiagnosis);
            }
            if(this.claimEditDetails._SecondaryDiagnosis != "00000000-0000-0000-0000-000000000000"){
              this.acute2 = true;
            }
            if(this.claimEditDetails._SecondaryDiagnosis.toLowerCase() == this.acuteDiagnosisList1[i].Description.toLowerCase()){
              var index2 =  this.acuteDiagnosisList1[i].Description.indexOf(this.claimEditDetails._SecondaryDiagnosis)
               varClaimForm.controls['select_acuteDiagnosis2'].setValue(this.acuteDiagnosisList1[index2].ID);
               varClaimForm.controls['select_acuteDiagnosis2x'].setValue(this.claimEditDetails._SecondaryDiagnosis);
            }
          //   if(this.claimEditDetails._ChronicDiagnosis3 == this.acuteDiagnosisList1[i].ID){
          //      varClaimForm.controls['select_acuteDiagnosis3'].setValue(this.acuteDiagnosisList1[i].ID.indexOf(this.claimEditDetails._AcuteDiagnosis3));
          //      varClaimForm.controls['select_acuteDiagnosis3x'].setValue(this.acuteDiagnosisList1[i].Description.indexOf(this.claimEditDetails._AcuteDiagnosis3));
          //   }
          //   if(this.claimEditDetails._ChronicDiagnosis4 == this.acuteDiagnosisList1[i].ID){
          //      varClaimForm.controls['select_acuteDiagnosis4'].setValue(this.acuteDiagnosisList1[i].ID.indexOf(this.claimEditDetails._AcuteDiagnosis4));
          //      varClaimForm.controls['select_acuteDiagnosis4x'].setValue(this.acuteDiagnosisList1[i].Description.indexOf(this.claimEditDetails._AcuteDiagnosis4));
          //   }

          }

          varClaimForm.controls['toDate'].setValue(this.claimEditDetails._Treatmentdate);
          varClaimForm.controls['select_acuteDiagnosis1'].setValue(this.claimEditDetails._AcuteDiagnosis1);
          varClaimForm.controls['select_acuteDiagnosis2'].setValue(this.claimEditDetails._AcuteDiagnosis2);
          varClaimForm.controls['select_acuteDiagnosis3'].setValue(this.claimEditDetails._AcuteDiagnosis3);
          varClaimForm.controls['select_acuteDiagnosis4'].setValue(this.claimEditDetails._AcuteDiagnosis4);
          varClaimForm.controls['remarks'].setValue(this.claimEditDetails._Remarks);
          varClaimForm.controls['referral'].setValue(this.claimEditDetails._ReferralLetter)
          varClaimForm.controls['total_amount'].setValue(this.claimEditDetails._TotalDeductAmount);
          varClaimForm.controls['total_amount_gst'].setValue(this.claimEditDetails._TotalFeeGST);


        }
      }else{
        this.isEdit = false;
      }
  }


  getFileList(){
    this.tpaClaimID = this.claimEditDetails._ID
    var params = {
            network: this.memberNetwork,
            tpaclaimid: this.tpaClaimID,
            internal_LoggedInUserRegisterID: this.memberInfo[0]['Internal_LoggedInUserRegisterID'],
    }

    this.submitClaimService.getFilePerClaimAPI(params).then((result) => {
      
      if(result.ValidateMessage != undefined){
        let alert = this.alertCtrl.create({
          title: 'Alert',
          message: result.ValidateMessage,
          buttons: [{
                text: 'OK',
                role: 'cancel',
                handler: () => {
                  console.log('Cancel clicked');
                  return;
              }
            }]
        });
        alert.present();
      }else{
        console.log(result);
        this.imgArray = result;
        this.displayEditClaims();
      }
    }, (err) => {
      this.loading.dismiss();
      console.log(err)
    });
  }


  generateClaimID(params){
    this.submitClaimService.generateClaimID(params).then((response) => {
        this.tpaClaimID = response.id;
        this.loading.dismiss();
    }, (err) => {
          this.loading.dismiss();
    });
  }

  openAddSP(index){
    let contactModal = this.modalCtrl.create(AddSpPage,);
    contactModal.present();
  }


  addAcute(selectID){

      let alert = this.alertCtrl.create({
          title: 'Alert',
          message: 'Please enter diagnosis',
          buttons: [{
                text: 'OK',
                role: 'cancel',
                handler: () => {
                  console.log('Cancel clicked');
                  return;
              }
            }]
        });
  
      var varClaimForm = this.claimFormGroup;

      if(varClaimForm.controls['select_acuteDiagnosis1x'].value == undefined || varClaimForm.controls['select_acuteDiagnosis1x'].value == "") { 
        alert.present();
      }else{
        if(selectID == 'ad_2'){ this.acute2 = true; return;}
        if(varClaimForm.controls['select_acuteDiagnosis2x'].value == "" || varClaimForm.controls['select_acuteDiagnosis2x'].value == undefined){
          alert.present();
        }else{
          if(selectID == 'ad_3'){this.acute3 = true; return;}
          if(varClaimForm.controls['select_acuteDiagnosis3x'].value == "" || varClaimForm.controls['select_acuteDiagnosis3x'].value == undefined){
            alert.present();
          }else{
            if(selectID == 'ad_4'){this.acute4 = true; }
          }
        }
      }  
  }


  removeAcute(selectID){
    
    var varClaimForm = this.claimFormGroup;
    if(selectID == 'ad_2'){this.acute2 = false; varClaimForm.controls['select_acuteDiagnosis2x'].setValue("");}
    if(selectID == 'ad_3'){this.acute3 = false; varClaimForm.controls['select_acuteDiagnosis3x'].setValue("");}
    if(selectID == 'ad_4'){this.acute4 = false; varClaimForm.controls['select_acuteDiagnosis4x'].setValue("");}
  }

  addChronic(selectID){

      let alert = this.alertCtrl.create({
          title: 'Alert',
          message: 'Please enter diagnosis',
          buttons: [{
                text: 'OK',
                role: 'cancel',
                handler: () => {
                  console.log('Cancel clicked');
                  return;
              }
            }]
        });
      var varClaimForm = this.claimFormGroup;
      //if(this.claimForm['select_chronicDiagnosis1'] == undefined || this.claimForm['select_chronicDiagnosis1'] == "" ){
      if(varClaimForm.controls['select_chronicDiagnosis1x'].value == undefined || varClaimForm.controls['select_chronicDiagnosis1x'].value == "" ){  
        alert.present();
      }else{
        if(selectID == 'cd_2'){ this.chronic2 = true;  return;}
        if(varClaimForm.controls['select_chronicDiagnosis2x'].value == "" || varClaimForm.controls['select_chronicDiagnosis2x'].value == undefined){
          alert.present();
        }else{
          if(selectID == 'cd_3'){ this.chronic3 = true; return;}
          if(varClaimForm.controls['select_chronicDiagnosis3x'].value == "" || varClaimForm.controls['select_chronicDiagnosis3x'].value == undefined){
            alert.present();
          }else{
            if(selectID == 'cd_4'){ this.chronic4 = true;}
          }
        }
      } 
  }

  removeChronic(selectID){
    console.log(selectID);
    var varClaimForm = this.claimFormGroup;
    if(selectID == 'cd_2'){this.chronic2 = false;varClaimForm.controls['select_chronicDiagnosis2x'].setValue("");}
    if(selectID == 'cd_3'){this.chronic3 = false;varClaimForm.controls['select_chronicDiagnosis3x'].setValue("");}
    if(selectID == 'cd_4'){this.chronic4 = false;varClaimForm.controls['select_chronicDiagnosis4x'].setValue("");}
  }


  submitClaim(){
    this.showLoader();
    console.log(this.claimFormGroup)

    if(!this.claimFormGroup.valid){
      this.loading.dismiss();
      let alert = this.alertCtrl.create({
          title: 'Alert',
          message: 'Please complete all the needed fields',
          buttons: [{
                text: 'OK',
                role: 'cancel',
                handler: () => {
                  console.log('Cancel clicked');
                  return;
              }
            }]
        });
        alert.present()
    }else{

      console.log('success');
      var varClaimForm = this.claimFormGroup;
      var now = new Date();
      var day = ("0" + now.getDate()).slice(-2);
      var month = ("0" + (now.getMonth() + 1)).slice(-2);
      var today = now.getFullYear() + "-" + (month) + "-" + (day);


      //this.submitClaimService.generateClaimID(params).then((response) => {

          this.loading.dismiss();

          var submitclaimsDetails = {
                  network: this.memberNetwork,
                  id: this.tpaClaimID,
                  membercompanyid: this.memberClaimInfo.MemberCompanyID,
                  internal_LoggedInUserRegisterID: this.memberInfo[0]['Internal_LoggedInUserRegisterID'],
                  memberid: this.memberClaimInfo.MemberID,
                  clinicid: this.providers[varClaimForm.controls['select_providerName'].value].Code,
                  clinicname: this.providers[varClaimForm.controls['select_providerName'].value].Name,
                  claimtype: this.claimTypes[varClaimForm.controls['select_claimType'].value].RefColumnName,
                  claimtypedesc: this.claimTypes[varClaimForm.controls['select_claimType'].value].ClaimTypeDescription,
                  receiptno: "",
                  referralclinicname: "",
                  isreferralletter: varClaimForm.controls['referral'].value,
                  referralclinictype: "",
                  mcreason: "",
                  primarydiagnosisid: varClaimForm.controls['select_acuteDiagnosis1'].value,
                  primarydiagnosisdesc: varClaimForm.controls['select_acuteDiagnosis1x'].value,
                  primarychronicdiagnosisid: varClaimForm.controls['select_chronicDiagnosis1'].value,
                  primarychronicdiagnosisdesc: varClaimForm.controls['select_chronicDiagnosis1x'].value,
                  isspecialclaim: "",
                  remarks: varClaimForm.controls['remarks'].value,
                  allowexceedclaimlimit: "",
                  isspecializedprocedure: "",
                  totalamount: parseFloat(varClaimForm.controls['total_amount'].value),
                  totalgstamount: parseFloat(varClaimForm.controls['total_amount_gst'].value),
                  treatmentdate: varClaimForm.controls['toDate'].value,
                  submissionDate: today
          }

          if(varClaimForm.controls['ref_clinic'].value != ""){
              submitclaimsDetails['referralclinicname'] = varClaimForm.controls['ref_clinic'].value;
              submitclaimsDetails['referralclinictype'] = varClaimForm.controls['select_ref_clinicType'].value;
          }

          if(varClaimForm.controls['select_acuteDiagnosis1'].value != "" || varClaimForm.controls['select_acuteDiagnosis1'].value !=undefined){
              submitclaimsDetails['primarydiagnosisid'] = varClaimForm.controls['select_acuteDiagnosis1'].value;
              submitclaimsDetails['primarydiagnosisdesc'] = varClaimForm.controls['select_acuteDiagnosis1x'].value;
          }else{
              submitclaimsDetails['primarydiagnosisid'] = "00000000-0000-0000-0000-000000000000";
              submitclaimsDetails['primarydiagnosisdesc'] = "00000000-0000-0000-0000-000000000000";
          }

          //if(varClaimForm.controls['select_chronicDiagnosis1'].value != "" || varClaimForm.controls['select_chronicDiagnosis1'].value !=undefined){
            //  submitclaimsDetails['primarychronicdiagnosisid'] = varClaimForm.controls['select_chronicDiagnosis1'].value;
             // submitclaimsDetails['primarychronicdiagnosisdesc'] = varClaimForm.controls['select_chronicDiagnosis1x'].value;
          //}else{
              submitclaimsDetails['primarychronicdiagnosisid'] = "00000000-0000-0000-0000-000000000000";
              submitclaimsDetails['primarychronicdiagnosisdesc'] = "00000000-0000-0000-0000-000000000000";
          //}
          
          if(varClaimForm.controls['select_acuteDiagnosis2'].value != ""){
              submitclaimsDetails['secondarydiagnosisid'] = varClaimForm.controls['select_acuteDiagnosis2'].value;
              submitclaimsDetails['secondarydiagnosisdesc'] = varClaimForm.controls['select_acuteDiagnosis2x'].value;
          }else{
              submitclaimsDetails['secondarydiagnosisid'] = "00000000-0000-0000-0000-000000000000";
              submitclaimsDetails['secondarydiagnosisdesc'] = "00000000-0000-0000-0000-000000000000";
          }
          if(varClaimForm.controls['select_chronicDiagnosis2'].value != ""){
              submitclaimsDetails['secondarychronicdiagnosisid'] = varClaimForm.controls['select_chronicDiagnosis2'].value;
              submitclaimsDetails['secondarychronicdiagnosisdesc'] = varClaimForm.controls['select_chronicDiagnosis2x'].value;
          }else{
              submitclaimsDetails['secondarychronicdiagnosisid'] = "00000000-0000-0000-0000-000000000000";
              submitclaimsDetails['secondarychronicdiagnosisdesc'] = "00000000-0000-0000-0000-000000000000"; 
          }

          var isEdit = "";
          if(this.claimEditDetails != undefined){ 
            isEdit = "yes"
            //======= SAVE FILES ARR
            this.saveFilesArr = {
              network: this.memberNetwork,
              internal_LoggedInUserRegisterID: this.memberInfo[0]['Internal_LoggedInUserRegisterID'],  
              tpaclaimid: this.tpaClaimID,
            }
          }

          let claimModal = this.modalCtrl.create(SubmitClaimDetailsPage, {details: submitclaimsDetails, files: this.saveFilesArr, isEdit: isEdit, network: this.memberNetwork});
          
          claimModal.present();

      // }, (err) => {
      //     this.loading.dismiss();
      // });
    }
  }

  backButtonClick()
	{
    	this.navCtrl.pop();  // remember to put this to add the back button behavior
	}

  browseFile(){

      let alert = this.alertCtrl.create({
          title: 'Select Files from',
          buttons: [
            {
              text: 'Camera',
              role: 'cancel',
              handler: () => {
                console.log('camera clicked');
                this.useCamera();

              }
            },
            {
              text: 'Gallery',
              handler: () => {
                console.log('Gallery clicked');
                this.useGallery();
              }
            }
          ]
      });
    alert.present();
  }

  useCamera(){
    this.camera.getPicture({
        destinationType: this.camera.DestinationType.FILE_URI,
        targetWidth: 1000,
        targetHeight: 1000,
        saveToPhotoAlbum: false
    }).then((imageData) => {
      // this.base64Image = "data:image/jpeg;base64," + imageData;
      var fileName = imageData.substring(imageData.lastIndexOf('/')+1);
        this.imageNameBefore = fileName;
        this.imgType = "jpg"
        let filePath: string = '';

        if (this.platform.is('android')) {
          filePath = imageData;
        }else{
          filePath = imageData
        }

        console.log(filePath);
        
        // this.base64.encodeFile(filePath).then((base64File: string) => {
            
        //     var content = base64File.split("data:image/*;charset=utf-8;base64,").pop()
        //     var substr = content.substring(0,4)
        //     if(substr == '/9j/'){
        //       // this.isFromDevice = true
        //       this.base64ImageBefore = "data:image/jpeg;base64," + content;  
        //     }else{
        //       this.base64ImageBefore = "data:image/jpeg;base64," + content;
        //       // this.isFromDevice = false
        //     }

        //     this.addFilesArr = {
        //        network: this.memberNetwork,
        //        membername: this.memberClaimInfo.MemberName,
        //        internal_LoggedInUserRegisterID: this.memberInfo[0]['Internal_LoggedInUserRegisterID'],  
        //        tpaclaimid: this.tpaClaimID,
        //        filename: this.imageNameBefore,
        //        filecontent: content
        //     }
           
        // }, (err) => {
        //     console.log(err);
        // });


        //*****************|  GET FILE NAME AND FILE SIZE  |***************

        (<any>window).resolveLocalFileSystemURL(filePath, (res) => {
            res.file((resFile) => {
              var res = resFile.name.split(".");
              var filetype = "";
                //**************|  CONDITION FILE SIZE  |**************
                if(resFile.size > 5000000){
                    let alert = this.alertCtrl.create({
                          title: 'Alert',
                          message: 'File size reached the limit',
                          buttons: [{
                                text: 'OK',
                                role: 'cancel',
                                handler: () => {
                                  console.log('Cancel clicked');
                                  return;
                              }
                            }]
                        });
                    alert.present();
                }
                //**************|  END CONDITION FILE SIZE  |**************

                if(res.length > 2){
                  this.imgType = res[2];
                  filetype = res[2];
                }else{
                  this.imgType = res[1];
                  filetype = res[1];
                }

                //*********** IMAGE CONVERSION TO BASE64 *********
                this.base64.encodeFile(filePath).then((base64File: string) => {
                console.log(filetype)    
                    var content = base64File.split("data:image/*;charset=utf-8;base64,").pop()
                    //var substr = content.substring(0,4)

                    if (this.platform.is('android')) {
                      if(this.imgType.toLowerCase() == 'jpg'){
                        this.base64ImageBefore = "data:image/jpeg;base64," + content;  
                      }else if(this.imgType.toLowerCase() == 'png'){
                        this.base64ImageBefore = "data:image/png;base64," + content;  
                      }else{
                        this.base64ImageBefore = "./assets/img/pdf-icon.png";
                      }
                    }else{
                      if(this.imgType.toLowerCase() == 'jpg'){
                        this.base64ImageBefore =  content;  
                      }else if(this.imgType.toLowerCase() == 'png'){
                        this.base64ImageBefore =  content;  
                      }else{
                        this.base64ImageBefore = "./assets/img/pdf-icon.png";
                      }
                    }
                    console.log('aaaaaaaaaaaaaa')
                    console.log(this.base64ImageBefore)

                    this.addFilesArr = {
                       network: this.memberNetwork,
                       membername: this.memberClaimInfo.MemberName,
                       internal_LoggedInUserRegisterID: this.memberInfo[0]['Internal_LoggedInUserRegisterID'],  
                       tpaclaimid: this.tpaClaimID,
                       filename: this.imageNameBefore,
                       filecontent: content
                    }
                    

                }, (err) => {
                    console.log(err);
                });
            })
        })


    }, (err) => {
        console.log(err);
    });

  }

  useGallery(){
    this.camera.getPicture({
        destinationType: this.camera.DestinationType.FILE_URI,
        sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
        mediaType: this.camera.MediaType.ALLMEDIA,
        encodingType: this.camera.EncodingType.JPEG,
        targetWidth: 1000,
        targetHeight: 1000,
        saveToPhotoAlbum: false
    }).then((imageData) => {

      //this.currentImage base64
        
        var fileName = imageData.substring(imageData.lastIndexOf('/')+1);
        this.imageNameBefore = fileName;
        let filePath: string = '';

        if (this.platform.is('android')) {
          filePath = "file://" + imageData;
        }else{
          filePath = imageData
        }
        console.log(filePath);

        
        //*********** GET FILE NAME AND FILE SIZE *********

        (<any>window).resolveLocalFileSystemURL(filePath, (res) => {
            res.file((resFile) => {
                console.log(resFile)
                var res = resFile.name.split(".");
                var filetype = "";

                //**************** CONDITION FILE TYPE ********
                if(res.length > 2){
                  this.imgType = res[2];
                  filetype = res[2];
                    if(res[2] != "jpg" && res[2] != "JPG" && res[2] != "png" && res[2] != "PNG" && res[2] != "pdf" && res[2] != "PDF" && res[2] != "jpeg" && res[2] != "JPEG"){
                       let alert = this.alertCtrl.create({
                            title: 'Alert',
                            message: 'File not allowed',
                            buttons: [{
                                  text: 'OK',
                                  role: 'cancel',
                                  handler: () => {
                                    console.log('Cancel clicked');
                                    return;
                                }
                              }]
                          });
                          alert.present();
                    }
                }else{
                  this.imgType = res[1];
                  filetype = res[1];
                    if(res[1] != "jpg" && res[1] != "JPG" && res[1] != "png" && res[1] != "PNG" && res[1] != "pdf" && res[1] != "PDF" && res[1] != "jpeg" && res[1] != "JPEG"){
                        let alert = this.alertCtrl.create({
                            title: 'Alert',
                            message: 'File not allowed',
                            buttons: [{
                                  text: 'OK',
                                  role: 'cancel',
                                  handler: () => {
                                    console.log('Cancel clicked');
                                    return;
                                }
                              }]
                          });
                          alert.present();
                    }
                }
                //************** END CONDITION FILE TYPE **************

                //************** CONDITION FILE SIZE **************
                if(resFile.size > 5000000){
                    let alert = this.alertCtrl.create({
                          title: 'Alert',
                          message: 'File size reached the limit',
                          buttons: [{
                                text: 'OK',
                                role: 'cancel',
                                handler: () => {
                                  console.log('Cancel clicked');
                                  return;
                              }
                            }]
                        });
                    alert.present();
                    
                }
                //************** END CONDITION FILE SIZE **************


                //*********** IMAGE CONVERSION TO BASE64 *********
                this.base64.encodeFile(filePath).then((base64File: string) => {
                //console.log(filetype)    
                    var content = base64File.split("data:image/*;charset=utf-8;base64,").pop()
                    //var substr = content.substring(0,4)
                    if (this.platform.is('android')) {
                      if(this.imgType.toLowerCase() == 'jpg'){
                        this.base64ImageBefore = "data:image/jpeg;base64," + content;  
                      }else if(this.imgType.toLowerCase() == 'png'){
                        this.base64ImageBefore = "data:image/png;base64," + content;  
                      }else{
                        this.base64ImageBefore = "./assets/img/pdf-icon.png";
                      }
                    }else{
                      if(this.imgType.toLowerCase() == 'jpg'){
                        this.base64ImageBefore =  content;  
                      }else if(this.imgType.toLowerCase() == 'png'){
                        this.base64ImageBefore =  content;  
                      }else{
                        this.base64ImageBefore = "./assets/img/pdf-icon.png";
                      }
                    }

                    this.addFilesArr = {
                       network: this.memberNetwork,
                       membername: this.memberClaimInfo.MemberName,
                       internal_LoggedInUserRegisterID: this.memberInfo[0]['Internal_LoggedInUserRegisterID'],  
                       tpaclaimid: this.tpaClaimID,
                       filename: this.imageNameBefore,
                       filecontent: content
                    }
                    
                    console.log(this.addFilesArr)
                }, (err) => {
                    console.log(err);
                });




            })
        })

    }, (err) => {
        console.log(err);
    });

  }

  addImage() {
    var new_item = {};
    this.showLoader()
    console.log(this.addFilesArr)

    this.submitClaimService.addFile(this.addFilesArr).then((result) => {
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
                
                this.imageName = this.imageNameBefore
                new_item['_AcutalFileName'] = this.imageNameBefore;
                new_item['_FilePathUrl'] = this.base64ImageBefore;
                new_item['_FileType'] = this.imgType;

                this.imgArray.push(new_item);

                //console.log('success file attachment')
                //console.log(result)

                //======= SAVE FILES ARR
                this.saveFilesArr = {
                  network: this.memberNetwork,
                  internal_LoggedInUserRegisterID: this.memberInfo[0]['Internal_LoggedInUserRegisterID'],  
                  tpaclaimid: this.tpaClaimID,
                }

            }
          this.loading.dismiss();  

        }, (err) => {
          console.log(err)
          this.loading.dismiss();
      });
    console.log('this.imgArr=');
    console.log(this.imgArray);
    
  }


  removeImage(i) {
    console.log(i)
    this.imgArray.splice(i,1); 
    
  }

  initializeItems(){
    this.acuteDiagnosisList = this.acuteDiagnosisList1;
    this.chronicDiagnosisList = this.chronicDiagnosisList1;
    this.providers = this.providers1;
  }

  onInputChangeProvider(ev: any) {
    // Reset items back to all of the items
    this.initializeItems();

    // set val to the value of the searchbar
    let val = ev.target.value;
    if (val && val.trim() != '') {
      this.providers = this.providers.filter((item) => {
        return (item.Name.toLowerCase().indexOf(val.toLowerCase()) > -1);
      });
      this.showProv = true;
    } else {
      this.showProv = false;
    }
  }

  selectedProv(item){
    this.showProv = false;
    this.claimFormGroup.controls['select_providerName'].setValue(this.providers[item].Name);
  }


  onInputChangeAD1(ev: any) {
    // Reset items back to all of the items
    this.initializeItems();

    // set val to the value of the searchbar
    let val = ev.target.value;
    // if the value is an empty string don't filter the items

    if (val && val.trim() != '') {
      
      // Filter the items
      this.acuteDiagnosisList = this.acuteDiagnosisList.filter((item) => {
        return (item.Description.toLowerCase().indexOf(val.toLowerCase()) > -1);
      });
      
      // Show the results
      this.showAD1 = true;
    } else {
      
      // hide the results when the query is empty
      this.showAD1 = false;
    }
  }

  selectedAD1(item){
    this.showAD1 = false;
    this.claimFormGroup.controls['select_acuteDiagnosis1'].setValue(this.acuteDiagnosisList[item].ID);
    this.claimFormGroup.controls['select_acuteDiagnosis1x'].setValue(this.acuteDiagnosisList[item].Description);
  }


  onInputChangeAD2(ev: any) {
    // Reset items back to all of the items
    this.initializeItems();
    let val = ev.target.value;
    if (val && val.trim() != '') {
      this.acuteDiagnosisList = this.acuteDiagnosisList.filter((item) => {
        return (item.Description.toLowerCase().indexOf(val.toLowerCase()) > -1);
      });
      this.showAD2 = true;
    } else {
      this.showAD2 = false;
    }
  }

  selectedAD2(item){
    this.showAD2 = false;
    this.claimFormGroup.controls['select_acuteDiagnosis2'].setValue(this.acuteDiagnosisList[item].ID);
    this.claimFormGroup.controls['select_acuteDiagnosis2x'].setValue(this.acuteDiagnosisList[item].Description);
  }

  onInputChangeAD3(ev: any) {
    // Reset items back to all of the items
    this.initializeItems();
    let val = ev.target.value;
    if (val && val.trim() != '') {
      this.acuteDiagnosisList = this.acuteDiagnosisList.filter((item) => {
        return (item.Description.toLowerCase().indexOf(val.toLowerCase()) > -1);
      });
      this.showAD3 = true;
    } else {
      this.showAD3 = false;
    }
  }

  selectedAD3(item){
    this.showAD3 = false;
    this.claimFormGroup.controls['select_acuteDiagnosis3'].setValue(this.acuteDiagnosisList[item].ID);
    this.claimFormGroup.controls['select_acuteDiagnosis3x'].setValue(this.acuteDiagnosisList[item].Description);
  }

  onInputChangeAD4(ev: any) {
    // Reset items back to all of the items
    this.initializeItems();
    let val = ev.target.value;
    if (val && val.trim() != '') {
      this.acuteDiagnosisList = this.acuteDiagnosisList.filter((item) => {
        return (item.Description.toLowerCase().indexOf(val.toLowerCase()) > -1);
      });
      this.showAD4 = true;
    } else {
      this.showAD4 = false;
    }
  }

  selectedAD4(item){
    this.showAD4 = false;
    this.claimFormGroup.controls['select_acuteDiagnosis4'].setValue(this.acuteDiagnosisList[item].ID);
    this.claimFormGroup.controls['select_acuteDiagnosis4x'].setValue(this.acuteDiagnosisList[item].Description);
  }

  onInputChangeCD1(ev: any) {
    // Reset items back to all of the items
    this.initializeItems();
    let val = ev.target.value;
    if (val && val.trim() != '') {
      this.chronicDiagnosisList = this.chronicDiagnosisList.filter((item) => {
        return (item.Description.toLowerCase().indexOf(val.toLowerCase()) > -1);
      });
      this.showCD1 = true;
    } else {
      this.showCD1 = false;
    }
  }

  selectedCD1(item){
    this.showCD1 = false;
    this.claimFormGroup.controls['select_chronicDiagnosis1'].setValue(this.chronicDiagnosisList[item].ID);
    this.claimFormGroup.controls['select_chronicDiagnosis1x'].setValue(this.chronicDiagnosisList[item].Description);
  }

  onInputChangeCD2(ev: any) {
    // Reset items back to all of the items
    this.initializeItems();
    let val = ev.target.value;
    if (val && val.trim() != '') {
      this.chronicDiagnosisList = this.chronicDiagnosisList.filter((item) => {
        return (item.Description.toLowerCase().indexOf(val.toLowerCase()) > -1);
      });
      this.showCD2 = true;
    } else {
      this.showCD2 = false;
    }
  }

  selectedCD2(item){
    this.showCD2 = false;
    this.claimFormGroup.controls['select_chronicDiagnosis2'].setValue(this.chronicDiagnosisList[item].ID);
    this.claimFormGroup.controls['select_chronicDiagnosis2x'].setValue(this.chronicDiagnosisList[item].Description);
  }

  onInputChangeCD3(ev: any) {
    // Reset items back to all of the items
    this.initializeItems();
    let val = ev.target.value;
    if (val && val.trim() != '') {
      this.chronicDiagnosisList = this.chronicDiagnosisList.filter((item) => {
        return (item.Description.toLowerCase().indexOf(val.toLowerCase()) > -1);
      });
      this.showCD3 = true;
    } else {
      this.showCD3 = false;
    }
  }

  selectedCD3(item){
    this.showCD3 = false;
    this.claimFormGroup.controls['select_chronicDiagnosis3'].setValue(this.chronicDiagnosisList[item].ID);
    this.claimFormGroup.controls['select_chronicDiagnosis3x'].setValue(this.chronicDiagnosisList[item].Description);
  }

  onInputChangeCD4(ev: any) {
    // Reset items back to all of the items
    this.initializeItems();
    let val = ev.target.value;
    if (val && val.trim() != '') {
      this.chronicDiagnosisList = this.chronicDiagnosisList.filter((item) => {
        return (item.Description.toLowerCase().indexOf(val.toLowerCase()) > -1);
      });
      this.showCD4 = true;
    } else {
      this.showCD4 = false;
    }
  }

  selectedCD4(item){
    this.showCD4 = false;
    this.claimFormGroup.controls['select_chronicDiagnosis4'].setValue(this.chronicDiagnosisList[item].ID);
    this.claimFormGroup.controls['select_chronicDiagnosis4x'].setValue(this.chronicDiagnosisList[item].Description);
  }

  deleteClaim(){
    
      let alert = this.alertCtrl.create({
            title: 'Are you sure you want to delete this claim?',
            buttons: [
              {
                text: 'YES',
                handler: () => {
                  this.confirmDelete();
                }
              },
              {
                text: 'NO',
                role: 'cancel',
                handler: () => {
                  return;
                }
              }
            ]
        });
      alert.present();

  }


  confirmDelete (){

    var url = "http://118.201.197.142/api/tpaclaim/delete?network="+ this.memberNetwork + "&claimid=" + this.tpaClaimID + "&internal_LoggedInUserRegisterID=" + this.memberInfo[0]['Internal_LoggedInUserRegisterID'];
    this.showLoader();

    this.http.get(url).map(res => res.json()).subscribe(data => {
        console.log(data)
        this.loading.dismiss();
        if(data.Status == "Failed"){
              let alert = this.alertCtrl.create({
                title: 'Alert',
                message: data.ValidateMessage,
                enableBackdropDismiss: false,
                buttons: [{
                      text: 'OK',
                      role: 'Cancel',
                      handler: () => {
                        if(data.ValidateMessage.toLowerCase().indexOf("active session") >= 0){
                          this.navCtrl.setRoot(LoginNonmedinetPage);
                        }else{
                          return;
                        }
                    }
                  }]
              });
              alert.present();
              
            }else{

                console.log('success delete claim')
                let alert = this.alertCtrl.create({
                  title: 'Success',
                  message: 'Claim successfully deleted',
                  buttons: [{
                        text: 'OK',
                        role: 'cancel',
                        handler: () => {
                          this.navCtrl.push(ClaimsPage).then(() => {
                            //const index = this.navCtrl.getActive().index;
                            this.navCtrl.remove(0, 5);
                          });
                          this.loading.dismiss();
                      }
                    }]
                });
                alert.present();

        }


    },
    err => {
        console.log(err)
        console.log("Oops!");
    }

    );
  }


  showBenefits(){
    // this.benefitsForm['employee_nric'] =  this.memberClaimInfo['MemberNRIC']; 
    //   this.benefitsForm['select_employeeName'] =  this.memberClaimInfo['MemberNRIC']; 
    //   this.benefitsForm['select_employeeName'] = 0;

    var params = "network="  + this.memberNetwork + "&membercompanyid=" + this.memberClaimInfo['MemberCompanyID'] + "&memberid=" + this.memberClaimInfo['MemberID'] + "&companyid=" + this.memberClaimInfo['CompanyID'] +"&internal_LoggedInUserRegisterID="+ this.memberClaimInfo['Internal_LoggedInUserRegisterID'];
    console.log(params)  
    
    //   this.claimFormGroup.controls['claimName']
    console.log(this.claimFormGroup.controls['claimName'].value)
    

    //this.navCtrl.push( ClaimsPage, {details: "", } );
  }

  
  deleteSubmitClaimpage(){
    this.navCtrl.push(ClaimsPage).then(() => {
    //     const index = this.navCtrl.getActive().index;
        this.navCtrl.pop();
        this.navCtrl.remove(0,1);
        
        
    });
  }

  clickOpen(){
    this.menuCtrl.open();
  }


    
}



