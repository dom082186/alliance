import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CheckbalancePage } from './checkbalance';

@NgModule({
  declarations: [
    CheckbalancePage,
  ],
  imports: [
    IonicPageModule.forChild(CheckbalancePage),
  ],
  exports: [
    CheckbalancePage
  ]
})
export class CheckbalancePageModule {}
