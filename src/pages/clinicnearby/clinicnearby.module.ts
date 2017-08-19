import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ClinicnearbyPage } from './clinicnearby';

@NgModule({
  declarations: [
    ClinicnearbyPage,
  ],
  imports: [
    IonicPageModule.forChild(ClinicnearbyPage),
  ],
  exports: [
    ClinicnearbyPage
  ]
})
export class ClinicnearbyPageModule {}
