import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LoginNonmedinetPage } from './login-nonmedinet';

@NgModule({
  declarations: [
    LoginNonmedinetPage,
  ],
  imports: [
    IonicPageModule.forChild(LoginNonmedinetPage),
  ],
  exports: [
    LoginNonmedinetPage
  ]
})
export class LoginNonmedinetPageModule {}
