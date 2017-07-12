import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { UploadedMediaPostComponent } from './uploaded-media-post';

@NgModule({
  declarations: [
    UploadedMediaPostComponent,
  ],
  imports: [
    IonicPageModule.forChild(UploadedMediaPostComponent),
  ],
  exports: [
    UploadedMediaPostComponent
  ]
})
export class UploadedMediaPostComponentModule {}
