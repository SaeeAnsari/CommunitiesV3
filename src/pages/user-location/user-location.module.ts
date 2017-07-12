import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { UserLocation } from './user-location';

@NgModule({
  declarations: [
    UserLocation,
  ],
  imports: [
    IonicPageModule.forChild(UserLocation),
  ],
  exports: [
    UserLocation
  ]
})
export class UserLocationModule {}
