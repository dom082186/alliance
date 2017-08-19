import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AboutusPage } from './aboutus';

@NgModule({
  declarations: [
    AboutusPage,
  ],
  imports: [
    IonicPageModule.forChild(AboutusPage),
  ],
  exports: [
    AboutusPage
  ]
})
export class AboutusPageModule {}
