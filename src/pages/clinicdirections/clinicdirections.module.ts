import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ClinicdirectionsPage } from './clinicdirections';

@NgModule({
  declarations: [
    ClinicdirectionsPage,
  ],
  imports: [
    IonicPageModule.forChild(ClinicdirectionsPage),
  ],
  exports: [
    ClinicdirectionsPage
  ]
})
export class ClinicdirectionsPageModule {}
