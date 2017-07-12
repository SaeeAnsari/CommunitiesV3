import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RegisterUserComponent } from './register-user-component';

@NgModule({
  declarations: [
    RegisterUserComponent,
  ],
  imports: [
    IonicPageModule.forChild(RegisterUserComponent),
  ],
  exports: [
    RegisterUserComponent
  ]
})
export class RegisterUserComponentModule {}
