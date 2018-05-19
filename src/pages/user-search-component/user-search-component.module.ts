import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { UserSearchComponent } from './user-search-component';
import {UserSearchItemComponentModule} from '../../components/user-search-item-component/user-search-item-component.module';

@NgModule({
  declarations: [
    UserSearchComponent,
  ],
  imports: [
    IonicPageModule.forChild(UserSearchComponent),
    UserSearchItemComponentModule
  ],
  exports: [
    UserSearchComponent
  ]
})
export class UserSearchComponentModule {}
