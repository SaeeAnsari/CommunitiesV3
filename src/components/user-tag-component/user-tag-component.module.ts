import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { UserTagComponent } from './user-tag-component';

@NgModule({
  declarations: [
    UserTagComponent,
  ],
  imports: [
    IonicPageModule.forChild(UserTagComponent),
  ],
  exports: [
    UserTagComponent
  ], 
  entryComponents: [
    UserTagComponent
  ]

})
export class UserTagComponentModule {}
