import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController, ModalController, Platform, } from 'ionic-angular';

import { Storage } from '@ionic/storage';
import { FormBuilder, Validators } from '@angular/forms';
import { Camera } from '@ionic-native/camera';
import { Base64 } from '@ionic-native/base64';
import { DomSanitizer } from '@angular/platform-browser';
import { File } from '@ionic-native/file';


import { SubmitClaimServiceProvider } from '../../providers/submit-claim-service/submit-claim-service';
import { SubmitClaimDetailsPage } from '../submit-claim-details/submit-claim-details';
import { AddSpPage } from '../add-sp/add-sp';



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
  acuteDiagnosisList: any;
  chronicDiagnosisList: any;
  claimTypes: any;
  claimForm = {};
  claimFormGroup: any;
  addFilesArr: any;
  saveFilesArr: any;
  tpaClaimID: any;
  imgSrc: any;
  imgArr: any;
  imgArray=[];
  

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

  showList: boolean = false;


  base64ImageBefore: string;
  imageNameBefore: string;
  base64Image: string;
  imageName: string;


  constructor(public navCtrl: NavController, public navParams: NavParams, public storage: Storage,
    public submitClaimService: SubmitClaimServiceProvider,private alertCtrl: AlertController,
    public loadingCtrl: LoadingController,public formBuilder: FormBuilder,public modalCtrl: ModalController,
    private camera: Camera, private base64: Base64, public platform: Platform,public _DomSanitizer: DomSanitizer,
    private file: File) {

      this.claimEditDetails = this.navParams.get('details');
      this.claimForm['select_acuteDiagnosis1'] = "";
      this.claimForm['select_chronicDiagnosis1'] = "";

      this.claimFormGroup = formBuilder.group({
            claimName: ['',Validators.compose([Validators.required])],
            toDate: ['',Validators.compose([Validators.required])],
            select_providerName: ['',Validators.compose([Validators.required])],
            select_claimType: ['',Validators.compose([Validators.required])],
            referral: [''],
            ref_clinic: [''],
            select_ref_clinicType: [''],
            select_acuteDiagnosis1: ['',Validators.compose([Validators.required])],
            select_acuteDiagnosis2: [''],
            select_acuteDiagnosis3: [''],
            select_acuteDiagnosis4: [''],
            select_chronicDiagnosis1: ['',Validators.compose([Validators.required])],
            select_chronicDiagnosis2: [''],
            select_chronicDiagnosis3: [''],
            select_chronicDiagnosis4: [''],
            remarks: ['',Validators.compose([Validators.required])],
            total_amount: ['',Validators.compose([Validators.required])],
            total_amount_gst: ['',Validators.compose([Validators.required])]
      });
      
     
  }

  ionViewDidLoad() {
      //console.log('ionViewDidLoad SubmitclaimsPage');
      //this.memberInfo = this.getFromStorageAsync();
      this.imageNameBefore = "Select File";
      this.imgArr = 0;
      this.dateToday = new Date();
      this.getNetwork();

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
    
    console.log(this.claimEditDetails)
    this.storage.get('memNetwork').then((val1) => {
        this.memberNetwork = val1;
        this.claimFormGroup.controls['claimName'].setValue('S8124356A');

        this.storage.get('claimMemInfo').then((val1) => {
            this.memberClaimInfo = val1;

              if(this.claimEditDetails != undefined){
                  //this.claimForm['claimName'] = this.claimEditDetails['PatientNRIC']; 
                  this.claimFormGroup.controls['claimName'].setValue(this.claimEditDetails['PatientNRIC']);
              }else{
                  //this.claimForm['claimName'] = this.memberClaimInfo['MemberNRIC'];     
                  this.claimFormGroup.controls['claimName'].setValue(this.memberClaimInfo['MemberNRIC']);
              }
        });

        this.storage.get('memInfo').then((val) => {
            this.memberInfo = val;
            
              if(this.claimEditDetails != undefined){
                  this.claimFormGroup.controls['claimName'].setValue(this.claimEditDetails['PatientNRIC']);
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
    this.showLoader();
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
        //console.log(result)
        this.getChronicDiagnosis();  
      }
      
    }, (err) => {
      this.loading.dismiss();
    });
  }


  getChronicDiagnosis(){
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
        console.log(result)
        this.generateClaimID("");
      }
      
    }, (err) => {
      this.loading.dismiss();
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
    console.log(index);
    let contactModal = this.modalCtrl.create(AddSpPage,);
    contactModal.present();
  }


  addAcute(selectID){
      console.log(selectID);

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

      if(varClaimForm.controls['select_acuteDiagnosis1'].value == undefined || varClaimForm.controls['select_acuteDiagnosis1'].value == "") { 
        alert.present();
      }else{
        if(selectID == 'ad_2'){ this.acute2 = true; return;}
        if(varClaimForm.controls['select_acuteDiagnosis2'].value == "" || varClaimForm.controls['select_acuteDiagnosis2'].value == undefined){
          alert.present();
        }else{
          if(selectID == 'ad_3'){this.acute3 = true; return;}
          if(varClaimForm.controls['select_acuteDiagnosis3'].value == "" || varClaimForm.controls['select_acuteDiagnosis3'].value == undefined){
            alert.present();
          }else{
            if(selectID == 'ad_4'){this.acute4 = true; }
          }
        }
      }  
  }


  removeAcute(selectID){
    console.log(selectID);
    var varClaimForm = this.claimFormGroup;
    if(selectID == 'ad_2'){this.acute2 = false; varClaimForm.controls['select_acuteDiagnosis2'].setValue("");}
    if(selectID == 'ad_3'){this.acute3 = false; varClaimForm.controls['select_acuteDiagnosis3'].setValue("");}
    if(selectID == 'ad_4'){this.acute4 = false; varClaimForm.controls['select_acuteDiagnosis4'].setValue("");}
  }

  addChronic(selectID){
      console.log(selectID);

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
      if(varClaimForm.controls['select_chronicDiagnosis1'].value == undefined || varClaimForm.controls['select_chronicDiagnosis1'].value == "" ){  
        alert.present();
      }else{
        if(selectID == 'cd_2'){ this.chronic2 = true;  return;}
        if(varClaimForm.controls['select_chronicDiagnosis2'].value == "" || varClaimForm.controls['select_chronicDiagnosis2'].value == undefined){
          alert.present();
        }else{
          if(selectID == 'cd_3'){ this.chronic3 = true; return;}
          if(varClaimForm.controls['select_chronicDiagnosis3'].value == "" || varClaimForm.controls['select_chronicDiagnosis3'].value == undefined){
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
    if(selectID == 'cd_2'){this.chronic2 = false;varClaimForm.controls['select_chronicDiagnosis2'].setValue("");}
    if(selectID == 'cd_3'){this.chronic3 = false;varClaimForm.controls['select_chronicDiagnosis3'].setValue("");}
    if(selectID == 'cd_4'){this.chronic4 = false;varClaimForm.controls['select_chronicDiagnosis4'].setValue("");}
  }


  submitClaim(){
    this.showLoader();
    console.log(this.claimFormGroup.valid)
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
                  isreferralletter: varClaimForm.controls['referral'].value,
                  referralclinictype: "",
                  mcreason: "",
                  primarydiagnosisid: this.acuteDiagnosisList[varClaimForm.controls['select_acuteDiagnosis1'].value].ID,
                  primarydiagnosisdesc: this.acuteDiagnosisList[varClaimForm.controls['select_acuteDiagnosis1'].value].Description,
                  primarychronicdiagnosisid: this.chronicDiagnosisList[varClaimForm.controls['select_chronicDiagnosis1'].value].ID,
                  primarychronicdiagnosisdesc: this.chronicDiagnosisList[varClaimForm.controls['select_chronicDiagnosis1'].value].Description,
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
          
          if(varClaimForm.controls['select_acuteDiagnosis2'].value != ""){
              submitclaimsDetails['secondarydiagnosisid'] = this.acuteDiagnosisList[varClaimForm.controls['select_acuteDiagnosis2'].value].ID;
              submitclaimsDetails['secondarydiagnosisdesc'] = this.acuteDiagnosisList[varClaimForm.controls['select_acuteDiagnosis2'].value].Description;
          }
          if(varClaimForm.controls['select_chronicDiagnosis2'].value != ""){
              submitclaimsDetails['secondarychronicdiagnosisid'] = this.acuteDiagnosisList[varClaimForm.controls['select_chronicDiagnosis2'].value].ID;
              submitclaimsDetails['secondarychronicdiagnosisdesc'] = this.acuteDiagnosisList[varClaimForm.controls['select_chronicDiagnosis2'].value].Description;
          }

          console.log(submitclaimsDetails);

          let claimModal = this.modalCtrl.create(SubmitClaimDetailsPage, {details: submitclaimsDetails, files: this.saveFilesArr});
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
        let filePath: string = '';

        if (this.platform.is('android')) {
          filePath = imageData;
        }else{
          filePath = imageData
        }

        console.log(filePath);
        
        this.base64.encodeFile(filePath).then((base64File: string) => {
            
            var content = base64File.split("data:image/*;charset=utf-8;base64,").pop()
            var substr = content.substring(0,4)
            if(substr == '/9j/'){
              // this.isFromDevice = true
              this.base64ImageBefore = "data:image/jpeg;base64," + content;  
            }else{
              this.base64ImageBefore = "data:image/jpeg;base64," + content;
              // this.isFromDevice = false
            }

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


        //*****************|  GET FILE NAME AND FILE SIZE  |***************

        (<any>window).resolveLocalFileSystemURL(filePath, (res) => {
            res.file((resFile) => {
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
        
        
        //*********** IMAGE CONVERSION TO BASE64 *********

        this.base64.encodeFile(filePath).then((base64File: string) => {
            
            var content = base64File.split("data:image/*;charset=utf-8;base64,").pop()
            var substr = content.substring(0,4)
            if(substr == '/9j/'){
              // this.isFromDevice = true
              this.base64ImageBefore = "data:image/jpeg;base64," + content;  
            }else{
              this.base64ImageBefore = "./assets/img/pdf-icon.png";
              // this.isFromDevice = false
            }
            console.log(content);

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

        
        //*********** GET FILE NAME AND FILE SIZE *********

        (<any>window).resolveLocalFileSystemURL(filePath, (res) => {
            res.file((resFile) => {
                console.log(resFile)
                var res = resFile.name.split(".");

                //**************** CONDITION FILE TYPE ********
                if(res.length > 2){
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
            })
        })

    }, (err) => {
        console.log(err);
    });

  }

  addImage() {
    var new_item = {};
    this.submitClaimService.addFile(this.addFilesArr).then((result) => {
      this.showLoader()

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
                
                this.imageName = this.imageNameBefore
                new_item['imageName'] = this.imageNameBefore;
                new_item['image'] = this.base64ImageBefore
                var isPDF = this.imageName.includes(".pdf");
                if(isPDF){ 
                  this.isFromDevice = false
                }else{
                  this.isFromDevice = true
                }
                this.imgArray.push(new_item);

                console.log('success file attachment')
                console.log(result)

                //======= SAVE FILES ARR
                this.saveFilesArr = {
                  membername: this.memberClaimInfo.MemberName,
                  internal_LoggedInUserRegisterID: this.memberInfo[0]['Internal_LoggedInUserRegisterID'],  
                  tpaclaimid: this.tpaClaimID
                }

            }
          this.loading.dismiss();  

        }, (err) => {
          console.log(err)
          this.loading.dismiss();
      });

    console.log(this.imgArray);
    console.log('this.imgArr');
  }


  removeImage(i) {
    console.log(i)
    this.imgArray.splice(i,1); 
    
  }


  getItems(ev: any) {
    // Reset items back to all of the items
    //this.initializeItems();

    // set val to the value of the searchbar
    let val = ev.target.value;
    console.log(this.acuteDiagnosisList);
    // if the value is an empty string don't filter the items
    if (val && val.trim() != '') {
      
      // Filter the items
      this.acuteDiagnosisList = this.acuteDiagnosisList.filter((item) => {
        return (item.Description.toLowerCase().indexOf(val.toLowerCase()) > -1);
      });
      
      // Show the results
      this.showList = true;
    } else {
      
      // hide the results when the query is empty
      this.showList = false;
    }
  }






    
}



