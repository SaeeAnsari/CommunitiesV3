import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { UserSearchItemComponent } from './user-search-item-component';

@NgModule({
  declarations: [
    UserSearchItemComponent,
  ],
  imports: [
    IonicPageModule.forChild(UserSearchItemComponent),
  ],
  exports: [
    UserSearchItemComponent
  ]
})
export class UserSearchItemComponentModule {}
