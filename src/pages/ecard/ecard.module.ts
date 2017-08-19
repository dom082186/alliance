import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EcardPage } from './ecard';

@NgModule({
  declarations: [
    EcardPage,
  ],
  imports: [
    IonicPageModule.forChild(EcardPage),
  ],
  exports: [
    EcardPage
  ]
})
export class EcardPageModule {}
