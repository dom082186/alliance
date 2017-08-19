import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TermsconditionsPage } from './termsconditions';

@NgModule({
  declarations: [
    TermsconditionsPage,
  ],
  imports: [
    IonicPageModule.forChild(TermsconditionsPage),
  ],
  exports: [
    TermsconditionsPage
  ]
})
export class TermsconditionsPageModule {}
