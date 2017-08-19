import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SubmitclaimsPage } from './submitclaims';

@NgModule({
  declarations: [
    SubmitclaimsPage,
  ],
  imports: [
    IonicPageModule.forChild(SubmitclaimsPage),
  ],
  exports: [
    SubmitclaimsPage
  ]
})
export class SubmitclaimsPageModule {}
