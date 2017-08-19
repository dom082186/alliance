import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ClinicslocatorPage } from './clinicslocator';

@NgModule({
  declarations: [
    ClinicslocatorPage,
  ],
  imports: [
    IonicPageModule.forChild(ClinicslocatorPage),
  ],
  exports: [
    ClinicslocatorPage
  ]
})
export class ClinicslocatorPageModule {}
