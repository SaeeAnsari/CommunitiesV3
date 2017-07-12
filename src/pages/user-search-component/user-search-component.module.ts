import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { UserSearchComponent } from './user-search-component';

@NgModule({
  declarations: [
    UserSearchComponent,
  ],
  imports: [
    IonicPageModule.forChild(UserSearchComponent),
  ],
  exports: [
    UserSearchComponent
  ]
})
export class UserSearchComponentModule {}
