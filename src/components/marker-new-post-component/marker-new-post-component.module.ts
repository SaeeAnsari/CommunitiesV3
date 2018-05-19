import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MarkerNewPostComponent } from './marker-new-post-component';
import {UserTagComponentModule} from '../../components/user-tag-component/user-tag-component.module';

@NgModule({
  declarations: [
    MarkerNewPostComponent,
  ],
  imports: [
    IonicPageModule.forChild(MarkerNewPostComponent),
    UserTagComponentModule
  ],
  exports: [
    MarkerNewPostComponent
  ],
  entryComponents: [
    MarkerNewPostComponent
  ]
})
export class MarkerNewPostComponentModule {}
