import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AddSpPage } from './add-sp';

@NgModule({
  declarations: [
    AddSpPage,
  ],
  imports: [
    IonicPageModule.forChild(AddSpPage),
  ],
  exports: [
    AddSpPage
  ]
})
export class AddSpPageModule {}
