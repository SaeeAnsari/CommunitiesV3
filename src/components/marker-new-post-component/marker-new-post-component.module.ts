import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MarkerNewPostComponent } from './marker-new-post-component';

@NgModule({
  declarations: [
    MarkerNewPostComponent,
  ],
  imports: [
    IonicPageModule.forChild(MarkerNewPostComponent),
  ],
  exports: [
    MarkerNewPostComponent
  ]
})
export class MarkerNewPostComponentModule {}
