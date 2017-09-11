import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SubmitClaimDetailsPage } from './submit-claim-details';

@NgModule({
  declarations: [
    SubmitClaimDetailsPage,
  ],
  imports: [
    IonicPageModule.forChild(SubmitClaimDetailsPage),
  ],
  exports: [
    SubmitClaimDetailsPage
  ]
})
export class SubmitClaimDetailsPageModule {}
